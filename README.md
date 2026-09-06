# GlobalCluster public website

French public website built with Next.js App Router, TypeScript and Tailwind CSS. Eight public routes, system/light/dark themes, original product media and preserved legacy WordPress resource paths. Operational payroll and financial applications remain external.

## Run locally

Requirements: Node.js 20.9+ and npm. Tested with Node 24.13.0 on Windows.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For a production build:

```sh
npm run build
npm run start
```

## Verification

```sh
npm run lint
npm run typecheck
# Requires the production server running on port 3000:
npm run verify
node scripts/verify-media.mjs
node scripts/performance.mjs
```

Browser checks use installed Microsoft Edge (`channel: msedge`) on the tested Windows host. On other hosts, replace that launch channel with an installed Chromium browser or install Playwright Chromium and omit `channel`. Performance checks require port 9222 to be free. Do not run load-heavy tests concurrently with Lighthouse.

The full layout matrix covers eight routes, both themes and 320/375/768/1440 CSS-pixel widths, plus browser zoom layout emulation. `docs/verification/results.json` stores assertions and Axe results. The verification report explains what was and was not tested.

## Edit content

- `src/lib/content.ts`: solution capabilities, resources, platform destinations and contact facts.
- `src/components/`: shared navigation, theme, product visuals, actions, resources and footer.
- `src/app/`: pages, CSS semantic tokens, metadata, sitemap and robots.
- `src/proxy.ts`: permanent legacy query redirects and retired placeholder responses.
- `next.config.ts`: privacy-safe screenshot redirects, headers and preview indexing.
- `public/`: logo, optimized images, local licensed font and retained documents/videos.

Keep product claims grounded in the source inventory. Gestion PR has no published login URL. Contact uses email and telephone links; there is no submission service.

## Before publication

No production deployment was performed. Run the Node server behind the chosen host/proxy; a plain static export cannot run the query-aware proxy.

1. Ship **all of `public/`**, including approximately 218 MB of original MP4 files. Static asset hosting must support byte-range requests; local production responses were checked. If storing media elsewhere, retain the exact `/wp-content/uploads/...` URL paths through the hosting layer.
2. Set `SITE_INDEXABLE=true` **at build and runtime only for the canonical production host** `https://globalcluster.net`. Local/preview defaults intentionally send noindex headers, metadata and robots restrictions.
3. Verify DNS, TLS and reverse-proxy behavior, and check redirects on the deployed host. The external application links preserve their published destinations, but their certificate chain was not trusted by the tested client.
4. Obtain verified captions/transcripts for source videos to address the remaining media accessibility limitation. Legal registration and privacy content must come from the company; none was fabricated.

Original personal-record screenshots are archived outside `public/` and ignored. Their old public URLs redirect to the safe payroll capture. Do not rerun source-download scripts directly into a publishing tree without repeating privacy review.

## Delivery documents

- `PRODUCT.md` and `DESIGN.md`: factual and visual context.
- `docs/source-inventory.md`: source facts, editorial additions and legacy route disposition.
- `docs/asset-manifest.json`: public media provenance, sizes and hashes.
- `docs/component-decisions.md`: component substitutions and rejected shader study.
- `docs/verification-report.md`: measured checks, screenshots and remaining limitations.

Manrope uses the SIL Open Font License, retained in `public/fonts/OFL.txt`. The existing GlobalCluster logo and source media are reused for this authorized redesign.
