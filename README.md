# HOWE · Junhao Cheng

[Visit the homepage](https://donahowe.github.io/) · [View the original design](https://donahowe.github.io/legacy.html)

An academic portfolio for **Junhao Cheng (程钧豪)**, an MPhil student at City University of Hong Kong working on Interactive AI, video reasoning, and video generation.

The current design uses the **HOWE** wordmark, Sketch Working handwritten typography for the body and introduction, and a neutral black/white palette. The animated name treatment keeps its technical type styling. Every new page load starts in **dark mode**. The header button switches to light mode for the current page; theme choices are neither restored from nor saved to browser storage, and the initial theme does not follow the operating system.

On desktop, the first section places the draggable **Lanyard** portrait on the left and English/Chinese **TechText** names on the right. The complete original introduction follows the names, with its original links and emphasis, then the original availability statement and email, Scholar, GitHub, and WeChat contacts. The remaining page follows the original reading order: **News → Education → Internships → Selected Publications**.

News retains all ten original updates inside one bounded, internally scrollable list. All six education and internship entries are visible as compact square **TearTicket** cards with their original school/company logos on the left. Visitors can tear a ticket's stub and use **Restore ticket** to bring it back. Publication cards share **HoloCard** rendering across the whole card, with ordinary HTML titles, venues, authors, and links on the same front face. Publication details remain in the prerendered HTML when JavaScript is unavailable.

All eight publications belong to one row. The card interaction uses `BounceCardsContent`, a content-slot adaptation of the official **BounceCards** source that retains its spring, picking, and hover engine while supporting complete HTML paper cards. `HoloCardContent` adds a front-face HTML slot to HoloCard while retaining its shaders and motion engine. The real research figure is contained within a card-sized texture without cropping, and a dialog opens the larger image and metadata.

The Lanyard displays the original portrait on both faces. Its original band texture is retained; a page-level adapter generates a theme-appropriate texture for dark mode without modifying the source asset or vendor component. **LightRays** stays in one fixed, viewport-sized background layer throughout the page. The former FlexCarousel and ScrollStack sources are retained in the repository but are no longer rendered by the current page.

## Develop and update

Use **Node.js 22 or newer** and npm. From a checkout of this repository:

```bash
npm ci
npm run build
npm run check
npm run preview
```

The preview serves the generated site at `http://localhost:3000`. Run `npm run build` again after editing source files, then refresh the preview.

| File or directory | Purpose |
| --- | --- |
| `src/data/profile.js` | Publications, news, education, internships, contact links, and profile metadata |
| `src/App.jsx` | Page structure, original introductory copy, and interaction wrappers |
| `src/styles.css` | Handwritten body typography, neutral themes, hero/ticket layouts, and responsive styles |
| `src/index.template.html` | Static document metadata and the initial dark theme |
| `src/components/PublicationDeck.jsx` and `PublicationDeck.css` | Single-row publication composition, HoloCard integration, text, links, and image dialog |
| `src/components/adapters/BounceCardsContent.jsx` | Content-slot adaptation of the official BounceCards interaction engine |
| `src/components/adapters/HoloCardContent.jsx` and `HoloCardContent.css` | Semantic HTML on HoloCard's original front-face renderer |
| `src/components/ThemedLanyard.jsx` | Theme-aware band-texture generation around the unchanged Lanyard component |
| `src/components/graphics/CanvasGuard.jsx` | Page-level rendering fallback |
| `src/components/reactbits/` | Vendored React Bits source, including Lanyard, TechText, LightRays, TearTicket, and HoloCard |
| `images/` | Original portrait, research figures, logos, and other existing assets |
| `images/optimized/` | Optimized publication figures |
| `images/react-bits/lanyard.png` | Unmodified official React Bits band texture |
| `fonts/sketch/WorkingSheet-Hand.ttf` and `WorkingSheet-Marker.ttf` | Embedded regular and bold handwritten fonts |
| `scripts/` | Static build, checks, and local preview server |
| `index.html` | Generated, prerendered homepage served by GitHub Pages |
| `assets/site/` | Generated JavaScript, CSS, and supporting files |
| `legacy.html` | Exact original homepage HTML, using the original image paths |
| `docs/REDESIGN.md` | Maintenance notes, backup details, and restoration steps |
| `docs/react-bits-integrity.json` | Pinned hashes for the official component source and band texture |

Edit source files rather than the generated `index.html` or bundles. Most academic metadata lives in `src/data/profile.js`; the original introductory and availability sentences in `src/App.jsx` should be updated alongside it when those facts change. Preserve the original wording unless a content update is intended. Publication figures use `images/optimized/<publication-id>.webp` in the deck, so a new or renamed publication needs a matching optimized image. The portrait comes directly from `profile.avatar`; there is no separate badge artwork to regenerate.

`npm run check` runs the static content/layout-contract checks, pinned React Bits source-integrity checks, and comparisons of the preserved BounceCards/HoloCard algorithm sections in their content adapters. It does not establish that browser animations or pointer interactions have been verified.

## Publish to GitHub Pages

The repository retains its existing **`main` branch / root directory** deployment. The built HTML and assets are committed to Git, so GitHub Pages does not need to install npm dependencies or run a custom workflow.

After making changes:

1. Run `npm run build` and `npm run check`.
2. Review the desktop layout, bilingual names, News scrolling, ticket logos/tearing/restoration, publication interactions/dialogs, and both themes in the local preview, then check narrow-screen fallbacks and reduced motion.
3. Review and commit the source changes together with the generated `index.html` and `assets/site/` changes.
4. Push to `main` through your normal Git workflow.

GitHub Pages publishes the committed files. Changing source files without rebuilding does not update the served homepage.

## Original design and backup

The original homepage was preserved before the redesign:

- **Complete repository backup:** [`backup/pre-redesign-2026-10-28`](https://github.com/donahowe/donahowe.github.io/tree/backup/pre-redesign-2026-10-28)
- **Original commit:** [`ae00437e6b34b281d2cb2c65498b84f41d4aa461`](https://github.com/donahowe/donahowe.github.io/commit/ae00437e6b34b281d2cb2c65498b84f41d4aa461)
- **Browsable original homepage:** [`legacy.html`](https://donahowe.github.io/legacy.html)
- **First React Bits iteration:** [`backup/react-bits-v1-2026-10-28`](https://github.com/donahowe/donahowe.github.io/tree/backup/react-bits-v1-2026-10-28)
- **Previous HOWE iteration:** [`backup/howe-v2-2026-10-28`](https://github.com/donahowe/donahowe.github.io/tree/backup/howe-v2-2026-10-28)

The original images and other repository assets remain available. See [the restoration guide](docs/REDESIGN.md#restore-the-original-homepage) for a normal, history-preserving Git revert or an HTML-only restore.

## Credits and licenses

The animated components and band texture come from [React Bits](https://github.com/DavidHDev/react-bits) by David Haz. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for source provenance and [`licenses/react-bits-LICENSE.md`](licenses/react-bits-LICENSE.md) for the complete upstream license. Preserve upstream source and license records when changing the integration. The React Bits license includes the Commons Clause; the repository's own license does not replace that upstream license.

The embedded Sketch Working Hand and Marker fonts provide regular and bold handwritten text. Their provenance is recorded in [`fonts/sketch/README.md`](fonts/sketch/README.md), and their complete MIT license is preserved in [`licenses/WorkingSheet-MIT.txt`](licenses/WorkingSheet-MIT.txt).

`PublicationDeck` integrates the local `BounceCardsContent` and `HoloCardContent` adapters. They derive from official source, adding content slots and interaction support for real paper metadata. They are documented source adaptations, while the original vendor files remain preserved separately. Academic titles, venues, authors, and links remain HTML.

The original homepage credits [Yi Ren](https://rayeren.github.io/) and AcadHomepage. Its acknowledgments are retained here:

- AcadHomepage incorporates Font Awesome, distributed under the SIL OFL 1.1 and MIT licenses.
- AcadHomepage is influenced by [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes), distributed under the MIT license.
- AcadHomepage is influenced by [Academic Pages](https://github.com/academicpages/academicpages.github.io), distributed under the MIT license.
