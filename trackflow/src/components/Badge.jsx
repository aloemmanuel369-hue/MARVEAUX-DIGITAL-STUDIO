import React from 'react'

const statusColors = {
  pending: 'bg-yellow-200 text-yellow-800',
  'in-transit': 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800'
}

export default function Badge({status}){
  const c = statusColors[status] || 'bg-gray-100 text-gray-800'
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${c}`}>{status}</span>
}
