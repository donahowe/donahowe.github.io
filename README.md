# Junhao Cheng · Personal homepage

[Visit the homepage](https://donahowe.github.io/) · [View the original design](https://donahowe.github.io/legacy.html)

An academic portfolio for **Junhao Cheng (程钧豪)**, an MPhil student at City University of Hong Kong working on Interactive AI, video reasoning, and video generation.

The 2026 redesign is designed primarily for desktop viewing, with light and dark themes and the original academic wording retained. It uses the official React Bits Lanyard, TechText, LightRays, FlexCarousel, and ScrollStack implementations and their demo settings. The five components' JSX and CSS files are unmodified registry source, verified against files installed by the official shadcn CLI. Page layout, content, theme controls, and accessible alternatives live outside those components.

The Lanyard displays the original portrait on both faces and uses React Bits' original band texture, matching the official demo's behavior when a front photo is uploaded. Publication details also remain available as ordinary HTML, including when JavaScript is unavailable.

## Develop and update

Use **Node.js 22 or newer** and npm. From a checkout of this repository:

```bash
npm ci
npm run build
npm run check
node scripts/check-reactbits.mjs
npm run preview
```

The preview serves the generated site at `http://localhost:3000`. Run `npm run build` again after editing source files, then refresh the preview.

| File or directory | Purpose |
| --- | --- |
| `src/data/profile.js` | Publications, news, education, internships, contact links, and profile metadata |
| `src/App.jsx` | Page structure, original introductory copy, and interaction wrappers |
| `src/styles.css` | Typography, colors, layouts, and responsive styles |
| `src/components/reactbits/` | Official React Bits component source |
| `images/` | Original portrait, research figures, logos, and other existing assets |
| `images/optimized/` | Optimized publication figures |
| `images/react-bits/lanyard.png` | Unmodified official React Bits band texture |
| `scripts/` | Static build, checks, and local preview server |
| `index.html` | Generated, prerendered homepage served by GitHub Pages |
| `assets/site/` | Generated JavaScript, CSS, and supporting files |
| `legacy.html` | Exact original homepage HTML, using the original image paths |
| `docs/REDESIGN.md` | Maintenance notes, backup details, and restoration steps |
| `docs/react-bits-integrity.json` | Pinned hashes for the official component source and band texture |

Edit source files rather than the generated `index.html` or bundles. Most academic metadata lives in `src/data/profile.js`; the original introductory and availability sentences in `src/App.jsx` should be updated alongside it when those facts change. Preserve the original wording unless a content update is intended. Publication figures use `images/optimized/<publication-id>.webp` in the carousel, so a new or renamed publication needs a matching optimized image. The portrait comes directly from `profile.avatar`; there is no separate badge artwork to regenerate.

## Publish to GitHub Pages

The repository retains its existing **`main` branch / root directory** deployment. The built HTML and assets are committed to Git, so GitHub Pages does not need to install npm dependencies or run a custom workflow.

After making changes:

1. Run `npm run build`, `npm run check`, and `node scripts/check-reactbits.mjs`.
2. Review the desktop layout, component interactions, and both themes in the local preview, then check narrow-screen fallbacks.
3. Review and commit the source changes together with the generated `index.html` and `assets/site/` changes.
4. Push to `main` through your normal Git workflow.

GitHub Pages publishes the committed files. Changing source files without rebuilding does not update the served homepage.

## Original design and backup

The original homepage was preserved before the redesign:

- **Complete repository backup:** [`backup/pre-redesign-2026-10-28`](https://github.com/donahowe/donahowe.github.io/tree/backup/pre-redesign-2026-10-28)
- **Original commit:** [`ae00437e6b34b281d2cb2c65498b84f41d4aa461`](https://github.com/donahowe/donahowe.github.io/commit/ae00437e6b34b281d2cb2c65498b84f41d4aa461)
- **Browsable original homepage:** [`legacy.html`](https://donahowe.github.io/legacy.html)

The original images and other repository assets remain available. See [the restoration guide](docs/REDESIGN.md#restore-the-original-homepage) for a normal, history-preserving Git revert or an HTML-only restore.

## Credits and licenses

The animated components and band texture come from [React Bits](https://github.com/DavidHDev/react-bits) by David Haz. The five requested components retain the exact official JavaScript + CSS registry files, including their original motion and rendering behavior. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for the pinned revision and verified installation commands, and [`licenses/react-bits-LICENSE.md`](licenses/react-bits-LICENSE.md) for the complete upstream license. The React Bits license includes the Commons Clause; the repository's own license does not replace that upstream license.

The visual direction draws on the botanical style reference at [DesignPrompts](https://designprompts.dev/?style=botanical&width=wide&section=hero).

The original homepage credits [Yi Ren](https://rayeren.github.io/) and AcadHomepage. Its acknowledgments are retained here:

- AcadHomepage incorporates Font Awesome, distributed under the SIL OFL 1.1 and MIT licenses.
- AcadHomepage is influenced by [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes), distributed under the MIT license.
- AcadHomepage is influenced by [Academic Pages](https://github.com/academicpages/academicpages.github.io), distributed under the MIT license.
