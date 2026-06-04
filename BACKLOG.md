# BACKLOG.md

Senior-programmer review of the `react-cv` project.

Reviewed repository: `specialistchris/react-cv`  
Default branch: `main`  
Review focus: React / Next.js architecture, maintainability, build quality, content architecture, accessibility, deployment, and security.

## Executive summary

The project is a good starting point for a personal CV site: it uses Next.js, React, TypeScript, Tailwind CSS, and a single data-driven content file. However, it still carries several signs of being a forked template rather than a mature personal-brand codebase. The highest-value improvements are to clean up dependencies, simplify the form implementation, separate content from JSX-heavy application code, improve metadata/SEO, modernise Next.js configuration, and add basic quality gates.

## Priority 0 — Confirm the project direction

- **Decide whether this repository is the active source for `christophernapier.com`.**
  - The README describes a React resume template, while the site/domain work is also happening in `cncom`.
  - Recommendation: explicitly document whether `react-cv` is the live site, an old template, a source repo for the current site, or an experimental fork.
  - Add this to `README.md` so future development does not split across multiple repos.

- **Rename package metadata away from the upstream template identity.**
  - `package.json` still uses `react-resume-template` as the package name and template-style description.
  - Recommendation: rename the package to something like `christophernapier-cv` or `react-cv`, update `description`, `author`, `keywords`, and remove stale template references.
  - This is low-risk and improves clarity for future maintainers and deployment logs.

## Priority 1 — Dependency and build hygiene

- **Remove suspicious, unused, or unnecessary dependencies.**
  - `next` is present, but `nextjs` is also listed as a dependency. `nextjs` is not the Next.js framework package and should almost certainly be removed.
  - `g` is listed as a dependency and appears suspicious/unexplained for a CV website.
  - `yarn` should usually not be listed as an application runtime dependency; use `packageManager` instead.
  - `react-router-dom` is unnecessary in a Next.js pages-router application unless it is intentionally used somewhere. Prefer `next/link` and Next routing.
  - `@netlify/functions`, `@sendgrid/mail`, `node-fetch`, `netlify-cli`, and `netlify-lambda` should be reviewed. Keep only the packages that are actually used by the implemented contact-form function.
  - Acceptance criteria:
    - Run dependency analysis.
    - Remove unused runtime dependencies.
    - Project installs cleanly from a lockfile.
    - Build still passes after cleanup.

- **Add a committed package-manager policy.**
  - The scripts use Yarn, and `yarn` is listed as a dependency.
  - Recommendation: add a `packageManager` field in `package.json`, for example `"packageManager": "yarn@1.22.19"`, and rely on Corepack or documented install commands.
  - Keep a single lockfile and document install/build commands in the README.

- **Split formatting, linting, type-checking, and build scripts.**
  - The current `lint` script runs Prettier with `--write` and ESLint with `--fix`. This mutates files during linting, which is not ideal for CI or review.
  - Recommendation:
    - `format`: runs Prettier write.
    - `format:check`: checks formatting without writing.
    - `lint`: runs ESLint without `--fix`.
    - `lint:fix`: runs ESLint with `--fix`.
    - `typecheck`: runs `tsc --noEmit` or the current build-mode equivalent.
    - `build`: runs type-check plus `next build`.
  - Acceptance criteria:
    - CI can run read-only checks.
    - Local developers can still run fix commands intentionally.

- **Avoid compiling before every dev start.**
  - `dev` currently runs `yarn compile && yarn next dev`.
  - Recommendation: use `next dev` for day-to-day development and reserve full TypeScript project-build checks for CI or `yarn typecheck`.
  - This makes local feedback faster and avoids creating friction for small content edits.

- **Introduce CI checks with GitHub Actions.**
  - Add a workflow for pull requests and pushes to `main`.
  - Recommended jobs:
    - install dependencies from lockfile
    - run `format:check`
    - run `lint`
    - run `typecheck`
    - run `build`
  - This is especially useful because the site is a personal-brand asset and should not break silently.

## Priority 2 — Next.js architecture and configuration

- **Modernise or remove custom webpack configuration.**
  - `next.config.js` customises webpack to unset TypeScript loader includes and comments that this relates to Next 12 internals.
  - The project uses Next 13, so this workaround should be revalidated.
  - Recommendation:
    - Remove the custom webpack override if not strictly necessary.
    - If it is necessary, document why and add a comment explaining the current Next.js version compatibility.
  - Acceptance criteria:
    - `next build` passes without the override, or the override is justified and covered in documentation.

- **Review Next.js version and upgrade path.**
  - The project uses Next 13.5.x. That is workable but not current.
  - Recommendation: plan a controlled upgrade to a current stable Next.js release after cleaning dependencies.
  - Keep the pages-router if the app is simple; there is no need to migrate to App Router unless there is a clear reason.
  - Acceptance criteria:
    - Dependencies are upgraded in a dedicated PR.
    - Build and runtime behaviour are verified after the upgrade.

- **Decide whether MDX support is real or accidental.**
  - `pageExtensions` includes `mdx`, but the content currently appears to be embedded directly in TypeScript/JSX.
  - Recommendation: either remove MDX support or implement it intentionally for articles, project case studies, and CV content.
  - If MDX becomes part of the architecture, add the proper MDX loader/configuration and document how content authors should use it.

- **Review image domain configuration.**
  - `next.config.js` allows `images.unsplash.com` and `source.unsplash.com`, but the quote/testimonial data uses external image URLs from many other domains.
  - Recommendation: either host images locally, use `unoptimized` intentionally where needed, or configure remote image patterns explicitly.
  - For reliability and privacy, prefer local assets for a personal CV site.

## Priority 3 — Content architecture

- **Separate content data from JSX-heavy implementation code.**
  - `src/data/data.tsx` mixes structured content, imported assets, imported icons, JSX fragments, personal copy, career history, skills, portfolio items, quotes, and contact data.
  - This works for a template but will become difficult to maintain as the site grows.
  - Recommendation:
    - Move plain content into JSON, YAML, Markdown, or MDX where possible.
    - Keep JSX rendering in components.
    - Keep TypeScript types in a dedicated content schema file.
  - Acceptance criteria:
    - CV roles, education, skills, languages, links, and project entries can be edited without touching React component code.

- **Introduce a typed content schema.**
  - There is already a `dataDef.ts` file, which is a good start.
  - Improve it by making the content model more expressive:
    - `dateStart` / `dateEnd` instead of free-text date strings where useful.
    - `companyDisplayName` versus `companyPrivateName` or anonymised employer handling.
    - `location`, `roleType`, `industry`, `skills`, `highlights`, and `outcomes` fields.
    - `isCurrent` boolean for the current role.
  - Add validation using TypeScript and optionally Zod if content will later move out of TS.

- **Replace placeholder/template URLs.**
  - Portfolio entries currently point to `https://timbaker.me`, which appears inherited from the original template.
  - Recommendation: remove placeholder URLs, replace with real project URLs, or make `url` optional in the `PortfolioItem` type.
  - Broken or irrelevant links are harmful on a CV site because they reduce trust quickly.

- **Review and strengthen personal-brand copy.**
  - The hero copy is honest and personal but undersells the professional value proposition.
  - Recommendation: use a stronger headline around project leadership, Swiss banking, portfolio construction, MBA background, AI/automation interest, and transformation delivery.
  - Also replace placeholder meta description text such as `React me up` with a search-friendly professional description.

- **Avoid hard-coded age.**
  - Age is hard-coded in the About section. It will become stale.
  - Recommendation: either remove age, replace it with years of experience, or calculate it from a birth year only if there is a strong reason to show it.
  - For a professional CV, years of relevant experience is usually more useful and less sensitive.

- **Fix spelling and polish issues in content.**
  - Examples observed:
    - `Univeristy` should be `University`.
    - `Photograpy` should be `Photography`.
    - `Ghandi` should be `Gandhi`.
    - `A swiss bank` should usually be `A Swiss bank`.
    - `Masters of Business and Administration` should likely be `Master of Business Administration` or `MBA`, depending on the official degree wording.
  - Add a proofreading pass before using the site as a professional calling card.

## Priority 4 — Component architecture and maintainability

- **Reassess heavy use of `memo`.**
  - Many components are wrapped in `memo`, including simple static sections.
  - Recommendation: remove `memo` unless profiling shows a measurable benefit or the component receives unstable expensive props.
  - Overusing `memo` can add noise and make code harder to read without meaningful performance gains for mostly static content.

- **Fix component display names.**
  - The Contact component sets `Contact.displayName = 'About'`.
  - Recommendation: correct it to `Contact.displayName = 'Contact'`.
  - This improves React DevTools readability and reduces confusion during debugging.

- **Prefer stable IDs and labels over raw display strings for navigation.**
  - Section IDs include values like `favorite quotes`. This creates anchors with spaces and exposes presentation copy as routing/navigation identifiers.
  - Recommendation:
    - Use stable slug IDs such as `quotes`, `about`, `resume`, `contact`.
    - Store display labels separately, such as `Favorite quotes`.
  - This makes anchors cleaner and less fragile.

- **Make portfolio optional rather than commented out.**
  - The homepage imports have a commented-out Portfolio section.
  - Recommendation: add a feature flag or data-driven section configuration instead of commenting code in and out.
  - Example: `enabledSections = ['about', 'resume', 'interests', 'quotes', 'contact']`.

- **Create reusable form-field components only after simplifying the form.**
  - The contact forms duplicate input state patterns and styling.
  - Recommendation: first choose one form implementation; then optionally extract `TextInput`, `Textarea`, and `SubmitButton` components if duplication remains.

## Priority 5 — Contact form reliability and security

- **Consolidate `ContactForm` and `FeedbackForm` into one production form.**
  - There are two form components with overlapping responsibilities.
  - One is commented out, while `FeedbackForm` is used by the Contact section.
  - Recommendation: choose one implementation and delete the unused one after extracting any useful behaviour.
  - Acceptance criteria:
    - There is one contact form path.
    - It has clear success, error, loading, and validation states.

- **Avoid logging personal form data to the browser console.**
  - The forms log submitted names, email addresses, and messages.
  - Recommendation: remove console logging of personal data before production deployment.
  - This is basic privacy hygiene and avoids accidental exposure on shared devices or debugging sessions.

- **Add explicit form status instead of `alert()`.**
  - The form uses `alert("Form Submitted Successfully")`.
  - Recommendation: replace with inline UI states:
    - idle
    - submitting
    - success
    - validation error
    - server error
  - This improves user experience and accessibility.

- **Fix URL encoding and form submission handling.**
  - `FeedbackForm` manually constructs a URL-encoded string using concatenation.
  - This can break for characters like `&`, `=`, accents, line breaks, and spaces.
  - Recommendation: use `URLSearchParams` with explicit key-value pairs or submit JSON to a serverless function.
  - Example approach:
    - `const body = new URLSearchParams({ 'form-name': 'feedback', name, email, message }).toString()`.

- **Confirm the Netlify function exists and is deployed.**
  - The form calls `/.netlify/functions/triggerEmail`, but code search did not surface a matching function file during review.
  - Recommendation:
    - Add the actual serverless function under the configured functions directory, or remove the call.
    - Ensure secrets such as SendGrid API keys are only stored in Netlify environment variables.
    - Return typed JSON responses with appropriate status codes.

- **Add spam protection.**
  - Public CV contact forms attract spam.
  - Recommendation: add at least one of:
    - Netlify honeypot field
    - rate limiting in serverless function
    - Turnstile/reCAPTCHA if needed
    - simple server-side validation and message length limits
  - Do not rely only on client-side validation.

- **Use one form backend strategy.**
  - Current code mixes Netlify Forms-style posting to `/__forms.html` and a custom Netlify function.
  - Recommendation: choose either:
    - Netlify Forms only, or
    - custom function only.
  - Mixing both makes failure modes harder to understand.

## Priority 6 — SEO, metadata, and personal-brand presentation

- **Improve homepage metadata.**
  - `homePageMeta.description` is currently not a production-quality description.
  - Recommendation: write a concise professional meta description, for example:
    - `Chris Napier is a Switzerland-based project and transformation professional with experience in banking, portfolio construction, technology delivery, and MBA-level business strategy.`

- **Complete Open Graph and Twitter metadata.**
  - The `HomepageMeta` interface supports OG/Twitter fields, but `Page` currently renders only a small subset.
  - Recommendation:
    - Add `og:type`, `og:image`, `og:site_name`, `twitter:card`, and image metadata.
    - Use a local branded preview image.
  - This improves how the site appears when shared on LinkedIn, WhatsApp, Teams, and other platforms.

- **Add structured data.**
  - For a CV/personal site, add JSON-LD for `Person` and optionally `WebSite`.
  - Include name, URL, sameAs links, job title, location, alumniOf, and knowsAbout where appropriate.
  - Be careful not to overstate sensitive employer details.

- **Create clean section anchors and page titles.**
  - Anchor labels should be predictable and user-friendly.
  - Consider separate pages for `/cv`, `/projects`, and `/contact` once the site grows beyond a single page.

## Priority 7 — Accessibility

- **Add `rel="noopener noreferrer"` to external links opened with `target="_blank"`.**
  - Contact links open in a new tab but do not set `rel`.
  - Recommendation: add `rel="noopener noreferrer"` to all external links with `target="_blank"`.

- **Review mobile navigation accessibility.**
  - The mobile menu uses Headless UI Dialog, which is a good foundation.
  - Recommendation:
    - Ensure the button label accurately describes current action: open vs close menu.
    - Check keyboard focus order.
    - Verify escape-to-close and focus restoration.

- **Make form validation accessible.**
  - Required fields exist, but there are no inline error messages.
  - Recommendation:
    - Add labels or accessible names.
    - Add `aria-describedby` for field help/error text.
    - Render success/error status in an `aria-live` region.

- **Audit contrast and focus states.**
  - Tailwind classes include focus rings, which is good.
  - Recommendation: run Lighthouse and axe checks, especially over dark sections, orange focus states, and mobile navigation.

## Priority 8 — Performance and asset handling

- **Use `next/image` consistently for local images.**
  - The data model uses imported image assets, but review the rendering components to ensure images are rendered through `next/image` where appropriate.
  - This improves image sizing, lazy loading, and performance.

- **Reduce unused image imports.**
  - `data.tsx` imports many portfolio images even though the Portfolio section is currently commented out on the homepage.
  - Recommendation: either enable the Portfolio section, lazy-load it, or stop importing unused images into the main data module.
  - This may reduce bundle complexity and improve maintainability.

- **Host quote/testimonial images locally or remove them.**
  - External hotlinked images are brittle and may break, slow the page, or create mixed privacy/performance issues.
  - Recommendation: use local assets, remove images from quotes, or replace the quotes section with a more professional testimonials/recommendations section.

## Priority 9 — Repository documentation

- **Rewrite the README for this actual project.**
  - The README still looks like the upstream template README.
  - Recommendation: include:
    - project purpose
    - live URL
    - tech stack
    - local setup
    - build/deploy commands
    - content editing guide
    - environment variables for contact form
    - deployment notes for Netlify

- **Add an architecture note.**
  - Add `ARCHITECTURE.md` or a README section explaining:
    - where content lives
    - how sections are rendered
    - how the contact form works
    - how assets are handled
    - how deployment works

- **Document environment variables.**
  - Add `.env.example` with placeholder values only.
  - For SendGrid/Netlify functions, document required variables without committing secrets.

## Priority 10 — Testing and validation

- **Add basic automated tests only where they add value.**
  - For a static CV site, full unit-test coverage may be unnecessary.
  - Recommended minimum:
    - TypeScript check
    - ESLint
    - formatting check
    - build check
    - optional Playwright smoke test for homepage load, navigation anchors, CV link, and contact form render.

- **Add a link checker.**
  - The site contains external links and downloadable CV assets.
  - Recommendation: add a link-checking step or periodic manual check.
  - Broken links are particularly damaging on a professional CV site.

- **Add content sanity checks.**
  - Consider a small script or test that ensures:
    - all section IDs are unique
    - all portfolio links are valid or omitted
    - all image assets resolve
    - all timeline entries have title/date/content
    - meta title and description are non-placeholder values

## Suggested implementation order

1. Rewrite README and clarify whether this is the active live-site repo.
2. Fix obvious content polish issues and placeholder links.
3. Clean dependencies and scripts.
4. Consolidate the contact form and remove console logging of personal data.
5. Improve metadata, Open Graph, and structured data.
6. Remove or document custom Next webpack config.
7. Split content from JSX-heavy `data.tsx` into cleaner structured content.
8. Add CI checks.
9. Add accessibility and link validation.
10. Plan a controlled Next.js/dependency upgrade.

## Definition of done for the first cleanup milestone

- README reflects the actual project rather than the upstream template.
- `package.json` has accurate project metadata and no obvious unused/suspicious dependencies.
- `lint`, `format:check`, `typecheck`, and `build` can run independently.
- Contact form has one implementation and no console logging of personal data.
- Homepage metadata is production-quality.
- Placeholder/template URLs are removed or replaced.
- GitHub Actions verifies formatting, linting, type-checking, and build on every push or pull request.
