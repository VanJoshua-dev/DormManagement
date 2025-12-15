import React from 'react'
import Metric from '../components/metric'
import DashboardTables from '../components/dashboard-tables'
import useDashboardService from '../../services/dashboard-services.js'
import { TopLoader } from '../../components/lightswind/top-loader.jsx'
function Dashboard() {

  const {loading, dashboardData} = useDashboardService();

  if(loading) return <TopLoader isLoading={loading} />

  console.log("Metric: ", dashboardData.metrics);
  
  return (
    <div className='min-h-full'>
        <Metric metricData={dashboardData.metrics} />
        <DashboardTables tableData={dashboardData.tables} />
    </div>
    
  )
}

export default Dashboard
