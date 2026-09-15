## Mapbox integration

This scaffold includes a Mapbox-ready component at `src/components/MapboxMap.jsx` and the lightweight `MapPlaceholder` now renders it.

To enable the map locally:

1. Create a Mapbox access token (https://account.mapbox.com/access-tokens/).
2. Add it to your `.env` in the `trackflow` folder:

VITE_MAPBOX_TOKEN=pk.your_mapbox_token_here

3. npm install (if you haven't):

npm install

4. npm run dev

The `MapboxMap` component is intentionally minimal:
- It creates a Mapbox GL map instance.
- It accepts `drivers` and `shipments` props to render/update markers.
- Wire your realtime updates (Supabase Realtime, websockets) at a parent level and pass the data down to the map.

If you want, I can also:
- scaffold a `useDrivers` / `useShipments` hook that subscribes to Supabase real-time updates and feeds data into the map,
- or add simple mock data in the Customer/Dispatcher pages so the map shows example markers out-of-the-box.
