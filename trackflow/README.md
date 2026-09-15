# TrackFlow (UI scaffold)

This directory contains a scaffold for TrackFlow — a logistics/delivery tracking UI built with React + Tailwind + Supabase (client setup). It's intentionally UI-only: map integration, websocket/live location, and RLS policies need to be implemented by you.

Quick start:

1. cd trackflow
2. npm install
3. Create a .env file with:

VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_MAPBOX_TOKEN=pk.your_mapbox_token_here

4. npm run dev

Notes:
- Branch: trackflow-scaffold
- Roles & RLS: see trackflow/db/003_storage_and_rls.sql for tightened policies and guidance.
- Map: the MapPlaceholder component is where you'll wire Mapbox/Google Maps and live location updates.
- POD uploads: the client now prefixes storage uploads with the uploader's user id (e.g. `<user_id>/<timestamp>_filename`) to comply with storage policies in `trackflow/db/003_storage_and_rls.sql`.

DB migrations:
- trackflow/db/002_create_proof_of_delivery.sql — creates proof_of_delivery table
- trackflow/db/003_storage_and_rls.sql — tightened RLS & storage policies (review before applying)

If you'd like, I can also:
- scaffold a `useDrivers` / `useShipments` hook that subscribes to Supabase real-time updates and feeds data into the map,
- or add simple mock data in the Customer/Dispatcher pages so the map shows example markers out-of-the-box.
