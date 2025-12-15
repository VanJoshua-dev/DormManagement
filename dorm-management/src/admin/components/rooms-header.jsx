import React, { useEffect, useState } from "react";
import AddNewRoom from "./modals/add-new-room-modal";
import { useLocation } from "react-router-dom";
function RoomsHeader({ onFilterChange, isFilter }) {
  const location = useLocation();
  const statusQuery = new URLSearchParams(location.search).get("status") || "";

  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(statusQuery);
  const [type, setType] = useState("");
  const [gender, setGender] = useState("");
//adssad
  useEffect(() => {
    if (statusQuery) {
      onFilterChange({ status: statusQuery });
      isFilter();
    }
  }, [statusQuery]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    onFilterChange({ search: e.target.value });
    isFilter();
  };
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    onFilterChange({ status: e.target.value });
    isFilter();
  };
  const handletypeChange = (e) => {
    setType(e.target.value);
    onFilterChange({ type: e.target.value });
    isFilter();
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
    onFilterChange({ gender: e.target.value });
    isFilter();
  };

  const handleClearFilter = () => {
    setSearch("");
    setStatus("");
    setType("");
    setGender("");

    onFilterChange({
      search: "",
      status: "",
      type: "",
      gender: "",
    });
  };

  return (
    <div className="px-5 py-5 w-full">
      <div className="shadow-[0px_0px_20px_1px_#cbd5e0] rounded-2xl px-5 py-6 flex flex-row items-center justify-between">
        {/**
         * Search Bar
         */}
        <div className="flex flex-row items-center justify-center gap-2">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by room no"
            className="py-2 px-3 rounded-full border border-gray-300"
          />
        </div>
        {/**
         * Filter bar
         */}
        <div className="flex flex-row items-center justify-center gap-3">
          <div className="flex flex-row items-center gap-2">
            <p>Status: </p>
            <select
              value={status}
              onChange={handleStatusChange}
              className="cursor-pointer px-3 py-2 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            >
              <option value="">All</option>
              <option value="Available">Available</option>
              <option value="Full">Full</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          <div className="cursor-pointer flex flex-row items-center gap-2">
            <p>Type: </p>
            <select
              value={type}
              onChange={handletypeChange}
              className="cursor-pointer px-3 py-2 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            >
              <option value="">All</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Triple">Triple</option>
              <option value="Quad">Quad</option>
            </select>
          </div>

          <div className="cursor-pointer flex flex-row items-center gap-2">
            <p>Gender: </p>
            <select
              value={gender}
              onChange={handleGenderChange}
              className="cursor-pointer px-3 py-2 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="cursor-pointer flex flex-row items-center gap-2">
            <button
              onClick={handleClearFilter}
              className="px-3 py-2 bg-blue-500 rounded-full text-white cursor-pointer hover:bg-blue-600 transition-colors duration-300"
            >
              Clear filter
            </button>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-2">
          <button
            onClick={() => setShowAdd(true)}
            className="py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
          >
            + Add new room
          </button>
        </div>
      </div>
      {showAdd && <AddNewRoom onClose={() => setShowAdd(false)} />}
    </div>
  );
}

export default RoomsHeader;
