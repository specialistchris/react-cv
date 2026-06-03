# Website Overview

## Project

`react-cv`

## Website

`https://www.christophernapier.com`

## Purpose

This repository contains Chris Napier's personal website and interactive CV. The site is intended to present Chris's professional profile, experience, skills, interests, contact details, and personal brand in a clear and modern format.

The current site is based on a React/Next.js resume template and has been adapted into a personal website for Chris Napier.

## Current technology stack

The project is a Next.js and React application using TypeScript and Tailwind CSS.

Key technologies visible in the project include:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Headless UI
- Heroicons
- Netlify Functions
- Netlify Next.js plugin
- Yarn-based build workflow

The main build command in `package.json` is:

```bash
yarn compile && yarn next build
```

## Deployment model

The site is deployed through Netlify.

The expected flow is:

```text
GitHub repository → Netlify build → Published website
```

The Netlify configuration currently defines a functions directory:

```toml
[build]
  functions = './functions/'
```

The production website has been confirmed to update after commits are pushed to the `main` branch and Netlify publishes the new deployment.

## Application structure

The homepage is defined in:

```text
src/pages/index.tsx
```

The homepage currently renders these major sections:

1. Header
2. Hero
3. About
4. Resume
5. Interests
6. Quotes / Testimonials
7. Contact
8. Footer

The Portfolio section exists in the project but is currently commented out on the homepage.

## Content model

Most of the site's editable content is defined in:

```text
src/data/data.tsx
```

This file contains key content and configuration for:

- Page metadata
- Section IDs
- Hero section text and actions
- About section
- Skills
- Languages
- Portfolio items
- Education timeline
- Experience timeline
- Testimonials / quotes
- Contact details
- Social links

This makes the site relatively easy to update without changing the lower-level React components.

## Current homepage content

The site currently introduces Chris Napier as a Switzerland-based project manager working in banking and portfolio construction. It highlights family, self-improvement, project management, technical/business bridging capability, education, employment, languages, interests, quotes, and contact details.

The current call-to-action buttons are:

- Resume
- Contact

The current contact email is:

```text
contact@christophernapier.com
```

The current location shown is:

```text
Basel, Switzerland
```

## Navigation

The header navigation is generated from section IDs rather than hard-coded page routes. The current navigation includes:

- About
- Resume
- Interests
- Favorite quotes
- Contact

The site includes both desktop and mobile navigation. The mobile navigation uses a Headless UI dialog and a hamburger-style menu button.

## Social links

Social links are rendered through:

```text
src/components/Socials.tsx
```

The social links are defined in `src/data/data.tsx`.

Current social links include:

- LinkedIn
- Stack Overflow link, currently labelled as `NZ Overflow`

The Stack Overflow/NZ Overflow social item has recently been adjusted so that links to `stackoverflow.com` display a smiley face emoji instead of the previous icon.

## Strengths of the current project

- The project is already deployed and working on Netlify.
- It uses a modern React/Next.js stack.
- The site content is largely centralised in `src/data/data.tsx`.
- The homepage has a clear section-based structure.
- There is already responsive navigation.
- The site has a resume download action and contact route.
- The project can be developed through GitHub and deployed automatically through Netlify.

## Areas to improve

### 1. Update positioning and copy

Some copy still feels like placeholder/template-era content. The site should be revised to better support Chris's professional positioning as a Switzerland-based project and transformation professional with banking, portfolio construction, business analysis, and technology-enabled change experience.

Suggested improvements:

- Replace the homepage description with a stronger professional positioning statement.
- Make the value proposition clear within the first screen.
- Update the page meta description from the placeholder-style text.
- Make the CV/resume and contact calls to action more explicit.

### 2. Improve data quality

Several content items should be reviewed for spelling, consistency, and professionalism.

Examples to review:

- `St Gallen Univeristy` should likely be `University of St. Gallen`.
- `Photograpy` should likely be `Photography`.
- `Ghandi` should likely be `Gandhi`.
- Employer references such as `A swiss bank` should use consistent capitalisation.
- Some testimonial image URLs rely on third-party external sites and may be fragile.

### 3. Clarify sections

The site currently uses `favorite quotes` as a section ID. This works visually but may not be ideal as a technical section key. Consider separating the internal section ID from the user-facing display label.

Potential future section model:

```text
id: testimonials
label: Favorite quotes
```

### 4. Re-enable or redesign portfolio

A Portfolio section exists in the codebase but is currently commented out on the homepage. This could become a useful Projects section showing professional, personal, and technical projects.

Suggested approach:

- Rename Portfolio to Projects if more appropriate.
- Replace placeholder project links.
- Use project descriptions that show skills, outcomes, and learning.
- Add project categories such as Professional, Personal, Technology, AI, and Business Ideas.

### 5. Improve SEO and metadata

The project has a homepage metadata object, but it should be expanded and made more polished.

Suggested metadata:

```text
Title: Chris Napier | Project Manager & Transformation Professional
Description: Switzerland-based project and transformation professional with experience in banking, portfolio construction, business analysis, and technology-enabled change.
```

### 6. Improve deployment documentation

The repository should document:

- Netlify project name
- Production branch
- Build command
- Publish behaviour for Next.js
- Environment variables, if any
- How to test locally
- How to trigger a manual deploy

### 7. Review build and dependency setup

The project uses Yarn and Next.js. Dependencies include both `next` and `nextjs`, which should be reviewed because `nextjs` may be unnecessary. There are also Netlify-related dependencies and functions support that should be documented or cleaned up if not used.

## Suggested future direction

The website should evolve from a resume template into a polished professional brand site.

Recommended future roadmap:

1. Clean up copy, spelling, and metadata.
2. Strengthen homepage positioning.
3. Improve the About and Resume sections.
4. Convert Portfolio into a Projects section.
5. Add downloadable CV variants if useful.
6. Add clearer professional proof points and outcomes.
7. Add analytics and SEO improvements.
8. Consider an AI-powered `Ask Chris` feature later.

## Development notes for AI-assisted work

When asking ChatGPT or another AI coding assistant to modify this project, useful files to inspect first are:

```text
package.json
src/pages/index.tsx
src/data/data.tsx
src/data/dataDef.ts
src/components/Sections/Header.tsx
src/components/Socials.tsx
netlify.toml
next.config.js
```

Most content edits should begin in:

```text
src/data/data.tsx
```

Most section layout or rendering changes should begin in:

```text
src/components/Sections/
```

## Success criteria

The website should be considered successful if it:

- Clearly communicates Chris's professional identity.
- Presents a credible and modern personal brand.
- Makes experience, education, skills, and interests easy to understand.
- Provides a simple route to contact Chris.
- Can be updated without major technical friction.
- Supports future expansion into projects, insights, and AI-enabled features.
