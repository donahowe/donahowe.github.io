# Third-party notices

## React Bits

The components in `src/components/reactbits/` come from
[React Bits](https://github.com/DavidHDev/react-bits), by David Haz. Lanyard,
TechText, LightRays, TearTicket, HoloCard, BounceCards, FlexCarousel, and
ScrollStack retain the unmodified official JavaScript + CSS registry files.
Magnet and SpotlightCard also retain their upstream implementations.

The current page uses TearTicket for individual education and internship
entries and HoloCard for the image layer of publication cards. PublicationDeck
is a separate, website-specific layout inspired by BounceCards; it does not
render the official BounceCards component. The original BounceCards,
FlexCarousel, and ScrollStack source files remain in the repository but are
not used by the current page.

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
  lighting, and physical parameters. Only the personal front/back photo and
  original official band texture are supplied as image props.
- **TechText:** unmodified official source in separate English and Chinese name
  instances. The page uses the component's public `align` and `fontSize` props
  for composition; it does not patch the renderer or typography calculations.
- **TearTicket:** unmodified official source. Individual institutions and roles
  are supplied through its supported `children` and `stub` slots. Dimensions,
  theme colors, and other presentation choices use its public props. Its
  original tear interaction is retained.
- **HoloCard:** unmodified official source renders each publication's image
  layer. Titles, author lists, venues, and links remain normal HTML in the
  surrounding publication card.
- **PublicationDeck:** a page-level adaptation inspired by BounceCards' fanned
  arrangement, bounce, and hover separation. Its publication grouping and
  click-to-expand behavior are application code, not features attributed to
  the official BounceCards implementation.

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

Runtime dependencies are declared in `package.json`. Their license notices are
available with their installed packages and upstream repositories.

## Self-hosted fonts

- Manrope Variable, Copyright 2019 The Manrope Project Authors, distributed under the SIL Open Font License 1.1. See `licenses/Manrope-OFL.txt`.
- Instrument Serif, Copyright 2022 The Instrument Serif Project Authors, distributed under the SIL Open Font License 1.1. See `licenses/InstrumentSerif-OFL.txt`.
- Geist Sans, Copyright (c) 2023 Vercel, in collaboration with basement.studio, distributed under SIL Open Font License 1.1. See `licenses/Geist-OFL.txt`. The TechText wrapper inherits this font to match the official demo.

Bundled React, React DOM, Three.js, OGL, Motion, and Lucide license notices are retained in the generated `assets/site/*.LEGAL.txt` files where provided by their upstream distributions.
