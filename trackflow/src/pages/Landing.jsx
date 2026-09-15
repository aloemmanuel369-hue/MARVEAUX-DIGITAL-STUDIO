import React from 'react'

export default function Landing(){
  return (
    <section className="space-y-8">
      <header className="text-center py-12">
        <h1 className="text-3xl md:text-5xl font-bold text-brand">TrackFlow</h1>
        <p className="mt-4 text-lg max-w-xl mx-auto">Real-time delivery tracking for fleets and e-commerce — built with React, Tailwind, and Supabase.</p>
        <div className="mt-6 flex justify-center gap-4">
          <a className="btn btn-touch px-6 py-2 bg-brand text-white rounded-md" href="/customer">Get Started</a>
          <a className="btn btn-touch px-6 py-2 border border-brand text-brand rounded-md" href="/dispatcher">Request Demo</a>
        </div>
      </header>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="font-semibold">How it works</h3>
          <ol className="mt-3 list-decimal list-inside text-sm space-y-2">
            <li>Create a shipment</li>
            <li>Assign a driver</li>
            <li>Track live on the map</li>
          </ol>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold">Pricing</h3>
          <p className="mt-2 text-sm">Simple usage-based pricing. Free tier for development.</p>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold">Security</h3>
          <p className="mt-2 text-sm">Auth via Supabase, role-based access and RLS policies (placeholders included in README).</p>
        </div>
      </section>
    </section>
  )
}
