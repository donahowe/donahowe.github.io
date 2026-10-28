import { build } from 'esbuild';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(root);
// This directory contains generated assets only. Original images and the
// byte-for-byte legacy homepage are deliberately outside the build output.
await mkdir('.build', { recursive: true });
await rm('assets/site', { recursive: true, force: true });
const result = await build({
  entryPoints: ['src/main.jsx'],
  bundle: true,
  outdir: 'assets/site',
  entryNames: 'app-[hash]',
  chunkNames: 'chunk-[name]-[hash]',
  assetNames: 'font-[name]-[hash]',
  format: 'esm',
  splitting: true,
  jsx: 'automatic',
  minify: true,
  target: ['es2022'],
  loader: { '.woff2': 'file', '.ttf': 'file' },
  metafile: true,
  legalComments: 'linked',
  define: { 'process.env.NODE_ENV': '"production"' },
  logLevel: 'info'
});
await build({
  entryPoints: ['src/App.jsx'],
  bundle: true,
  outfile: '.build/server.mjs',
  platform: 'node',
  format: 'esm',
  packages: 'external',
  jsx: 'automatic',
  loader: { '.css': 'empty' },
  define: { 'process.env.NODE_ENV': '"production"' },
  logLevel: 'silent'
});
const { default: App } = await import(`${pathToFileURL(resolve('.build/server.mjs')).href}?v=${Date.now()}`);
const html = renderToString(createElement(App));
const entry = Object.entries(result.metafile.outputs).find(([, details]) => details.entryPoint === 'src/main.jsx');
if (!entry || !entry[1].cssBundle) throw new Error('Build did not produce the expected JavaScript and stylesheet.');
const font = Object.keys(result.metafile.outputs).find(path => path.includes('WorkingSheet-Hand') && path.endsWith('.ttf'));
const template = await readFile('src/index.template.html', 'utf8');
const page = template.replace('<!-- APP_HTML -->', html)
  .replace('<!-- APP_CSS -->', `<link rel="stylesheet" href="/${entry[1].cssBundle}">`)
  .replace('<!-- APP_JS -->', `<script type="module" src="/${entry[0]}"></script>`)
  .replace('<!-- FONT_PRELOAD -->', font ? `<link rel="preload" href="/${font}" as="font" type="font/ttf" crossorigin>` : '');
await writeFile('index.html', page);
await writeFile('.build/metafile.json', JSON.stringify(result.metafile, null, 2));
console.log('Built static index.html and assets/site/. Ready for GitHub Pages; legacy.html is unchanged.');
