import React from 'react'
import Card from '../components/Card'
import MapboxMap from '../components/MapboxMap'
import useDrivers from '../hooks/useDrivers'
import useShipments from '../hooks/useShipments'

export default function DispatcherDashboard(){
  const drivers = useDrivers()
  const shipments = useShipments()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Dispatcher Dashboard</h2>
      <Card>
        <h3 className="font-medium">Live map (scaffold)</h3>
        <div className="mt-4 h-96 rounded-md overflow-hidden">
          <MapboxMap drivers={drivers} shipments={shipments} initialCenter={[-98.35,39.5]} initialZoom={3} />
        </div>
      </Card>

      <Card>
        <h3 className="font-medium">Driver assignment</h3>
        <p className="text-sm mt-2">Drag-and-drop or select driver to assign shipments (UI only).</p>
      </Card>
    </div>
  )
}
