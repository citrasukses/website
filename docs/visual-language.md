# CSE Visual Language

Use this palette and illustration style to keep new pages consistent with the current industrial-expertise sections.

## Core palette

| Role | Color | Tailwind token | Use |
| --- | --- | --- | --- |
| Calibration wall | `#f3f1ec` | Use the literal value until a shared token is added | Expertise backgrounds and technical drawing surfaces |
| Graphite | `#151a22` | `graphite-900` | Headlines and primary text |
| Muted graphite | `#68717d` | `graphite-500` | Supporting text and labels |
| Industrial blue | `#183d61` | `industrial-700` | Technical drawings, diagrams, and structural accents |
| Signal red | `#bf2f2f` | `signal-500` | CTAs, warnings, active states, and one small illustration accent |
| Paper white | `#ffffff` | `white` | Cards and content surfaces that must separate from the beige wall |
| Hairline gray | `#d0d5dc` | `graphite-200` | Borders and dividers |

## Color balance

- Let beige, white, and graphite carry most of the page.
- Use industrial blue for technical structure and line drawings.
- Keep signal red below roughly 10% of a composition. It should identify one important detail, not decorate every edge.
- Avoid decorative gradients, glow, chrome effects, or large fields of saturated color.

## Wall-drawing illustrations

- Draw on the calibration-wall beige (`#f3f1ec`), without a separate white card behind the illustration.
- Use a consistent `240 × 160` view box and approximately `2–2.5px` industrial-blue strokes.
- Show one immediately recognizable subject per category.
- Use signal red for one meaningful detail such as a limit, check, helmet rim, reading, or lubricant.
- Prefer clear silhouettes and familiar industrial objects over abstract diagrams.
- Do not use drop shadows, 3D rendering, photographic textures, decorative grids, or unexplained symbols.

## Typography and surfaces

- Headlines use graphite with strong weight and compact line height.
- Supporting copy uses muted graphite and should remain short.
- Use borders instead of shadows when content already sits on the beige Expertise background.
- Reserve white panels and `shadow-panel` for functional modules, forms, or interactive product interfaces—not explanatory wall drawings.
