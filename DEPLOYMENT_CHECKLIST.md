# Deployment Checklist

Use this checklist before and after deploying changes to `christophernapier.com`.

## Before committing

- [ ] The change is scoped to the requested outcome.
- [ ] Relevant files have been inspected.
- [ ] No unrelated formatting or dependency changes were introduced.
- [ ] No secrets, tokens, API keys, or local files are committed.
- [ ] User-facing text is checked for spelling, tone, and clarity.
- [ ] TypeScript syntax and imports look valid.
- [ ] Accessibility basics are considered for UI changes.
- [ ] Mobile and desktop behaviour are considered for layout changes.

## Before deployment

- [ ] Required Netlify environment variables exist.
- [ ] Netlify build command is still correct.
- [ ] Netlify publish directory is still correct.
- [ ] New dependencies are listed in `package.json`.
- [ ] Any lockfile or package-manager implications are understood.
- [ ] Netlify Functions have not been given client-visible secrets.

## After deployment

- [ ] Homepage loads at `https://www.christophernapier.com`.
- [ ] The contact section renders correctly.
- [ ] The human-verification challenge endpoint works:

```text
https://www.christophernapier.com/.netlify/functions/altchaChallenge
```

Expected challenge endpoint response includes:

```json
{
  "algorithm": "SHA-256",
  "challenge": "...",
  "maxnumber": 50000,
  "salt": "...",
  "signature": "..."
}
```

- [ ] The contact form can be completed by a real user.
- [ ] The contact form submit button only enables after human verification.
- [ ] Submitting the form sends the expected email.
- [ ] Browser console has no obvious runtime errors.
- [ ] Netlify Function logs have no unexpected errors.

## Manual Netlify deploy

If GitHub-to-Netlify automatic deployment does not run, trigger manually:

```text
Netlify -> specialistchris -> Deploys -> Trigger deploy -> Deploy site
```

## Rollback guidance

If a deploy breaks production:

1. Open Netlify deploy history.
2. Find the last successful production deploy.
3. Use Netlify's deploy rollback/publish controls.
4. Revert or patch the problematic GitHub commit.
5. Confirm the live site and contact form work again.
