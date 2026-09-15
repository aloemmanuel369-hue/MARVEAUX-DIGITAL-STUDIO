# TrackFlow (UI scaffold)

This directory contains a scaffold for TrackFlow — a logistics/delivery tracking UI built with React + Tailwind + Supabase (client setup). It's intentionally UI-only: map integration, websocket/live location, and RLS policies need to be implemented by you.

Quick start:

1. cd trackflow
2. npm install
3. Create a .env file with:

VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key

4. npm run dev

Notes:
- Branch: trackflow-scaffold
- Roles & RLS: see README-RLS.md placeholder for recommended policies and SQL examples.
- Map: the MapPlaceholder component is where you'll wire Mapbox/Google Maps and live location updates.
