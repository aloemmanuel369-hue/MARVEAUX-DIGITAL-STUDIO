import React from 'react'

export default function Modal({open, onClose, title, children}){
  if(!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-800 rounded-md max-w-lg w-full p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onClose} className="text-sm">Close</button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}
