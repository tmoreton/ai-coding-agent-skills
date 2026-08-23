import { access, mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { materializeTemplate } from "./materialize-template.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const registry = JSON.parse(await readFile(path.join(root, "registry.json"), "utf8"));

function check(condition, message) {
  if (!condition) errors.push(message);
}

check(registry.version === 2, "registry.version must be 2");
check(Array.isArray(registry.skills), "registry.skills must be an array");
check(Array.isArray(registry.templates), "registry.templates must be an array");

const ids = new Set();
for (const entry of [...(registry.skills ?? []), ...(registry.templates ?? [])]) {
  check(!ids.has(entry.id), `Duplicate registry id: ${entry.id}`);
  ids.add(entry.id);
  try {
    await access(path.join(root, entry.sourcePath));
  } catch {
    errors.push(`Missing sourcePath for ${entry.id}: ${entry.sourcePath}`);
  }
}

for (const entry of registry.templates ?? []) {
  const manifestPath = path.join(root, entry.sourcePath);
  let manifest;
  try {
    manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  } catch (error) {
    errors.push(`Cannot read ${entry.sourcePath}: ${error.message}`);
    continue;
  }

  check(manifest.version === 1, `${entry.id}: manifest.version must be 1`);
  check(manifest.id === entry.id, `${entry.id}: manifest id does not match registry`);
  check(Array.isArray(manifest.variables), `${entry.id}: variables must be an array`);
  check(Array.isArray(manifest.files) && manifest.files.length > 0, `${entry.id}: files must not be empty`);
  check(Boolean(manifest.commands?.setup), `${entry.id}: setup command is required`);
  check(Boolean(manifest.commands?.dev), `${entry.id}: dev command is required`);
  check(Boolean(manifest.commands?.verify), `${entry.id}: verify command is required`);

  const variableNames = new Set((manifest.variables ?? []).map((variable) => variable.name));
  const destinations = new Set();
  for (const variable of manifest.variables ?? []) {
    check(
      !variable.pattern || new RegExp(variable.pattern).test(variable.default),
      `${entry.id}: default for ${variable.name} does not match its pattern`
    );
  }

  for (const file of manifest.files ?? []) {
    check(!path.isAbsolute(file.source) && !file.source.split(path.sep).includes(".."), `${entry.id}: unsafe source path ${file.source}`);
    check(!path.isAbsolute(file.destination) && !file.destination.split(path.sep).includes(".."), `${entry.id}: unsafe destination path ${file.destination}`);
    check(!destinations.has(file.destination), `${entry.id}: duplicate destination ${file.destination}`);
    destinations.add(file.destination);
    const sourcePath = path.join(path.dirname(manifestPath), file.source);
    try {
      const contents = await readFile(sourcePath, file.template ? "utf8" : undefined);
      if (file.template) {
        for (const match of contents.matchAll(/\{\{([A-Za-z][A-Za-z0-9]*)\}\}/g)) {
          check(variableNames.has(match[1]), `${entry.id}: unknown placeholder {{${match[1]}}} in ${file.source}`);
        }
      }
    } catch {
      errors.push(`${entry.id}: missing file ${file.source}`);
    }
  }

  const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), `${entry.id}-`));
  try {
    await materializeTemplate(entry.id, temporaryDirectory);
    for (const file of manifest.files ?? []) {
      const materializedContents = await readFile(path.join(temporaryDirectory, file.destination));
      if (file.destination.endsWith(".json")) {
        JSON.parse(materializedContents.toString("utf8"));
      }
      if (file.template) {
        check(
          !/\{\{[A-Za-z][A-Za-z0-9]*\}\}/.test(materializedContents.toString("utf8")),
          `${entry.id}: unresolved placeholder in ${file.destination}`
        );
      }
    }
  } catch (error) {
    errors.push(`${entry.id}: cannot materialize defaults: ${error.message}`);
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
}

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Validated ${registry.skills.length} skills and ${registry.templates.length} templates.`);
