-- LearnLynk Tech Test - Task 1: Schema
-- Fill in the definitions for leads, applications, tasks as per README.

create extension if not exists "pgcrypto";

-- Leads table
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null,
  owner_id uuid not null,
  email text,
  phone text,
  full_name text,
  stage text not null default 'new',
  source text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- solution
create index if not exists idx_leads_search
on public.leads (tenant_id, owner_id, stage, created_at desc);
-- weshould include tenant as well for multiple data as we would need to display differently for each tenant like select * from table where tenant_id = something


-- Applications table
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null,
  lead_id uuid not null references public.leads(id) on delete cascade,
  program_id uuid,
  intake_id uuid,
  stage text not null default 'inquiry',
  status text not null default 'open',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- TODO: add useful indexes for applications:
-- - by tenant_id, lead_id, stage

-- solution
create index if not exists idx_applications_search 
on public.applications (tenant_id, lead_id);


-- Tasks table
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null,
  related_id uuid not null references public.applications(id) on delete cascade,
  title text,
  type text not null,
  status text not null default 'open',
  due_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()

  -- - add check constraint for type in ('call','email','review')
  constraint check_task_type check (type in ('call', 'email', 'review')),

  -- - add constraint that due_at >= created_at
  constraint check_due_date check (due_at >= created_at)
);

-- TODO:


-- - add indexes for tasks due today by tenant_id, due_at, status
create index if not exists idx_tasks_due_search_today 
on public.tasks (tenant_id, status, (due_at::date));
-- write query like select * from tasks where tenant_id ='' and status = 'open' and due_at::date = CURRENT_DATE;