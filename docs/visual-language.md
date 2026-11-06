# CSE visual language

CSE should feel precise, practical, and confident. Keep the established layouts,
real industrial photography, brand assets, red and blue palette, and homepage hero
narration. Build new sections from the shared roles below instead of choosing new
corner sizes, heading scales, or hover effects for each section.

Keep the company name beside the header logo at every breakpoint. On narrow
screens, let the name wrap within the brand lockup rather than hiding or
truncating it. Retain the accompanying tagline.

The implemented source of truth is `app/globals.css` and `tailwind.config.ts`.
`SectionHeader`, `Hero`, `CTAButton`, `BrandCard`, `ProductCard`, and the inquiry
forms apply these rules across the homepage, company pages, brand pages, product
pages, solutions, and guides.

## Color and surfaces

| Role | Value / token | Use |
| --- | --- | --- |
| White | `#ffffff` / `white` | Primary content, cards, forms, product cutouts |
| Cool neutral | `#f6f7f8` / `graphite-50` | Catalog and sourcing sections |
| Paper | `#f8f7f4` / `paper-50` | Supporting photographic and technical surfaces |
| Calibration wall | `#f3f1ec` / `paper-100` | Technical expertise and illustrations |
| Graphite | `#151a22` / `graphite-900` | Headings, primary text, dark sections |
| Body graphite | `#4d5764` / `graphite-600` | Body text on light surfaces |
| Muted graphite | `#68717d` / `graphite-500` | Supporting text |
| Industrial blue | `#2043a9` / `industrial-700` | Links, technical structure, secondary actions |
| Action blue | `#264fc7` / `industrial-600` | Search actions and focus indicators |
| Signal red | `#bf2f2f` / `signal-500` | Primary CTAs, brand statements, small section markers, risk |
| Hairline | `#d0d5dc` / `graphite-200` | Shared 1px borders and dividers |

Let neutral surfaces carry most of a page. Retain the existing red distributor
statement, blue technical modules, dark inquiry section, and actual brand colors.
Keep headlines graphite (white on dark surfaces); put decorative red emphasis in
the section label rather than coloring arbitrary lines of a headline. Yellow,
green, and other status colors in technical diagrams convey meaning, not a new
section theme. WhatsApp actions retain the established channel green.

## Geometry

| Element | Rule |
| --- | --- |
| Full-width sections, joined grids, structural frames | Square corners |
| Standalone cards, photographs, forms, buttons, inputs, icon tiles | `rounded-brand`: 4px |
| Photo navigation and other icon controls | 44 × 44px, 4px corners, 1px border |
| Filled/text action buttons and fields | At least 48px tall |
| Carousel indicators, radio states, diagram nodes, video play control | Circles where the shape communicates their function |
| Floating WhatsApp launcher | Existing recognizable round channel control |

Do not add large rounded containers, pill-shaped navigation arrows, or a new
radius to an individual section. Nested media inside a clipped card follows the
outer card edge; joined catalog cells stay square so their dividers meet cleanly.
Use borders for normal separation. The subdued `shadow-panel` is reserved for
menus, overlays, and functional modules that need elevation.

## Typography

| Role | Shared class | Size and use |
| --- | --- | --- |
| Page title | `cse-title` | 32px mobile / 48px from small desktop; 1.12 line height |
| Section title | `cse-heading` | 30px mobile / 36px tablet / 40px wide desktop; 1.15 line height |
| Panel title | `cse-panel-title` | 24px mobile / 28px desktop; 1.2 line height |
| Section label | `cse-eyebrow` | 11px, bold uppercase, .18em tracking, 2px red left rule |
| Section introduction | `cse-description` | 16px, 28px line height, muted graphite |
| Card body and supporting data | Existing 14px / 24px | Preserve density needed by industrial buyers |

Use the shared `SectionHeader` for new section introductions. Its `headingLevel`
selects the correct page/section title role. Centered introductions also center
the small label and its rule. Keep the homepage hero's existing line breaks,
wording, image composition, and title treatment. Captions, table headers, diagram
labels, and model names are smaller roles, not additional section-title styles.

## Spacing and alignment

- Shared page width: 1180px maximum, with at least 16px side gutters.
- Regular sections: `cse-section`, 56px top and bottom on mobile, 80px on desktop.
- Compact logo/proof strips and the paired photo-story module retain compact
  spacing. These are supporting modules rather than regular editorial sections.
- Use 16px between a section label and its heading, 16px before its introduction,
  and 32px before its main content (40px for spacious desktop compositions).
- Cards use 20–24px padding; forms use 24px mobile / 32px desktop.
- Keep headings, section content, and neighboring sections on the page grid.

## Components and interaction

- `cse-card` provides the border, white surface, clipping, and 4px radius.
- `cse-card-link` adds the shared blue border on hover and keyboard focus within.
  Cards do not jump upward or acquire a large hover shadow.
- `cse-button` provides consistent action geometry and color transitions.
  Use `CTAButton` for navigational primary, secondary, and outlined actions.
- `cse-input` provides consistent fields, including catalog search and both
  inquiry forms. Preserve appropriate labels, input types, and autocomplete.
- `cse-icon` provides blue line-icon tiles on a pale-blue surface.
- `cse-control` provides matching photo, product, and explainer navigation.
- Photo panels always show the count and the pause/previous/next controls on one
  row. Direct-selection dots appear when the panel has at least 352px of room.
- Keep visible keyboard focus, meaningful accessible labels, and existing
  reduced-motion, pause, swipe, and keyboard behavior.

## Wall-drawing illustrations

- Draw on calibration-wall beige without a separate white explanatory card.
- Use a consistent `240 × 160` view box and approximately 2–2.5px blue strokes.
- Show one recognizable industrial subject per category.
- Use red for one meaningful detail such as a limit, reading, or check.
- Avoid 3D rendering, glow, drop shadows, unexplained symbols, or decorative grids
  inside the illustration. Retain existing photographic and hero treatments.

## Review a new page

Compare it beside the homepage, About, a brand catalog, a product detail, and
Contact at desktop and mobile widths. Check the shared heading hierarchy,
label/rule, borders, control geometry, neutral surfaces, and section rhythm.
Different page layouts should still use the same component roles. Never change
business wording, brand identity, inquiry destinations, or content hierarchy
merely to make a section visually match.
