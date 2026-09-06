# Implementation prompt — GlobalCluster public website redesign

Act as a senior product designer and Next.js engineer. Redesign the public website at https://globalcluster.net/ from end to end and implement the complete result in the current repository. Produce a professional, distinctive, responsive B2B website in French, with equally polished light and dark themes. Work through implementation and verification, not just a design proposal.

Use the requirements and working defaults below to resolve ordinary choices autonomously. If repository instructions or newly inspected source content change a factual assumption, explain the discrepancy and adjust. Ask only for information that genuinely blocks delivery; continue independent work. Do not invent facts to resolve missing business information.

## Required design skill: Impeccable

Use `$impeccable` throughout this redesign. Read `C:/Users/ASUS/.agents/skills/impeccable/SKILL.md` (or resolve the installed skill location when working elsewhere) and follow its applicable setup and references. Use the existing source audit and this brief to populate missing product/design context rather than asking the user to repeat established facts.

Apply Impeccable to establish the brand direction, typography, color tokens, page hierarchy and responsive composition; then use its critique, accessibility audit and polish workflows to review and correct the implemented result. Read the relevant workflow references before applying them. Keep `PRODUCT.md` and `DESIGN.md` useful and concise. Preserve the user's explicit component references, brand identity and functional requirements when generic skill guidance differs. Impeccable should unify the selected libraries into one visual language and prevent generic demo layouts, decorative overload and inaccessible motion. Record concrete corrections and checks actually performed, not a claim of quality based solely on using the skill.

## 1. Objective and scope

Help visitors understand GlobalCluster's management solutions, find the right offer and contact the company. Help existing users reach their operational platform quickly.

The audience includes entrepreneurs, ETIs, business managers and accounting professionals; Gestion PR addresses workshops and factories. The French language and Algerian business context are supported by the existing site. Keep the experience readable and useful to a busy professional, including on mobile.

This redesign covers the public website. Payroll and financial-statement applications remain external services: do not rebuild their business interfaces, authentication, subscriptions or data. Preserve their published destinations. Do not deploy to production or buy component access as part of this task.

## 2. Inspect the sources before coding

Read repository instructions and inspect existing files before choosing the project structure. Preserve unrelated changes and useful existing conventions. Inspect these pages and their linked navigation, resources and relevant visual assets:

| Existing source | Target route | Purpose |
| --- | --- | --- |
| https://globalcluster.net/ | `/` | Homepage and solution discovery |
| https://globalcluster.net/?page_id=244 | `/solutions/paie-rh` | Paie et RH presentation |
| https://globalcluster.net/?page_id=450 | `/solutions/etats-financiers` | Financial statements presentation |
| Gestion PR item currently links to home | `/solutions/gestion-pr` | Concise spare parts management presentation |
| https://globalcluster.net/?page_id=344 | `/plateformes` | Access to existing applications |
| https://globalcluster.net/?page_id=416 | `/documents` | Documents and presentations |
| https://globalcluster.net/?page_id=489 | `/guides` | Instructional videos |
| Published contact details; old Contact link goes to IB Software | `/contact` | Direct contact information |

These are the minimum routes, not proof of an exhaustive legacy URL inventory. Discover additional public pages through available navigation or sitemap and record their disposition. Never redirect the entire homepage to Gestion PR just because its old menu item pointed there.

Create a concise source inventory mapping legacy URLs, headings, important copy, assets, resources and destinations to the new routes. Distinguish observed facts, your editorial additions and unknowns. A previous source audit is useful context, but recheck facts that may have changed.

## 3. Truthful content and positioning

Preserve the original homepage headline exactly:

“Solutions de gestion pour entrepreneurs et ETI”

Preserve the original supporting statement's wording, with sentence-case normalization:

“Nous investissons nos ressources dans la qualité de nos produits et nous veillons à leur accessibilité pour tous.”

Keep “Accéder aux plateformes” as a visible hero action. Use “Découvrir les solutions” as the primary discovery action. A separate “Nous contacter” action may appear in the header and lower on the page. Do not imply that contacting the company guarantees a scheduled demo or a specific response time.

Use the following documented content foundations:

- **Paie et RH:** payroll and HR management for companies and accounting professionals. Preserve its four groups: Paramétrage & flexibilité; Opérations & traitements; Conformité & reporting; Application mobile & RH. Relevant source capabilities include multi-dossier/multi-establishment use, user rights, configurable payroll elements, payroll calculation and validation, Excel variable entry, payslip history and email distribution, leave and advances, reporting, accounting interfaces and employee mobile access. Preserve the complete source feature coverage through readable summaries and optional expanded details.
- **États financiers:** preparation, publication and archiving of statements; multi-dossier configuration; financial statements and tax packages; balances and journals; Excel/TXT imports; Excel/PDF exports; prior-year history and personalized reporting. Do not import capabilities from the payroll product simply because the layouts share components.
- **Gestion PR:** spare parts management for workshops and factories. Keep its page concise while evidence is limited, explaining the documented purpose and offering contact. Do not invent stock forecasting, procurement, machine maintenance or a login URL.

Correct spelling and improve hierarchy. Add short benefit explanations only where they follow from documented capabilities. Keep source terminology for declared reports, but do not turn it into a guarantee of current legal compliance. Never invent client logos, testimonials, user counts, prices, savings, certifications, AI features, live collaboration, support availability or trial terms. Old resource filenames do not establish a current free-trial offer.

## 4. Required visual references and component defaults

Use these libraries as a coherent component vocabulary, adapting them to GlobalCluster rather than preserving demo brands, copy or colors.

| Section | Reference | Working default |
| --- | --- | --- |
| Homepage hero | https://tailark.com/blocks/quartz/hero-section | `@tailark/hero-section-1` |
| Hero decorative cursors | https://www.kibo-ui.com/components/cursor | Cursor with short capability labels |
| Optional chat-like illustration / internal hero inspiration | https://tailark.com/blocks/quartz/secondary-hero | `@tailark/secondary-hero-1`, adapted appropriately |
| Main features | https://tailark.com/blocks/quartz/features | `@tailark/features-1` |
| Optional capability bento | https://tailark.com/blocks/quartz/bento | `@tailark/bento-1` |
| Shared footer | https://smoothui.dev/docs/blocks/footer | SmoothUI `footer-1` |

These variant choices are explicit defaults because the original request did not identify a unique example. If a precise screenshot or variant is supplied later, use it instead. The repeated footer URL in the original request does not define internal page headers: use one shared shell and a compact, product-specific introduction on inner pages.

Inspect official installation instructions and compatibility before importing. Quartz was labelled Pro during the source review: check whether licensed source is available. If unavailable, implement an original composition inspired by the visible reference and record the substitution; do not claim exact use of inaccessible source. Do not purchase access or bypass restrictions.

Choose remaining navigation, CTA, accordion, resource and theme controls from Tailark, SmoothUI or Kibo UI where useful. Normalize typography, spacing, radii, icon style, buttons and motion across all components. Avoid duplicate primitive systems and multiple animation packages when one suffices. Never keep demo invoice totals, dollar amounts, fake chat users or AI badges.

## 5. Art direction, assets and themes

Create a confident business identity with generous but purposeful whitespace, strong readable typography, clear grouping and real product evidence. Preserve the GlobalCluster logo and its recognizable orange/coral character. Prefer well-framed product screenshots over generic decorative dashboards or unrelated stock imagery.

The supplied color reference, https://globalcluster.net/?page_id=244, is a product page, not a formal brand manual. Its section headings were observed at `#CF2E2E`; the logo and product visuals also contain orange/coral. Use these as evidence to derive a coherent palette; document exact proposed tokens without presenting them as official brand values.

Define shared semantic tokens for background, surface, elevated surface, foreground, muted text, border, primary, primary foreground, accent, focus and destructive states. Derive both themes deliberately:

- Light: neutral off-white/white surfaces, dark readable text, controlled orange/coral accents.
- Dark: charcoal surfaces with distinguishable depth, light readable text and adjusted accents.
- Do not invert screenshots or logos. Use an appropriate logo treatment or a neutral backing where needed.
- Provide system/light/dark selection. Respect the system initially, persist explicit choice, avoid incorrect-theme flashes and hydration mismatches.
- Verify every important text, control, border and focus pairing in both themes. Orange is not automatically suitable behind white button text.

Use a restrained type system with fluid headings, comfortable body size and readable line lengths. Adapt the long French headline at mobile widths. Maintain visual rhythm with a mix of product imagery, concise text and selective feature panels; do not turn every section into identical cards.

Inventory and reuse relevant existing assets. Keep original files when making derivatives. Improve crop, scale, compression and presentation without falsifying the product interface. Inspect screenshots for personal or payroll information and anonymize it. Replace broken or unusably small visuals honestly; label a recreated product illustration as illustrative. Verify HTTPS asset availability and avoid mixed content. No image retouching is needed merely to satisfy a checklist.

## 6. Page composition

**Shared shell:** logo, Solutions navigation, Documents/Guides access, contact, a clearly visible platform-access link, theme selector and accessible mobile menu. Use one global header even if the imported hero demo contains its own navigation. Provide meaningful active states and inner-page breadcrumbs where useful.

**Homepage, in this order:**

1. Quartz-inspired hero with the preserved original headline and statement, two clear actions, a real product visual and restrained Kibo cursors.
2. Three-solution overview linking to the respective presentation pages, with short differentiated descriptions.
3. Quartz Features section proving selected payroll and reporting capabilities using real screenshots or truthful illustrations.
4. Optional bento only if it adds distinct information, for example configuration, payroll processing, reporting and employee access. Remove it if it repeats the previous section.
5. A small selection of real documents and videos with descriptive labels.
6. A concise contact invitation, followed by the shared SmoothUI-inspired footer.

**Paie et RH:** specific introduction; product visual; four capability groups with full feature coverage available; relevant resources; product-specific platform access and contact actions. Use progressive disclosure for long lists while keeping core benefits visible.

**États financiers:** specific introduction; product visual; configuration and processing/reporting sections; supported imports/exports; product-specific platform access and contact. Let the content determine length.

**Gestion PR:** clear expansion of PR as pièces de rechange; documented workshop/factory purpose; concise contact action. No fabricated feature grid or fake unavailable login button.

**Platform access:** separate, unmistakable actions for the two observed destinations:

- Paie et RH: https://globalcluster-dz.net/GlobalClusterPayroll
- États financiers: https://globalcluster-dz.net/Etats_Financiers

These are observed links, not proof of current service health. Verify navigation without submitting credentials or changing application state. For Gestion PR, link to contact for information. Never recreate a login form on the marketing site.

**Documents and guides:** maintain a single structured resource collection and render the relevant subset on each route. Use descriptive titles, resource type and dates only when known. Expose real PDF/video actions; show file sizes or durations only after measuring. Do not implement filters for a handful of resources unless they meaningfully improve navigation. Videos must be user-initiated, with controls and a fallback link.

The observed resource list includes:

- https://globalcluster.net/wp-content/uploads/2025/01/Global-Cluster-presentation-VF.pdf
- https://globalcluster.net/wp-content/uploads/2025/02/GCP-FINALE-EN-2.mp4
- https://globalcluster.net/wp-content/uploads/2025/04/Application-Mobile-Video.mp4
- https://globalcluster.net/wp-content/uploads/2025/04/Tester-ici-la-version-gratuite-sur-un-mois-1.pdf
- https://globalcluster.net/wp-content/uploads/2025/04/Creation-des-bulletins-V1.0.mp4

**Contact:** use the published email `contact@globalcluster.net`, phone `0770 29 15 05` and address “Coopérative Ouahrani Abdelkader, 16106 Oued Romane El Achour, Alger, Algérie.” Verify and normalize the international telephone target rather than copying the displayed country-code/local-prefix combination blindly. Default to functioning email and phone links. Add a contact form only if a real authorized delivery integration is available; implement validation, pending, success and error states, and never simulate submission success.

**Footer:** brand, solution links, resources, actual contact details and the published Facebook/LinkedIn destinations. Remove template-only links. Include legal/privacy links only if corresponding factual content exists; document missing business details rather than inventing a legal entity or registration data.

## 7. Animation and interaction

Keep the requested cursors, but constrain them to the hero's illustration area: two or three maximum on desktop, short labels tied to verified capabilities, no interception of clicks, no replacement of the native pointer, no overlap with essential copy or CTAs. Their movement is decorative and must not suggest actual online users. On small touch screens, simplify to static labels or hide the decoration.

Use a short introductory animation that settles; avoid perpetual movement. Respect `prefers-reduced-motion` with static content. Stop optional animation when offscreen. Keep meaningful content visible without animation initialization.

The chat-like secondary-hero illustration is optional. If included, explicitly frame it as an illustrative exchange and use short factual content. Do not add a message composer, online indicator, invented conversation history or anything suggesting a real chatbot. Omit it if the result competes with the product story.

Use subtle hover, focus and disclosure transitions consistently. Keyboard and touch users must reach the same meaningful content without hover.

### Additional visual references: Paper Shaders and Scroll World

These references were subsequently suggested for evaluation. Their roles below are recommendations, not an instruction to replace the required Quartz/Kibo/SmoothUI composition.

**Paper Shaders — recommended enhancement:** https://shaders.paper.design/ and https://github.com/paper-design/shaders. Evaluate one restrained brand-colored effect in the homepage hero illustration area, such as a Mesh Gradient or Grain Gradient. Use orange/coral and theme-specific neutrals; avoid the example rainbow palette. Compare the effect against the plain version and retain it only if it improves the brand composition without obscuring product imagery or lowering readability. Keep body text and controls as ordinary semantic HTML above a stable contrast surface.

Use the React package through a small client-side boundary and verify its current API. Pin the selected dependency version, as the upstream README warns of breaking changes within its 0.0.x series. Treat the effect as progressive enhancement: preserve a static CSS or image fallback before initialization, when graphics support fails and for reduced motion. Limit rendering resolution, pause rendering offscreen and when the document is hidden, release resources on unmount, and measure performance on mobile. Do not assume a zero-dependency package has zero graphics cost.

Use at most one shader canvas on the homepage and none by default on the resource/contact pages. Coordinate it with the short cursor introduction: one dominant moving layer at a time, then a settled composition. Do not combine shader animation, moving cursors and chat animation simultaneously. A static shader treatment is acceptable and preferable when motion adds no value. Preserve the existing performance and accessibility acceptance criteria.

**Scroll World — optional exploration, outside the default implementation:** https://github.com/oso95/scroll-world. It is an agent skill for generating a video-based immersive journey controlled by scrolling. Consider it only for a bounded narrative section or a separate campaign concept if there is a clear benefit to explaining the brand. Keep the eight-page website and direct platform-access journey as the baseline.

A possible creative concept is movement between a company office, an accounting workspace and a workshop, explicitly presented as a brand illustration rather than an actual product interface. Evaluate that concept first with a written storyboard; do not install the skill, generate paid media or introduce its pipeline merely because it appears in this reference list. The repository describes external generation services and media tooling; account access, assets and generation budget would need to be established before adopting that workflow.

If the user later selects this direction, scope it explicitly before integrating: preserve native navigation and scrolling, provide a skip action and a static equivalent, keep essential content outside video/canvas, plan mobile media deliberately, and measure transfer, decoding and seek behavior. Do not replace the required homepage hero with a full scroll journey without an explicit change to this brief.

## 8. Next.js implementation and migration

Use Next.js with App Router, TypeScript and Tailwind CSS, with a mutually compatible stable version set verified against official docs at implementation time. Respect the repository's package manager and lockfile. Default to Server Components for content and add Client Components only for interactive behavior. Do not add a database, CMS or authentication layer without an actual requirement.

Store solution and resource content in a small typed data layer so shared layouts do not duplicate copy. Use semantic components without an elaborate page-builder framework. Optimize images and fonts with the appropriate Next.js facilities; give media explicit dimensions, load below-fold media lazily and avoid downloading full videos on initial page load.

Provide unique French titles and descriptions, one meaningful H1 per page, canonical URLs, sitemap, robots configuration and a useful 404 page. Use structured data only for verified facts. Keep preview deployments out of indexing through deployment-appropriate configuration.

Implement permanent query-aware redirects for the five observed `?page_id=` routes to their new counterparts. Preserve unrelated query parameters appropriately and test that the homepage remains the homepage. Retain inbound access to existing `/wp-content/uploads/...` documents and assets, either through copied files or an explicitly configured legacy media host. Merely pointing media URLs at the old domain will break if that same domain is replaced without preserving those paths.

## 9. Acceptance criteria and delivery

Before finishing:

- All eight specified routes render with complete, truthful French content and functional navigation.
- Each old observed page-ID URL reaches its intended new route without a loop; published resource URLs survive the deployment design.
- Both platform links retain the exact correct destinations; Gestion PR has no invented endpoint.
- Verify all routes in light and dark mode at representative mobile, tablet and desktop widths (at least 375, 768 and 1440 px), plus a 320 px overflow check and 200% zoom check.
- Check menu, theme persistence, keyboard navigation, visible focus, disclosures, resource actions and contact links. No dead template buttons, empty anchors or fake forms.
- Aim for WCAG 2.2 AA: semantic landmarks, usable labels, appropriate alternatives, contrast, focus visibility and reduced motion. Target at least 4.5:1 normal text contrast and 3:1 large text/control boundaries where applicable. Do not claim certification based on automated checks alone.
- Check for broken images, layout shifts, hydration errors and console errors. Real content must remain visible if decorative JavaScript fails.
- Run the project's production build, type checking and configured lint checks. Use focused functional checks for the menu, theme and redirects; avoid tests that merely repeat static markup.
- Run an appropriate production-mode performance check. Aim for a mobile Lighthouse performance score of at least 90 on representative routes, reporting actual conditions and results rather than treating the target as a guarantee. Inspect causes of any shortfall, especially hero media and animation payload.

Deliver the implemented website, a short setup README, the source/asset and redirect inventories, and a concise verification report with representative screenshots of desktop/mobile and both themes. State any component substitutions and concrete unresolved integration or publication requirements. Report only checks actually run. Continue through review and correction until the complete local implementation is usable; production publishing remains a separate action.
