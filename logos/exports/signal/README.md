# Nordic Theory Labs — Signal

The chosen mark, packaged for use.

```
signal/
├── favicon.svg                       Drop-in favicon (transparent, ink + accent)
├── favicon-16.png                    Browser tab fallback
├── favicon-32.png                    Retina tab fallback
│
├── svg/                              ← prefer these wherever vectors are supported
│   ├── signal-mark.svg                  Primary mark, transparent background
│   ├── signal-mark-mono.svg             Single color (ink only — no accent dot)
│   ├── signal-mark-reverse.svg          Ink ground, paper mark, accent dot
│   ├── signal-mark-open.svg             Frameless (sine + dot only — for headers / motion)
│   └── signal-mark-appicon.svg          Full-bleed ink — feed this to iOS app icon
│
└── png/                              ← raster fallbacks
    ├── signal-mark-16.png   …32, 64, 128, 256, 512, 1024
    ├── signal-mark-reverse-256.png  …512, 1024
    ├── signal-mark-mono-256.png  …512
    ├── signal-mark-open-512.png
    └── signal-appicon-1024.png       Ready for App Store / iOS source PNG
```

---

## Brand colors

| Token   | Hex       | Notes                              |
|---------|-----------|------------------------------------|
| Ink     | `#0E1620` | Mark, body type                    |
| Paper   | `#F1EEE6` | Ground, reverse mark               |
| Accent  | `#0081A5` | Sample dot — sRGB equivalent of `oklch(0.55 0.13 220)`. The HTML site uses the oklch form directly so it stays gamut-true on wide-gamut displays. |

---

## When to use which file

| Use case                              | File                                  |
|---------------------------------------|---------------------------------------|
| Website favicon                       | `favicon.svg` + `favicon-32.png` fallback |
| Site header / nav bar                 | `svg/signal-mark.svg`                 |
| Dark / inverted UI                    | `svg/signal-mark-reverse.svg`         |
| Single-color print, fax, engraving    | `svg/signal-mark-mono.svg`            |
| Motion / hero, no cell needed         | `svg/signal-mark-open.svg`            |
| iOS app icon source (1024 PNG)        | `png/signal-appicon-1024.png`         |
| Android adaptive icon — foreground    | `svg/signal-mark-open.svg` (centered) |
| Sticker / die-cut                     | `svg/signal-mark-reverse.svg`         |

---

## Rules (one page)

- **Minimum size:** 16 px / 4 mm. Below 16 px, prefer the **Open** variant.
- **Clear space:** at least one sample-dot diameter on every side.
- **Stroke weight:** baked in at 4 units on the 220-unit canvas. Do not re-stroke.
- **Color:** use only the six sanctioned combinations from the system sheet — never tint, gradient, recolor, or rotate.
- **Lockup:** wordmark sits *beside* the mark, never inside it. Manrope 600 + Instrument Serif italic (for "Theory" + the degree mark).

The full system sheet — variations, construction grid, scale ladder, in-context applications, and don'ts — lives at `logos/Signal - System Sheet.html`.

---

Built for **Nordic Theory Labs** — Stockholm.
