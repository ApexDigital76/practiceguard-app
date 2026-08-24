-- Run this in Supabase SQL editor to store Pulse Check results on leads
-- Safe to run multiple times

alter table leads add column if not exists score integer;
alter table leads add column if not exists gaps text[] default '{}';

comment on column leads.score is 'Practice Pulse Check score 0-100';
comment on column leads.gaps is 'Top exposure points from Pulse Check';
