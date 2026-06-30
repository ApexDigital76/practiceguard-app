-- PracticeGuard Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Leads (from website form + outreach)
create table leads (
  id uuid primary key default uuid_generate_v4(),
  practice_name text not null,
  dentist_name text,
  manager_name text,
  phone text,
  email text,
  locations text,
  software text,
  concern text,
  best_time text,
  source text not null default 'website', -- website | outreach | referral | manual
  status text not null default 'new',     -- new | contacted | qualified | converted | lost
  notes text,
  created_at timestamptz default now()
);

-- Practices (paying clients)
create table practices (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  address text,
  phone text,
  email text,
  software text,
  locations_count integer default 1,
  tier text,                              -- starter | professional | enterprise
  status text not null default 'active',  -- lead | active | inactive
  stripe_customer_id text,
  lead_id uuid references leads(id),
  created_at timestamptz default now()
);

-- Link auth users to practices
create table practice_users (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  practice_id uuid references practices(id) on delete cascade,
  role text not null default 'member',    -- owner | member
  created_at timestamptz default now(),
  unique(user_id, practice_id)
);

-- Admin users table
create table admin_users (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade unique,
  created_at timestamptz default now()
);

-- Compliance questions
create table compliance_questions (
  id uuid primary key default uuid_generate_v4(),
  category text not null,                 -- mfa | encryption | vulnerability_scanning | etc.
  text text not null,
  hipaa_reference text,
  weight integer not null default 1,
  active boolean default true
);

-- Compliance assessments
create table assessments (
  id uuid primary key default uuid_generate_v4(),
  practice_id uuid references practices(id) on delete cascade,
  created_at timestamptz default now(),
  completed_at timestamptz,
  score integer,                          -- 0-100
  gaps text[] default '{}'
);

-- Assessment responses
create table assessment_responses (
  id uuid primary key default uuid_generate_v4(),
  assessment_id uuid references assessments(id) on delete cascade,
  question_id uuid references compliance_questions(id),
  answer boolean,
  notes text,
  created_at timestamptz default now()
);

-- Documents
create table documents (
  id uuid primary key default uuid_generate_v4(),
  practice_id uuid references practices(id) on delete cascade,
  type text not null,                     -- policy | certificate | report | evidence
  name text not null,
  url text not null,
  uploaded_at timestamptz default now(),
  expires_at timestamptz
);

-- Subscriptions
create table subscriptions (
  id uuid primary key default uuid_generate_v4(),
  practice_id uuid references practices(id) on delete cascade,
  tier text not null,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text not null default 'active',  -- active | past_due | canceled | trialing
  current_period_end timestamptz,
  created_at timestamptz default now()
);

-- Outreach prospects
create table prospects (
  id uuid primary key default uuid_generate_v4(),
  practice_name text not null,
  email text,
  phone text,
  website text,
  city text,
  status text not null default 'pending', -- pending | approved | sent | skipped
  draft_subject text,
  draft_body text,
  sent_at timestamptz,
  created_at timestamptz default now()
);

-- Seed compliance questions
insert into compliance_questions (category, text, hipaa_reference, weight) values
('mfa', 'Do you use multi-factor authentication (MFA) for all systems containing PHI?', '§164.312(d)', 3),
('mfa', 'Is MFA enforced for remote access to your network?', '§164.312(d)', 3),
('encryption', 'Is all PHI encrypted at rest (on devices and servers)?', '§164.312(a)(2)(iv)', 3),
('encryption', 'Is all PHI encrypted in transit (email, file transfers)?', '§164.312(e)(2)(ii)', 3),
('vulnerability_scanning', 'Do you perform regular vulnerability scans (at least quarterly)?', '§164.308(a)(8)', 2),
('vulnerability_scanning', 'Are scan results reviewed and remediated within 30 days?', '§164.308(a)(8)', 2),
('penetration_testing', 'Have you conducted a penetration test in the past 12 months?', '§164.308(a)(8)', 2),
('incident_response', 'Do you have a documented incident response plan?', '§164.308(a)(6)', 2),
('incident_response', 'Have staff been trained on the incident response plan?', '§164.308(a)(6)', 2),
('asset_inventory', 'Do you maintain an up-to-date inventory of all devices that access PHI?', '§164.310(d)', 1),
('access_controls', 'Are unique user IDs assigned to all staff accessing PHI?', '§164.312(a)(2)(i)', 2),
('access_controls', 'Is access to PHI limited to the minimum necessary?', '§164.514(d)', 2),
('training', 'Do all staff complete annual HIPAA security training?', '§164.308(a)(5)', 2),
('business_associates', 'Do you have signed Business Associate Agreements with all vendors who access PHI?', '§164.308(b)', 2),
('documentation', 'Are all HIPAA policies and procedures documented and reviewed annually?', '§164.316', 1);

-- Row Level Security
alter table leads enable row level security;
alter table practices enable row level security;
alter table practice_users enable row level security;
alter table assessments enable row level security;
alter table assessment_responses enable row level security;
alter table documents enable row level security;
alter table subscriptions enable row level security;
alter table prospects enable row level security;

-- Admin can see everything (checked via admin_users table)
create policy "Admin full access to leads" on leads for all
  using (exists (select 1 from admin_users where user_id = auth.uid()));

create policy "Admin full access to practices" on practices for all
  using (exists (select 1 from admin_users where user_id = auth.uid()));

create policy "Admin full access to prospects" on prospects for all
  using (exists (select 1 from admin_users where user_id = auth.uid()));

-- Clients can see their own practice data
create policy "Clients see own practice" on practices for select
  using (exists (select 1 from practice_users where practice_id = id and user_id = auth.uid()));

create policy "Clients see own assessments" on assessments for select
  using (exists (select 1 from practice_users where practice_id = assessments.practice_id and user_id = auth.uid()));

create policy "Clients see own documents" on documents for select
  using (exists (select 1 from practice_users where practice_id = documents.practice_id and user_id = auth.uid()));
