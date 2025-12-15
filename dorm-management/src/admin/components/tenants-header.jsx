import React, { useState, useEffect } from "react";
import clx from "clsx";
function TenantsHeader({onFilterChange, isFilter}) {

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [move_in_date, setDate] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    onFilterChange({search: e.target.value})
    isFilter();
  };
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    onFilterChange({status: e.target.value})
    isFilter();
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
    onFilterChange({move_in_date: e.target.value})
    isFilter();
  };

  const handleClearFilter = () => {
    setSearch("");
    setStatus("");
    setDate("");

    onFilterChange({
      search: "",
      status: "",
      move_in_date: "",
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
            placeholder="Search by tenant name, room no"
            className="py-2 px-3 w-70 rounded-full border border-gray-300"
          />
        </div>
        <div className="flex flex-row items-center justify-center gap-3">
          <div className="flex flex-row items-center gap-2">
            <p>Status: </p>
            <select 
            value={status}
            onChange={handleStatusChange}
            className="px-3 cursor-pointer py-2 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700">
              <option value="">All</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Overdue">Overdue</option>
              {/* Add more <option> elements here as needed */}
            </select>
          </div>

          <div className="flex flex-row items-center gap-2">
            <p className="w-full">Move in Date: </p>
            <input
              type="date"
              value={move_in_date}
              onChange={handleDateChange}
              className="w-full cursor-pointer px-4 py-2 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            />
          </div>

          <div className="flex flex-row items-center gap-2">
            <button
            onClick={handleClearFilter}
             className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 cursor-pointer transition-colors duration-300">
              Clear Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TenantsHeader;
