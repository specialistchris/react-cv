# AI Development Guide

This guide explains how AI assistants should work on the `react-cv` project that powers `christophernapier.com`.

## Project purpose

This repository contains Chris Napier's personal website and interactive CV. The site should present a credible professional profile, communicate Chris's personal brand, and provide a clear way for visitors to contact him.

The website includes a contact form, Netlify Functions, email delivery, and human-verification logic, so changes should be made carefully and tested after deployment.

## Primary repository

```text
specialistchris/react-cv
```

## Production website

```text
https://www.christophernapier.com
```

## Tech stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Netlify hosting
- Netlify Functions
- Netlify email integration
- ALTCHA-style human verification for the contact form

## Important files

- `src/pages/index.tsx` controls homepage section order.
- `src/data/data.tsx` contains most editable website content.
- `src/components/Sections/Contact/FeedbackForm.tsx` controls the contact form UI.
- `functions/altchaChallenge.ts` generates the human-verification challenge.
- `functions/triggerEmail.ts` validates the form payload and sends contact emails.
- `netlify.toml` contains Netlify function configuration.
- `package.json` contains scripts and dependencies.

## Working rules for AI assistants

1. Inspect relevant files before editing.
2. Prefer small, safe, reversible changes.
3. Do not modify unrelated files.
4. Do not commit secrets, tokens, API keys, or local configuration.
5. Explain material risks before large architectural or dependency changes.
6. When changing dependencies, warn that lockfiles and Netlify builds may need attention.
7. When changing Netlify Functions, test the function URL directly after deploy.
8. When changing the contact form, test the full flow: form display, human verification, submit, and email delivery.
9. Do not rely on client-side checks for security-sensitive validation.
10. Be explicit about whether a change was committed, deployed, or only proposed.

## Netlify notes

Netlify deploys from GitHub. ChatGPT may not be able to trigger deployment directly; it may return a local CLI command instead. If automatic deployment does not run, trigger a deploy manually in Netlify:

```text
Netlify -> Deploys -> Trigger deploy -> Deploy site
```

Environment variables are managed in the Netlify UI, not in this repository.

## Known connector limitations

- Build logs may need to be copied from Netlify into ChatGPT.
- Netlify environment variables must be configured manually in Netlify.
- Direct deploys from ChatGPT may not always be possible.
- Avoid using connector discovery calls unless necessary because they can create noisy message-stream output.
