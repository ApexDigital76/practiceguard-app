-- Run this in the Supabase SQL Editor.
-- Enables RLS on admin_users so the middleware can safely check admin
-- status using the user's own session (anon key + cookies), instead of
-- the table being unprotected or completely inaccessible.

alter table admin_users enable row level security;

create policy "Users can check own admin status" on admin_users
  for select
  using (user_id = auth.uid());
