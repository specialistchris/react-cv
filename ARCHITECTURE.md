# Architecture

This document describes the current architecture of `christophernapier.com`.

## Objective

The site acts as Chris Napier's personal website and interactive CV. It should communicate professional credibility, personal brand, skills, experience, and provide a low-friction contact path.

## High-level architecture

```text
Visitor browser
  -> Next.js React frontend
  -> Contact form
  -> Netlify Function: altchaChallenge
  -> Netlify Function: triggerEmail
  -> Netlify email functions / SendGrid provider
  -> Email notifications and confirmations
```

## Frontend

The frontend is a Next.js and React application styled with Tailwind CSS.

Primary responsibilities:

- Render the homepage and CV sections.
- Present content clearly across desktop and mobile.
- Collect contact-form submissions.
- Run human-verification UI before enabling form submission.

Important files:

- `src/pages/index.tsx`
- `src/data/data.tsx`
- `src/components/Sections/Contact/index.tsx`
- `src/components/Sections/Contact/FeedbackForm.tsx`

## Content model

Most profile and website content should remain in structured data files where possible. This keeps content editing separate from layout and component behaviour.

Preferred direction:

- Keep content in `src/data/data.tsx` or similar data modules.
- Keep presentation in React components.
- Avoid hardcoding large amounts of profile content inside low-level UI components.

## Contact form flow

```text
1. User fills in name, email, and message.
2. User completes human verification.
3. Browser receives an ALTCHA-style payload.
4. Browser submits form data and verification payload to `triggerEmail`.
5. Server validates required fields.
6. Server verifies the human-verification payload using `ALTCHA_SECRET`.
7. Server sends notification and confirmation emails.
8. Browser displays success or failure feedback.
```

## Human-verification flow

`functions/altchaChallenge.ts` generates a signed proof-of-work challenge. It uses server-side secret material from `ALTCHA_SECRET` and returns only public challenge data.

`functions/triggerEmail.ts` verifies the submitted payload server-side before sending emails.

This is a bot-reduction layer, not a complete abuse-prevention system. Rate limiting and honeypot fields are possible future improvements.

## Serverless functions

The project uses Netlify Functions from the `functions/` directory.

Current important functions:

- `altchaChallenge.ts`: generates a signed challenge.
- `triggerEmail.ts`: validates contact form data, verifies the human challenge, and sends emails.

Serverless functions must not expose environment variables or secrets to the frontend.

## Deployment

The site is deployed on Netlify from GitHub.

```text
GitHub main branch -> Netlify build -> Production deploy
```

Current production site:

```text
https://www.christophernapier.com
```

## Environment variables

Important environment variables are configured in Netlify, not in the repository.

Known variables include:

- `ALTCHA_SECRET`
- `NETLIFY_EMAILS_DIRECTORY`
- `NETLIFY_EMAILS_PROVIDER`
- `NETLIFY_EMAILS_PROVIDER_API_KEY`
- `NETLIFY_EMAILS_SECRET`
- `SENDGRID_API_KEY`
- `SENDGRID_SENDER_EMAIL`
- `SENDGRID_SENDER_NAME`

## Main risks

- Contact-form spam or abuse.
- Email provider configuration errors.
- Netlify Function runtime errors.
- Dependency/API mismatch in security or verification packages.
- Build failures from TypeScript type conflicts.
- Regressions caused by broad, unrelated edits.

## Recommended future improvements

1. Add GitHub Actions build validation before Netlify deploys.
2. Add a honeypot field to the contact form.
3. Add lightweight server-side rate limiting.
4. Add clearer success and error UI instead of `alert()` calls.
5. Improve contact-form observability with structured, non-sensitive logs.
6. Keep project documentation updated as architecture changes.
