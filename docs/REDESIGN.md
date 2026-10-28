# Homepage redesign and maintenance

## Scope

The current redesign retains the original academic wording and GitHub Pages address. Its visual system uses the **HOWE** wordmark, **Geist** typography, and neutral white/black surfaces. Desktop composition is the primary target; narrow-screen layouts retain readable content and fallbacks.

The first section places the **Lanyard** portrait on the left and English and Chinese **TechText** names on the right. The original two biography paragraphs follow the names, preserving their links and emphasis. The complete original availability statement and all contact actions remain in this first section. **LightRays** supplies a background enhancement.

The page's section order is **About/contact → News → Education → Internships → Selected Publications**. Its direct section IDs are `top`, `notes`, `education`, `internships`, and `research`; `contact` is inside the first section. Education and internships show all **six entries** as TearTicket cards, with a tearable stub and a Restore ticket action. Publications use HoloCard image effects inside a custom card layout, while titles, venues, authors, and links remain ordinary HTML.

The publication layout's gentle fan, staggered entrance, expansion control, and large-image dialog are inspired by BounceCards. The page uses the custom `PublicationDeck` implementation, not the official BounceCards component. FlexCarousel and ScrollStack are retained as source files and in the first-iteration backup; the current page no longer renders them.

The implementation uses React with an esbuild-based static build. The build prerenders the page into the root `index.html` and writes hashed browser assets to `assets/site/`.

GitHub Pages continues serving **`main` at the repository root**. Generated files are committed with the source; no additional deployment workflow or Pages settings change is required.

## Source and generated files

| Change | Edit |
| --- | --- |
| A paper title, author list, venue, or link | `src/data/profile.js` |
| News, education, internship dates, or mentor links | `src/data/profile.js` |
| Contact links and portrait source | `src/data/profile.js` |
| Original introductory text, availability statement, section order, or layout markup | `src/App.jsx` |
| Neutral themes, Geist typography, hero/ticket layouts, or responsive styles | `src/styles.css` |
| Initial document theme and metadata | `src/index.template.html` |
| Lanyard/TechText integration, TearTicket content, tearing/restoration, and page controls | `src/App.jsx` |
| Publication fan/grid layout, HoloCard image integration, HTML metadata, and image dialog | `src/components/PublicationDeck.jsx` and `src/components/PublicationDeck.css` |
| Page-level graphics fallback | `src/components/graphics/CanvasGuard.jsx` |
| Vendored ticket and image effects | `src/components/reactbits/TearTicket/` and `src/components/reactbits/HoloCard/` |
| Publication image in the deck and dialog | `images/optimized/<publication-id>.webp` |
| Portrait used on both Lanyard faces | `profile.avatar` in `src/data/profile.js`, currently `/images/junhaocheng.png` |
| Official Lanyard band texture | `images/react-bits/lanyard.png` |

The original About paragraphs and availability statement are preserved in `src/data/profile.js` and rendered with their original links and emphasis in `src/App.jsx`. When updating a biographical fact, check both files for the old wording. Do not shorten or rewrite existing academic content as part of a visual-only change.

The portrait is passed directly to Lanyard as both `frontImage` and `backImage`, exactly as the official demo does when only a front image is uploaded. The band uses the unmodified official `lanyard.png`. There is no custom front, back, or strap SVG in this integration. Updating `profile.avatar` updates both photo faces without generating another asset.

Keep vendored registry source separate from page composition and content. Implement page-level behavior through wrappers and supported props and callbacks. An intentional upstream upgrade should update the pinned provenance and integrity record together with the component files. The site-specific `PublicationDeck` is maintained separately from the official `BounceCards` reference source.

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
4. Build and check the site, then inspect the card fan, expansion toggle, large-image dialog, and ordinary paper links at desktop width before checking narrow-screen fallbacks.

Images should show the actual research. Keep diagrams legible and check that labels are not unintentionally cropped by the image treatment. Academic text must remain selectable, accessible HTML rather than being baked into the HoloCard image.

## Behavior and accessibility

Every new page load starts in **light mode**, even if the visitor previously selected dark mode or the operating system prefers it. The header button changes the current page to dark or back to light. Theme selection is not read from or saved to local storage. Do not reintroduce the earlier theme-persistence script in `src/index.template.html`.

The animation preference is separate: it respects the system's reduced-motion setting unless the visitor chooses a motion setting. That motion choice may be retained in browser storage. The portrait has a static photo fallback; experience text remains readable in static ticket cards; publication text and links are present in the prerendered HTML.

Tearing a ticket removes only its decorative stub. Its education or internship content remains visible, and the **Restore ticket** button resets the torn state. Both education entries and all four internships are rendered together rather than hidden behind a scrolling stack.

Publication images use HoloCard while publication metadata stays outside the image effect. Visitors can expand the custom fan into a grid and open a larger image with its full title, venue, author list, and links. Paper and code links retain their ordinary navigation behavior.

Review these interactions after changes:

- Desktop portrait dragging and the English/Chinese TechText treatment; keep the complete introduction and contact actions readable in the first section.
- Ticket stub tearing and restoration, with all six entries still visible.
- Publication fan/grid switching, card/image dialog opening, dismissal, focus return, and paper links.
- A fresh visit in light mode, in-page switching to dark, and a reload returning to light.
- Keyboard access, visible focus, reduced motion, narrow-screen layouts, and WeChat dialog dismissal/QR readability.

`scripts/check.mjs` checks the legacy backup hash, original wording and emphasis, original links, first-section contact placement, section order, default-light source contract, and static assets. Source-integrity checks confirm pinned files, not successful animation behavior. This document does not record completed browser verification of the current revision. Earlier captures in `docs/previews/` describe the first iteration unless they are explicitly refreshed for this layout.

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

Review the revert before pushing. Reverting one commit undoes only that revision; after multiple redesign commits, returning all source to the original version requires reverting the relevant revisions from newest to oldest. Use the two backup branches to compare the intended target. If subsequent changes overlap, resolve the conflicts deliberately and preserve any later work that should remain. Reverting adds a new commit instead of rewriting shared history.

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

The current page integrates Lanyard, TechText, LightRays, TearTicket, HoloCard, and Magnet. `PublicationDeck` implements the site's own fan, expansion, and dialog behavior inspired by BounceCards. Retaining an upstream component file, including BounceCards, FlexCarousel, ScrollStack, or SpotlightCard, does not mean that component is rendered on the current page.

The original homepage's acknowledgments remain in [README.md](../README.md). Dependency versions are recorded in `package.json` and locked in `package-lock.json` for reproducible installation.
