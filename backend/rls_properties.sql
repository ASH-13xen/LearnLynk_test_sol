-- LearnLynk Tech Test - Task 2: RLS Policies on leads

alter table public.leads enable row level security;

-- Example helper: assume JWT has tenant_id, user_id, role.
-- You can use: current_setting('request.jwt.claims', true)::jsonb


--In the task it is given like  user role in JWT (auth.jwt() -> role: "admin" or "counselor")
-- but i would have used this instead if it was not mentioned
-- to replace all auth.jwt() to current_setting('request.jwt.claims', true)::jsonb


-- TODO: write a policy so:
-- - counselors see leads where they are owner_id OR in one of their teams
-- - admins can see all leads of their tenant

-- There should be a table names user_teams with team id and userid fields
create policy "leads_select_policy"
on public.leads
for select
using (
    -- everyone should first match their tenant_id(same like in schema.sql)
    tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
    And((auth.jwt() ->> 'role') = 'admin' OR owner_id= (auth.jwt() ->> 'user_id')::uuid OR
    owner_id in (
        select user_id from user_teams where team_id in (select team_id from user_teams where user_id = (auth.jwt() ->> 'user_id')::uuid)
    )
    )
);


-- TODO: add INSERT policy that:
-- - allows counselors/admins to insert leads for their tenant
-- - ensures tenant_id is correctly set/validated


create policy "leads_insert_policy"
on public.leads
for insert
with check (
  -- matching tenant_id
  tenant_id = (auth.jwt() ->> 'tenant_id')::uuid
  AND (auth.jwt() ->> 'role') in ('admin', 'counselor')
);
