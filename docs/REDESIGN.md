# Homepage redesign and maintenance

## Scope

The current redesign retains the original academic wording and GitHub Pages address. Its visual system uses the **HOWE** wordmark, **Sketch Working Hand / Marker** body typography, and neutral black/white surfaces. The introduction uses the handwritten body face while the animated names retain their technical type treatment. Desktop composition is the primary target; narrow-screen layouts retain readable content and fallbacks.

The first section places the **Lanyard** portrait on the left and English and Chinese **TechText** names on the right. The original two biography paragraphs follow the names, preserving their links and emphasis. The complete original availability statement and all contact actions remain in this first section. **LightRays** stays in one fixed, viewport-sized layer behind every section, rather than ending with the hero.

The page's section order is **About/contact → News → Education → Internships → Selected Publications**. Its direct section IDs are `top`, `notes`, `education`, `internships`, and `research`; `contact` is inside the first section. News shows all ten original updates in one bounded list that scrolls internally. Education and internships show all **six entries** as compact square TearTicket cards, with the original logo on the left, a tearable stub, and a Restore ticket action. Publications use whole-card HoloCard rendering with titles, venues, authors, and links retained as ordinary HTML on the card's front face.

All eight publications are composed as one row. `PublicationDeck` uses `BounceCardsContent`, a content-slot adaptation of the official BounceCards source. The adapter retains the upstream spring, picking, and hover engine and adds the slots and interaction semantics needed for full HTML paper cards. `HoloCardContent` adds an HTML slot to the original HoloCard front face while retaining its shader and motion engine. Both official vendor files are preserved separately; the adapters are documented source adaptations. FlexCarousel and ScrollStack are retained as source files and in the first-iteration backup; the current page no longer renders them.

The implementation uses React with an esbuild-based static build. The build prerenders the page into the root `index.html` and writes hashed browser assets to `assets/site/`.

GitHub Pages continues serving **`main` at the repository root**. Generated files are committed with the source; no additional deployment workflow or Pages settings change is required.

## Source and generated files

| Change | Edit |
| --- | --- |
| A paper title, author list, venue, or link | `src/data/profile.js` |
| News, education, internship dates, or mentor links | `src/data/profile.js` |
| Contact links and portrait source | `src/data/profile.js` |
| Original introductory text, availability statement, section order, or layout markup | `src/App.jsx` |
| Neutral themes, handwritten body typography, hero/ticket layouts, or responsive styles | `src/styles.css` |
| News scroll-container markup and original update rendering | `src/App.jsx` and `src/styles.css` |
| Initial document theme and metadata | `src/index.template.html` |
| Lanyard/TechText integration, TearTicket content, tearing/restoration, and page controls | `src/App.jsx` |
| Single-row publication layout, HoloCard image integration, HTML metadata, and image dialog | `src/components/PublicationDeck.jsx` and `src/components/PublicationDeck.css` |
| BounceCards content slots and HTML-card interaction support | `src/components/adapters/BounceCardsContent.jsx` |
| HoloCard front-face HTML slot and its layout | `src/components/adapters/HoloCardContent.jsx` and `src/components/adapters/HoloCardContent.css` |
| Dark-theme band-texture generation around Lanyard | `src/components/ThemedLanyard.jsx` |
| Page-level graphics fallback | `src/components/graphics/CanvasGuard.jsx` |
| Vendored ticket and image effects | `src/components/reactbits/TearTicket/` and `src/components/reactbits/HoloCard/` |
| Publication image in the deck and dialog | `images/optimized/<publication-id>.webp` |
| Portrait used on both Lanyard faces | `profile.avatar` in `src/data/profile.js`, currently `/images/junhaocheng.png` |
| Official Lanyard band texture | `images/react-bits/lanyard.png` |
| Embedded regular and bold handwritten fonts | `fonts/sketch/WorkingSheet-Hand.ttf` and `fonts/sketch/WorkingSheet-Marker.ttf` |

The original About paragraphs and availability statement are preserved in `src/data/profile.js` and rendered with their original links and emphasis in `src/App.jsx`. When updating a biographical fact, check both files for the old wording. Do not shorten or rewrite existing academic content as part of a visual-only change.

The portrait is passed to Lanyard as both `frontImage` and `backImage`, exactly as the official demo does when only a front image is uploaded. Updating `profile.avatar` updates both photo faces without generating another asset. The original `images/react-bits/lanyard.png` remains unchanged. `src/components/ThemedLanyard.jsx` uses Canvas 2D color inversion to produce a dark-theme texture data URL and passes it through Lanyard's supported `strapImage` prop; it does not modify the official Lanyard renderer or source texture.

Sketch Working Hand supplies regular body text and Sketch Working Marker supplies the bold handwritten weight. The files are embedded locally as `fonts/sketch/WorkingSheet-Hand.ttf` and `fonts/sketch/WorkingSheet-Marker.ttf`. Preserve their provenance in [`fonts/sketch/README.md`](../fonts/sketch/README.md) and complete MIT license in [`licenses/WorkingSheet-MIT.txt`](../licenses/WorkingSheet-MIT.txt). Keep the original introduction's emphasis ranges unchanged when adjusting weights.

Keep vendored registry source separate from page composition and content. Implement page-level behavior through wrappers and supported props and callbacks. An intentional upstream upgrade should update the pinned provenance and integrity record together with the component files. Review local adapter differences separately: `BounceCardsContent` and `HoloCardContent` derive from BounceCards and HoloCard, while the original vendor sources remain intact.

Do not hand-edit generated bundles in `assets/site/` or the generated homepage. Rebuild them from source:

```bash
npm ci
npm run build
npm run check
npm run preview
```

The project requires **Node.js 22+**. The local preview is available at `http://localhost:3000`. It serves the build output, so rebuild and refresh after source changes.

For routine updates after dependencies are already installed, run `npm run build` and `npm run check` before reviewing the preview. The check script runs both `scripts/check.mjs` and `scripts/check-reactbits.mjs`; the latter compares the source and asset hashes recorded in `docs/react-bits-integrity.json`. Commit generated file additions and removals together with source changes so the HTML references the correct hashed assets.

## Publication data

Each publication has a stable `id`, full title, authors, venue, original image path, image description, and links, with other metadata retained in the data module. Keep the `id` stable where possible because the optimized image asset is named from it. The visible cards use the original titles, venues, author lists, and links; do not replace them with newly written summaries during a visual update.

When adding a publication:

1. Add its record to `publications` in `src/data/profile.js`, using verified author order, venue, and URLs.
2. Add the research image and a suitably sized WebP copy at `images/optimized/<id>.webp`.
3. Use descriptive `imageAlt` text and ensure links identify the paper, code, or project correctly.
4. Build and check the site, then inspect the single publication row, BounceCards interactions, large-image dialog, and ordinary paper links at desktop width before checking narrow-screen fallbacks.

Images should show the actual research. The texture builder in `PublicationDeck.jsx` contains each original figure within a card-sized texture and adds theme-colored space for the text area, without cropping or stretching the figure. HoloCard's renderer covers the whole card; the title, venue, author list, and links remain selectable, accessible HTML in the front-face slot rather than being baked into the texture.

## Behavior and accessibility

Every new page load starts in **dark mode**, even if the visitor previously selected light mode or the operating system prefers it. The header button changes the current page to light or back to dark. Theme selection is not read from or saved to local storage. Do not reintroduce a theme-persistence script in `src/index.template.html`.

The animation preference is separate: it respects the system's reduced-motion setting unless the visitor chooses a motion setting. That motion choice may be retained in browser storage. The portrait has a static photo fallback; experience text remains readable in static ticket cards; publication text and links are present in the prerendered HTML.

News uses a single list with internal vertical scrolling, matching the original page's interaction model. All ten original dates, update texts, and links stay in the list; there is no separate earlier-updates disclosure. Keep the scroll container keyboard reachable and preserve clear focus styling.

Tearing a ticket removes only its decorative stub. Its education or internship content remains visible, and the **Restore ticket** button resets the torn state. Both education entries and all four internships are rendered together rather than hidden behind a scrolling stack. The compact square cards retain a left-hand logo; use `object-fit: contain` so wide CityUHK and Lenovo marks remain intact.

The original logo assets are:

| Entry | Logo |
| --- | --- |
| City University of Hong Kong | `images/Schools/CityUHK.png` |
| Sun Yat-sen University | `images/Schools/SYSU.jpg` |
| Kuaishou, Kling Team | `images/kling.jpg` |
| Tencent, ARC Lab | `images/ARC.png` |
| Lenovo Research | `images/Lenovo.png` |
| CIBR | `images/cibr.png` |

Publication figures and HTML metadata share the HoloCard front face and transform together. The single-row card composition supports the BounceCards source engine through the local content adapter. The reading-area guard holds the current card while its text or links are being inspected. Opening a paper shows a larger image with its full title, venue, author list, and links. Paper and code links retain their ordinary navigation behavior. Check that all eight papers remain reachable and that their text is not clipped by overlap or narrow viewports.

Review these interactions after changes:

- Desktop portrait dragging and the English/Chinese TechText treatment; keep the complete introduction and contact actions readable in the first section.
- Internal News scrolling and keyboard access to all ten updates.
- Compact ticket composition, complete logos, stub tearing and restoration, with all six entries still visible.
- The single row containing all eight publications, card interactions, image dialog opening/dismissal, focus return, and paper links.
- A fresh visit in dark mode, in-page switching to light, and a reload returning to dark.
- Keyboard access, visible focus, reduced motion, narrow-screen layouts, and WeChat dialog dismissal/QR readability.

`scripts/check.mjs` checks the legacy backup hash, original wording and emphasis, original links, first-section contact placement, section order, one News scroll region, one publication collection with each paper represented once, default-dark source contract, and static assets. `scripts/check-reactbits.mjs` compares pinned vendor files and five preserved algorithm sections in the BounceCards/HoloCard adapters. Those source checks do not establish successful browser animation behavior. Current desktop captures and the exact browser checks, including the WebGL limitation of the preview environment, are recorded in [`docs/previews/README.md`](previews/README.md). Earlier captures remain archived there by iteration.

## Content provenance and dates

Academic content was migrated from the original `index.html` at commit [`ae00437e6b34b281d2cb2c65498b84f41d4aa461`](https://github.com/donahowe/donahowe.github.io/commit/ae00437e6b34b281d2cb2c65498b84f41d4aa461). The migration includes **8 publications, 10 news entries, 2 education entries, and 4 internships**. The original About paragraphs, complete availability statement, paper titles, author order, venue strings, news text, and education and internship wording and date strings are retained. The redesign does not add or rewrite academic achievements.

Content requiring attention during future updates:

- The original availability statement says **“graduating Fall 2027”**, while the education entry gives **“2025 - 2027 (expected)”**. These original statements are retained; confirm the intended graduation timing before replacing either with a more precise date.
- The Kling internship is marked **“Present”**, and the profile location remains **Shenzhen, Guangdong, China**, as on the original page. Update them when circumstances change.
- VLM-as-Teacher was present as a news item without a complete publication entry. The migration does not fabricate a paper entry or acceptance status.
- The Energy publication had no explicit publication year, so its data record uses `year: null`.
- The AnimeGamer and AutoStudio star counts are historical text within dated news entries, not live counters.
- The original Jing Liao Scholar link has an unusual `&hl/` suffix. The original URL was retained and can be corrected after verifying the intended destination.
- Existing unlinked files, including an older resume, remain in the repository. Their presence does not establish that they are current or linked from the new page.

## Backup inventory

| Backup | Contents |
| --- | --- |
| [`backup/pre-redesign-2026-10-28`](https://github.com/donahowe/donahowe.github.io/tree/backup/pre-redesign-2026-10-28) | Complete pre-redesign repository at the original commit |
| [`backup/react-bits-v1-2026-10-28`](https://github.com/donahowe/donahowe.github.io/tree/backup/react-bits-v1-2026-10-28) | First React Bits iteration, before the HOWE/ticket/publication-deck revision |
| [`backup/howe-v2-2026-10-28`](https://github.com/donahowe/donahowe.github.io/tree/backup/howe-v2-2026-10-28) | Previous HOWE revision at `b105488`, before the default-dark, square-ticket, and single-row publication revision |
| [`ae00437e6b34b281d2cb2c65498b84f41d4aa461`](https://github.com/donahowe/donahowe.github.io/commit/ae00437e6b34b281d2cb2c65498b84f41d4aa461) | Immutable original Git commit |
| [`legacy.html`](https://donahowe.github.io/legacy.html) | Exact original homepage HTML, with its original relative image references |
| Original `images/` files | Original assets retained at their existing paths |

Keep `legacy.html` alongside the original `images/` directory if moving or copying the old page. The preserved page may still reference its original external font and icon providers.

## Restore the original homepage

Use a normal commit or revert so the repository history and the backup remain intact. Start with a clean working tree, or save any unrelated local work before switching branches or restoring files.

### Full redesign rollback

Use a normal revert to roll back a selected redesign revision. Find its SHA in the repository history and replace `COMMIT_SHA` below with that exact SHA:

```bash
git switch main
git pull --ff-only origin main
git log --oneline
git revert COMMIT_SHA
git push origin main
```

Review the revert before pushing. Reverting one commit undoes only that revision; after multiple redesign commits, returning all source to the original version requires reverting the relevant revisions from newest to oldest. Use the backup branches to compare the intended target. If subsequent changes overlap, resolve the conflicts deliberately and preserve any later work that should remain. Reverting adds a new commit instead of rewriting shared history.

### Restore only the original homepage HTML

To serve the original homepage while keeping the newer source and assets in the repository:

```bash
git switch main
git pull --ff-only origin main
git fetch origin
git restore --source=origin/backup/pre-redesign-2026-10-28 -- index.html
git add index.html
git commit -m "Restore original homepage HTML"
git push origin main
```

The original page uses the retained `images/` assets. This restores only the served HTML; it does not roll back the React source. Running `npm run build` afterward will generate the redesigned homepage again. Use the full revert approach if the source should also return to its pre-redesign state.

Neither procedure requires a force push or deletion of the backup branch.

## Upstream components and licenses

React Bits component provenance, the official band texture, and pinned source information are documented in [THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md) and `docs/react-bits-integrity.json`. Preserve those records and [`licenses/react-bits-LICENSE.md`](../licenses/react-bits-LICENSE.md) when updating or redistributing the components. React Bits uses MIT with the Commons Clause; do not describe its code as unrestricted MIT.

The current page integrates Lanyard, TechText, LightRays, TearTicket, Magnet, and the BounceCards/HoloCard content adapters. `PublicationDeck` combines those documented adapters with publication-specific composition and dialog behavior. Preserve the upstream license in adapters derived from its source. Retaining an unused upstream component file, such as FlexCarousel, ScrollStack, or SpotlightCard, does not mean that component is rendered on the current page.

The original homepage's acknowledgments remain in [README.md](../README.md). Dependency versions are recorded in `package.json` and locked in `package-lock.json` for reproducible installation.
