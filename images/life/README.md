# More about me — photo collection

The eight `placeholder-*.jpg` files are temporary demonstration photos. They
are not Howe's personal photographs or evidence of places Howe has visited.
Replace them when the personal collection is supplied.

## Add the personal collection

1. Put the photos in this directory using stable filenames, for example
   `life-01.jpg` through `life-20.jpg`. Keep a separate copy of the originals.
2. Update `src/data/lifePhotos.js` in the order you want the photos to appear.
   Each entry accepts `id`, `src`, `alt`, `width`, `height`, and optional
   `fullSrc`. All paths start with `/images/life/`.
3. Use `alt` to describe the actual photo. A date, place, or personal caption
   should only be included when the owner supplies it.
4. If a separate large image is available, set `fullSrc` to it. Otherwise
   opening a photo uses `src`. The official DriftWall keeps its original
   hover/focus lift, alternating column drift, and perspective interaction.
5. Run `npm run build` and `npm run check`. GitHub Pages serves the built
   `index.html` and `assets/site/` alongside these image files.

The gallery reads the array and is not limited to the initial eight images.
The pending collection of approximately twenty photos can replace it directly.

## Placeholder provenance

These local JPEGs use IDs from the official React Bits DriftWall demonstration,
downloaded from [Lorem Picsum](https://picsum.photos/). The source photos are
provided under the [Unsplash license](https://unsplash.com/license).
`placeholder-sources.json` records each download URL, original photo URL,
photographer, and SHA-256 hash. No user photographs have been uploaded yet.

| File | Photographer | Original photo |
| --- | --- | --- |
| placeholder-1015.jpg | Alexey Topolyanskiy | https://unsplash.com/photos/-oWyJoSqBRM |
| placeholder-1039.jpg | Andrew Coelho | https://unsplash.com/photos/VB-w_3dnyvI |
| placeholder-1043.jpg | Christian Joudrey | https://unsplash.com/photos/mWRR1xj95hg |
| placeholder-1044.jpg | Steve Carter | https://unsplash.com/photos/Ixp4YhCKZkI |
| placeholder-1050.jpg | Joseph Barrientos | https://unsplash.com/photos/xcC5ozHk_N8 |
| placeholder-1069.jpg | Marat Gilyadzinov | https://unsplash.com/photos/wpTWYBll4_w |
| placeholder-1080.jpg | veeterzy | https://unsplash.com/photos/OJJIaFZOeX4 |
| placeholder-164.jpg | Linh Nguyen | https://unsplash.com/photos/agkblvPff5U |
