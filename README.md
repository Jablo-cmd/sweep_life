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

## Initial delivery boundary

The first implementation phase is a local/preview-only public website foundation and an auditable project plan. Admissions submissions, content management, hosting, and parent-portal integration must not be connected to live systems until their requirements, data handling, and authorisation are confirmed.

## Planned capabilities

- Public pages for Home, SWEEP Kidz, SWEEP Academy, Admissions, Fees & Resources, Gallery, About, Contact, Privacy, and Terms.
- Search-engine-friendly page structure and metadata.
- Accessible, responsive layouts and optimised images.
- Admissions enquiry flow designed for a later server-side integration.
- Secure parent portal as a separate release gate, with synthetic data only until authorised.

## Safe workflow

1. Work on feature branches; do not develop directly on `main`.
2. Run formatting/lint, type-check, tests, and production build before review.
3. Use preview deployments only during development.
4. Review content accuracy, image permissions, accessibility, performance, SEO, forms, and security before any production deployment.
5. Deploy only after documented authorisation, hosting/DNS verification, backup and rollback planning, and final school review.

## Status

Repository bootstrap. Hosting and framework are provisional pending technical audit. The source website is https://www.sweepschools.co.za/.