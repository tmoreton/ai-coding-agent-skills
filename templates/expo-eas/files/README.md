# {{displayName}}

Expo app starter configured for EAS builds.

## Start locally

```bash
npm install
npm start
```

Use the Expo Go app or press `i`, `a`, or `w` in the terminal.

## Connect EAS

```bash
npx eas-cli@latest login
npx eas-cli@latest init
npx eas-cli@latest build:configure
```

The starter includes development, internal preview, and production profiles in
`eas.json`. Create an installable preview with:

```bash
npx eas-cli@latest build --platform all --profile preview
```

Before shipping, replace the placeholder bundle identifier
`{{bundleIdentifier}}` with an identifier owned by your organization.
