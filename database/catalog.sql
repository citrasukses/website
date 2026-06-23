CREATE TABLE IF NOT EXISTS catalog_brands (
  slug TEXT PRIMARY KEY,
  payload JSONB NOT NULL,
  popularity_rank INTEGER,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS catalog_brands_popularity_idx
  ON catalog_brands (popularity_rank NULLS LAST);

