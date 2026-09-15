import React from 'react'
import Card from '../components/Card'
import MapPlaceholder from '../components/MapPlaceholder'

export default function DispatcherDashboard(){
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Dispatcher Dashboard</h2>
      <Card>
        <h3 className="font-medium">Live map (scaffold)</h3>
        <div className="mt-4 h-96 rounded-md overflow-hidden">
          <MapPlaceholder />
        </div>
      </Card>

      <Card>
        <h3 className="font-medium">Driver assignment</h3>
        <p className="text-sm mt-2">Drag-and-drop or select driver to assign shipments (UI only).</p>
      </Card>
    </div>
  )
}
