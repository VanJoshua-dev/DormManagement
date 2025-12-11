import React, { useState, useEffect } from "react";
import clx from "clsx";
import { IoCopySharp } from "react-icons/io5";
function ApplicationHeader() {
  const [checked, setChecked] = useState(false);
  const [generatedLink, setGeneratedLink] = useState(
    "https://localhost:5173/student-application-form"
  );
  /**
   * When checked value change
   */
  useEffect(() => {
    /**
     * Call API to set te application form accessibility
     */

    console.log(checked);
  }, [checked]);
  return (
    <div className="px-5 py-5 w-full">
      <div className="shadow-[0px_0px_20px_1px_#cbd5e0] rounded-2xl px-5 py-2 flex flex-row items-center justify-between">
        {/**
         * Search Bar
         */}
        <div className="flex flex-row items-center justify-center gap-2">
          <input
            type="text"
            placeholder="Search by student name, id"
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
              <option value="">Pending</option>
              <option value="">Approved</option>
              <option value="">Rejected</option>
              {/* Add more <option> elements here as needed */}
            </select>
          </div>
          <div className="flex flex-row items-center gap-2">
            <p>Course: </p>
            <select className="cursor-pointer w-full px-3 py-2 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700">
              <option value="">All</option>
              <option value="">BSIT</option>
              <option value="">BSBA</option>
              <option value="">BSCS</option>
              {/* Add more <option> elements here as needed */}
            </select>
          </div>
          <div className="cursor-pointer flex flex-row items-center gap-2">
            <p>Date: </p>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            />
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
              <p>Disable</p>
              <input
                type="checkbox"
                onChange={(e) => setChecked(e.target.checked)}
                value={checked}
                className="sr-only peer"
              />
              <div
                className={clx(
                  "relative w-11 h-6 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand",
                  checked ? "bg-blue-500" : "bg-gray-500"
                )}
              ></div>
              <p>Enable</p>
            </label>
          </div>
          {/**
           * Application link
           */}

          {checked && (
            <div className="flex flex-row items-center justify-center gap-2">
              <input
                value={generatedLink}
                type="text"
                title="Application form link"
                className="border px-1 py-1 rounded-sm"
                readOnly
              />
              <button title="Copy application form link" className="hover:text-gray-400 cursor-pointer transition-all duration-300">
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
