import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { profile, publications, education, experience, news } from '../src/data/profile.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(root);
const html = await readFile('index.html', 'utf8');
const legacy = await readFile('legacy.html');
// SHA-256 of index.html from ae00437e6b34b281d2cb2c65498b84f41d4aa461,
// independently compared with git show when the archive was created.
const originalSha256 = '48eb0b79eb78723366cfd7ad6e50aa9ac6d2ec19de8a4ecedc4c21a75f8c7414';
assert.equal(createHash('sha256').update(legacy).digest('hex'), originalSha256, 'legacy.html must match the original exactly');
assert.ok(publications.length >= 8, 'Retain all original publications');
assert.ok(education.length >= 2, 'Retain both education entries');
assert.ok(experience.length >= 4, 'Retain all four internships');
assert.ok(news.length >= 10, 'Retain all original news');
const visibleText = value => value.replace(/<[^>]*>/g, '')
  .replace(/&#x([0-9a-f]+);/gi, (_, value) => String.fromCodePoint(parseInt(value, 16)))
  .replace(/&#(\d+);/g, (_, value) => String.fromCodePoint(Number(value)))
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&apos;/g, "'")
  .replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/\s+/g, ' ').trim();
const oldPage = legacy.toString('utf8');
const oldAbout = [...oldPage.matchAll(/<p class="about-text">([\s\S]*?)<\/p>/g)].map(match => visibleText(match[1]));
const newAbout = [...html.match(/<div class="about-text">([\s\S]*?)<\/div>/)[1].matchAll(/<p>([\s\S]*?)<\/p>/g)].map(match => visibleText(match[1]));
assert.deepEqual(newAbout, oldAbout, 'Keep both original biography paragraphs verbatim');
assert.deepEqual(profile.bio, oldAbout, 'Profile data and rendered biography must agree');
const oldOpportunity = visibleText(oldPage.match(/<div class="highlight-box">\s*<p>([\s\S]*?)<\/p>/)[1]);
assert.equal(visibleText(html.match(/<a class="opportunity-note"[^>]*>([\s\S]*?)<\/a>/)[1]), oldOpportunity, 'Keep the original availability statement');
const plainPage = visibleText(html);
for (const item of [...education, ...experience]) {
  assert.ok(plainPage.includes(item.title), `Keep original experience wording: ${item.title}`);
  assert.ok(plainPage.includes(item.period), `Keep original dates: ${item.period}`);
}
for (const item of news) assert.ok(plainPage.includes(item.text), `Keep original news wording: ${item.date}`);
assert.ok(html.includes(profile.name) && html.includes(profile.email), 'The static HTML must include the profile and contact details');
for (const publication of publications) {
  assert.ok(html.includes(publication.title), `Missing prerendered publication: ${publication.title}`);
  for (const link of publication.links) assert.ok(html.includes(link.url.replaceAll('&', '&amp;')), `Missing publication link: ${link.url}`);
}
const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(id), `Broken section link: #${id}`);
const localAssets = new Set([...html.matchAll(/(?:href|src)="(\/(?!\/)[^"#?]+)(?:[?#][^"]*)?"/g)].map(match => match[1]));
for (const asset of localAssets) {
  const file = await stat(resolve(root, `.${asset}`)).catch(() => null);
  assert.ok(file?.isFile(), `Missing local asset: ${asset}`);
}
for (const name of ['Lanyard','TechText','LightRays','FlexCarousel','ScrollStack','Magnet','SpotlightCard']) {
  assert.ok((await stat(`src/components/reactbits/${name}/${name}.jsx`)).isFile(), `Missing requested component: ${name}`);
}
assert.ok(!html.includes('<!-- APP_'), 'Build placeholders must be replaced');
assert.ok(html.includes('application/ld+json'), 'Keep structured profile data');
console.log(`Verified: exact original backup; ${publications.length} publications; ${education.length} education entries; ${experience.length} internships; ${news.length} updates; ${localAssets.size} local assets; section links; all 7 React Bits components; prerendered HTML.`);
