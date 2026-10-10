# SWEEP Schools website rebuild

A complete, preview-first rebuild of the SWEEP Schools public website, with a separately gated parent portal.

## Project principles

- Preserve SWEEP's existing message, Christian identity, educational philosophy, and distinctive wording.
- Modernise grammar, layout, accessibility, performance, and search presentation without inventing claims.
- Use imagery from the existing SWEEP Schools website only after checking source quality, permission, and learner-photo consent.
- Treat fees, term dates, contact details, curriculum information, admissions rules, and staff information as unverified until confirmed by authorised school representatives.
- Keep the current live website, domain, DNS, and production systems untouched during development.
- Never use real learner data in development or test environments.
- Do not represent this work as school-approved until the appropriate authorisation is obtained.

## Current delivery boundary

The feature branch contains a reviewable Astro static-site implementation. It includes a client-side admissions email builder that opens the visitor's email application; it does not submit to a server or store information. The parent portal remains an informational placeholder. No live systems are connected.

## Planned capabilities

- Public pages for Home, SWEEP Kidz, SWEEP Academy, Admissions, Fees & Resources, Gallery, About, Contact, Privacy, and Terms.
- Search-engine-friendly page structure and metadata.
- Accessible, responsive layouts and optimised images.
- Client-side admissions email builder with browser validation and clear disclosure that the visitor must send the email.
- Environment-gated `robots.txt`, sitemap and canonical metadata; preview builds remain noindex by default.
- Automated generated-output checks for routes, page titles, descriptions, headings, image alt attributes and indexing safeguards.
- Secure parent portal as a separate release gate, with synthetic data only until authorised.

## Safe workflow

1. Work on feature branches; do not develop directly on `main`.
2. Run formatting/lint, type-check, tests, and production build before review.
3. Use preview deployments only during development.
4. Review content accuracy, image permissions, accessibility, performance, SEO, forms, and security before any production deployment.
5. Deploy only after documented authorisation, hosting/DNS verification, backup and rollback planning, and final school review.

## Local development

Requirements: Node.js 22 or compatible LTS and npm.

```sh
npm install
npm run check
npm run build
npm run test:routes
npm run test:quality
npm run dev
```

For a production-indexable build, configure both `PUBLIC_SITE_URL` (the confirmed canonical HTTPS origin, without a trailing slash) and `PUBLIC_INDEXING_ENABLED=true`. Do not enable indexing until the school has confirmed domain ownership, approved content and authorised launch. With either setting absent, canonical URLs are omitted, the sitemap contains no public URLs, `robots.txt` disallows crawling, and pages carry `noindex, nofollow`.

## Status

Reviewable preview under active development; not production-ready or school-approved. The framework and hosting target remain provisional pending the deployment audit. Source website: https://www.sweepschools.co.za/.