# Verification report

Completed locally on 2026-09-06. No production deployment performed.

## Delivered scope

All eight requested public routes render in French. Shared navigation, light/dark/system themes, typed product/resource content, contact links, permanent legacy query redirects, preserved media paths, metadata, sitemap, robots and a useful 404 are implemented. Quartz, Kibo and SmoothUI references are original adaptations, documented in `component-decisions.md`; protected Quartz source was not accessed. The Paper shader comparison was rejected and removed.

## Checks actually run

| Check | Result |
|---|---|
| Production `next build` | Pass; eight public routes generated |
| `npm run typecheck` | Pass |
| `npm run lint` | Pass, no warnings |
| Responsive matrix | 64 page/theme/width cases: eight pages × two themes × 320, 375, 768, 1440 CSS px; no overflow, broken images, missing H1 or non-200 route |
| Zoom reflow | 16 cases: eight pages × two themes, emulating 200% browser layout at 720 CSS px/DPR 2 for a 1440px viewport; no overflow, menu usable |
| Axe | 32 route/theme scans at 375 and 1440px; zero detected violations for selected WCAG A/AA tags |
| JavaScript | No page errors or console errors in the matrix |
| Theme | System first paint, explicit persistence after reload and live system preference changes pass |
| Navigation | Mobile open/close, close after route navigation, Escape focus restoration, keyboard solution/feature disclosures and skip link checked |
| No JavaScript | Homepage content and mobile navigation remain visible |
| Motion | Reduced-motion cursor animation computes to `none`; no perpetual animation |
| Redirects | Five required page IDs plus newsletter redirect return 308, retain UTM, reach destination without a loop; homepage remains 200 |
| Retired content | Sample page and five demo posts return 410; unknown page returns 404 |
| Resources | All five PDF/MP4 paths return 206 byte ranges with correct MIME types; later-range video seek request succeeds |
| Video playback | All three videos start and advance with readyState 4 and no media errors; tested muted, not a full content/audio review |
| External destinations | Exact published URLs retained; TLS validation failed on this host, so application health is unconfirmed |

Raw results: `verification/results.json`, `media-playback.json`, `contrast.json`, `performance.json` and Lighthouse JSON/HTML reports. The initial CSS-zoom experiment produced overflow because CSS zoom does not re-evaluate viewport media queries. It was replaced by the correctly labelled browser-layout emulation; its discarded results remain in `css-zoom-experiment.json`. Native browser toolbar zoom and physical-device testing were not performed.

## Performance

Production server on Windows, Node 24.13.0, headless Microsoft Edge 152. Lighthouse mobile simulation: 375×812, 150ms RTT, 1,638.4 Kbps throughput, CPU slowdown ×4, cold navigation. One measured run per route, executed after the layout matrix rather than concurrently with it.

| Route | Performance | Accessibility | Best practices | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|
| `/` | 98 | 100 | 100 | 2.4s | 50ms | 0 |
| `/solutions/paie-rh` | 99 | 100 | 100 | 2.3s | 20ms | 0 |
| `/contact` | 98 | 100 | 100 | 2.3s | 30ms | 0 |

SEO scored 69 because preview indexing is deliberately blocked. The failing SEO audit is `is-crawlable`; production requires `SITE_INDEXABLE=true` at build and runtime. These are lab measurements, not field guarantees or accessibility certification.

## Contrast and review corrections

Measured semantic pairings: light body 14.44:1, light muted 5.83:1, light primary button 5.67:1; dark body 15.40:1, dark muted 8.54:1 and dark primary button 8.10:1. Secondary control boundaries use the muted token. Decorative separators are not represented as required control boundaries. Source screenshot pixels are preserved, not certified for contrast.

Impeccable review used independent design and technical assessments. The one mechanical detector scan returned zero findings (`detector.json`). The reviews still identified and corrected active platform button contrast, mismatched download names/icons, standalone resource heading levels and undersized resource targets. Final independent verdict: **ship the local implementation handoff with the documented media limitation**; see `verification/review-verdict.md`. No live detector overlay was injected; the available browser evaluation was read-only.

The documenter wrote DESIGN.md but its final agent response ended on a usage limit. The parent inspected the resulting document against the implementation and completed this handoff. No claim is made that its agent completion message succeeded.

## Representative captures

The complete matrix is in `docs/verification/`. Final representative views:

- [Desktop light](verification/home-light-desktop-viewport.png)
- [Desktop dark](verification/home-dark-desktop-viewport.png)
- [Mobile light](verification/home-light-mobile-viewport.png)
- [Mobile dark](verification/home-dark-mobile-viewport.png)
- [Full homepage, desktop light](verification/home-light-1440.png)
- [Full homepage, mobile dark](verification/home-dark-375.png)
- [Platform access, dark](verification/plateformes-dark-1440.png)
- [Documents, mobile](verification/documents-light-375.png)
- [200% layout emulation](verification/home-light-zoom200.png)
- [Rejected Paper shader comparison](verification/shader-comparison.png)

## Unresolved publication requirements

1. Source videos lack verified captions/transcripts. Disclosure does not resolve that accessibility gap. Full AA conformance is not claimed.
2. The platform host certificate chain failed validation from this machine. No security check was bypassed; the application owner should verify TLS.
3. Production hosting, DNS and indexability remain to be configured. Ship all original video/PDF files or preserve their paths through an explicitly configured media host.
4. Verified legal/company privacy information was unavailable and was not fabricated.

Two payroll screenshots with personal fields are archived outside the public tree. Their former URLs redirect to the safe creation-choice capture; source/asset inventories document this deliberate replacement.
