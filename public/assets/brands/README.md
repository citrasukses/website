# Brand assets

Brand assets are organized by asset type. A brand should not get its own top-level
directory just to hold one logo.

```text
brands/
├── fonts/                  # Brand-specific web fonts
├── logos/                  # One primary logo file per brand
│   ├── tohnichi.png
│   └── tdk-lambda--mark.png
└── products/               # Product media grouped by brand
    └── tohnichi/
```

## Naming

- Use the lowercase, kebab-case brand slug: `fuji-electric.png`.
- Use `<brand-slug>--<variant>.<ext>` only for a real variant such as a mark,
  wordmark, dark version, or alternate artwork.
- Keep a single primary logo when possible and prefer SVG or WebP for new assets.
- Put product images in `products/<brand-slug>/`; do not mix them with logos.
- Record required attribution or licensing in the filename or a nearby license
  file. For example, `kito--cc-by-sa.jpg` retains its license marker.

## Product image sources

- `products/nippon-unit-brush/*.jpg` — Nippon Unit Corporation official
  [brush product page](https://www.unitbrush.co.jp/english/brush/index.html),
  retrieved 2026-06-23 for the authorized-distributor product showcase.
