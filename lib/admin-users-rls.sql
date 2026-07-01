-- Run this in the Supabase SQL Editor.
-- Enables RLS on admin_users so the middleware can safely check admin
-- status using the user's own session (anon key + cookies), instead of
-- the table being unprotected or completely inaccessible.

alter table admin_users enable row level security;

create policy "Users can check own admin status" on admin_users
  for select
  using (user_id = auth.uid());

-- RLS policies only restrict access on top of an existing grant - they
-- don't create one. This table was created via raw SQL, so the
-- authenticated role never received SELECT privilege at all, causing
-- "permission denied" even with the correct policy above.
grant select on admin_users to authenticated;
