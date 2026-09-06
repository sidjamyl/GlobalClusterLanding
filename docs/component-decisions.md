# Component and visual decisions

## Required references

- [Quartz hero](https://tailark.com/blocks/quartz/hero-section), `@tailark/hero-section-1`: live preview inspected. The Code control showed a purchase/access gate. No licensed source exists in this workspace. Implemented an original centered heading/actions/product-window composition; no claim of exact source reuse.
- [Quartz features](https://tailark.com/blocks/quartz/features), `@tailark/features-1`: official reference checked. Original paired product-evidence sections replace demo invoices and analytics. A repeated bento would add no separate facts and is omitted.
- [Kibo Cursor](https://www.kibo-ui.com/components/cursor): official `npx kibo-ui add cursor` instructions and pointer/label behavior reviewed. Original minimal decorative implementation uses Lucide pointer icons and CSS, with no message bubble or live-user fiction. Two desktop cursors settle after a short introduction; touch widths hide them; reduced motion removes animation. This is a visual adaptation, not an imported Kibo source component.
- [SmoothUI footer](https://smoothui.dev/docs/blocks/footer), `footer-1`: official `smoothui add footer-1@smoothui/footer-1` installation and grouped brand/link footer reference reviewed. Original semantic footer uses the same grouped vocabulary, normalized to the website tokens; template links are not retained.
- Optional secondary chat hero omitted because no conversational product capability is documented.

The independent original implementations avoid multiple primitive/animation systems. All icon strokes come from Lucide; all controls share the same tokens and focus treatment. Motion is CSS-only. No access purchased and no protected source extracted.

## Paper Shaders evaluation

[Official repository](https://github.com/paper-design/shaders) and [gallery](https://shaders.paper.design/) reviewed. The exact React package version **0.0.80** was temporarily installed. Its local `MeshGradientProps` and `ShaderMount` source verified `colors`, `speed`, `frame`, `maxPixelCount`, `minPixelRatio` and cleanup through `dispose()`.

A temporary local React study compared a plain hero stage with `MeshGradient` at speed 0, frame 12, 250,000 maximum pixels and a coral/neutral palette. Screenshot: `docs/verification/shader-comparison.png`. The real interface covers most of the canvas, leaving only a marginally varied border; the plain stage communicates the product equally clearly. The shader was **not retained**. Its route and package were removed; no shader/canvas, graphics initialization or graphics cost ships. Since the enhancement was rejected visually, no mobile shader performance claim is made. Production performance is measured on the retained static version.

Scroll World remains outside implementation scope, as the brief directs. No skill installation, generated media, external account or payment was used.

## Stack and source checks

Official [Next installation](https://nextjs.org/docs/app/getting-started/installation) and [Tailwind Next guide](https://tailwindcss.com/docs/installation/framework-guides/nextjs) verified; npm registry resolved Next 16.3.4, React 19.2.8 and Tailwind 4.3.3. Exact framework versions are pinned; `package-lock.json` records the full tree. Next-generated AGENTS.md was read, and packaged proxy/font/metadata guides checked. Content is server-rendered; only navigation/theme behavior is client code. Local Manrope font is loaded by `next/font/local`, with OFL license retained.
