# Third-party notices

## React Bits

The components in `src/components/reactbits/` come from
[React Bits](https://github.com/DavidHDev/react-bits), by David Haz. Lanyard,
TechText, LightRays, TearTicket, HoloCard, BounceCards, FlexCarousel, and
ScrollStack retain the unmodified official JavaScript + CSS registry files.
Magnet and SpotlightCard also retain their upstream implementations.

The current page uses TearTicket for individual education and internship
entries. PublicationDeck composes small content adapters of the official
HoloCard and BounceCards implementations, so each publication can include its
real title, authors, venue, and links on one holographic card. The adapters are
separate files; the original HoloCard and BounceCards JSX/CSS remain unchanged.
FlexCarousel and ScrollStack are retained for reference and are not rendered
by the current page.

- Upstream revision: [`e12c22192ac7b4b452c5e2feb9b586d74765d696`](https://github.com/DavidHDev/react-bits/commit/e12c22192ac7b4b452c5e2feb9b586d74765d696)
- Copyright (c) 2026 David Haz
- License: MIT + Commons Clause License Condition v1.0
- The complete, unchanged upstream license is in
  [`licenses/react-bits-LICENSE.md`](licenses/react-bits-LICENSE.md).

| Component | Upstream source directory |
| --- | --- |
| Lanyard | [`src/content/Components/Lanyard`](https://github.com/DavidHDev/react-bits/tree/e12c22192ac7b4b452c5e2feb9b586d74765d696/src/content/Components/Lanyard) |
| TechText | [`src/content/TextAnimations/TechText`](https://github.com/DavidHDev/react-bits/tree/e12c22192ac7b4b452c5e2feb9b586d74765d696/src/content/TextAnimations/TechText) |
| LightRays | [`src/content/Backgrounds/LightRays`](https://github.com/DavidHDev/react-bits/tree/e12c22192ac7b4b452c5e2feb9b586d74765d696/src/content/Backgrounds/LightRays) |
| TearTicket | [`src/content/Micro/TearTicket`](https://github.com/DavidHDev/react-bits/tree/e12c22192ac7b4b452c5e2feb9b586d74765d696/src/content/Micro/TearTicket) |
| HoloCard | [`src/content/Components/HoloCard`](https://github.com/DavidHDev/react-bits/tree/e12c22192ac7b4b452c5e2feb9b586d74765d696/src/content/Components/HoloCard) |
| BounceCards | [`src/content/Components/BounceCards`](https://github.com/DavidHDev/react-bits/tree/e12c22192ac7b4b452c5e2feb9b586d74765d696/src/content/Components/BounceCards) |
| FlexCarousel | [`src/content/Components/FlexCarousel`](https://github.com/DavidHDev/react-bits/tree/e12c22192ac7b4b452c5e2feb9b586d74765d696/src/content/Components/FlexCarousel) |
| ScrollStack | [`src/content/Components/ScrollStack`](https://github.com/DavidHDev/react-bits/tree/e12c22192ac7b4b452c5e2feb9b586d74765d696/src/content/Components/ScrollStack) |
| Magnet | [`src/content/Animations/Magnet`](https://github.com/DavidHDev/react-bits/tree/e12c22192ac7b4b452c5e2feb9b586d74765d696/src/content/Animations/Magnet) |
| SpotlightCard | [`src/content/Components/SpotlightCard`](https://github.com/DavidHDev/react-bits/tree/e12c22192ac7b4b452c5e2feb9b586d74765d696/src/content/Components/SpotlightCard) |

### Official registry verification

The official registry namespace is declared in the upstream README as:

```json
{
  "registries": {
    "@react-bits": "https://reactbits.dev/r/{name}.json"
  }
}
```

On 2026-10-28, the following commands successfully installed the requested
components in an isolated verification project:

```bash
npx --yes shadcn@latest add @react-bits/Lanyard-JS-CSS --yes
npx --yes shadcn@latest add @react-bits/TechText-JS-CSS @react-bits/LightRays-JS-CSS @react-bits/FlexCarousel-JS-CSS @react-bits/ScrollStack-JS-CSS --yes
npx --yes shadcn@latest add @react-bits/TearTicket-JS-CSS @react-bits/HoloCard-JS-CSS @react-bits/BounceCards-JS-CSS --yes
```

All sixteen installed JSX/CSS files were byte-identical to the source contents in
the corresponding [`public/r/*-JS-CSS.json` registry manifests](https://github.com/DavidHDev/react-bits/tree/e12c22192ac7b4b452c5e2feb9b586d74765d696/public/r)
at the pinned upstream revision above. The vendored files retain those exact
bytes, including the sources kept for reference. Page layout, personal content,
theme selection, navigation controls, and fallbacks are implemented separately
in the application.

The source and texture hashes are recorded in
[`docs/react-bits-integrity.json`](docs/react-bits-integrity.json). Run
`node scripts/check-reactbits.mjs` to verify that the sixteen component files and
official band texture still match that record.

### Current page integrations

- **Lanyard:** unmodified official source with its default motion, geometry,
  lighting, and physical parameters. The personal photograph is supplied to
  both faces. The external `ThemedLanyard` wrapper supplies the original band
  texture in light mode and a runtime color-inverted copy in dark mode through
  the public `strapImage` and `strapColor` props.
- **TechText:** unmodified official source in separate English and Chinese name
  instances. The page uses the component's public `align` and `fontSize` props
  for composition; it does not patch the renderer or typography calculations.
- **TearTicket:** unmodified official source. Individual institutions and roles
  are supplied through its supported `children` and `stub` slots; institutional
  logos use its public `image` prop. Public dimensions and theme props plus
  scoped page CSS compose compact square tickets and square logo areas. Its
  original tear interaction and image parallax are retained.
- **HoloCardContent:** an adapter in
  [`src/components/adapters/HoloCardContent.jsx`](src/components/adapters/HoloCardContent.jsx)
  starts from the official HoloCard source and adds a `children` slot on the
  rotating front face. A non-flipping card with content uses group semantics so
  its text and links remain accessible. It imports the original CSS and keeps
  the shader, texture pipeline, lighting, spring motion, and default visual
  parameters unchanged. Publication artwork is composed into a card-sized
  image, with real HTML metadata over the same face. This adapter is distinct
  from the unmodified original JSX in `src/components/reactbits/HoloCard/`.
- **BounceCardsContent:** an adapter in
  [`src/components/adapters/BounceCardsContent.jsx`](src/components/adapters/BounceCardsContent.jsx)
  starts from the official BounceCards source and adds a `renderCard` content
  slot, a rectangular height/hit area, and descendant focus and link handling.
  It preserves the original rotation pattern, slot calculation, spring
  integration, stagger, and hover target formulas. A guard keeps the active
  card selected while the pointer reads its text or uses its links. The
  original JSX/CSS remain unchanged in `src/components/reactbits/BounceCards/`.
- **PublicationDeck:** application code places the eight publication cards in
  one row using these two content adapters. Image composition, HTML metadata,
  publication details, navigation links, and responsive layout are page-level
  integrations rather than features attributed to the upstream components.

TearTicket's `motion/react` import is provided by the installed
`motion@12.23.12` dependency. HoloCard and BounceCards require no additional
runtime package beyond React.

### Lanyard texture and personal photograph

`images/react-bits/lanyard.png` is the unmodified official band texture from
[`src/assets/lanyard/lanyard.png`](https://github.com/DavidHDev/react-bits/blob/e12c22192ac7b4b452c5e2feb9b586d74765d696/src/assets/lanyard/lanyard.png).
It is 1025 × 250 pixels and has SHA-256
`5cd055054c470432fb8743eda836cf0ba40bcbc2b6df5ee84c3f831607be657c`.

The Lanyard front and back use the homepage owner's original photograph at
`/images/junhaocheng.png`, supplied through `frontImage` and `backImage`.
This follows the official [`LanyardDemo` front-image upload behavior](https://github.com/DavidHDev/react-bits/blob/e12c22192ac7b4b452c5e2feb9b586d74765d696/src/demo/Components/LanyardDemo.jsx):
when a front image is uploaded without a separate back image, both faces use
the uploaded image. The original motion, card construction, surface finish,
metal hardware, and band geometry are retained. No custom badge SVG is used.

[`src/components/ThemedLanyard.jsx`](src/components/ThemedLanyard.jsx) derives
the dark-mode white strap in memory with Canvas 2D `invert(1)`. The original
texture file is never rewritten, and the official component's texture-loading
and physical simulation code remain unchanged. This theme transformation is
an application adapter, not an upstream Lanyard feature.

Runtime dependencies are declared in `package.json`. Their license notices are
available with their installed packages and upstream repositories.

## Self-hosted fonts

- Manrope Variable, Copyright 2019 The Manrope Project Authors, distributed under the SIL Open Font License 1.1. See `licenses/Manrope-OFL.txt`.
- Instrument Serif, Copyright 2022 The Instrument Serif Project Authors, distributed under the SIL Open Font License 1.1. See `licenses/InstrumentSerif-OFL.txt`.
- Geist Sans, Copyright (c) 2023 Vercel, in collaboration with basement.studio, distributed under SIL Open Font License 1.1. See `licenses/Geist-OFL.txt`. The TechText wrapper inherits this font to match the official demo.
- Working Sheet Hand (400) and Working Sheet Marker (700), Copyright (c) 2026
  Acme Sketch preview contributors, distributed under the MIT License. The
  unmodified font files in `fonts/sketch/` are the exact fonts used by the
  [DesignPrompts Sketch reference](https://designprompts.dev/?style=sketch&width=wide&section=hero),
  whose CSS names them `Sketch Working Hand` and `Sketch Working Marker`.
  The complete original
  [font license](https://designprompts.dev/fonts/sketch/LICENSE.txt) is preserved
  in [`licenses/WorkingSheet-MIT.txt`](licenses/WorkingSheet-MIT.txt).
  See [`fonts/sketch/README.md`](fonts/sketch/README.md) for original download
  URLs, exact hashes, and character coverage. These fonts support Latin text;
  unsupported punctuation and Chinese characters use fallback fonts.

Bundled React, React DOM, Three.js, OGL, Motion, and Lucide license notices are retained in the generated `assets/site/*.LEGAL.txt` files where provided by their upstream distributions.
