# Web performance controls

The production build enforces asset budgets with `npm run performance:audit`. Run it after `npm run build`, or use the full `npm run verify:seo` workflow.

## Current improvements

- The shared homepage/solutions hero changed from a 2.2 MB PNG to a visually equivalent 102 KB WebP.
- The heavy-equipment image used by industry and partner pages changed from a 1.9 MB PNG to a visually equivalent 125 KB WebP.
- The TOHNICHI QL/CL video changed from a 14 MB 1080p file to a 3.7 MB 720p MP4.
- The video no longer autoplays or loops. It uses `preload="none"` and a 29 KB poster, so the video payload is not requested until a visitor chooses to play it.
- The deployment preparation step excludes all three retired heavy video files and four superseded or unused large PNGs while retaining the source files in the repository.
- Published TOHNICHI JPEG and large PNG files continue to be resized and compressed during deployment preparation.

## Enforced budgets

The build fails when:

- the shared hero exceeds 150 KB;
- the heavy-equipment hero exceeds 175 KB;
- the published TOHNICHI video exceeds 4 MB;
- a published TOHNICHI product image exceeds 2 MB after build optimization;
- a retired heavy video appears in the deployment bundle; or
- the bilingual TOHNICHI page regains autoplay, loses `preload="none"`, or loses its poster.

These are regression budgets, not Core Web Vitals measurements.

## Post-deployment measurement

A real Chrome trace is still required after deployment because LCP, CLS, and INP depend on the deployed network, cache, device, and runtime. The required Chrome DevTools MCP was not configured during this implementation, so no synthetic CWV score is claimed here.

After deployment, measure both mobile and desktop for:

1. `/`
2. `/brands/tohnichi`
3. `/brands/tohnichi/products/ql-qle2`
4. `/tohnichi-torsi-tepat`
5. `/contact`

Record LCP, CLS, INP or TBT, render-blocking resources, largest network transfers, and any console errors. Test the Indonesian and English versions of at least the homepage and TOHNICHI brand page.
