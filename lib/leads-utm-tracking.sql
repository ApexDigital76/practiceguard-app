-- Run this in the Supabase SQL Editor.
-- Adds UTM/referrer capture columns to leads so you can see exactly which
-- channel (blog post, Google Business post, LinkedIn post, referral
-- outreach email, direct/organic) produced each lead.

alter table leads add column if not exists utm_source text;
alter table leads add column if not exists utm_medium text;
alter table leads add column if not exists utm_campaign text;
alter table leads add column if not exists referrer text;
alter table leads add column if not exists landing_page text;
