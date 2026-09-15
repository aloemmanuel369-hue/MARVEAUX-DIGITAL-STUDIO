import React from 'react'
import Routes from './routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-slate-900 dark:text-slate-100">
      <Routes />
      <ToastContainer />
    </div>
  )
}
