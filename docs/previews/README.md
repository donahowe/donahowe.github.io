# Desktop preview captures

## Current HOWE revision — 2026-10-28

The HOWE captures show the current desktop layout at 1363 × 936. The page
opens in light mode, with the portrait on the left and the English and Chinese
TechText names, original introduction and contact links on the right. The
original News → Education → Internships → Publications sequence is restored.

- [Current first screen](howe-desktop-light-20261028.jpg)
- [Expanded education and internship tickets](howe-education-20261028.jpg)
- [Publication cards](howe-publications-20261028.jpg)

Verified in the desktop browser: light mode after reload even following a dark
selection; both TechText names; contact links within the first screen; the six
expanded tickets; mouse and keyboard ticket tearing, reset and motion-state
restoration; containment of detached ticket stubs; publication grid expansion;
large-image dialog, Escape dismissal, focus return and background scroll lock.
The static checks also verify the original words, emphasis, links and section
order, the untouched legacy page and 17 official source/asset hashes.

The preview browser does not provide WebGL 2. Portrait and HoloCard image
fallbacks are visible in these captures; GPU Lanyard, LightRays and holographic
rendering could not be visually exercised here. TearTicket, TechText and the
page-level publication interactions do run in this environment.

## Archived first redesign

These screenshots were captured from the built homepage on 2026-10-28 at a
1363 × 936 desktop viewport, in its light and dark themes. They are browser
captures, not design mockups.

The preview browser did not provide WebGL 2. The captures therefore show the
static portrait fallback and omit the GPU LightRays background. The production
page loads the original React Bits Lanyard, LightRays, and FlexCarousel when
WebGL is available and animation is enabled. Their GPU rendering and dragging
could not be visually verified in this preview environment.

Verified locally: successful production build, preserved original content and
backup, official source/texture hashes, desktop layout and navigation, theme
switching and persistence, TechText rendering, ScrollStack transforms and
keyboard scrolling, publication selection and links, and WeChat dialog dismissal.

- [Light desktop preview](desktop-light-20261028.jpg)
- [Dark desktop preview](desktop-dark-20261028.jpg)
