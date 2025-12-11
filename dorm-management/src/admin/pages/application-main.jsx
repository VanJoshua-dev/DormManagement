import React from 'react'
import ApplicationHeader from '../components/application-header'
import ApplicationTable from '../components/application-table'

function Application() {
  return (
    <div className='min-h-full'>
      <ApplicationHeader />
      <ApplicationTable />
    </div>
  )
}

export default Application
