import React from 'react'
import MapboxMap from './MapboxMap'

/**
 * MapPlaceholder decides whether to render the MapboxMap (when token exists)
 * or show a neutral placeholder with integration instructions.
 */
export default function MapPlaceholder(){
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-white dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
      {/* MapboxMap will hide itself and show a token-missing message if VITE_MAPBOX_TOKEN is not set */}
      <MapboxMap />
    </div>
  )
}
