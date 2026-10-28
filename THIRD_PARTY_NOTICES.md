# Third-party notices

## React Bits

The components in `src/components/reactbits/` come from
[React Bits](https://github.com/DavidHDev/react-bits), by David Haz. The five
requested components—Lanyard, TechText, LightRays, FlexCarousel, and ScrollStack—
retain the unmodified official JavaScript + CSS registry files. The additional
Magnet and SpotlightCard components also retain their upstream implementations.

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
```

All ten installed JSX/CSS files were byte-identical to the source contents in
the corresponding [`public/r/*-JS-CSS.json` registry manifests](https://github.com/DavidHDev/react-bits/tree/e12c22192ac7b4b452c5e2feb9b586d74765d696/public/r)
at the pinned upstream revision above. The website integrates these files
without local source patches. Page layout, personal content, theme selection,
navigation controls, and fallbacks are implemented separately in the application.

The source and texture hashes are recorded in
[`docs/react-bits-integrity.json`](docs/react-bits-integrity.json). Run
`node scripts/check-reactbits.mjs` to verify that the ten component files and
official band texture still match that record.

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

Bundled React, React DOM, Three.js, OGL, and Lucide license notices are retained in the generated `assets/site/*.LEGAL.txt` files where provided by their upstream distributions.

- Geist Sans, Copyright (c) 2023 Vercel, in collaboration with basement.studio, distributed under SIL Open Font License 1.1. See `licenses/Geist-OFL.txt`. The TechText wrapper inherits this font to match the official demo.
