import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function useDrivers(){
  const [drivers, setDrivers] = useState([])

  useEffect(() => {
    let mounted = true

    async function load(){
      const { data, error } = await supabase.from('drivers').select('*')
      if (mounted && !error) setDrivers(data || [])
    }
    load()

    const channel = supabase
      .channel('public:drivers')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'drivers' }, (payload) => {
        const { eventType, new: newRow, old } = payload
        setDrivers(prev => {
          if (eventType === 'INSERT') return [...prev, newRow]
          if (eventType === 'UPDATE') return prev.map(d => d.id === newRow.id ? newRow : d)
          if (eventType === 'DELETE') return prev.filter(d => d.id !== old.id)
          return prev
        })
      })
      .subscribe()

    return () => {
      mounted = false
      supabase.removeChannel(channel)
    }
  }, [])

  return drivers
}
