import React from 'react'

export default function Footer(){
  return (
    <footer className="bg-white/50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto p-6 text-sm text-center">
        © {new Date().getFullYear()} TrackFlow — Built with ❤️. Privacy • Terms
      </div>
    </footer>
  )
}
