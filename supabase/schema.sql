-- ===========================================================================
-- Cheesus — Supabase schema (optional cloud sync)
-- Run this once in your Supabase project's SQL editor.
-- It stores the whole app state as one JSON row per family.
-- ===========================================================================

create table if not exists public.cheesus_state (
  family_code text primary key,
  state       jsonb       not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);

-- Enable Row Level Security.
alter table public.cheesus_state enable row level security;

-- NOTE on security model:
-- This app uses only the public "anon" key (no login). The FAMILY_CODE acts
-- as a shared secret: only devices that know the exact code can read/write
-- that family's row. Keep the code private to your family.
-- The policies below allow anon read/write to this single table only.

drop policy if exists "cheesus anon read"  on public.cheesus_state;
drop policy if exists "cheesus anon write" on public.cheesus_state;
drop policy if exists "cheesus anon update" on public.cheesus_state;

create policy "cheesus anon read"
  on public.cheesus_state for select
  to anon using (true);

create policy "cheesus anon write"
  on public.cheesus_state for insert
  to anon with check (true);

create policy "cheesus anon update"
  on public.cheesus_state for update
  to anon using (true) with check (true);

-- Realtime: let clients receive live updates (e.g. parent approves on phone).
alter publication supabase_realtime add table public.cheesus_state;
