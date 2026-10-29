# Homepage redesign and maintenance

## Scope

The current redesign retains the original academic wording and GitHub Pages address. Its visual system uses the **HOWE** wordmark, **Sketch Working Hand / Marker** body typography, and neutral black/white surfaces. The introduction uses the handwritten body face while the animated names retain their technical type treatment. Desktop composition is the primary target; narrow-screen layouts retain readable content and fallbacks.

The first section places the **Lanyard** portrait on the left and English and Chinese **TechText** names on the right. The original two biography paragraphs follow the names, preserving their links and emphasis. The complete original availability statement and all contact actions remain in this first section. **LightRays** stays in one fixed, viewport-sized layer behind every section, rather than ending with the hero.

The original academic section order remains **About/contact → News → Education → Internships → Selected Publications**. Its direct section IDs are `top`, `notes`, `education`, `internships`, and `research`; `contact` is inside the first section. The previously added **More about me / 我最近活着的证据** photo wall is currently absent from the rendered page and navigation, while its source and assets remain available for restoration. Headings have no numeric prefix or count. News shows all ten original updates in one bounded list that scrolls internally. Education and internships show all **six entries** as compact square TearTicket cards, with a larger original logo on the left, the original date on the tearable side strip, and a Restore ticket action. Education titles wrap after `@` without changing their words. Publications use whole-card HoloCard rendering with titles, venues, authors, and links retained as ordinary HTML on the card's front face.

The Lanyard now shows the original portrait on its front and `/images/junhaocheng2.png` on its back. Clicking the card flips it; the non-WebGL fallback is also a two-image toggle. The small MPhil eyebrow above the animated names is no longer displayed.

All eight publications are composed as one more widely spaced row. Their presentation uses silver metallic borders, the official colorful edge sparkle, and prominent text-only venue labels using the existing venue strings. Selecting a paper enlarges that same card design. `PublicationDeck` uses `BounceCardsContent`, a content-slot adaptation of the official BounceCards source. The adapter retains the upstream spring, picking, and hover engine and adds the slots and interaction semantics needed for full HTML paper cards. `HoloCardContent` adds an HTML slot to the original HoloCard front face while retaining its shader and motion engine. Both official vendor files are preserved separately; the adapters are documented source adaptations. FlexCarousel and ScrollStack are retained as source files and in the first-iteration backup; the current page no longer renders them.

The implementation uses React with an esbuild-based static build. The build prerenders the page into the root `index.html` and writes hashed browser assets to `assets/site/`.

GitHub Pages continues serving **`main` at the repository root**. Generated files are committed with the source; no additional deployment workflow or Pages settings change is required.

## Source and generated files

| Change | Edit |
| --- | --- |
| A paper title, author list, venue, or link | `src/data/profile.js` |
| News, education, internship dates, or mentor links | `src/data/profile.js` |
| Contact links and portrait source | `src/data/profile.js` |
| Archived personal photo-wall entries and descriptions | `src/data/lifePhotos.js` |
| Archived photo-wall placeholders | `images/life/` |
| Disabled DriftWall integration and the static photo-wall fallback | `src/components/LifeGallery.jsx` and `src/components/LifeGallery.css` |
| Original introductory text, availability statement, section order, or layout markup | `src/App.jsx` |
| Neutral themes, handwritten body typography, hero/ticket layouts, or responsive styles | `src/styles.css` |
| News scroll-container markup and original update rendering | `src/App.jsx` and `src/styles.css` |
| Initial document theme and metadata | `src/index.template.html` |
| Lanyard/TechText integration, ticket dates, education title wrapping, tearing/restoration, and page controls | `src/App.jsx` |
| Single-row publication layout, HoloCard integration, silver edge material, venue labels, and same-card enlargement | `src/components/PublicationDeck.jsx` and `src/components/PublicationDeck.css` |
| BounceCards content slots and HTML-card interaction support | `src/components/adapters/BounceCardsContent.jsx` |
| HoloCard front-face HTML slot and its layout | `src/components/adapters/HoloCardContent.jsx` and `src/components/adapters/HoloCardContent.css` |
| Dark-theme band-texture generation around Lanyard | `src/components/ThemedLanyard.jsx` |
| Page-level graphics fallback | `src/components/graphics/CanvasGuard.jsx` |
| Vendored ticket and image effects | `src/components/reactbits/TearTicket/` and `src/components/reactbits/HoloCard/` |
| Official drifting photo-wall component | `src/components/reactbits/DriftWall/` |
| Publication image selection in the deck and enlarged card | `figureSource` in `src/components/PublicationDeck.jsx` |
| Most publication figures | `images/optimized/<publication-id>.webp` |
| Original transparent figures used by VisDiaHalBench and DKFormer | `images/publications/visdiahalbench.png` and `images/publications/dkformer.png` |
| Front and reverse Lanyard portraits | `profile.avatar` and `profile.avatarBack` in `src/data/profile.js` |
| Official Lanyard band texture | `images/react-bits/lanyard.png` |
| Embedded regular and bold handwritten fonts | `fonts/sketch/WorkingSheet-Hand.ttf` and `fonts/sketch/WorkingSheet-Marker.ttf` |

The original About paragraphs and availability statement are preserved in `src/data/profile.js` and rendered with their original links and emphasis in `src/App.jsx`. When updating a biographical fact, check both files for the old wording. Do not shorten or rewrite existing academic content as part of a visual-only change.

`profile.avatar` (`/images/junhaocheng.png`) and `profile.avatarBack` (`/images/junhaocheng2.png`) are passed separately to Lanyard's supported `frontImage` and `backImage` props. The existing short-click gesture flips between faces; a keyboard-accessible photo button switches images when the WebGL canvas is unavailable. The original `images/react-bits/lanyard.png` remains unchanged. `src/components/ThemedLanyard.jsx` uses Canvas 2D color inversion to produce a dark-theme texture data URL and passes it through Lanyard's supported `strapImage` prop; it does not modify the official Lanyard renderer or source texture.

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
2. Add the research image and a suitably sized WebP copy at `images/optimized/<id>.webp`. Preserve transparency when converting; an original PNG can be selected through `figureSource` where needed.
3. Use descriptive `imageAlt` text and ensure links identify the paper, code, or project correctly.
4. Build and check the site, then inspect the single publication row, BounceCards interactions, same-card enlargement, and ordinary paper links at desktop width before checking narrow-screen fallbacks.

Images should show the actual research. The texture builder in `PublicationDeck.jsx` contains each figure within a card-sized texture and adds theme-colored space for the text area, without cropping or stretching the figure. VisDiaHalBench and DKFormer use the original PNG paths from their `image` fields because their earlier optimized RGB copies did not retain transparency. Both the canvas texture and static CSS image presentation provide a white backing. The original PNG files are unchanged; other figures continue using their optimized WebP paths.

Silver framing comes from the generated texture. The HoloCard public material props are `intensity={0}`, `edgeSparkle={0.8}`, `frame={4}`, and `glare={0}`: the colorful edge sparkle uses the official default setting while full-surface foil and glare remain disabled. These presentation choices are customized through public props; the vendor shader and motion algorithms remain preserved. HoloCard's renderer covers the whole card, with the title, text-only venue label, author list, and links kept as selectable, accessible HTML in the front-face slot rather than being baked into the texture.

## Archived personal photo wall (not currently displayed)

The former `section#life` (heading **More about me** with **我最近活着的证据**) has been removed from `src/App.jsx` and header navigation. Keep the original five academic sections in order, with publications immediately before the footer. The complete previous page remains in `backup/howe-v4-before-final-polish-2026-10-29`.

`src/components/LifeGallery.jsx` supplies the photos to the unchanged official DriftWall component. DriftWall provides the drifting wall, pointer parallax, and hover lift. A static scrollable photo grid preserves images, descriptions, and original-image links when animation is disabled or unavailable.

Photo entries live in `src/data/lifePhotos.js`, independently of academic profile data:

| Field | Purpose |
| --- | --- |
| `id` | Stable, unique photo identifier |
| `src` | Display image path, normally `/images/life/...` |
| `alt` | Description of the actual image |
| `width`, `height` | Actual image dimensions for layout |
| `fullSrc` | Optional larger image path |

To replace the placeholders, add the supplied photos to `images/life/` and update the corresponding entries. Keep descriptions tied to the actual images; placeholder graphics do not establish personal events, locations, or dates. The planned selection is approximately twenty photos, and entries can be added or removed without changing an asserted gallery size.

If re-enabling the gallery later, run the normal build and checks after replacing photos, then review cropping, readable descriptions, navigation, and motion preferences. The content checker currently asserts that the five academic sections are the only direct sections inside `main`.

## Behavior and accessibility

Every new page load starts in **dark mode**, even if the visitor previously selected light mode or the operating system prefers it. The header button changes the current page to light or back to dark. Theme selection is not read from or saved to local storage. Do not reintroduce a theme-persistence script in `src/index.template.html`.

The animation preference is separate: it respects the system's reduced-motion setting unless the visitor chooses a motion setting. That motion choice may be retained in browser storage. The portrait has a static photo fallback; experience text remains readable in static ticket cards; publication text and links are present in the prerendered HTML.

News uses a single list with internal vertical scrolling, matching the original page's interaction model. All ten original dates, update texts, and links stay in the list; there is no separate earlier-updates disclosure. Keep the scroll container keyboard reachable and preserve clear focus styling.

Each intact ticket's original date appears once on its tearable side strip. The strip carries meaningful text, so its date must remain accessible rather than being hidden as decoration. Tearing detaches the strip visually; the title, logo, and mentor/supervisor content stay on the main card, and a screen-reader-only date preserves the information while the original torn strip is hidden from assistive technology. **Restore ticket** brings the strip back. The idle ticket has no extra drag-instruction caption or reserved footer space. Both education entries and all four internships remain visible. Larger left-hand logos use `object-fit: contain` so wide CityUHK and Lenovo marks stay intact.

Only the two education titles have an explicit line break immediately after `@`. Their words, punctuation, and links remain the original ones. Internship titles retain their natural wrapping. The content check normalizes a rendered line break to a space so a visual wrap does not look like a text change.

The original logo assets are:

| Entry | Logo |
| --- | --- |
| City University of Hong Kong | `images/Schools/CityUHK.png` |
| Sun Yat-sen University | `images/Schools/SYSU.jpg` |
| Kuaishou, Kling Team | `images/kling.jpg` |
| Tencent, ARC Lab | `images/ARC.png` |
| Lenovo Research | `images/Lenovo.png` |
| CIBR | `images/cibr.png` |

Publication figures and HTML metadata share the HoloCard front face and transform together. The single-row card composition supports the BounceCards source engine through the local content adapter. The reading-area guard holds the current card while its text or links are being inspected. Opening a paper enlarges the same card composition, including its image, original title, highlighted venue, author list, and links. The toolbar omits the redundant paper-count label. Paper and code links retain their ordinary navigation behavior. Check that all eight papers remain reachable and that their text is not clipped by overlap or narrow viewports.

Review these interactions after changes:

- Desktop portrait dragging, clicking to flip between both photos, and the English/Chinese TechText treatment; keep the complete introduction and contact actions readable in the first section.
- Internal News scrolling and keyboard access to all ten updates.
- Compact ticket composition, complete logos, one original date per side strip, education title wrapping, and tearing/restoration.
- The single row containing all eight publications, card interactions, same-card enlargement/dismissal, focus return, and paper links.
- Publications are followed by the footer; no personal photo-wall navigation or heading appears.
- A fresh visit in dark mode, in-page switching to light, and a reload returning to dark.
- Keyboard access, visible focus, reduced motion, narrow-screen layouts, and WeChat dialog dismissal/QR readability.

`scripts/check.mjs` checks the legacy backup hash, original wording and emphasis, original links, first-section contact placement, the unchanged five-section academic order, the two distinct portrait sources, unnumbered headings, the original date once on each intact ticket's side strip, education title wrapping, one News scroll region, one publication collection with each paper represented once, default-dark source contract, and static assets. `scripts/check-reactbits.mjs` compares pinned vendor files and five preserved algorithm sections in the BounceCards/HoloCard adapters. Those source checks do not establish successful browser animation behavior. Browser captures and the checks associated with each revision are recorded in [`docs/previews/README.md`](previews/README.md); earlier captures are not evidence of verification for this iteration.

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
| [`backup/howe-v3-2026-10-28`](https://github.com/donahowe/donahowe.github.io/tree/backup/howe-v3-2026-10-28) | HOWE revision at `c4cf1c3`, before side-strip dates, silver publication edges, and same-card enlargement |
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

The current page integrates Lanyard, TechText, LightRays, TearTicket, Magnet, and the BounceCards/HoloCard content adapters. `PublicationDeck` combines those documented adapters with publication-specific composition and dialog behavior. Preserve the upstream license in adapters derived from its source. Retaining an unused upstream component file, such as DriftWall, FlexCarousel, ScrollStack, or SpotlightCard, does not mean that component is rendered on the current page.

The original homepage's acknowledgments remain in [README.md](../README.md). Dependency versions are recorded in `package.json` and locked in `package-lock.json` for reproducible installation.
