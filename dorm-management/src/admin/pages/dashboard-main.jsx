import React from 'react'
import Metric from '../components/metric'
import DashboardTables from '../components/dashboard-tables'

function Dashboard() {
  return (
    <div className='min-h-full'>
        <Metric />
        <DashboardTables />
    </div>
    
  )
}

export default Dashboard
