# AGENTS.md

Guidance for AI coding agents working on `specialistchris/react-cv`.

## Project context

- `react-cv` is the live source repository for `christophernapier.com`.
- `cncom` is a backup of the site prior to AI support.
- Treat this repository as production-facing: changes to `main` can trigger a Netlify deploy.

## Current technology stack

- React
- Next.js
- TypeScript
- Tailwind CSS
- Netlify
- Netlify Functions
- Netlify Emails
- ALTCHA human-verification support

## Deployment context

The site deploys on Netlify.

Netlify builds and deploys more than just the React/Next.js app:

- Next.js app code from the main project source.
- Netlify Functions from the top-level `functions/` directory.
- Netlify email-related files from the configured email directories.
- Netlify configuration from the dashboard and repository config files.

Do not assume a dependency is unused simply because it is not imported under `src/`.

## Dependency cleanup rules

Before removing any dependency from `package.json`, search usage across the full deploy surface, including:

- `src/**`
- `functions/**`
- `emails/**`
- `pages/**`
- `public/**`
- `netlify.toml`
- `next.config.js`
- other config files
- Netlify-related directories and generated/deployed function entry points

Search both exact package names and likely import patterns.

Examples:

- Search `node-fetch`, `from "node-fetch"`, and `from 'node-fetch'`.
- Search `@netlify/functions` and `Handler`.
- Search `react-router-dom`, `BrowserRouter`, `Routes`, `Route`, `useNavigate`, and `NavLink`.
- Search `sendgrid`, `@sendgrid/mail`, and environment variables such as `SENDGRID_API_KEY`.

## Known dependency lessons

### Required packages

Do not remove these without first changing and testing the code that uses them:

- `node-fetch`
  - Required by `functions/triggerEmail.ts`.
  - The function imports it directly with `import fetch from "node-fetch"`.

- `@netlify/functions`
  - Required by `functions/triggerEmail.ts` for the Netlify Function `Handler` type.

- `sass`
  - Keep pinned to `1.62.1` while Netlify uses Node `18.20.8`.
  - A floating Sass version resolved to `sass@1.100.0`, which required Node `>=20.19.0` and broke the Netlify dependency install.

### Previously removed stale/unnecessary packages

These packages were removed during cleanup and should not be re-added unless there is a clear new use case:

- `nextjs`
  - Not the real Next.js framework package. Use `next`.

- `g`
  - No known project usage.

- runtime `yarn`
  - The project uses the `packageManager` field instead.

- `react-router-dom`
  - The project uses Next.js routing and `next/link`.

- `@sendgrid/mail`
  - No current direct code usage after the Netlify Emails approach.

- `netlify-cli`
  - Not required as an application runtime dependency.

- `netlify-lambda`
  - Not required for the current Netlify Functions setup.

## Netlify build lessons from this session

### Sass / Node failure

Observed failure:

```text
error sass@1.100.0: The engine "node" is incompatible with this module.
Expected version ">=20.19.0". Got "18.20.8"
```

Resolution:

- Pin `sass` to `1.62.1`.
- Remove the stale/conflicting `resolutions.autoprefixer = 10.4.5` entry.

### Missing `node-fetch` failure

Observed failure:

```text
ERROR: Could not resolve "node-fetch"
functions/triggerEmail.ts:2:18: import fetch from "node-fetch";
```

Resolution:

- Restore `node-fetch` to top-level `dependencies`.
- Restore `@netlify/functions` because `functions/triggerEmail.ts` imports `Handler` from it.

## Error-handling rule

When a deployment fails:

1. Read the exact failing file and line from the Netlify log.
2. Inspect the file in GitHub before changing dependencies or code.
3. Prefer the smallest safe fix over broad cleanup.
4. Commit one logical fix at a time.
5. Let Netlify rebuild, then use the next deploy error as feedback.

Do not repeat a failed approach. Learn from the error and retry in a way that gets around the specific issue.

## GitHub tool usage guidance

Prefer safe repository operations:

- Search repository contents.
- Fetch files before editing.
- Use `create_file` only when the file does not exist.
- Use `update_file` only with the current SHA from `fetch_file`.

Avoid low-level Git tree or commit APIs unless absolutely necessary. A previous invalid low-level commit call with placeholder SHA values failed and was unnecessary.

## Recommended workflow for future agents

1. Fetch `README.md`, `package.json`, `netlify.toml`, and relevant source files.
2. For dependency work, search all deploy-relevant directories, not only `src/`.
3. Make the smallest reasonable change.
4. Verify by fetching the changed file back from GitHub.
5. Watch Netlify build results or ask the user for the next build log.
6. If the build fails, fix the specific failure rather than reverting unrelated successful changes.

## Current project relationship

- Live project: `react-cv`
- Backup/pre-AI-support project: `cncom`
- Production URL: `https://www.christophernapier.com/`
