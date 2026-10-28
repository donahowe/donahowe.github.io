# Desktop preview captures

## Current HOWE revision 4 — 2026-10-28

- [Ticket dates, larger logos, and education title wrapping](howe-v4-tickets-20261028.jpg)
- [Silver publication cards and text-only venue labels](howe-v4-publications-20261028.jpg)
- [The same publication card enlarged](howe-v4-paper-enlarged-20261028.jpg)
- [More about me placeholder photo wall](howe-v4-life-20261028.jpg)

Desktop review confirmed the revised ticket presentation: the original dates
on the side strips, larger school/company logos, education titles wrapping
after `@`, and removal of the idle drag-instruction caption.

The publication review confirmed the silver edge treatment and prominent
original venue labels, complete content without overflow on the longest card,
and enlargement of the same card design. Escape and the close control dismiss
the enlarged card, with focus and page scrolling restored afterward.
The transparent VisDiaHalBench and DKFormer figures both render against a
white background. All eight venue labels contain only their original text,
with no SVG icons. The overview and enlarged VisDiaHalBench captures above
were refreshed after these changes.

The **More about me / 我最近活着的证据** section was verified at the end of
`main`, with its navigation link working and the academic order unchanged.
All eight local placeholder photos loaded. At the tested desktop size, the
official DriftWall rendered five columns in a 600px-high wall, repeating the
eight images into 46 tiles for continuous looping.

Track transforms continued updating during observation. Pointer hover raised
the active tile to `translateZ(64px)` at opacity 1 and paused its column;
keyboard Tab focus selected the corresponding active tile. Turning Motion off
switched to an independently scrollable grid containing all eight images, and
turning it back on restored the wall. Dark/light theme switching passed, the
wall's outer container remained transparent, and the document had no horizontal
overflow.

These are placeholder-photo checks. Replacing them with the forthcoming
personal collection still requires reviewing the new images and descriptions.

The current cloud browser does not provide WebGL 2. DriftWall's CSS interaction
was exercised, as were the card's DOM interactions and static material fallback.
The restored HoloCard edge-sparkle shader itself could not be visually verified
in this environment, nor could the GPU lanyard or LightRays rendering. The
static integrity checks pass for 19 official source/asset files and five
preserved adapter algorithm sections; those checks are separate from browser
rendering verification.

## Archived HOWE revision 3 — 2026-10-28

Captured from the built homepage at 1363 × 936. The page opens in dark mode
and uses the exact Working Sheet Hand / Marker fonts from the requested
DesignPrompts Sketch reference. Original academic text, emphasis, links, and
section order remain unchanged.

- [Default-dark first screen](howe-v3-desktop-dark-20261028.jpg)
- [Compact square education and internship tickets](howe-v3-tickets-20261028.jpg)
- [One-row publication fan with an expanded paper](howe-v3-publications-20261028.jpg)
- [Internally scrollable News column](howe-v3-news-20261028.jpg)

Verified in the desktop browser: dark mode after reloading a light selection;
English and Chinese TechText; full introduction and contacts in the first
screen; one fixed background layer at different scroll positions; all six
compact tickets with uncropped logos, mouse and keyboard tearing and restoration, with detached stubs contained; the
280px News region reaching its last update using its own scroll position;
one initial eight-card overlapping BounceCards fan; pointer and keyboard
activation that separates and raises a card; complete longest paper title and
unclipped metadata; the actual Paper link opening ACL Anthology without also
opening the dialog; dialog Escape dismissal, focus return, and scroll-lock
restoration; bounded, mutually exclusive contact Magnet movement without an
additional button transform; and WeChat opening/closing with scrollbar
compensation and focus return.

The browser does not provide WebGL 2. These captures show the static portrait
and HoloCard artwork fallback, although TechText, TearTicket, BounceCards and
HoloCard's DOM tilt run. The 3D lanyard, shader foil/glitter and LightRays GPU
rendering could not be visually checked here. The official renderer sources
are retained; 17 vendor source/asset hashes and five preserved adapter algorithm
sections pass independent checks. HoloCard material props use upstream defaults.
Lanyard theme inversion changes only the supplied strap texture, after the
texture is ready, leaving the official physics instance and source intact.

## Archived HOWE revision 2 — 2026-10-28

These earlier HOWE captures show the revision-2 desktop layout at 1363 × 936. The page
opens in light mode, with the portrait on the left and the English and Chinese
TechText names, original introduction and contact links on the right. The
original News → Education → Internships → Publications sequence is restored.

- [Revision-2 first screen](howe-desktop-light-20261028.jpg)
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
