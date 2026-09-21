-- Enable extensions in Supabase before running.
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  email text not null,
  stripe_session_id text unique,
  status text not null default 'pending',
  total_cents integer not null default 0,
  items jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id text primary key,
  name text not null,
  category text not null,
  price_cents integer not null,
  description text,
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "Users can view their own orders" on public.orders
for select using (auth.uid() = user_id or email = auth.jwt()->>'email');

create policy "Service role manages orders" on public.orders
for all using (auth.role() = 'service_role');
