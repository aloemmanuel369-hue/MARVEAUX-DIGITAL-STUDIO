import React from 'react'
import Card from '../components/Card'
import DataTable from '../components/DataTable'
import MapPlaceholder from '../components/MapPlaceholder'

export default function CustomerDashboard(){
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Customer Dashboard</h2>

      <section className="grid md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-medium">Create Shipment</h3>
          <form className="mt-4 space-y-4">
            <div>
              <label className="block text-sm">Pickup location</label>
              <input className="mt-1 input w-full" placeholder="123 Main St" />
            </div>
            <div>
              <label className="block text-sm">Dropoff location</label>
              <input className="mt-1 input w-full" placeholder="456 Oak Ave" />
            </div>
            <div className="flex gap-2">
              <button className="btn btn-touch px-4 py-2 bg-brand text-white rounded">Create</button>
              <button type="button" className="btn btn-touch px-4 py-2 border rounded">Reset</button>
            </div>
          </form>
        </Card>

        <Card>
          <h3 className="text-lg font-medium">Live tracking</h3>
          <div className="mt-4 h-64 md:h-80 rounded-md overflow-hidden">
            <MapPlaceholder />
          </div>
        </Card>
      </section>

      <section>
        <h3 className="text-lg font-medium mb-3">Shipment history</h3>
        <DataTable />
      </section>
    </div>
  )
}
