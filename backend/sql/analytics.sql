-- BelTech web analytics schema
-- Run this in the Supabase SQL editor once.

create extension if not exists "pgcrypto";

create table if not exists analytics_sessions (
  id uuid primary key default gen_random_uuid(),
  visitor_id text not null,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  last_seen_at timestamptz not null default now(),
  duration_ms integer not null default 0,
  bounced boolean not null default true,
  source text not null default 'direct',
  referrer text default '',
  country text default 'Unknown',
  city text default 'Unknown',
  device text not null default 'desktop',
  landing_page text not null default '/',
  current_page text not null default '/',
  is_active boolean not null default true,
  pageview_count integer not null default 1
);

create index if not exists analytics_sessions_started_at_idx on analytics_sessions (started_at desc);
create index if not exists analytics_sessions_visitor_id_idx on analytics_sessions (visitor_id);
create index if not exists analytics_sessions_active_idx on analytics_sessions (is_active, last_seen_at desc);

create table if not exists analytics_pageviews (
  id uuid primary key default gen_random_uuid(),
  visitor_id text not null,
  session_id uuid references analytics_sessions (id) on delete set null,
  path text not null,
  title text default '',
  viewed_at timestamptz not null default now(),
  dwell_ms integer not null default 0
);

create index if not exists analytics_pageviews_viewed_at_idx on analytics_pageviews (viewed_at desc);
create index if not exists analytics_pageviews_path_idx on analytics_pageviews (path);

create table if not exists analytics_sections (
  id uuid primary key default gen_random_uuid(),
  visitor_id text not null,
  session_id uuid references analytics_sessions (id) on delete set null,
  path text not null,
  section_id text not null,
  dwell_ms integer not null default 0,
  viewed_at timestamptz not null default now()
);

create index if not exists analytics_sections_path_idx on analytics_sections (path, section_id);
create index if not exists analytics_sections_viewed_at_idx on analytics_sections (viewed_at desc);
