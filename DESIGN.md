---
name: GlobalCluster
description: Tangible management software on warm paper and charcoal.
colors:
  background: "#fafaf8"
  surface: "#f0f0ed"
  elevated: "#ffffff"
  foreground: "#242725"
  muted: "#60635f"
  border: "#d6d8d1"
  primary: "#b73d24"
  primary-foreground: "#ffffff"
  accent: "#f7d9c8"
  focus: "#a8321b"
  destructive: "#b52626"
  stage: "#efd2c2"
  dark-background: "#191c1a"
  dark-surface: "#222623"
  dark-elevated: "#2b302c"
  dark-foreground: "#f2f3ed"
  dark-muted: "#b1b9b0"
  dark-border: "#464e46"
  dark-primary: "#ff9975"
  dark-primary-foreground: "#241b16"
  dark-accent: "#48342b"
  dark-focus: "#ffb18d"
  dark-destructive: "#ff9c9c"
  dark-stage: "#4a342b"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(2.4rem, 5.6vw, 4.8rem)"
    fontWeight: 600
    lineHeight: 1.13
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(2rem, 3.1vw, 2.8rem)"
    fontWeight: 600
    lineHeight: 1.13
    letterSpacing: "-0.035em"
  title:
    fontSize: "1.6rem"
    fontWeight: 600
    lineHeight: 1.13
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    lineHeight: 1.65
  label:
    fontSize: "0.71rem"
    fontWeight: 600
rounded:
  label: "5px"
  control: "7px"
  window: "10px"
  panel: "12px"
  contact: "14px"
  stage: "16px"
spacing:
  actions: "12px"
  section-desktop: "105px"
  section-tablet: "75px"
  section-mobile: "61px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.control}"
    padding: "12px 21px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.control}"
    padding: "12px 21px"
  product-label:
    typography: "{typography.label}"
    rounded: "{rounded.label}"
    padding: "4px 10px"
---

# Design System: GlobalCluster

## Overview

**Creative North Star: "Software demonstration desk"**

Warm neutral surfaces, coral actions and real product captures make the software tangible. Open sections and disciplined dividers keep the interface calm and readable. Preserve the original logo and French public content; documentation remains English.

**Key Characteristics:**
- Real software evidence in softly framed windows.
- One locally hosted type family with a clear hierarchy.
- Original Quartz-inspired hero/features, restrained Kibo-inspired capability cursors and a shared SmoothUI-inspired footer; these are adaptations, not licensed component copies.

Implementation authority: `src/app/globals.css`, `src/components/header.tsx`, `src/components/site.tsx` and `src/app/layout.tsx`. Product constraints live in `PRODUCT.md`; homepage composition lives in `docs/surface-home.md`. The companion `.impeccable/design.json` holds preview snippets, motion and depth metadata.

## Colors

### Primary
Burnt coral drives actions, highlighted headline text and product icons. Dark mode replaces it with a brighter peach-coral and dark button text. Always pair the active primary with its matching primary foreground, including the active platform navigation item.

### Neutral
Paper/charcoal backgrounds, subtly distinct surface and elevated layers, and muted text establish hierarchy. Borders divide editorial rows. Accent and stage are warm support surfaces for contact panels and product captures. The logo keeps its light backing and source product images retain their original colors in both themes.

The frontmatter's unprefixed colors represent light mode; `dark-` entries map to the same runtime CSS properties under `data-theme="dark"`. Auto follows system preference, explicit choice persists in `gc-theme`, and CSS provides a system fallback. Destructive is defined but has no current error component.

## Typography

Manrope is loaded locally from `public/fonts/manrope-latin-wght-normal.woff2` with swap display and a sans-serif fallback. Headings use balanced wrapping; paragraphs use pretty wrapping. There is no separate display or mono family.

Use the frontmatter hierarchy. The homepage display changes to `clamp(2.4rem, 6.8vw, 3.6rem)` at 850px and `clamp(2rem, 8.2vw, 2.85rem)` at 600px, with mobile line height (1.15) and tracking (-0.04em). Inner-page headings have their own responsive rules in the stylesheet. Body copy commonly uses narrower measures: feature copy (48ch), resource descriptions (70ch). Resource metadata is uppercase with tracking (0.06em); ordinary navigation and labels keep sentence case.

## Layout

The main container caps at 1200px with 40px desktop gutters; gutters become 32px at 1100px and 18px at 600px. Sections use the three spacing values above. The header has its own 1320px maximum width and is in normal document flow.

Three solution columns and alternating asymmetric feature pairs organize desktop content. At 600px, both become single columns and reversed feature order returns to document order. Navigation collapses at 850px; its opened menu stays in flow. Footer columns change from four to two at 850px, with full-width brand/contact groups on mobile. Actions wrap; hero and solution intro actions stack on mobile. Preserve these breakpoints rather than introducing parallel utility scales.

## Elevation & Depth

Most structure comes from tonal changes and one-pixel dividers. A single broad, soft shadow supports product windows and the desktop solutions dropdown; it is removed from the mobile dropdown. Explicit dark mode uses a darker shadow. The CSS-only automatic dark fallback currently retains the light shadow value. No backdrop blur or floating card wall is part of the system.

## Shapes

Small rounded controls and labels contrast with broader product stages and contact panels. Product windows round only their top corners. Solution and resource rows use shared dividers instead of isolated rounded cards. Preserve source screenshot aspect ratios and avoid presenting decorative window chrome as operational UI.

## Components

- **Actions:** primary filled and secondary outlined links; secondary borders use muted text color. Desktop minimum height is 50px, mobile 48px. Hover lifts by 2px over 0.18s; secondary hover adds the surface fill. Text actions underline on hover.
- **Navigation and theme:** native details/summary for solutions, an accessible expanded-state mobile button, current-page semantics and a native select for Auto/Clair/Sombre. Escape closes menus and restores focus. There are no text-input or authentication form components.
- **Product proof:** semantic figure/caption, descriptive image alternatives and decorative cursors hidden from assistive technology. Cursors settle once over 1.2s with `cubic-bezier(0.16, 1, 0.3, 1)`; the second starts 0.12s later. They disappear at 600px.
- **Resources:** article rows use h2 on listing pages and h3 inside compact sections. Download controls retain accessible names and minimum 44px targets when mobile hides their visible text. Video uses native controls inside a disclosure; verified captions remain unresolved.
- **Shared structure:** header, labelled navigation, main landmark, skip link and grouped footer. Use real links for destinations and buttons for state changes. Focus-visible outlines are 3px with 5px offset. Reduced motion disables animation, transitions, smooth scrolling and button lift.

## Do's and Don'ts

- Do use semantic theme properties and matching foreground/background pairs.
- Do preserve real source imagery, keyboard focus and mobile document order.
- Do keep motion brief, decorative and removable through reduced-motion preference.
- Don't imply that a product screenshot or decorative cursor is interactive.
- Don't fabricate product capabilities, proof, forms or customer endorsements.
- Don't claim WCAG certification; caption completion and final accessibility verification require separate evidence.
