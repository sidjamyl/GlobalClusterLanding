# Source and migration inventory

Rechecked on 2026-09-06 through HTTPS HTML, WordPress REST and the live query-based sitemap. Raw captures and machine-readable extracted text/links are under `docs/sources/`. The web extractor could not open several pages; direct HTTPS requests succeeded. The site's `/wp-sitemap.xml`, `/robots.txt` and pretty REST path returned 404; the working sitemap is `https://globalcluster.net/?sitemap=index` and REST uses `index.php?rest_route=`.

## Public routes

| Legacy source | Observed content | Implemented disposition |
|---|---|---|
| `/` | “Solutions de gestion pour entrepreneurs et ETI”; quality/accessibility statement; three offerings | `/`, exact required headline and sentence preserved |
| `/?page_id=244` | Payroll & HR; four capability groups | 308 → `/solutions/paie-rh`; every source feature covered in typed grouped summaries |
| `/?page_id=450` | EFI; configuration and operations/reporting | 308 → `/solutions/etats-financiers`; independent financial feature list |
| Gestion PR menu → `/` | Spare parts for workshops/factories | New `/solutions/gestion-pr`; homepage remains homepage |
| `/?page_id=344` | Two operational application links | 308 → `/plateformes` |
| `/?page_id=416` | Five documents/videos | 308 → `/documents` |
| `/?page_id=489` | Two instructional videos | 308 → `/guides`, shared resource data |
| Contact → `https://www.ib-software.net/` | Contact details published on GlobalCluster | New `/contact`; local email, telephone and address, no fake form |
| `/?page_id=165` | Newsletter with email input, discovered through sitemap and REST | 308 → `/contact`; subscription backend not rebuilt |
| `/?page_id=2` | WordPress “Page d’exemple” with fictional boilerplate | 410, no invented company content retained |
| `/?p=1` | WordPress welcome post | 410 |
| `/?p=81`, `82`, `83`, `84` | “Blog 1–4”, Lorem ipsum placeholders | 410 |

`src/proxy.ts` handles both `/` and `/index.php`; known `page_id` and published `p` aliases redirect permanently. Only legacy identity parameters are removed; unrelated query values remain. Unknown queries leave the homepage intact. There is no blanket redirect from home to Gestion PR. Sitemap taxonomy/user listings are CMS machinery, not additional solution pages; they are not recreated.

## Content evidence

- Payroll text covers multi-dossier, establishments, navigation, multi-user rights, history recovery, configurable rubrics/calculations/variables, salary confidentiality, models, time clocks; period carryover, simulation/reverse calculation, online/Excel entry, per-employee confidentiality, payslip history/email, workflow, leave/STC, loans/advances; all named declarations and accounting/reporting items; all administrative documents, EDI entry/exit, transfers, email, RH reporting, customized profile, SIRH opening and mobile employee access. Full legacy wording is in `docs/sources/read-1.json`.
- Finance independently covers all nine configuration items and nine operations/reporting items. `docs/sources/read-2.json` retains source wording. “Business Intelligence intégrée” is a source feature, not an added AI claim.
- PR is deliberately limited to its documented spare-parts purpose and audience. No stock forecast, procurement, maintenance or login claim was added.
- Editorial additions: benefit-oriented headings, section summaries, resource titles and navigation labels. They infer organizational utility from documented capabilities, not measurable business outcomes.
- Contact is confirmed: `contact@globalcluster.net`, local `0770 29 15 05`, full El Achour address. International link normalizes Algeria +213 by removing the domestic leading zero: `tel:+213770291505`.
- Footer social destinations match the published bottom-of-page links: Facebook `/IBSOFTWARE/`, LinkedIn `/company/ib-software-sarl`. These profiles retain IB Software identity; no new GlobalCluster profile is invented.

## Resources

All five files are copied into `public/wp-content/uploads/...`; links are relative, so replacing the same production domain preserves inbound URLs. The application requires these media files alongside the Next server. PDFs are real downloads; videos use native controls and `preload="none"`, plus download fallback.

| Original path below `/wp-content/uploads/` | Public label | Verified source context |
|---|---|---|
| `2025/01/Global-Cluster-presentation-VF.pdf` | Présentation de GlobalCluster | Source labels it a payroll/RH feature presentation, February 2025 |
| `2025/02/GCP-FINALE-EN-2.mp4` | Découvrir Paie et RH en vidéo | Source says February 2025 |
| `2025/04/Application-Mobile-Video.mp4` | L’application mobile salarié | Source says February 2025 despite April upload path |
| `2025/04/Tester-ici-la-version-gratuite-sur-un-mois-1.pdf` | Document de prise en main | Source describes first steps in test dossier and subscription management; no current trial promise |
| `2025/04/Creation-des-bulletins-V1.0.mp4` | Créer les bulletins de paie | Source says four-step monthly payroll, March 2025 |

Dates are deliberately omitted from public labels rather than inferred from upload directories. File bytes and hashes appear in `asset-manifest.json`. Source videos are not newly captioned or transcribed; verified accessible alternatives remain a publication requirement for full media accessibility. Existing commercial wording inside preserved historical PDFs is source material, not a new website offer.

## Product assets and privacy

- Original logo retained, with neutral backing in both themes; no inversion or fabricated wordmark.
- `/assets/payroll.webp` derives from `Creation-salarie-1.png` (1520×771), quality-88 WebP only. It is a real empty creation-choice interface without personal records.
- `/assets/finance.webp` derives from `Indicateurs-EF-1.png` (1830×615), quality-88 WebP only. Historical screenshot figures have no named company and are not marketed as GlobalCluster results.
- Login screenshots were downloaded for the inventory but are not used as the marketing hero. Relevant safe legacy asset paths are retained.
- Two downloaded payroll screenshots contain employee-like names and personal fields. Original files are kept outside `public`, in ignored `docs/sources/originals/`. Their legacy URLs permanently redirect to the safe payroll product capture. No altered interface is passed off as an unmodified original, and personal records are not exposed in the new marketing assets.
- Unused legacy stock photos are retained for inbound asset access, not displayed as new product evidence. No generated stock image is used.

## External services and unknowns

Published destinations remain exactly `https://globalcluster-dz.net/GlobalClusterPayroll` and `https://globalcluster-dz.net/Etats_Financiers`. Direct read-only connection checks failed certificate validation (`SEC_E_UNTRUSTED_ROOT` in Windows curl; fetch failed in Node). Certificate checks were not bypassed, no credentials submitted, and service health is unconfirmed. The links preserve the source destinations; platform certificate configuration needs its owner’s review.

No verified legal registration, formal privacy notice, commercial terms, response times, support availability or current trial entitlement was found. No legal entity or policy was invented. Publishing requires a chosen host, canonical-domain configuration and review of the above external/media limitations.
