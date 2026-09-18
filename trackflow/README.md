# Still Life Home

A calm, editorial e-commerce starter for the Marveaux Digital Studio repository.

## Run locally

```bash
cd trackflow
npm install
cp .env.example .env
npm run dev
```

## Production integrations

- Auth + database: create a Supabase project and run `supabase/schema.sql`
- Payments: create a Stripe Checkout Edge Function and return a hosted Stripe URL
- Email: configure SMTP through Supabase Auth, Resend, SendGrid, or Postmark
- Storage/admin: add a private/public product-images bucket and admin dashboard
- Webhooks: verify Stripe events and update order status after payment

Important: do not store API keys in the client app. Keep Stripe and email secrets in server-side functions only.

## Example Supabase schema

```sql
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
```
