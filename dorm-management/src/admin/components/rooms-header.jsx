import React, { useState } from "react";
import AddNewRoom from "./modals/add-new-room-modal";

function RoomsHeader() {
  const [showAdd, setShowAdd] = useState(false);
  return (
    <div className="px-5 py-5 w-full">
      <div className="shadow-[0px_0px_20px_1px_#cbd5e0] rounded-2xl px-5 py-6 flex flex-row items-center justify-between">
        {/**
         * Search Bar
         */}
        <div className="flex flex-row items-center justify-center gap-2">
          <input
            type="text"
            placeholder="Search by room no"
            className="py-2 px-3 rounded-full border border-gray-300"
          />
          <button className="py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300 cursor-pointer">
            Search
          </button>
        </div>
        {/**
         * Filter bar
         */}
        <div className="flex flex-row items-center justify-center gap-3">
          <div className="flex flex-row items-center gap-2">
            <p>Status: </p>
            <select className="cursor-pointer px-3 py-2 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700">
              <option value="">All</option>
              <option value="Available">Available</option>
              <option value="Full">Full</option>
              <option value="Maintenance">Maintenance</option>
              {/* Add more <option> elements here as needed */}
            </select>
          </div>

          <div className="cursor-pointer flex flex-row items-center gap-2">
            <p>Gender: </p>
            <select className="cursor-pointer px-3 py-2 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700">
              <option value="">All</option>
              <option value="AVAILABLE">Male</option>
              <option value="DOUBLE">Female</option>
            </select>
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
