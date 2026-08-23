import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function resolveWithin(root, relativePath) {
  const resolvedPath = path.resolve(root, relativePath);
  if (resolvedPath !== root && !resolvedPath.startsWith(`${root}${path.sep}`)) {
    throw new Error(`Path escapes template root: ${relativePath}`);
  }
  return resolvedPath;
}

function parseArguments(args) {
  const [templateId, destination, ...options] = args;
  const values = {};

  for (let index = 0; index < options.length; index += 1) {
    if (options[index] !== "--set" || !options[index + 1]?.includes("=")) {
      throw new Error(`Expected --set name=value, received "${options[index] ?? ""}"`);
    }
    const [name, ...valueParts] = options[index + 1].split("=");
    values[name] = valueParts.join("=");
    index += 1;
  }

  return { templateId, destination, values };
}

export async function loadTemplate(templateId) {
  const registry = JSON.parse(await readFile(path.join(repositoryRoot, "registry.json"), "utf8"));
  const entry = registry.templates?.find((template) => template.id === templateId);
  if (!entry) {
    throw new Error(`Unknown template "${templateId}"`);
  }

  const manifestPath = resolveWithin(repositoryRoot, entry.sourcePath);
  return {
    manifest: JSON.parse(await readFile(manifestPath, "utf8")),
    templateRoot: path.dirname(manifestPath)
  };
}

export async function materializeTemplate(templateId, destination, overrides = {}) {
  const { manifest, templateRoot } = await loadTemplate(templateId);
  const values = Object.fromEntries(
    manifest.variables.map((variable) => [variable.name, overrides[variable.name] ?? variable.default])
  );

  for (const variable of manifest.variables) {
    if (variable.pattern && !new RegExp(variable.pattern).test(values[variable.name])) {
      throw new Error(`Invalid value for ${variable.name}: "${values[variable.name]}"`);
    }
  }

  const unknownVariables = Object.keys(overrides).filter((name) => !(name in values));
  if (unknownVariables.length > 0) {
    throw new Error(`Unknown template variable(s): ${unknownVariables.join(", ")}`);
  }

  await mkdir(destination, { recursive: true });
  for (const file of manifest.files) {
    const source = resolveWithin(templateRoot, file.source);
    const target = resolveWithin(path.resolve(destination), file.destination);
    await mkdir(path.dirname(target), { recursive: true });

    if (!file.template) {
      await cp(source, target);
      continue;
    }

    let contents = await readFile(source, "utf8");
    for (const [name, value] of Object.entries(values)) {
      contents = contents.replaceAll(`{{${name}}}`, value);
    }
    await writeFile(target, contents);
  }

  return { manifest, values };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    const { templateId, destination, values } = parseArguments(process.argv.slice(2));
    if (!templateId || !destination) {
      throw new Error("Usage: node scripts/materialize-template.mjs <template-id> <destination> [--set name=value]");
    }
    const result = await materializeTemplate(templateId, path.resolve(destination), values);
    console.log(`Created ${result.manifest.name} in ${path.resolve(destination)}`);
    console.log(`Next: ${result.manifest.commands.setup}`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
