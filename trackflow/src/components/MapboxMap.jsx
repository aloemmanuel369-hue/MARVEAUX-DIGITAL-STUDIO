import React, { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN
if (MAPBOX_TOKEN) mapboxgl.accessToken = MAPBOX_TOKEN

/**
 * MapboxMap - lightweight scaffold for Mapbox integration
 * Props:
 * - initialCenter: [lng, lat]
 * - initialZoom: number
 * - drivers: [{ id, current_location: { lat, lng }, name }]
 * - shipments: [{ id, pickup_location: { lat, lng }, dropoff_location: { lat, lng }, status }]
 *
 * Notes:
 * - Provide VITE_MAPBOX_TOKEN in your environment to enable the map.
 * - This component is intentionally minimal: it creates a Mapbox map instance,
 *   adds simple markers for drivers and shipments, and updates marker positions
 *   when the `drivers` or `shipments` props change.
 * - You should wire realtime updates (websockets / Supabase Realtime) to feed
 *   `drivers` and `shipments` props from parent components.
 */
export default function MapboxMap({ initialCenter = [-98.35, 39.50], initialZoom = 3, drivers = [], shipments = [] }) {
  const container = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef({})

  useEffect(() => {
    if (!MAPBOX_TOKEN) return
    if (mapRef.current) return

    mapRef.current = new mapboxgl.Map({
      container: container.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: initialCenter,
      zoom: initialZoom,
    })

    mapRef.current.addControl(new mapboxgl.NavigationControl())

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [initialCenter, initialZoom])

  // update markers for drivers
  useEffect(() => {
    if (!mapRef.current) return

    const current = markersRef.current
    const keep = new Set()

    drivers.forEach((d) => {
      if (!d?.current_location) return
      const id = `driver-${d.id}`
      keep.add(id)
      const lng = d.current_location.lng ?? d.current_location[0]
      const lat = d.current_location.lat ?? d.current_location[1]

      if (current[id]) {
        current[id].setLngLat([lng, lat])
      } else {
        const el = document.createElement('div')
        el.className = 'driver-marker'
        el.style.width = '18px'
        el.style.height = '18px'
        el.style.borderRadius = '50%'
        el.style.background = 'var(--brand-orange)'
        el.title = d.name || 'driver'

        const marker = new mapboxgl.Marker({ element: el }).setLngLat([lng, lat]).addTo(mapRef.current)
        current[id] = marker
      }
    })

    // shipments (use different marker style)
    shipments.forEach((s) => {
      if (!s) return
      const id = `shipment-${s.id}`
      keep.add(id)
      const loc = s.current_location ?? s.pickup_location ?? s.dropoff_location
      if (!loc) return
      const lng = loc.lng ?? loc[0]
      const lat = loc.lat ?? loc[1]

      if (current[id]) {
        current[id].setLngLat([lng, lat])
      } else {
        const el = document.createElement('div')
        el.className = 'shipment-marker'
        el.style.width = '14px'
        el.style.height = '14px'
        el.style.borderRadius = '3px'
        el.style.background = 'var(--brand-blue)'
        el.title = `shipment ${s.id}`

        const marker = new mapboxgl.Marker({ element: el }).setLngLat([lng, lat]).addTo(mapRef.current)
        current[id] = marker
      }
    })

    // remove markers not kept
    Object.keys(current).forEach((k) => {
      if (!keep.has(k)) {
        try { current[k].remove() } catch (e) { /* ignore */ }
        delete current[k]
      }
    })
  }, [drivers, shipments])

  return (
    <div className="w-full h-full relative">
      {!MAPBOX_TOKEN ? (
        <div className="w-full h-full flex items-center justify-center p-4 text-sm text-center text-slate-500 dark:text-slate-400">
          <div>
            <p className="mb-2">Mapbox token not found — set <code>VITE_MAPBOX_TOKEN</code> in .env to enable the map preview.</p>
            <p className="text-xs">This is a scaffold. Wire realtime updates and markers from your backend (Supabase Realtime / websockets).</p>
          </div>
        </div>
      ) : null}

      <div ref={container} className="w-full h-full rounded" style={{ display: MAPBOX_TOKEN ? 'block' : 'none' }} />

      <style>{`
        .driver-marker { box-shadow: 0 0 0 3px rgba(255,122,24,0.12); }
        .shipment-marker { box-shadow: 0 0 0 3px rgba(11,61,145,0.08); }
      `}</style>
    </div>
  )
}
