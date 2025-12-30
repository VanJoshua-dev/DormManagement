import React, { useState } from "react";
import RoomsHeader from "../components/rooms-header";
import RoomsTable from "../components/rooms-table";
import { useFetchAllRooms } from "../../services/room-module-services";
import { TopLoader } from "../../components/lightswind/top-loader";

function Rooms() {

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    type: "",
    gender: ""
  })

  const [isFilter, setIsFiltered] = useState(false)

  const { loading, rooms } = useFetchAllRooms(filters);

   const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  if (loading) return <TopLoader isLoading={loading} /> ;

  return (
    <div className="min-h-full">
      <RoomsHeader
      onFilterChange={handleFilterChange}
      isFilter={() => setIsFiltered(true)}
       />
      <RoomsTable rooms={rooms} isFiltered={isFilter} />
      
    </div>
  );
}

export default Rooms;
