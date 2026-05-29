/*
  # Create leads table

  1. New Tables
    - `leads`
      - `id` (uuid, primary key, auto-generated)
      - `name` (text) — submitter's full name
      - `business_name` (text) — their business name
      - `email` (text) — contact email
      - `whatsapp_number` (text, nullable) — WhatsApp contact
      - `service_needed` (text) — selected service option
      - `budget_range` (text, nullable) — selected budget range
      - `message` (text, nullable) — free-text message
      - `source` (text) — origin identifier, e.g. "manolinq_website"
      - `page_url` (text, nullable) — URL where form was submitted
      - `user_agent` (text, nullable) — browser user agent
      - `status` (text) — lead status, default "new"
      - `created_at` (timestamptz) — submission timestamp

  2. Security
    - Enable RLS on `leads` table
    - No public SELECT/UPDATE/DELETE policies — only the service role (used by
      the Netlify Function) can insert and read leads.
    - Authenticated users with a future admin role can be granted access via
      separate migrations; for now the table is locked to service-role only.
*/

CREATE TABLE IF NOT EXISTS leads (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name             text        NOT NULL DEFAULT '',
  business_name    text        NOT NULL DEFAULT '',
  email            text        NOT NULL DEFAULT '',
  whatsapp_number  text        NOT NULL DEFAULT '',
  service_needed   text        NOT NULL DEFAULT '',
  budget_range     text        NOT NULL DEFAULT '',
  message          text        NOT NULL DEFAULT '',
  source           text        NOT NULL DEFAULT '',
  page_url         text        NOT NULL DEFAULT '',
  user_agent       text        NOT NULL DEFAULT '',
  status           text        NOT NULL DEFAULT 'new',
  created_at       timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- No anon or authenticated policies intentionally.
-- Inserts are performed exclusively by the Netlify Function using the
-- service role key, which bypasses RLS entirely.
-- This ensures the service role key is never exposed to the browser.
