### Proof-of-Delivery (POD) storage

This project includes a simple POD upload UI component at `src/components/PODUpload.jsx` which uploads files to a Supabase Storage bucket named `pod` and inserts a metadata record into the `proof_of_delivery` table.

To enable POD uploads in your Supabase project:

1. Create a storage bucket called `pod` in Supabase Storage. Choose public or private depending on your privacy needs.
2. Run the SQL migration `trackflow/db/002_create_proof_of_delivery.sql` in the Supabase SQL editor to create the `proof_of_delivery` table.
3. Ensure your RLS/storage policies allow authenticated users to upload to the `pod` bucket and insert into the `proof_of_delivery` table. Example storage policy (for public bucket uploads):

-- allow uploads to public bucket for authenticated users
-- replace 'anon' checks with appropriate role checks as needed

-- STORAGE policies are configured in the Supabase UI under Storage > Policies

4. In the driver dashboard you can now upload images/PDFs and associate them with a shipment ID. The UI component will attempt to insert a record into `proof_of_delivery` after upload.

If you'd like, I can also scaffold storage & RLS policy SQL snippets for the `pod` bucket and add server-side signed URL usage for private buckets.
