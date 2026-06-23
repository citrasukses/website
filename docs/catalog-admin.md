# Catalog administration

The initial popularity order comes from `public/assets/List of Popular Brands 2025-2026.xlsx`, sheet **List of popular brands**, column **2026**. The imported snapshot contains 80 ranked names. Existing represented brands are merged into the same catalog without losing their current products or content.

## Local use

1. Run `npm run dev`.
2. Open `/admin/catalog/login`.
3. If no local environment variables are configured, use the development-only password `admin`.

Local edits are written to `data/catalog.local.json`. This file is intentionally ignored by Git.

## Production environment

Configure these variables before enabling the deployed admin:

- `DATABASE_URL`: Neon Postgres connection string for persistent catalog records.
- `CATALOG_ADMIN_PASSWORD`: admin login password.
- `CATALOG_SESSION_SECRET`: long random value used to sign the admin session cookie.
- `BLOB_READ_WRITE_TOKEN`: Vercel Blob token used for product and brand image uploads.

The catalog table is created and seeded automatically on the first database-backed read. `database/catalog.sql` is also available for explicit provisioning.

## Content model

Each brand supports publishing status, type, popularity rank, localized value proposition, description, value cards, search terms, brand images, categories, and products. Products support localized summaries, tags, image galleries, structured specifications, and RFQ-prefilled public detail pages.
