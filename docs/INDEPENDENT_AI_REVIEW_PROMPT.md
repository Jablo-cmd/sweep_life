# Independent AI review prompt — SWEEP Schools website

Use this prompt in a separate AI coding/review session after checking out the current feature branch. Review the actual repository files; do not rely on this document's claims as evidence.

## Mission

Act as an independent principal engineer, frontend performance specialist, accessibility auditor, SEO engineer, application-security reviewer and content QA editor. Audit the SWEEP Schools website rebuild rigorously. Identify every material missing component, defect, misleading claim, broken route, accessibility issue, performance weakness, SEO omission, security risk, and mismatch with the source site's content. Do not praise the project without evidence.

Repository: https://github.com/Jablo-cmd/sweep_life  
Branch: `feat/website-foundation`  
Source content reference: https://www.sweepschools.co.za/

## Non-negotiable boundaries

- Do not edit production, change DNS, deploy, merge to `main`, or claim school approval.
- Do not introduce credentials, real learner records, real parent identities or personal data.
- Do not fabricate school facts, fees, staff names, facilities, results, testimonials, policies or image permissions.
- Preserve the source school's meaning, Christian identity, educational philosophy and distinctive expressions while correcting grammar and improving presentation.
- Treat the current implementation as an early scaffold, not a finished website.
- If changes are recommended, provide exact file paths, evidence, severity, and a safe implementation sequence. Do not silently make broad changes.

## Required review passes

### 1. Repository and build integrity
- Inspect every file and the complete git diff from `main`.
- Run dependency installation, `npm run check`, and `npm run build`.
- Verify whether dependency versions are pinned reproducibly and whether a lockfile is needed.
- Verify the workflow actually triggers, installs dependencies and checks all expected pages.
- Confirm all expected routes are emitted, internal links resolve, assets exist and paths work with trailing slashes.
- Check for malformed JSX/Astro, invalid HTML nesting, broken attributes, console errors and hydration/runtime errors.
- Report every command run and its real result; never claim tests passed if they were not run.

### 2. Visual quality and responsive design
- Review desktop, tablet and mobile widths, including 320px, 375px, 768px, 1024px and wide desktop.
- Check navigation, text measure, image crops, overlapping elements, whitespace, hierarchy, contrast and consistent spacing.
- Check reduced-motion settings, keyboard focus, touch target sizes, zoom/reflow and sticky/fixed elements.
- Confirm that the school looks premium and contemporary without losing warmth or the Christian school identity.
- Flag typographic logo or other brand approximations that need official assets.

### 3. Source content and editorial fidelity
- Compare each new page with the matching source page.
- Make a content matrix: source message/fact, new location, rewritten wording, verification needed, omission or discrepancy.
- Preserve mission, vision, Bible references, curriculum, ages, facilities, extra-mural activities, operating times, and school phase distinctions accurately.
- Identify all source content omitted from the rebuild, including team/principal information, facilities, term dates, uniform documents, contact information and gallery coverage.
- Check for changes that inadvertently strengthen, weaken or alter the school's message.
- Flag stale or conflicting public information rather than resolving it by guessing.

### 4. Images, rights and performance
- Verify every source image URL actually loads; identify subject, source page and image quality.
- Do not assume that public visibility grants reuse rights. Mark permission and learner-photo consent as unresolved until evidence is supplied.
- Recommend downloading/hosting approved assets locally, responsive variants, modern formats, intrinsic dimensions, useful alt text, lazy loading and a prioritised hero image.
- Identify duplicated, tiny, incorrectly cropped, unrelated or inaccessible images.
- Check font loading and external network dependencies.

### 5. SEO and discoverability
- Check unique titles and descriptions, canonical URL strategy, robots rules, sitemap, Open Graph metadata, favicons, headings, internal links and structured data.
- Check whether the portal, legal drafts or preview site could be indexed accidentally.
- Verify local entity consistency (school names, address, phone, email) and do not mark up unverified facts.
- Define a measured SEO checklist rather than promising rankings.

### 6. Accessibility
- Evaluate against WCAG 2.2 AA where feasible.
- Check landmarks, heading order, accessible names, mobile menu operation, keyboard access, focus visibility, contrast, alt text, reduced motion, language attributes and link purpose.
- Use an automated checker plus manual keyboard/screen-reader checks where tools are available.
- Provide reproducible steps for each issue.

### 7. Admissions, fees and forms
- Confirm no enquiry button implies an actual form submission if only email is opened.
- Specify server-side form validation, rate limits/spam controls, abuse monitoring, success/error states, notification ownership, retention and privacy notice before implementing a backend.
- Do not publish old fees or uniform price lists as current without school confirmation.
- Ensure forms do not request sensitive learner information over insecure channels.

### 8. Parent portal security
- Verify there is no fake login and no credential collection in the current preview.
- Treat portal functionality as a separate application/security workstream.
- Propose a role and permission matrix, identity lifecycle, secure recovery, MFA if appropriate, server-side authorization, record-level isolation, audit trails, session controls, secure file delivery, data minimisation, retention, backup and incident response.
- Require synthetic-data tests proving a parent cannot access another family’s records, including via altered IDs, URLs and API calls.
- No real learner data or production integrations until the school authorises them.

### 9. Privacy, legal and operational readiness
- Treat draft privacy/terms pages as placeholders, not legal advice or approved policy.
- List the exact school-specific facts and legal review needed for POPIA-aligned publication.
- Check security headers, dependency risks, secret handling, logging, backups, monitoring, incident response and rollback.
- Hosting and DNS remain undecided and untouched.

## Required output

Return:
1. Executive verdict: prototype / reviewable preview / release candidate / production-ready, with reasons.
2. A severity-ranked issue table: blocker, high, medium, low; file/line; evidence; consequence; recommended fix.
3. Build/test commands and actual results.
4. Page-by-page content-fidelity matrix.
5. Route and link inventory, with broken links called out.
6. Image inventory and permission/quality status.
7. Accessibility, SEO, performance and security findings.
8. Missing components and assumptions that need school decisions.
9. A prioritised remediation plan with acceptance criteria and test evidence.
10. A final explicit list of things that must remain blocked pending school authorisation.

Be direct and evidence-based. Do not call the site production-ready merely because it builds.