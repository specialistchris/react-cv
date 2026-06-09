# Security

This document describes security considerations for `christophernapier.com`.

## Security objective

The site should protect contact-form functionality, avoid exposing secrets, reduce spam and abuse, and keep visitor data handling simple and responsible.

## Secrets

Secrets must never be committed to the repository.

Use Netlify environment variables for sensitive values, including:

- `ALTCHA_SECRET`
- `NETLIFY_EMAILS_PROVIDER_API_KEY`
- `NETLIFY_EMAILS_SECRET`
- `SENDGRID_API_KEY`
- `SENDGRID_SENDER_EMAIL`
- `SENDGRID_SENDER_NAME`

Do not expose these values in frontend code, logs, documentation examples, screenshots, or build output.

## Contact form validation

The contact form must validate security-relevant checks server-side.

Client-side checks improve user experience but are not security controls. A user or bot can bypass frontend validation and call Netlify Functions directly.

Server-side validation should include:

- Required name, email, and message checks.
- Human-verification payload validation.
- Message length limits.
- Email format sanity checks.
- Abuse-prevention controls where practical.

## Human verification

The site uses an ALTCHA-style proof-of-work challenge to reduce automated spam.

Important rules:

- The challenge must be generated server-side.
- The challenge must be signed with a server-only secret.
- The submitted payload must be verified server-side before emails are sent.
- The secret must remain in Netlify environment variables only.

Human verification reduces spam risk but does not eliminate it. It should be combined with additional controls if abuse increases.

## Recommended anti-abuse improvements

Future improvements, in order of value-to-complexity:

1. Add a honeypot field to the contact form.
2. Add lightweight server-side rate limiting by IP or fingerprint.
3. Add structured function logs that avoid storing sensitive message content.
4. Add stricter message and email validation.
5. Add monitoring for repeated failed verification attempts.

## Email safety

The email-sending function should treat all submitted form fields as untrusted input.

Recommended safeguards:

- Do not use submitted values directly as trusted headers.
- Keep the sender address fixed to a controlled domain address.
- Use submitted email only as content or reply metadata where safe.
- Sanitize or escape values in templates if templates render HTML.
- Keep message length limits in place.

## Logging

Logs are useful for debugging but can become a privacy risk.

Avoid logging:

- Full submitted messages.
- Email provider API keys.
- Netlify email secrets.
- ALTCHA secrets.
- Full verification payloads unless temporarily needed for debugging.

Prefer logging:

- Function name.
- High-level success or failure reason.
- HTTP status codes from downstream email providers.
- Non-sensitive error messages.

## Dependency risk

Security-related dependencies can change APIs or type definitions. When adding or updating dependencies:

- Check the package documentation for the installed version.
- Keep server and client integration patterns consistent.
- Run a production build before deployment when possible.
- Test deployed Netlify Functions directly after deployment.

## Incident response

If contact-form abuse or a security issue occurs:

1. Disable the contact form or email function temporarily if necessary.
2. Rotate affected secrets in Netlify.
3. Review Netlify Function logs.
4. Patch the issue in GitHub.
5. Deploy and verify the fix.
6. Document what happened and any follow-up actions.
