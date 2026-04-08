-- Migration 002: Add Google OAuth fields to businesses, google_review_id to reviews

-- Make name nullable — OAuth callback doesn't know the business name yet;
-- it gets populated during the first sync from the Google location title.
ALTER TABLE businesses ALTER COLUMN name DROP NOT NULL;

-- Add Google OAuth and sync columns to businesses
ALTER TABLE businesses
  ADD COLUMN IF NOT EXISTS google_refresh_token text,
  ADD COLUMN IF NOT EXISTS google_account_id     text,
  ADD COLUMN IF NOT EXISTS google_location_id    text,
  ADD COLUMN IF NOT EXISTS last_synced_at        timestamptz;

-- Add google_review_id to reviews for deduplication during sync
ALTER TABLE reviews
  ADD COLUMN IF NOT EXISTS google_review_id text UNIQUE;
