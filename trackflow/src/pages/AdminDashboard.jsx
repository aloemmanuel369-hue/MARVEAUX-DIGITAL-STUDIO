import React from 'react'
import Card from '../components/Card'

export default function AdminDashboard(){
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-medium">Fleet analytics</h3>
          <div className="mt-4 h-48 bg-white/5 rounded-md flex items-center justify-center">Charts placeholder</div>
        </Card>
        <Card>
          <h3 className="font-medium">Deliveries / day & avg delivery time</h3>
          <div className="mt-4 h-48 bg-white/5 rounded-md flex items-center justify-center">Charts placeholder</div>
        </Card>
      </div>

      <Card>
        <h3 className="font-medium">Client billing</h3>
        <p className="text-sm mt-2">Table scaffold for invoicing & billing details.</p>
      </Card>
    </div>
  )
}
