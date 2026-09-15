import React from 'react'

export default function DataTable(){
  // scaffolded static table + skeleton loader for heavy data
  return (
    <div className="overflow-x-auto bg-transparent">
      <table className="min-w-full text-sm divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Pickup</th>
            <th className="p-3 text-left">Dropoff</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Created</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
          {Array.from({length:3}).map((_,i)=> (
            <tr key={i}>
              <td className="p-3">#T-{1000+i}</td>
              <td className="p-3">123 Main St</td>
              <td className="p-3">456 Oak Ave</td>
              <td className="p-3"><span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs">pending</span></td>
              <td className="p-3">2026-09-15</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-3">
        <div className="h-8 w-40 skeleton rounded-md"></div>
      </div>
    </div>
  )
}
