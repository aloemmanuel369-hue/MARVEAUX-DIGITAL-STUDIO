import React from 'react'
import Card from '../components/Card'
import DataTable from '../components/DataTable'
import MapboxMap from '../components/MapboxMap'
import useDrivers from '../hooks/useDrivers'
import useShipments from '../hooks/useShipments'
import PODUpload from '../components/PODUpload'

export default function DriverDashboard(){
  const drivers = useDrivers()
  const shipments = useShipments()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Driver Dashboard</h2>
      <Card>
        <h3 className="font-medium">Assigned shipments</h3>
        <DataTable />
      </Card>

      <Card>
        <h3 className="font-medium">Proof of delivery</h3>
        <p className="text-sm mt-2">Upload images or sign-offs (UI + Supabase Storage)</p>
        <div className="mt-4">
          <PODUpload />
        </div>
      </Card>

      <Card>
        <h3 className="font-medium">Live map</h3>
        <div className="mt-4 h-72 rounded-md overflow-hidden">
          <MapboxMap drivers={drivers} shipments={shipments} initialCenter={[-98.35,39.5]} initialZoom={3} />
        </div>
      </Card>
    </div>
  )
}
