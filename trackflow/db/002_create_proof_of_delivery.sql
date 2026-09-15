-- 002_create_proof_of_delivery.sql

-- Creates a table to record proof-of-delivery uploads and metadata
-- Run this in Supabase SQL editor or as part of your migrations

create table if not exists proof_of_delivery (
  id uuid primary key default gen_random_uuid(),
  shipment_id uuid references shipments(id) on delete set null,
  file_path text not null,
  public_url text,
  uploaded_by uuid references profiles(id),
  uploaded_at timestamptz default now()
);

-- Note: create a storage bucket named "pod" in Supabase Storage (public or private depending on your policy).
