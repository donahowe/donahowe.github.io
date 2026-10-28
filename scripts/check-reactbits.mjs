import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(await readFile(resolve(root, 'docs/react-bits-integrity.json'), 'utf8'));
for (const file of manifest.files) {
  const content = await readFile(resolve(root, file.path));
  const actual = createHash('sha256').update(content).digest('hex');
  assert.equal(actual, file.sha256, `${file.path} differs from the official source. Keep custom integration in wrappers.`);
}
console.log(`Verified ${manifest.files.length} unmodified official React Bits files and assets.`);

// Compare preserved algorithm sections with the independently pinned vendor
// files above. This verifies source provenance, not browser motion behavior.
// Content slots, rectangular hit boxes, descendant link/focus routing, and the
// reading-area guard are intentional adapter changes outside these sections.
const coreSections = [
  {
    original: 'src/components/reactbits/HoloCard/HoloCard.jsx',
    adapter: 'src/components/adapters/HoloCardContent.jsx',
    blocks: [
      ['HoloCard vertex/fragment shaders', '\nconst VERTEX =', '\nconst clamp ='],
      ['HoloCard texture, physics, and pointer engine', '\n  const rootRef =', '\n  return ('],
    ],
  },
  {
    original: 'src/components/reactbits/BounceCards/BounceCards.jsx',
    adapter: 'src/components/adapters/BounceCardsContent.jsx',
    blocks: [
      ['BounceCards spring/hover engine', '\n    const body =', '\n    const pick ='],
      ['BounceCards nearest-slot selection', '\n      const px = event.clientX', '\n      const half = s.cardSize / 2;'],
      ['BounceCards selection hysteresis', '\n      if (state.hovered >= 0 && state.hovered !== best)', '\n    const onMove = event => {'],
    ],
  },
];

function sectionHash(source, startMarker, endMarker, label) {
  const start = source.indexOf(startMarker);
  assert.ok(start >= 0, `Missing algorithm start: ${label}`);
  const end = source.indexOf(endMarker, start + startMarker.length);
  assert.ok(end > start, `Missing algorithm end: ${label}`);
  return createHash('sha256').update(source.slice(start, end)).digest('hex');
}

let verifiedCoreSections = 0;
for (const pair of coreSections) {
  const original = await readFile(resolve(root, pair.original), 'utf8');
  const adapter = await readFile(resolve(root, pair.adapter), 'utf8');
  for (const [label, start, end] of pair.blocks) {
    assert.equal(sectionHash(adapter, start, end, label), sectionHash(original, start, end, label), `${label} must match the pinned official algorithm; review intentional adapter changes separately`);
    verifiedCoreSections++;
  }
}
console.log(`Verified ${verifiedCoreSections} preserved algorithm sections in the BounceCards and HoloCard content adapters. Browser interaction verification is separate.`);
