import React, {useState, useEffect} from "react";
import clx from "clsx";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
function TenantsTable() {

    const [status, setStatus] = useState("PAID");
  return (
    <div className="px-5 w-full">
      <div className="w-full h-full px-1  rounded-sm">
        <div className="w-full h-full overflow-hidden">
          <div className="overflow-y-auto max-h-full">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-[#343A40] text-white sticky top-0 z-20">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">
                    Full Name
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">Room Number</th>
                  <th className="px-4 py-3 text-left font-semibold">Move in Date</th>
                  <th className="px-4 py-3 text-left font-semibold">Due Date</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                  <th className="px-4 py-3 text-left font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className=" divide-y divide-gray-200">
                <tr className="hover:bg-gray-100 transition-colors duration-300">
                  <td className="px-4 py-2">John Doe</td>
                  <td className="px-4 py-2">18</td>
                  <td className="px-4 py-2">Dec, 2, 2025</td>
                  <td className="px-4 py-2">Dec, 2, 2026</td>
                  <td className={clx("px-4 py-2  font-medium")}>
                    <select 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)}
                className={clx("cursor-pointer px-1 py-1 border border-gray-300 rounded-full text-black  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",  status === "PAID" && "bg-green-400 text-white" || status === "UNPAID" && "bg-amber-400 text-white" || status === "OVERDUE" && "bg-red-400 text-white")}>
                     
                      <option value={"PAID"} className="bg-white text-black">
                        Paid
                      </option>
                      <option
                        value={"UNPAID"}
                        className="bg-white text-black"
                      >
                        Unpaid
                      </option>
                      <option
                        value={"OVERDUE"}
                        className="bg-white text-black"
                      >
                        Overdue
                      </option>
                    </select>
                  </td>
                  <td className="px-4 py-2 font-medium">
                    <button className="py-2 px-4 rounded-l-xl bg-green-500 hover:bg-green-600 transition-colors duration-300 cursor-pointer text-white"><FaEdit size={20}/></button>
                    <button className="py-2 px-4 rounded-r-xl bg-red-500 hover:bg-red-600 transition-colors duration-300 cursor-pointer text-white"><MdDeleteOutline size={20}/></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TenantsTable;
