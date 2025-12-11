import React from 'react'
import TenantsHeader from '../components/tenants-header'
import TenantsTable from '../components/tenants-table'

function Tenants() {
  return (
    <div className='min-h-full'>
      <TenantsHeader />
      <TenantsTable />
    </div>
  )
}

export default Tenants
