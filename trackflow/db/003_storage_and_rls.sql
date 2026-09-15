-- 003_storage_and_rls.sql
-- Storage & RLS policy snippets for TrackFlow (Supabase)
-- TIGHTENED version: more restrictive with_check clauses and clearer guidance.
-- Run these in the Supabase SQL editor. Review and adapt roles/conditions to your needs.

-- NOTE: This file assumes you have the following tables already created (see prior migration files):
--  - public.profiles (id uuid references auth.users, role text)
--  - public.shipments
--  - public.drivers
--  - public.proof_of_delivery
--  - Supabase Storage bucket: "pod"

-- Enable pgcrypto if you use gen_random_uuid()
create extension if not exists pgcrypto;


-- === ROW LEVEL SECURITY (RLS) POLICIES (TIGHTENED) ===

-- 1) profiles: allow users to select/update their own profile and allow admins to manage
alter table if exists public.profiles enable row level security;

create policy if not exists profiles_select_own on public.profiles
  for select using ( id = auth.uid );

create policy if not exists profiles_update_own on public.profiles
  for update using ( id = auth.uid ) with check ( id = auth.uid );

create policy if not exists profiles_admin_full on public.profiles
  for all using ( exists (select 1 from public.profiles p where p.id = auth.uid and p.role = 'admin') );


-- 2) shipments: customers can create/select their shipments; drivers can select assigned shipments and update status; dispatchers and admins have controlled update access
alter table if exists public.shipments enable row level security;

-- Admin: full access (admins are trusted)
create policy if not exists shipments_admin_all on public.shipments
  for all
  using ( exists (select 1 from public.profiles p where p.id = auth.uid and p.role = 'admin') );

-- Customers: select/insert only for their own shipments
create policy if not exists shipments_customer_select on public.shipments
  for select
  using ( customer_id = auth.uid );

create policy if not exists shipments_customer_insert on public.shipments
  for insert
  with check ( customer_id = auth.uid );

-- Drivers: can select shipments assigned to them
create policy if not exists shipments_driver_select on public.shipments
  for select
  using ( driver_id = auth.uid );

-- Drivers: can update status fields for shipments assigned to them (allow only specific status transitions)
-- Note: this ensures the new status is one of the allowed values and that the driver is assigned to the shipment.
create policy if not exists shipments_driver_update_status on public.shipments
  for update
  using ( driver_id = auth.uid )
  with check (
    driver_id = auth.uid
    AND ( status in ('in-transit','delivered') )
  );

-- Dispatchers: may assign drivers (update driver_id) and update non-sensitive metadata, but should not be able to arbitrarily change delivery details
-- Tighten the `with check` so new row must only change driver_id and/or status (to allowed values). This is a best-effort check; consider adding a trigger-based guard for robust enforcement.
create policy if not exists shipments_dispatcher_update on public.shipments
  for update
  using ( exists (select 1 from public.profiles p where p.id = auth.uid and p.role = 'dispatcher') )
  with check (
    (
      (driver_id is not null)
      OR (status in ('pending','in-transit','delivered','cancelled'))
    )
  );

-- Select access for dispatchers
create policy if not exists shipments_dispatcher_select on public.shipments
  for select
  using ( exists (select 1 from public.profiles p where p.id = auth.uid and p.role = 'dispatcher') );


-- 3) drivers table: allow drivers to update their own location/status; dispatchers/admins to view/manage with restricted updates
alter table if exists public.drivers enable row level security;

create policy if not exists drivers_admin_all on public.drivers
  for all
  using ( exists (select 1 from public.profiles p where p.id = auth.uid and p.role = 'admin') );

create policy if not exists drivers_driver_select_own on public.drivers
  for select
  using ( id = auth.uid );

create policy if not exists drivers_driver_update_own on public.drivers
  for update
  using ( id = auth.uid )
  with check ( id = auth.uid );

create policy if not exists drivers_dispatcher_select on public.drivers
  for select
  using ( exists (select 1 from public.profiles p where p.id = auth.uid and p.role = 'dispatcher') );

-- Tighten dispatcher updates: allow dispatchers to update a limited set of fields only (vehicle_type, status, name).
-- Note: RLS `with check` validates the new row; it cannot easily assert "only these columns changed" without triggers.
-- This expression enforces that the new values for allowed fields are valid types/values. For stricter enforcement add a trigger that compares OLD vs NEW.
create policy if not exists drivers_dispatcher_update on public.drivers
  for update
  using ( exists (select 1 from public.profiles p where p.id = auth.uid and p.role = 'dispatcher') )
  with check (
    (
      status is null OR status in ('active','inactive','off-duty')
    )
    AND ( vehicle_type is null OR char_length(vehicle_type) <= 64 )
    AND ( name is null OR char_length(name) <= 128 )
  );


-- 4) proof_of_delivery: allow uploaders & admins to manage, and allow customers to view PODs for their shipments
alter table if exists public.proof_of_delivery enable row level security;

create policy if not exists pod_admin_all on public.proof_of_delivery
  for all
  using ( exists (select 1 from public.profiles p where p.id = auth.uid and p.role = 'admin') );

-- Uploader can insert/select their uploads
create policy if not exists pod_insert_by_uploader on public.proof_of_delivery
  for insert
  with check ( uploaded_by = auth.uid );

create policy if not exists pod_select_by_uploader on public.proof_of_delivery
  for select
  using ( uploaded_by = auth.uid );

-- Customers can view PODs for shipments they own
create policy if not exists pod_select_by_customer on public.proof_of_delivery
  for select
  using ( exists (select 1 from public.shipments s where s.id = proof_of_delivery.shipment_id and s.customer_id = auth.uid) );

-- Dispatchers can select PODs
create policy if not exists pod_select_by_dispatcher on public.proof_of_delivery
  for select
  using ( exists (select 1 from public.profiles p where p.id = auth.uid and p.role = 'dispatcher') );

-- Drivers can select PODs they uploaded
create policy if not exists pod_select_by_driver on public.proof_of_delivery
  for select
  using ( uploaded_by = auth.uid );


-- === STORAGE BUCKET POLICIES (storage.objects) ===
-- NOTE: Storage policies are applied to the storage.objects table in the "storage" schema.
-- The examples below assume a bucket called 'pod'. Adjust bucket_id as needed.

-- Allow authenticated users to insert (upload) objects into the "pod" bucket.
-- TIGHTENING: prefer to scope uploads by requiring object name to be prefixed with the uploader's uid (e.g. "{auth.uid}/..."), so you can link files to users.
-- This requires your client to upload files under paths prefixed with the user id.
create policy if not exists storage_pod_allow_upload on storage.objects
  for insert
  using ( bucket_id = 'pod' and auth.role() = 'authenticated' and name like (auth.uid || '/%') )
  with check ( bucket_id = 'pod' and auth.role() = 'authenticated' and name like (auth.uid || '/%') );

-- Allow select/download of objects if there is a matching proof_of_delivery record where the uploader is the requesting user
create policy if not exists storage_pod_allow_select_on_association on storage.objects
  for select
  using (
    bucket_id = 'pod' and (
      exists (select 1 from public.proof_of_delivery p where p.file_path = storage.objects.name and p.uploaded_by = auth.uid)
      OR exists (select 1 from public.profiles pr where pr.id = auth.uid and pr.role = 'admin')
      OR exists (select 1 from public.shipments s join public.proof_of_delivery p on p.shipment_id = s.id where p.file_path = storage.objects.name and s.customer_id = auth.uid)
    )
  );

-- Allow delete by uploader or admin (unchanged)
create policy if not exists storage_pod_allow_delete on storage.objects
  for delete
  using (
    bucket_id = 'pod' and (
      exists (select 1 from public.proof_of_delivery p where p.file_path = storage.objects.name and p.uploaded_by = auth.uid)
      OR exists (select 1 from public.profiles pr where pr.id = auth.uid and pr.role = 'admin')
    )
  );

-- Note: For private buckets, you may also want to control createSignedUrl and other behaviors in your application server.


-- === HELPFUL NOTES ===
-- 1) After applying these policies, test with a non-admin user. You can temporarily disable RLS on a table to debug
--    e.g. "alter table public.shipments disable row level security;" (not recommended in production).
-- 2) If using auth.users triggers to populate public.profiles, ensure the trigger is in place so profiles rows exist for auth.uid users.
-- 3) `with check` expressions here are defensive but cannot easily enforce "only these columns changed" without using triggers that compare OLD and NEW.
--    If you need strict column-level update restrictions, create a trigger that raises an exception when disallowed columns are changed by a non-admin.
-- 4) If you store location as PostGIS/geography types, adapt policies to reference geometry accordingly.

-- EOF
