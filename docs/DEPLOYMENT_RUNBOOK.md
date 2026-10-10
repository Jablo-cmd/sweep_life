# Deployment and release runbook

**Current state:** No deployment is configured. This document is a checklist, not permission to publish.

## Preview configuration

The static build is designed to be safe by default:

- Leave `PUBLIC_INDEXING_ENABLED` unset or set it to `false`.
- Leave `PUBLIC_SITE_URL` unset until the canonical production origin is confirmed.
- In this mode every page emits `noindex, nofollow`, `robots.txt` disallows crawling, canonical tags are omitted and the sitemap contains no URLs.
- Never place secrets in `PUBLIC_*` variables; Astro exposes these values to browser-side code.

## Production indexing configuration

Only after written school approval and domain ownership verification:

1. Set `PUBLIC_SITE_URL` to the canonical HTTPS origin only, for example `https://www.example.org` (no path and no trailing slash).
2. Set `PUBLIC_INDEXING_ENABLED=true`.
3. Run `npm run check`, `npm run build`, `npm run test:routes` and `npm run test:quality` with the same environment values that will be used for the production build.
4. Inspect `dist/robots.txt`, `dist/sitemap.xml`, canonical tags and the noindex state of the parent portal, privacy and terms pages.
5. Verify the sitemap URLs resolve to the intended production origin and exclude private/draft routes.

The quality check intentionally fails if production indexing is enabled without the site URL.

## Release gates

- Written approval from an authorised SWEEP representative.
- Current approved content, fee schedules, uniform documents, dates, curriculum and contact details.
- Written permission and consent status for every identifiable learner image.
- Official logo and brand assets supplied by the school.
- Domain registrar, DNS, current Wix/site ownership and rollback access verified.
- Hosting choice documented against operational cost, maintenance, CMS, form delivery, backups and support requirements.
- Reproducible dependency lockfile committed and CI changed to `npm ci`.
- Browser-based mobile/desktop, keyboard, accessibility, performance and form-flow tests passed.
- Approved privacy notice and terms, with school-specific POPIA responsibilities reviewed.
- Admissions backend, if required, designed with validation, spam prevention, notifications, retention and privacy controls.
- Parent portal requirements and threat model approved separately; no production learner data until authorization and access-isolation tests pass.
- Backup and rollback procedure tested; production deployment scheduled and authorised.

## Rollback

Before any eventual release, record the current hosting configuration and live build, export/backup site content and configuration, confirm who can restore the previous site, and rehearse the rollback. Do not change DNS until the replacement is verified and a rollback owner is available.
