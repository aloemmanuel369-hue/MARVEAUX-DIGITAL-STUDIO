import React from 'react'
import Card from '../components/Card'
import DataTable from '../components/DataTable'

export default function DriverDashboard(){
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Driver Dashboard</h2>
      <Card>
        <h3 className="font-medium">Assigned shipments</h3>
        <DataTable />
      </Card>

      <Card>
        <h3 className="font-medium">Proof of delivery</h3>
        <p className="text-sm mt-2">Upload images or sign-offs (UI only).</p>
        <div className="mt-4">
          <button className="btn btn-touch px-4 py-2 bg-brand text-white rounded">Upload POD</button>
        </div>
      </Card>
    </div>
  )
}
