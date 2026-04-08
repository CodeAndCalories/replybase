-- Add auto_reply_enabled flag to businesses table
ALTER TABLE businesses
  ADD COLUMN IF NOT EXISTS auto_reply_enabled boolean NOT NULL DEFAULT false;
