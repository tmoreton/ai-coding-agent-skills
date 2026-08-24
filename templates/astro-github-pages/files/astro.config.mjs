import { defineConfig } from "astro/config";

const repository = "{{repositoryName}}";
const isRootSite = repository.toLowerCase() === "{{githubOwner}}.github.io".toLowerCase();

export default defineConfig({
  site: "https://{{githubOwner}}.github.io",
  base: isRootSite ? "/" : `/${repository}`,
  output: "static"
});
