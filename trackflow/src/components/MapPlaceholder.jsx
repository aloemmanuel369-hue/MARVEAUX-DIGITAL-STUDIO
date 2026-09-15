import React from 'react'

export default function MapPlaceholder(){
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-white dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
      <div className="text-center text-sm text-slate-500 dark:text-slate-400">
        Map placeholder — integrate Mapbox / Google Maps here.\n
        Structure ready for markers, popups, and live polylines.
      </div>
    </div>
  )
}
