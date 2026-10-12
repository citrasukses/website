# Archived Industry section

Archived on 12 October 2026 at the user's request. These files retain the former Indonesian and English Industry landing page, detail pages, case studies, and the interactive Brand application section. They are excluded from the active Next.js app and TypeScript checks.

The original directory structure is preserved below `app/`, `components/`, and `data/`. `app/brands-page-before-archive.tsx` and `app/home-page-before-archive.tsx` are snapshots of the Brands and Home pages with their Industry case-study sections for restoring those blocks.

To restore the section, move the files back to their original locations, restore the Brands page block and imports from the snapshot, then restore the Industry navigation and sitemap entries. Review the redirects in `worker/static-export.js` and related links in `data/buyer-guides.ts` and `data/solution-pages.ts` before publishing.

Image assets remain under `public/assets/industries/` because some are also used by the About and Partners pages.
