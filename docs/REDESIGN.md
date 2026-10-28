# Homepage redesign and maintenance

## Scope

The redesign keeps the original academic wording and GitHub Pages address while introducing a desktop-first layout, light and dark themes, and the requested React Bits interactions. Desktop composition and the official component designs and interactions are the primary targets; narrow-screen layouts retain readable content and fallbacks.

The five requested components use unmodified official JavaScript + CSS registry source. Lanyard, TechText, LightRays, and FlexCarousel use their official default demo settings; ScrollStack uses the official demo's stack settings. Personal content and page-level controls are supplied outside the component source. The implementation uses React with an esbuild-based static build. The build prerenders the page into the root `index.html` and writes hashed browser assets to `assets/site/`.

GitHub Pages continues serving **`main` at the repository root**. Generated files are committed with the source; no additional deployment workflow or Pages settings change is required.

## Source and generated files

| Change | Edit |
| --- | --- |
| A paper title, author list, venue, or link | `src/data/profile.js` |
| News, education, internship dates, or mentor links | `src/data/profile.js` |
| Contact links and portrait source | `src/data/profile.js` |
| Original introductory text, availability statement, section order, or layout markup | `src/App.jsx` |
| Themes, typography, spacing, or mobile layouts | `src/styles.css` |
| Page-level interaction wrappers and supported component props | `src/App.jsx` |
| Publication image in the animated gallery | `images/optimized/<publication-id>.webp` |
| Portrait used on both Lanyard faces | `profile.avatar` in `src/data/profile.js`, currently `/images/junhaocheng.png` |
| Official Lanyard band texture | `images/react-bits/lanyard.png` |

The original About paragraphs and availability statement are preserved in `src/data/profile.js` and rendered with their original links and emphasis in `src/App.jsx`. When updating a biographical fact, check both files for the old wording. Do not shorten or rewrite existing academic content as part of a visual-only change.

The portrait is passed directly to Lanyard as both `frontImage` and `backImage`, exactly as the official demo does when only a front image is uploaded. The band uses the unmodified official `lanyard.png`. There is no custom front, back, or strap SVG in this integration. Updating `profile.avatar` updates both photo faces without generating another asset.

Keep the five registry components unmodified. Implement page composition, fallbacks, and navigation through wrappers and the components' supported props and callbacks. An intentional upstream upgrade should update the pinned provenance and integrity record together with the component files.

Do not hand-edit generated bundles in `assets/site/` or the generated homepage. Rebuild them from source:

```bash
npm ci
npm run build
npm run check
node scripts/check-reactbits.mjs
npm run preview
```

The project requires **Node.js 22+**. The local preview is available at `http://localhost:3000`. It serves the build output, so rebuild and refresh after source changes.

For routine updates after dependencies are already installed, run `npm run build`, `npm run check`, and `node scripts/check-reactbits.mjs` before reviewing the preview. The final command verifies the original component and band-texture hashes recorded in `docs/react-bits-integrity.json`. Commit generated file additions and removals together with source changes so the HTML references the correct hashed assets.

## Publication data

Each publication has a stable `id`, display title, full title, authors, venue, year, original image path, image description, summary, category, and links. Keep the `id` stable where possible because the optimized gallery asset is named from it.

When adding a publication:

1. Add its record to `publications` in `src/data/profile.js`, using verified author order, venue, and URLs.
2. Add the research image and a suitably sized WebP copy at `images/optimized/<id>.webp`.
3. Use descriptive `imageAlt` text and ensure links identify the paper, code, or project correctly.
4. Build and check the site, then inspect the official carousel interactions and publication list at desktop width before checking narrow-screen fallbacks.

Images should show the actual research. Keep diagrams legible and check that labels are not unintentionally cropped by the gallery treatment.

## Behavior and accessibility

The implementation includes light/dark theme selection and an animation preference. It respects the system's reduced-motion preference unless the visitor chooses an animation setting, and retains readable static content when enhanced rendering is unavailable. The portrait has a static photo fallback, and the research section includes conventional publication text and links alongside the animated gallery. These page-level alternatives do not modify the original component source.

When changing the integration, review desktop dragging, clicking, wheel and keyboard controls, focus visibility, and reduced-motion behavior as well as the visual effect. Then check the narrow-screen fallback and confirm that the WeChat dialog can be dismissed and its QR code remains readable.

The build and check commands are maintenance tools, not a claim that every browser or device has been tested. Visual and interaction checks should accompany changes to components or layouts.

## Content provenance and dates

Academic content was migrated from the original `index.html` at commit [`ae00437e6b34b281d2cb2c65498b84f41d4aa461`](https://github.com/donahowe/donahowe.github.io/commit/ae00437e6b34b281d2cb2c65498b84f41d4aa461). The migration includes **8 publications, 10 news entries, 2 education entries, and 4 internships**. The original About paragraphs, complete availability statement, paper titles, author order, venue strings, news text, and education and internship wording and date strings are retained. The redesign does not add or rewrite academic achievements.

Content requiring attention during future updates:

- The original availability statement says **“graduating Fall 2027”**, while the education entry gives **“2025–2027 (expected)”**. These original statements are retained; confirm the intended graduation timing before replacing either with a more precise date.
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
| [`ae00437e6b34b281d2cb2c65498b84f41d4aa461`](https://github.com/donahowe/donahowe.github.io/commit/ae00437e6b34b281d2cb2c65498b84f41d4aa461) | Immutable original Git commit |
| [`legacy.html`](https://donahowe.github.io/legacy.html) | Exact original homepage HTML, with its original relative image references |
| Original `images/` files | Original assets retained at their existing paths |

Keep `legacy.html` alongside the original `images/` directory if moving or copying the old page. The preserved page may still reference its original external font and icon providers.

## Restore the original homepage

Use a normal commit or revert so the repository history and the backup remain intact. Start with a clean working tree, or save any unrelated local work before switching branches or restoring files.

### Full redesign rollback

The preferred full rollback is to revert the redesign commit. Find its SHA in the repository history and replace `COMMIT_SHA` below with that exact SHA:

```bash
git switch main
git pull --ff-only origin main
git log --oneline
git revert COMMIT_SHA
git push origin main
```

Review the revert before pushing. If subsequent changes overlap, resolve the conflicts deliberately and preserve any later work that should remain. This adds a new commit instead of rewriting shared history.

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

The React Bits components, official band texture, pinned upstream revision, and successful shadcn verification commands are documented in [THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md). All ten JSX/CSS files for the five requested components were verified byte-for-byte against both the official registry manifests and files installed by the shadcn CLI. Preserve the provenance record and [`licenses/react-bits-LICENSE.md`](../licenses/react-bits-LICENSE.md) when updating or redistributing the components. React Bits uses MIT with the Commons Clause; do not describe its code as unrestricted MIT.

The original homepage's acknowledgments remain in [README.md](../README.md). Dependency versions are recorded in `package.json` and locked in `package-lock.json` for reproducible installation.
