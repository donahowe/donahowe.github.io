# Working Sheet fonts

These are the original fonts used by the public DesignPrompts Sketch preview,
downloaded without modification on 2026-10-28.

| File | Embedded family name | CSS name used by the reference | Weight | Bytes |
| --- | --- | --- | --- | --- |
| `WorkingSheet-Hand.ttf` | Working Sheet Hand | Sketch Working Hand | 400 | 111212 |
| `WorkingSheet-Marker.ttf` | Working Sheet Marker | Sketch Working Marker | 700 | 111416 |

The reference uses Hand for reading text and Marker for headings. The names
beginning with `Sketch` are the CSS aliases declared in its `@font-face` rules.

## Sources

- [Requested Sketch reference](https://designprompts.dev/?style=sketch&width=wide&section=hero)
- [Public Sketch stylesheet inspected on 2026-10-28](https://designprompts.dev/assets/sketch-DMGkgbV5.css)
- [Original Hand font](https://designprompts.dev/fonts/sketch/WorkingSheet-Hand.ttf)
- [Original Marker font](https://designprompts.dev/fonts/sketch/WorkingSheet-Marker.ttf)
- [Original complete MIT license](https://designprompts.dev/fonts/sketch/LICENSE.txt)

The stylesheet declares `Sketch Working Hand` as the reading face and
`Sketch Working Marker` as the display face. Its original body, reading, and
detail sizes are 24px, 23px, and 21px; the homepage applies its own layout and
sizes without changing the font files.

## License

Copyright (c) 2026 Acme Sketch preview contributors.

The complete upstream MIT license, including its font-specific scope statement,
is preserved without modification in
[`licenses/WorkingSheet-MIT.txt`](../../licenses/WorkingSheet-MIT.txt).
The license explicitly applies to the original Working Sheet Hand and Working
Sheet Marker glyph drawings and generated font files. It states that no
third-party font outlines are used.

## Character coverage

Each font contains 84 glyphs with 83 mapped characters: basic Latin uppercase
and lowercase letters, digits, a space, the copyright symbol, and this
punctuation:

```text
! " $ % & ' ( ) + , - . / : ; = ? [ ]
```

The fonts do not contain Chinese characters, `@`, `_`, typographic quotation
marks, or en/em dashes. Keep a readable system or Geist fallback for unsupported
characters. The Chinese name should continue using a font with Chinese glyphs.

## Source integrity

SHA-256 of the unmodified source files:

```text
8707cdb4d9db21db5d53dd12148a66a30cfa472d1b1eeef2c9816c16ab5be84c  WorkingSheet-Hand.ttf
e34aa4e1d2cc33acd4c4a3a104d0c88eafa64b72025e4710b0ea5ce1fc1b7f11  WorkingSheet-Marker.ttf
```
