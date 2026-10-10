# SWEEP Schools rebuild — technical audit and release gates

**Status:** Initial discovery record; not a production audit and not school-approved.

## Repository baseline
- Repository: `Jablo-cmd/sweep_life`
- Initial repository state: empty
- First implementation branch: `feat/website-foundation`
- Framework: Astro static output (provisional; reassess after hosting review)
- Deployment: no deployment configured
- Production changes: none
- Domain/DNS access: not arranged
- School authorisation: not established

## Source website reviewed
- Public site: https://www.sweepschools.co.za/
- Public preschool page: https://www.sweepschools.co.za/pre-school
- Public primary-school page: https://www.sweepschools.co.za/primary-school
- Public gallery: https://www.sweepschools.co.za/gallery-schools

The public site identifies SWEEP Kidz Pre-School and SWEEP Academy Primary School. Published content includes Christian values, whole-child development, facilities, curriculum, extracurricular activities, operating times, contact information and a gallery. These are source references, not confirmation that content remains current or that reuse is authorised.

## Implemented in this scaffold
- Shared responsive layout, header and footer
- Home, preschool, primary school, admissions, fees/resources, gallery, about, contact, parent portal, privacy and terms routes
- Page descriptions, semantic headings, skip link, visible focus styles and reduced-motion handling
- Responsive layout and image lazy-loading below the fold
- Explicit preview language for the portal and privacy/terms drafts
- GitHub Actions workflow for Astro checks, static build and expected route output checks

## Known gaps / not yet implemented
- A committed npm lockfile now pins the resolved dependency tree; CI uses `npm ci` for reproducible installation.
- Automated generated-output checks now cover expected routes, unique titles, descriptions, one H1 per page, image alt text, and safe noindex defaults. These are useful static checks, not a substitute for browser, assistive-technology, or user-flow testing.
- No browser-based visual regression or full accessibility/user-flow suite yet.
- No automated Lighthouse/Core Web Vitals budget yet.
- Images reference Wix-hosted source URLs; 13 gallery image URLs are registered, but they have not been visually verified, downloaded, optimised, or permission-cleared. Current alt text and captions are provisional.
- No approved school logo or brand assets; the wordmark is a typographic placeholder.
- No content-management system.
- Admissions page has a browser-validated email builder that opens the visitor's mail application. There is no server-side submission, delivery confirmation, spam protection or central enquiry record.
- No current fee PDFs or fee amounts published.
- No portal authentication, user management, data source, API or learner data.
- Sitemap, canonical URLs, robots policy and EducationalOrganization JSON-LD are generated only when both the validated HTTPS origin and explicit production-indexing flag are configured. Preview builds omit canonical/schema URLs and remain noindex/disallowed. Analytics, Search Console verification and production domain configuration are not yet set up.
- No approved privacy policy, terms, school legal entity, information officer, cookie policy or retention schedule.
- No current staff list, principal message, team photos, confirmed admissions requirements or approved learner-photo consent register.
- No deployment target or rollback/backup plan.
- No confirmation of current operating times, curriculum details, extracurricular provider availability or contact details.

## Mandatory school questions before content sign-off
1. Who is the authorised project owner and approver?
2. Who owns the domain, registrar account, DNS and existing hosting?
3. May existing site copy and each image be reused, and are learner-photo permissions current?
4. What are the approved current fees, uniform prices, terms, dates, operating times and admissions requirements?
5. Which curriculum and extracurricular details should be published for each phase?
6. Who should receive admissions enquiries, and what retention and response process applies?
7. Which exact portal features are required, what data system is the source of truth, and who will administer identities and permissions?
8. What privacy policy, legal entity details, information officer contact and retention rules must be published?
9. Who will update content and how often?
10. What hosting, uptime, recovery, support and budget constraints apply?

## Release gates
- [ ] Hosting and domain/DNS ownership verified
- [ ] Framework and deployment target confirmed
- [ ] Current approved copy signed off
- [ ] Images and learner consent verified
- [ ] Current fees/documents checked and approved
- [ ] All links and routes tested
- [ ] Accessibility audit completed
- [ ] Performance budget and Lighthouse review completed
- [ ] SEO metadata, sitemap, canonical host and structured data verified
- [ ] Admissions workflow and spam controls tested end-to-end
- [ ] Portal threat model, role matrix and cross-family access tests approved
- [ ] Privacy/legal text reviewed by authorised school representative
- [ ] Backup and rollback plan documented
- [ ] Written school approval and production change authorisation obtained

## Hosting decision criteria
Compare the current Wix arrangement, if it can be retained, with static hosting options only after confirming domain ownership, CMS needs, form processing, portal backend requirements, operational ownership, cost, backup/recovery and security responsibilities. Do not change production DNS or the current site during this evaluation.