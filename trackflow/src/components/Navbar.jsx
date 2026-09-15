import React from 'react'

export default function Navbar(){
  return (
    <nav className="sticky top-0 z-40 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto p-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full" style={{background:'linear-gradient(135deg,var(--brand-blue),var(--brand-orange))'}}></div>
          <span className="font-semibold">TrackFlow</span>
        </a>

        <div className="flex items-center gap-3">
          <a className="hidden md:inline-block" href="/customer">Customer</a>
          <a className="hidden md:inline-block" href="/dispatcher">Dispatcher</a>
          <a className="hidden md:inline-block" href="/driver">Driver</a>
          <a className="hidden md:inline-block" href="/admin">Admin</a>

          <button className="btn btn-touch px-3 py-1 border rounded" aria-label="toggle theme" onClick={() => {
            document.documentElement.classList.toggle('dark')
          }}>Dark</button>

        </div>
      </div>
    </nav>
  )
}
