import React, { useState } from "react";
import ApplicationHeader from "../components/application-header";
import ApplicationTable from "../components/application-table";
import useFetchApplication from "../../services/application-module-services.js";
import { TopLoader } from "../../components/lightswind/top-loader.jsx";
function Application() {
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    applied_date: "",
  });

  const [isFilter, setIsFiltered] = useState(false)
  const { loading, applications } = useFetchApplication(filters);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  if (loading) return <TopLoader isLoading={loading} />;
  return (
    <div className="min-h-full">
      <ApplicationHeader
        onFilterChange={handleFilterChange}
        isFilter={() => setIsFiltered(true)}
      />
      <ApplicationTable tableData={applications} isFilter={isFilter} />
    </div>
  );
}

export default Application;
