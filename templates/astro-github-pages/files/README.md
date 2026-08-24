# {{projectName}}

Astro landing page configured for `https://{{githubOwner}}.github.io/{{repositoryName}}`.

## Development

```bash
npm install
npm run dev
```

Run `npm run check && npm run build` before pushing.

## GitHub Pages

1. Push the repository to GitHub with `main` as its default branch.
2. Open **Settings > Pages** and set **Source** to **GitHub Actions**.
3. Push to `main`. The included workflow builds and deploys the `dist` folder.

The Astro config handles both project sites and `<owner>.github.io` root sites.
