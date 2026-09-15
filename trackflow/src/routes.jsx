import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import CustomerDashboard from './pages/CustomerDashboard'
import DriverDashboard from './pages/DriverDashboard'
import DispatcherDashboard from './pages/DispatcherDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function AppRoutes(){
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/customer" element={<CustomerDashboard/>} />
          <Route path="/driver" element={<DriverDashboard/>} />
          <Route path="/dispatcher" element={<DispatcherDashboard/>} />
          <Route path="/admin" element={<AdminDashboard/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
