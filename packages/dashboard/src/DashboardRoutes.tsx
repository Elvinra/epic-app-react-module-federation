import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Views/Dashboard'

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
    </Routes>
  )
}

export default DashboardRoutes