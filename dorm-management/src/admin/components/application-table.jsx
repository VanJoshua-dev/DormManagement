import React, { useState } from "react";
import clx from "clsx";

import noResult from "../../assets/search-cross-svgrepo-com.svg";
import EmptyState from "../../assets/folder-open-svgrepo-com.svg";
function ApplicationTable({ tableData, isFilter }) {
  console.log(tableData);
  if (!tableData || tableData.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 text-center">
        <img
          src={isFilter ? noResult : EmptyState}
          alt="No Applications"
          className="w-40 opacity-70 mb-5"
        />
        <h1 className="text-xl font-semibold text-gray-600">
          {isFilter
            ? "No application match your filter"
            : "No application have been submitted yet"}
        </h1>
        <p className="text-gray-500 mt-1">
          {isFilter ? (
            "Try adjusting your filter settings."
          ) : (
            <span>Once students submit application, they will appear here.</span>
          )}
        </p>
      </div>
    );
  }

  const handleStatusChange = async (status, id) => {
    console.log(status)
    console.log(id)
  }

  return (
    <div className="px-5 w-full">
      <div className="w-full h-full px-1  rounded-sm">
        <div className="w-full h-full overflow-hidden">
          {/* Scrollable table body */}
          <div className="overflow-y-auto max-h-full">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-[#343A40] text-white sticky top-0 z-20">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">
                    Student ID
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">Name</th>
                  <th className="px-4 py-3 text-left font-semibold">Gender</th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Year Level
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">Email</th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Contact Number
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Date Applied
                  </th>
                </tr>
              </thead>

              <tbody className=" divide-y divide-gray-200">
                {tableData.map((data, index) => (
                  <tr key={index} className="hover:bg-gray-100 transition-colors duration-300">
                    <td className="px-4 py-2">{data.studentIdNumber}</td>
                    <td className="px-4 py-2">{data.firstName} {data.lastName}</td>
                    <td className="px-4 py-2">{data.gender}</td>
                    <td className="px-4 py-2">{data.yearLevel}</td>
                    <td className="px-4 py-2">{data.email}</td>
                    <td className="px-4 py-2">{data.contactNumber}</td>
                    <td className={clx("px-4 py-2  font-medium")}>
                      <select
                        value={data.status}
                        onChange={(e) => handleStatusChange(e.target.value, data.applicationId)}
                        className={clx(
                          " px-1 py-1 cursor-pointer border border-gray-300 rounded-full text-black  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                          (data.status === "On-Hold" && "bg-amber-400 text-white") ||
                            (data.status === "Approved" && "bg-blue-400 text-white") ||
                          (data.status === "Rejected" && "bg-red-400 text-white")
                        )}
                      >
                        <option
                          value={"On-Hold"}
                          className="bg-white text-black"
                        >
                          On Hold
                        </option>
                        <option
                          value={"Approved"}
                          className="bg-white text-black"
                        >
                          Approved
                        </option>
                        <option
                          value={"Rejected"}
                          className="bg-white text-black"
                        >
                          Rejected
                        </option>
                      </select>
                    </td>
                    <td className="px-4 py-2 font-medium">{data.dateApplied.split("T")[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationTable;
