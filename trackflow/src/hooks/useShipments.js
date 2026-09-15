import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

function normalizeLocation(loc){
  // support object {lat,lng} or array [lng,lat] or [lat,lng]
  if (!loc) return null
  if (Array.isArray(loc)){
    if (loc.length >= 2){
      const [a,b] = loc
      // heuristics: if values are lat in [-90,90] assume [lat,lng]
      if (Math.abs(a) <= 90 && Math.abs(b) <= 180) return { lat: a, lng: b }
      return { lat: b, lng: a }
    }
    return null
  }
  if (typeof loc === 'object'){
    if ('lat' in loc && 'lng' in loc) return { lat: loc.lat, lng: loc.lng }
    if ('latitude' in loc && 'longitude' in loc) return { lat: loc.latitude, lng: loc.longitude }
  }
  return null
}

export default function useShipments(){
  const [shipments, setShipments] = useState([])

  useEffect(() => {
    let mounted = true

    async function load(){
      const { data, error } = await supabase.from('shipments').select('*')
      if (mounted && !error){
        const mapped = (data || []).map(s => ({
          ...s,
          // prefer a current_location field if present, otherwise pickup or dropoff
          current_location: normalizeLocation(s.current_location) || normalizeLocation(s.pickup_location) || normalizeLocation(s.dropoff_location)
        }))
        setShipments(mapped)
      }
    }

    load()

    const channel = supabase
      .channel('public:shipments')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'shipments' }, (payload) => {
        const { eventType, new: newRow, old } = payload
        setShipments(prev => {
          const mappedNew = newRow ? { ...newRow, current_location: normalizeLocation(newRow.current_location) || normalizeLocation(newRow.pickup_location) || normalizeLocation(newRow.dropoff_location) } : null
          const mappedOld = old ? { ...old, current_location: normalizeLocation(old.current_location) || normalizeLocation(old.pickup_location) || normalizeLocation(old.dropoff_location) } : null

          if (eventType === 'INSERT') return [...prev, mappedNew]
          if (eventType === 'UPDATE') return prev.map(s => s.id === mappedNew.id ? mappedNew : s)
          if (eventType === 'DELETE') return prev.filter(s => s.id !== mappedOld.id)
          return prev
        })
      })
      .subscribe()

    return () => {
      mounted = false
      supabase.removeChannel(channel)
    }
  }, [])

  return shipments
}
