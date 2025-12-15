import React, {useState} from 'react'
import TenantsHeader from '../components/tenants-header'
import TenantsTable from '../components/tenants-table'
import useFetchTenants from '../../services/tenants-services.js'
import { TopLoader } from '../../components/lightswind/top-loader.jsx'
function Tenants() {
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    move_in_date: ""
  })

  const [isFilter, setIsFilter] = useState(false);
  const {loading, tenants} = useFetchTenants(filters);
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  if(loading) return <TopLoader isLoading={loading} />
  return (
    <div className='min-h-full'>
      <TenantsHeader isFilter={() => setIsFilter(true)} onFilterChange={handleFilterChange} />
      <TenantsTable tableData={tenants} isFilter={isFilter} />
    </div>
  )
}

export default Tenants
