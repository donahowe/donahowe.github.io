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
const appSource = await readFile('src/App.jsx', 'utf8');
const templateSource = await readFile('src/index.template.html', 'utf8');
// SHA-256 of index.html from ae00437e6b34b281d2cb2c65498b84f41d4aa461,
// independently compared with git show when the archive was created.
const originalSha256 = '48eb0b79eb78723366cfd7ad6e50aa9ac6d2ec19de8a4ecedc4c21a75f8c7414';
assert.equal(createHash('sha256').update(legacy).digest('hex'), originalSha256, 'legacy.html must match the original exactly');
assert.ok(publications.length >= 8, 'Retain all original publications');
assert.ok(education.length >= 2, 'Retain both education entries');
assert.ok(experience.length >= 4, 'Retain all four internships');
assert.ok(news.length >= 10, 'Retain all original news');
const decodeEntities = value => value
  .replace(/&#x([0-9a-f]+);/gi, (_, value) => String.fromCodePoint(parseInt(value, 16)))
  .replace(/&#(\d+);/g, (_, value) => String.fromCodePoint(Number(value)))
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&apos;/g, "'")
  .replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const visibleText = value => decodeEntities(value.replace(/<!--[\s\S]*?-->/g, '').replace(/<br\b[^>]*>/gi, ' ').replace(/<[^>]*>/g, ''))
  .replace(/\s+/g, ' ').trim();
const attributes = openingTag => Object.fromEntries(
  [...openingTag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)]
    .map(([, key, doubleQuoted, singleQuoted]) => [key.toLowerCase(), decodeEntities(doubleQuoted ?? singleQuoted)])
);
const hasClass = (attrs, name) => (attrs.class ?? '').split(/\s+/).includes(name);
const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);

// Read the marked element independently of layout classes or nested wrappers.
// These checks inspect React's generated HTML; they do not run browser effects.
function findElement(source, predicate, label) {
  const tags = /<!--[\s\S]*?-->|<\/?([a-z][\w:-]*)\b[^>]*>/gi;
  let opening;
  while ((opening = tags.exec(source))) {
    if (!opening[1] || opening[0].startsWith('</')) continue;
    const tag = opening[1].toLowerCase();
    const attrs = attributes(opening[0]);
    if (!predicate(tag, attrs)) continue;
    const start = opening.index;
    const innerStart = tags.lastIndex;
    if (voidTags.has(tag) || /\/\s*>$/.test(opening[0])) return { tag, attrs, inner: '', outer: opening[0], start, end: innerStart };
    let depth = 1;
    let token;
    while ((token = tags.exec(source))) {
      if (token[1]?.toLowerCase() !== tag) continue;
      if (token[0].startsWith('</')) depth--;
      else if (!/\/\s*>$/.test(token[0])) depth++;
      if (depth === 0) return { tag, attrs, inner: source.slice(innerStart, token.index), outer: source.slice(start, tags.lastIndex), start, end: tags.lastIndex };
    }
    assert.fail(`Unclosed ${label}`);
  }
  assert.fail(`Missing ${label}`);
}

const elementById = (source, id, tag) => findElement(source, (name, attrs) => attrs.id === id && (!tag || name === tag), `${tag ?? 'element'}#${id}`);
const strongText = source => [...source.matchAll(/<strong\b[^>]*>([\s\S]*?)<\/strong>/gi)].map(match => visibleText(match[1]));
const anchors = source => [...source.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)]
  .map(([, attrs, content]) => ({ text: visibleText(content), href: attributes(attrs).href }));
const paragraphs = source => [...source.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map(match => match[1]);
const oldPage = legacy.toString('utf8');
const oldAboutMarkup = [...oldPage.matchAll(/<p class="about-text">([\s\S]*?)<\/p>/g)].map(match => match[1]);
const oldAbout = oldAboutMarkup.map(visibleText);
const main = findElement(html, tag => tag === 'main', 'main');
const hero = elementById(main.inner, 'top', 'section');
const biography = findElement(hero.inner, (_, attrs) => attrs['data-content'] === 'biography', 'hero biography');
const newAboutMarkup = paragraphs(biography.inner);
const newAbout = newAboutMarkup.map(visibleText);
assert.deepEqual(newAbout, oldAbout, 'Keep both original biography paragraphs verbatim');
assert.deepEqual(profile.bio, oldAbout, 'Profile data and rendered biography must agree');
for (let index = 0; index < oldAboutMarkup.length; index++) {
  assert.deepEqual(strongText(newAboutMarkup[index]), strongText(oldAboutMarkup[index]), `Keep the original emphasis in biography paragraph ${index + 1}`);
  assert.deepEqual(anchors(newAboutMarkup[index]), anchors(oldAboutMarkup[index]), `Keep the original biography links in paragraph ${index + 1}`);
}
const oldOpportunityMarkup = oldPage.match(/<div class="highlight-box">\s*<p>([\s\S]*?)<\/p>/)[1];
const oldOpportunity = visibleText(oldOpportunityMarkup);
const opportunity = findElement(hero.inner, (_, attrs) => attrs['data-content'] === 'opportunity', 'hero availability statement');
assert.equal(visibleText(opportunity.inner), oldOpportunity, 'Keep the original availability statement');
assert.equal(profile.opportunity, oldOpportunity, 'Profile availability data must match the original');
assert.deepEqual(strongText(opportunity.inner), strongText(oldOpportunityMarkup), 'Keep the original availability emphasis');

const contact = elementById(hero.inner, 'contact', 'div');
const contactLinks = new Set(anchors(contact.inner).map(link => link.href));
for (const url of [`mailto:${profile.email}`, profile.scholarUrl, profile.githubUrl]) {
  assert.ok(contactLinks.has(url), `Keep contact link in the hero: ${url}`);
}
assert.ok(visibleText(contact.inner).includes(profile.email), 'Display the email address in the hero');
const wechatButton = [...contact.inner.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)]
  .map(([, attrs, content]) => ({ attrs: attributes(attrs), text: visibleText(content) }))
  .find(button => /wechat/i.test(`${button.attrs['aria-label'] ?? ''} ${button.text}`));
assert.ok(wechatButton, 'Keep the WeChat action in the hero contact area');
assert.equal(wechatButton.attrs.type, 'button', 'Use an explicit button for the WeChat action');
assert.ok(html.includes(profile.wechatQr), 'Retain the original WeChat QR code');
assert.ok(visibleText(hero.inner).includes(profile.name) && visibleText(hero.inner).includes(profile.nameCn), 'Keep both English and Chinese names in the static hero');

// Enforce the original reading order after moving About into the first section.
const directSectionIds = [];
let depth = 0;
for (const token of main.inner.matchAll(/<!--[\s\S]*?-->|<\/?([a-z][\w:-]*)\b[^>]*>/gi)) {
  if (!token[1]) continue;
  const tag = token[1].toLowerCase();
  if (token[0].startsWith('</')) { depth--; continue; }
  if (depth === 0 && tag === 'section') directSectionIds.push(attributes(token[0]).id);
  if (!voidTags.has(tag) && !/\/\s*>$/.test(token[0])) depth++;
}
const academicSectionOrder = ['top', 'notes', 'education', 'internships', 'research'];
assert.deepEqual(directSectionIds.slice(0, academicSectionOrder.length), academicSectionOrder, 'Keep the original academic sections first and in their original order');
assert.deepEqual(directSectionIds.slice(academicSectionOrder.length), ['life'], 'Append More about me after publications as the final main section');
const newsSection = elementById(main.inner, 'notes', 'section');
const newsScroll = findElement(newsSection.inner, (_, attrs) => attrs['data-content'] === 'news-scroll', 'single News scroll container');
assert.equal([...newsSection.inner.matchAll(/\bdata-content="news-scroll"/g)].length, 1, 'Keep one News scroll container');
assert.equal(newsScroll.attrs.tabindex, '0', 'Make the News scroll container reachable by keyboard');
assert.ok(newsScroll.attrs['aria-label'], 'Give the News scroll region an accessible label');
assert.ok(!/<details\b/i.test(newsSection.inner), 'Keep all News in the scroll list, without an earlier-updates disclosure');
const newsText = visibleText(newsScroll.inner);
const publicationSection = elementById(main.inner, 'research', 'section');
const publicationDeck = findElement(publicationSection.inner, (_, attrs) => ['row', 'bounce'].includes(attrs['data-publication-layout']), 'single publication collection');
assert.equal([...publicationSection.inner.matchAll(/\bdata-publication-layout="[^"]+"/g)].length, 1, 'Keep all publications in one collection');
const toolbar = findElement(publicationDeck.inner, (_, attrs) => hasClass(attrs, 'publication-deck__toolbar'), 'publication toolbar');
assert.ok(!/\b\d+\s+papers\b/i.test(visibleText(toolbar.inner)), 'Remove the redundant paper-count label from the toolbar');
const originalEntryTitles = [...oldPage.matchAll(/<div class="exp-details">\s*<h3>([\s\S]*?)<\/h3>/g)].map(match => visibleText(match[1]));
const originalEntryDates = [...oldPage.matchAll(/<p class="time-period">([\s\S]*?)<\/p>/g)].map(match => visibleText(match[1]));
for (let index = 0; index < originalEntryTitles.length; index++) {
  const item = [...education, ...experience].find(entry => entry.title === originalEntryTitles[index]);
  assert.ok(item, `Keep original experience wording: ${originalEntryTitles[index]}`);
  assert.equal(item.period, originalEntryDates[index], `Keep original dates: ${item.title}`);
}
for (const [items, sectionId, kind] of [[education, 'education', 'education'], [experience, 'internships', 'internship']]) {
  const section = elementById(main.inner, sectionId, 'section');
  const openings = [...section.inner.matchAll(/<article\b[^>]*>/g)]
    .filter(match => attributes(match[0])['data-kind'] === kind);
  assert.equal(openings.length, items.length, `Keep every ${kind} ticket in its original section`);
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    const ticket = findElement(section.inner.slice(openings[index].index), (tag, attrs) => tag === 'article' && attrs['data-kind'] === kind, `${kind} ticket ${index + 1}`);
    const title = findElement(ticket.inner, tag => tag === 'h3', `title for ${item.title}`);
    assert.equal(visibleText(title.inner), item.title, `Keep original title and order: ${item.title}`);
    const stub = findElement(ticket.inner, (_, attrs) => hasClass(attrs, 'ticket-stub-content'), `date strip for ${item.title}`);
    const period = findElement(stub.inner, (_, attrs) => hasClass(attrs, 'stub-period'), `date on the strip for ${item.title}`);
    assert.equal(visibleText(period.inner), item.period, `Keep the original date on its ticket strip: ${item.period}`);
    assert.notEqual(stub.attrs['aria-hidden'], 'true', 'The date strip carries meaningful content');
    assert.notEqual(period.attrs['aria-hidden'], 'true', 'The original date must remain accessible');
    assert.ok(!/\bHOWE\b/.test(visibleText(stub.inner)), 'Use the original period in place of the stub brand');
    // The prerendered/intact state contains one date. A torn client-side ticket
    // can retain a screen-reader-only date while its old strip is aria-hidden.
    assert.equal(visibleText(ticket.inner).split(item.period).length - 1, 1, `Display the original date once on the intact ticket: ${item.title}`);
    const images = [...ticket.inner.matchAll(/<img\b[^>]*>/g)].map(match => attributes(match[0]));
    assert.ok(images.some(image => image.src === item.image), `Keep the original logo: ${item.organization}`);
    if (kind === 'education') {
      const at = item.title.indexOf('@');
      assert.deepEqual(title.inner.split(/<br\b[^>]*>/i).map(visibleText), [item.title.slice(0, at + 1).trim(), item.title.slice(at + 1).trim()], `Wrap the education title after @ without changing its words: ${item.title}`);
    } else {
      assert.ok(!/<br\b/i.test(title.inner), `Keep natural wrapping for internship titles: ${item.title}`);
    }
  }
}
assert.ok(!appSource.includes('Drag the edge to tear'), 'Remove the idle ticket drag-instruction caption');
const originalNews = [...oldPage.matchAll(/<span class="news-content">([\s\S]*?)<\/span>/g)].map(match => visibleText(match[1]));
const originalNewsDates = [...oldPage.matchAll(/<span class="news-date">([\s\S]*?)<\/span>/g)].map(match => visibleText(match[1]));
for (let index = 0; index < originalNews.length; index++) {
  assert.ok(news.some(item => item.text === originalNews[index] && item.date === originalNewsDates[index]), `Keep original news and date: ${originalNewsDates[index]}`);
}
for (const item of news) {
  assert.ok(newsText.includes(item.text), `Keep original news wording: ${item.date}`);
  assert.ok(newsText.includes(item.date), `Keep original news date visible: ${item.date}`);
}
assert.ok(html.includes(profile.name) && html.includes(profile.email), 'The static HTML must include the profile and contact details');
const originalPaperTitles = [...oldPage.matchAll(/<h3 class="pub-title">([\s\S]*?)<\/h3>/g)].map(match => visibleText(match[1]));
const originalPaperAuthors = [...oldPage.matchAll(/<p class="pub-authors">([\s\S]*?)<\/p>/g)].map(match => visibleText(match[1]));
const originalPaperVenues = [...oldPage.matchAll(/<span class="pub-venue">([\s\S]*?)<\/span>/g)].map(match => visibleText(match[1]));
for (let index = 0; index < originalPaperTitles.length; index++) {
  const paper = publications.find(item => item.title === originalPaperTitles[index]);
  assert.ok(paper, `Keep original publication: ${originalPaperTitles[index]}`);
  assert.equal(paper.authors.join(', '), originalPaperAuthors[index], `Keep original author order: ${paper.title}`);
  assert.equal(paper.venue, originalPaperVenues[index], `Keep original venue: ${paper.title}`);
}
for (const publication of publications) {
  const paper = elementById(publicationDeck.inner, `paper-${publication.id}`, 'article');
  const text = visibleText(paper.inner);
  const paperLinks = new Set(anchors(paper.inner).map(link => link.href));
  assert.ok(text.includes(publication.title), `Missing prerendered publication: ${publication.title}`);
  assert.ok(text.includes(publication.authors.join(', ')), `Missing prerendered author list: ${publication.title}`);
  assert.ok(text.includes(publication.venue), `Missing prerendered venue: ${publication.title}`);
  for (const link of publication.links) assert.ok(paperLinks.has(link.url), `Missing link on its publication card: ${link.url}`);
}
const renderedPaperIds = [...publicationDeck.inner.matchAll(/<article\b[^>]*\bid="(paper-[^"]+)"/g)].map(match => match[1]);
assert.deepEqual(renderedPaperIds, publications.map(paper => `paper-${paper.id}`), 'Render each publication once in the original data order');
const currentLinkTargets = new Set(anchors(html).map(link => link.href));
for (const link of anchors(oldPage).filter(link => /^(https?:|mailto:)/.test(link.href ?? ''))) {
  assert.ok(currentLinkTargets.has(link.href), `Keep original public link: ${link.href}`);
}

// A fresh visit starts dark, regardless of saved or operating-system theme.
const htmlTag = html.match(/<html\b[^>]*>/i)?.[0];
assert.equal(attributes(htmlTag ?? '')['data-theme'], 'dark', 'The generated page must start in dark mode');
for (const [source, label] of [[templateSource, 'template'], [appSource, 'App']]) {
  assert.ok(!/getItem\s*\(\s*(['"])junhao-theme\1\s*\)/.test(source), `${label} must not restore a historical theme`);
  assert.ok(!/prefers-color-scheme/.test(source), `${label} must not choose the initial theme from the operating system`);
}
findElement(html, (tag, attrs) => tag === 'button' && hasClass(attrs, 'theme-toggle'), 'manual theme toggle');
const header = findElement(html, tag => tag === 'header', 'site header');
const brand = findElement(header.inner, (_, attrs) => hasClass(attrs, 'brand'), 'header brand');
assert.ok(/\bHOWE\b/.test(visibleText(brand.inner)), 'Use the HOWE header brand');
const techTextTags = [...appSource.matchAll(/<TechText\b[^>]*>/g)].map(match => match[0]);
assert.ok(techTextTags.some(tag => /\btext\s*=\s*(?:["']Junhao Cheng["']|\{\s*profile\.name\s*\})/.test(tag)), 'Integrate TechText for the English name');
assert.ok(techTextTags.some(tag => /\btext\s*=\s*(?:["']\(?程钧豪\)?["']|\{\s*profile\.nameCn\s*\})/.test(tag)), 'Integrate TechText for the Chinese name');

const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(id), `Broken section link: #${id}`);
const localAssets = new Set([...html.matchAll(/(?:href|src)="(\/(?!\/)[^"#?]+)(?:[?#][^"]*)?"/g)].map(match => match[1]));
for (const asset of localAssets) {
  const file = await stat(resolve(root, `.${asset}`)).catch(() => null);
  assert.ok(file?.isFile(), `Missing local asset: ${asset}`);
}
const preservedComponents = ['Lanyard','TechText','LightRays','FlexCarousel','ScrollStack','Magnet','SpotlightCard','TearTicket','HoloCard','BounceCards','DriftWall'];
for (const name of preservedComponents) {
  assert.ok((await stat(`src/components/reactbits/${name}/${name}.jsx`)).isFile(), `Missing preserved React Bits source: ${name}`);
}
assert.ok(!html.includes('<!-- APP_'), 'Build placeholders must be replaced');
assert.ok(html.includes('application/ld+json'), 'Keep structured profile data');
console.log(`Verified static content: exact original backup; original biography, emphasis, and links; hero contact links; original section order; ${publications.length} publications in one collection; ${education.length} education entries; ${experience.length} internships; ${news.length} updates in one News scroll region; dark default; HOWE brand; ${localAssets.size} local assets and section links.`);
console.log(`Source checks: bilingual TechText integration and ${preservedComponents.length} preserved React Bits source files. Browser animation, layout, and interaction verification is separate.`);
