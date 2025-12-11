import React, { useState, useEffect } from "react";
import clx from "clsx";
function TenantsHeader() {
  return (
    <div className="px-5 py-5 w-full">
      <div className="shadow-[0px_0px_20px_1px_#cbd5e0] rounded-2xl px-5 py-6 flex flex-row items-center justify-between">
        {/**
         * Search Bar
         */}
        <div className="flex flex-row items-center justify-center gap-2">
          <input
            type="text"
            placeholder="Search by tenant name, room no"
            className="py-2 px-3 w-70 rounded-full border border-gray-300"
          />
          <button className="py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300 cursor-pointer">
            Search
          </button>
        </div>
        <div className="flex flex-row items-center justify-center gap-3">
          <div className="flex flex-row items-center gap-2">
            <p>Status: </p>
            <select className="px-3 cursor-pointer py-2 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700">
              <option value="">All</option>
              <option value="PAID">Paid</option>
              <option value="UNPAID">Unpaid</option>
              <option value="OVERDUE">Overdue</option>
              {/* Add more <option> elements here as needed */}
            </select>
          </div>

          <div className="flex flex-row items-center gap-2">
            <p>Move in Date: </p>
            <input
              type="date"
              className="w-full cursor-pointer px-4 py-2 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TenantsHeader;
