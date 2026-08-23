# AI Coding Agent Skills and Templates

Curated engineering skills and project starters for the Coding Agents mobile app.

The app reads `registry.json` from this repository. Registry version 2 contains
both `skills` and `templates`.

## Skills

Add a skill by creating `skills/<skill-id>/SKILL.md` and adding it to the
`skills` registry array.

Skill folders follow the Agent Skills shape: a required `SKILL.md` with `name`
and `description` frontmatter, plus optional `agents/openai.yaml` UI metadata.

## Templates

Add a template under `templates/<template-id>/`, create a `template.json`
manifest, and add its manifest to the `templates` registry array. A manifest
contains:

- Variables and defaults used in `{{variableName}}` placeholders.
- An explicit file list so clients do not need a GitHub directory-listing API.
- Standard `setup`, `dev`, `verify`, and optional `deploy` commands.
- A `postCreatePrompt` that tells an agent what to do after materialization.

The schema is documented in `templates/schema.json`. Materialize a starter
locally with:

```bash
node scripts/materialize-template.mjs astro-github-pages /tmp/my-site \
  --set projectName=my-site \
  --set githubOwner=octocat \
  --set repositoryName=my-site
```

Validate the registry and every materialized template with:

```bash
npm test
```
