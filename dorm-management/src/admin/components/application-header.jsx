import React, { useState, useEffect } from "react";
import clx from "clsx";
import { IoCopySharp } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { TopLoader } from "../../components/lightswind/top-loader";
import { useUpdateApplicationAccess } from "../../services/application-module-services";
function ApplicationHeader({ onFilterChange, isFilter }) {
  const location = useLocation();
  const statusQuery = new URLSearchParams(location.search).get("status") || "";

  const {loading, access, updateAccess } = useUpdateApplicationAccess();
  
  
  console.log(access);
  
  
  const [checked, setChecked] = useState(access);

  
  const [generatedLink, setGeneratedLink] = useState(
    "http://localhost:5173/student-application-form"
  );
  /**
   * When checked value change
   */

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(statusQuery);
  const [applied_date, setAppliedDate] = useState("");

 

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
  const handleDateChange = (e) => {
    setAppliedDate(e.target.value);
    onFilterChange({ applied_date: e.target.value });
    isFilter();
  };

  const handleClearFilter = () => {
    setSearch("");
    setStatus("");
    setAppliedDate("");

    onFilterChange({
      search: "",
      status: "",
      applied_date: "",
    });
  };

  if(loading) return <TopLoader isLoading={loading} />

  return (
    <div className="px-5 py-5 w-full">
      <div className="shadow-[0px_0px_20px_1px_#cbd5e0] rounded-2xl px-5 py-2 flex flex-row items-center justify-between">
        {/**
         * Search Bar
         */}
        <div className="flex flex-row items-center justify-center gap-2">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by student name, id"
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
              <option value="On-Hold">On-Hold</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              {/* Add more <option> elements here as needed */}
            </select>
          </div>

          <div className="cursor-pointer flex flex-row items-center gap-2">
            <p>Date: </p>
            <input
              type="date"
              value={applied_date}
              onChange={handleDateChange}
              className="w-full px-4 py-2 border border-gray-300 cursor-pointer rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            />
          </div>
          <div className="cursor-pointer flex flex-row items-center gap-2">
            <button
              onClick={handleClearFilter}
              className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 cursor-pointer transition-colors duration-300"
            >
              Clear filter
            </button>
          </div>
        </div>
        {/**
         * Control application form accessibility
         */}
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-gray-400 font-semibold">
            Application form Accessibility
          </p>
          <div className="flex flex-row items-center justify-center gap-2">
            <label className="inline-flex items-center mb-5 gap-2 cursor-pointer">
              <p>Close</p>
              <input
                type="checkbox"
                onChange={() => updateAccess(!access)}
                checked={access}
                className="sr-only peer"
              />
              <div
                className={clx(
                  "relative w-11 h-6 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand",
                  access ? "bg-blue-500" : "bg-gray-500"
                )}
              ></div>
              <p>Open</p>
            </label>
          </div>
          {/**
           * Application link
           */}

          {access && (
            <div className="flex flex-row items-center justify-center gap-2">
              <input
                value={generatedLink}
                type="text"
                title="Application form link"
                className="border px-1 py-1 rounded-sm"
                readOnly
              />
              <button
                title="Copy application form link"
                className="hover:text-gray-400 cursor-pointer transition-all duration-300"
              >
                <IoCopySharp size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ApplicationHeader;
