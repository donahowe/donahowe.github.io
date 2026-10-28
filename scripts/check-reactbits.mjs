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
