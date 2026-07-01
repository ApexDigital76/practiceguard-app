-- Run this in the Supabase SQL Editor.
-- Adds two optional contact-name fields to prospects so outreach emails
-- can be personalized instead of using a bare "Hi,".

alter table prospects add column if not exists dentist_name text;
alter table prospects add column if not exists contact_name text;
