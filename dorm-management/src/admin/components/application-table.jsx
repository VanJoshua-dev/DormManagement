import React, {useState} from "react";
import clx from "clsx";
function ApplicationTable() {
    const [status, setStatus] = useState("On-Hold")
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
                  <th className="px-4 py-3 text-left font-semibold">Course</th>
                  <th className="px-4 py-3 text-left font-semibold">Year</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Date Applied
                  </th>
                </tr>
              </thead>

              <tbody className=" divide-y divide-gray-200">
                <tr className="hover:bg-gray-100 transition-colors duration-300">
                  <td className="px-4 py-2">220100234</td>
                  <td className="px-4 py-2">Van Joshua Escalante</td>
                  <td className="px-4 py-2">BSIT</td>
                  <td className="px-4 py-2">1</td>
                  <td className={clx("px-4 py-2  font-medium")}>
                    <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                     className={clx(" px-1 py-1 cursor-pointer border border-gray-300 rounded-full text-black  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500", status === "On-Hold" && "bg-amber-400 text-white" || status === "APPROVED" && "bg-blue-400 text-white", status === "REJECTED" && "bg-red-400 text-white")}>
                    
                      <option value={"On-Hold"} className="bg-white text-black">
                        On Hold
                      </option>
                      <option
                        value={"APPROVED"}
                        className="bg-white text-black"
                      >
                        Approved
                      </option>
                      <option
                        value={"REJECTED"}
                        className="bg-white text-black"
                      >
                        Rejected
                      </option>
                    </select>
                  </td>
                  <td className="px-4 py-2 font-medium">2025-01-02</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationTable;
