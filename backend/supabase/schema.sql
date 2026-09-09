-- Run this in the Supabase SQL editor (Dashboard > SQL > New query)
-- Creates tables for the BelTech backend.
-- The admin user is seeded automatically by the server on first startup.

-- ============ admins table ============
create table if not exists public.admins (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  created_at timestamptz not null default now()
);

-- ============ solutions table ============
create table if not exists public.solutions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  detail text not null default '',
  image_url text not null default '',
  link text not null default '',
  created_at timestamptz not null default now()
);

-- ============ insights table ============
create table if not exists public.insights (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  detail text not null default '',
  date timestamptz not null default now(),
  image_url text not null default '',
  created_at timestamptz not null default now()
);

-- ============ contacts table ============
create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  last_name text default '',
  email text not null,
  phone text default '',
  organization text default '',
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

-- ============ Row Level Security (optional; service role bypasses RLS) ============
alter table public.admins enable row level security;
alter table public.solutions enable row level security;
alter table public.insights enable row level security;
alter table public.contacts enable row level security;

-- Public read access to solutions + insights
create policy "public read solutions" on public.solutions
  for select using (true);
create policy "public read insights" on public.insights
  for select using (true);

-- Public insert into contacts (contact form)
create policy "public insert contacts" on public.contacts
  for insert with check (true);
