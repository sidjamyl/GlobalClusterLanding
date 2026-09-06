# GlobalCluster redesign: prompt review and resolved questions

Reviewed on 2026-09-05. This task prepares an implementation brief; it does not implement or publish the redesign.

## Assessment

Editorial assessment: **6/10 as an executable brief**, with a clear visual starting point. The references, Next.js requirement, permission to improve copy and assets, and dual themes are useful. The missing pieces are page scope, visitor journeys, exact component variants, evidence boundaries, migration requirements and acceptance criteria.

The main risk is producing an attractive collection of unrelated library demos that misrepresents the actual products. A strong implementation brief must connect each section to a visitor need and a documented capability.

## Evidence and limits

The six public pages below were inspected through their rendered browser content. Homepage, payroll page, and selected component references were also visually inspected. This is a scoped public-site audit, not a complete CMS export or a mobile accessibility audit. Linked PDFs and videos were inventoried, not reviewed internally. External application destinations were extracted from links; their operation and authentication were not tested.

| Source | Observed content | Implication |
| --- | --- | --- |
| [Home](https://globalcluster.net/) | Three solutions; hero aimed at entrepreneurs and ETIs; platform CTA; email, phone and address | Preserve positioning and platform access; clarify discovery separately |
| [Paie et RH](https://globalcluster.net/?page_id=244) | Four capability groups; product screenshots; payroll platform link | Richest source for product detail and visual proof |
| [États financiers](https://globalcluster.net/?page_id=450) | Configuration, financial statements, imports, exports and reporting | Dedicated solution page with its own content hierarchy |
| [Platform access](https://globalcluster.net/?page_id=344) | Two linked operational platforms; no linked Gestion PR destination | Never invent a third login endpoint |
| [Documents](https://globalcluster.net/?page_id=416) | Five linked resources: two PDFs and three videos | Preserve downloadable and playable resources |
| [Guides](https://globalcluster.net/?page_id=489) | Two video links already present among the documents | Reuse one resource collection across both pages |

The Gestion PR navigation item currently points to the homepage. The Contact navigation item points to `https://www.ib-software.net/`, while contact details appear directly on GlobalCluster. No formal brand manual was found in the supplied brand reference: it is the payroll product page. Its visible section headings use `rgb(207,46,46)` (`#CF2E2E`); the logo visually contains orange/coral, and application screenshots use orange. These observations are not an official palette specification.

The payroll screenshots include employee-like records and names. Inspect and anonymize such content before making those screenshots prominent in the redesign.

## Questions answered through the grilling method

The user explicitly delegated answering the questions. Recommendations below are working defaults, not claims that the user separately approved each decision.

| Question | Answer and status |
| --- | --- |
| Are we redesigning the marketing site or the business applications? | **Default:** the public website only. Existing applications remain external destinations. |
| Who should the site help? | **Observed:** entrepreneurs, ETIs, companies and accounting professionals; workshops and factories for Gestion PR. **Inference:** French-speaking visitors in an Algerian business context, based on language, address and payroll terminology. |
| What is the primary journey? | **Default:** understand and select a solution. Keep platform access prominent for existing users and contact available for prospects. |
| Should payroll dominate the brand? | **Default:** give it more detail because evidence is richer, while keeping all three solutions visible. Content depth is not evidence of revenue priority. |
| What does PR mean? | **Observed:** pièces de rechange, not public relations or purchase requests. |
| Which pages are included? | **Default:** all six observed public pages, plus a scoped Gestion PR presentation and a local contact page. |
| Which features block did “this exact one” mean? | **Unknown user preference:** no screenshot or anchor identifies it. **Default:** Quartz `@tailark/features-1`, explicitly replaceable if a precise reference is later supplied. |
| Which hero and footer variants? | **Default:** Quartz `@tailark/hero-section-1` and SmoothUI `footer-1`. IDs were visible in official references. |
| Does the repeated footer URL define internal page headers? | **Ambiguous:** it provides no header reference. **Default:** common header/footer plus a compact product-specific secondary hero. |
| Is the chat a real product capability? | **Unverified:** optional editorial illustration only, clearly framed; omit if it suggests a real assistant or support service. |
| What do the cursors communicate? | **Default:** short factual capability labels such as “Multi-dossiers” and “Reporting”. They are an illustration, not real users or real-time presence. |
| Can we claim live collaboration, AI, integrations or savings? | **No evidence:** avoid. Library example text is not product evidence. Multi-user capability alone does not establish live co-editing. |
| Is Quartz source accessible? | **Unknown:** Quartz is labelled Pro. Check licensed source availability during implementation; no purchase was authorized. Use an original adaptation if unavailable, documenting the substitution. |
| What is the palette? | **Default:** orange/coral brand accents, a controlled red derived from the observed heading color, neutral light surfaces and charcoal dark surfaces. Choose accessible tokens during implementation; do not call proposed values official. |
| What is the theme behavior? | **Default:** system preference on first visit, explicit light/dark/system selector, persisted preference, matching first paint and hydration. |
| Can we add content? | **Authorized:** improve structure and copy grounded in existing facts. Do not invent prices, testimonials, client logos, certifications, current trial terms or business outcomes. |
| Does the test-document filename establish a current free trial? | **No:** it is an old asset filename, not verification of a current commercial offer. |
| Do we need a CMS or a new backend? | **Default:** no new CMS, database or authentication for this small public site; maintain structured content locally. Revisit if independent editing is required. |
| Should contact use a form? | **Default:** real email/phone links and published address. Add a form only with an actual authorized delivery service; never fake success. |
| How do existing links survive migration? | **Default:** map the observed WordPress query URLs to readable routes and preserve uploaded assets. This is a production migration requirement. |
| How is success evaluated? | **Default:** complete routes and resources, clear solution/access journeys, unified themes, responsive and accessible interactions, verified build and no fabricated claims. |

## Component reference assessment

- [Quartz Hero](https://tailark.com/blocks/quartz/hero-section): two variants were listed. Variant 1 provides a centered headline, two actions and a product visual. Replace the demo branding and AI positioning.
- [Quartz Features](https://tailark.com/blocks/quartz/features): three variants were listed. Variant 1 has two visual feature panels; its sample analytics and invoice content must be replaced with verified GlobalCluster capabilities.
- [Quartz Secondary Hero](https://tailark.com/blocks/quartz/secondary-hero): variant 1 includes chat-like visual content. Use only if the adapted illustration remains truthful.
- [Quartz Bento](https://tailark.com/blocks/quartz/bento): two variants were listed. Variant 1 can organize capabilities with unequal emphasis, but its financial and collaboration demos are not appropriate product claims.
- [Kibo Cursor](https://www.kibo-ui.com/components/cursor): supports a pointer, optional name/message and custom colors. Supply animation behavior separately and constrain it to the hero illustration.
- [SmoothUI Footer](https://smoothui.dev/docs/blocks/footer): four variants were listed. The inspected [footer-1 preview](https://smoothui.dev/blocks/preview/footer-1) offers a brand area and grouped links; replace its generic social and navigation links.

## Additional references reviewed

The user subsequently requested an assessment of Paper Shaders and Scroll World and explicitly required Impeccable in the implementation prompt.

- **Impeccable:** now required for design context, visual coherence, critique, accessibility review and final polish. Its instructions are subordinate to explicit user requirements.
- **Paper Shaders:** recommended as one optional hero treatment. The [official project](https://github.com/paper-design/shaders) provides React and vanilla packages and recommends version pinning. The recommendation is a controlled orange/coral effect with a static fallback, measured on mobile; it is not a claim that this project's performance has been tested.
- **Scroll World:** retain as an optional creative direction. Its [README](https://github.com/oso95/scroll-world) describes generated media, a scroll-controlled video journey and external generation requirements. Its fit for this public business site is weaker than a localized hero enhancement: a complete immersive journey could compete with quick solution discovery and platform access. No installation, asset generation or budget commitment was made.

The suggested division of roles is: Impeccable directs the design; Quartz/SmoothUI/Kibo supply the component foundations; Paper can add a localized visual signature; Scroll World remains a separately scoped narrative option.

## Documented decisions

The implementation prompt contains reversible visual and workflow defaults. The proposed ADR records the more consequential website/application boundary. The glossary in `CONTEXT.md` records only domain terms. No decision here authorizes production deployment, purchase of component access, or modification of the external applications.
