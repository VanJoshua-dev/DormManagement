import React, { useState, useEffect } from "react";
import clx from "clsx";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import EditTenant from "./modals/edit-tenant-modal";
import noResult from "../../assets/search-cross-svgrepo-com.svg";
import EmptyState from "../../assets/folder-open-svgrepo-com.svg";
import { TopLoader } from "../../components/lightswind/top-loader";
import { useUpdatePaymentStatus } from "../../services/tenants-services";
import { useRemoveTenant } from "../../services/tenants-services";
function TenantsTable({ tableData, isFilter }) {
  const [selectedTenant, setSelectedTenant] = useState(null);
  const { loading, update_payment } = useUpdatePaymentStatus();
  const { loading1, remove_tenant } = useRemoveTenant();
  if (loading || loading1) return <TopLoader isLoading={loading || loading1} />;
  if (!tableData || tableData.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 text-center">
        <img
          src={isFilter ? noResult : EmptyState}
          alt="No rooms"
          className="w-40 opacity-70 mb-5"
        />
        <h1 className="text-xl font-semibold text-gray-600">
          {isFilter
            ? "No tenants match your filter"
            : "No tenants have been added yet"}
        </h1>
        <p className="text-gray-500 mt-1">
          {isFilter ? (
            "Try adjusting your filter settings."
          ) : (
            <span>
              Once you approved applications they'll become a tenant and they
              will appear here.
            </span>
          )}
        </p>
      </div>
    );
  }
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
                  <th className="px-4 py-3 text-left font-semibold">Gender</th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Room Number
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Move in Date
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Due Date
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                  <th className="px-4 py-3 text-center font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className=" divide-y divide-gray-200">
                {tableData.map((data, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 transition-colors duration-300"
                  >
                    <td className="px-4 py-2">{data.tenant_name}</td>
                    <td className="px-4 py-2">{data.Gender}</td>
                    <td className="px-4 py-2">{data.room_number}</td>
                    <td className="px-4 py-2">
                      {data.move_in_date.split("T")[0]}
                    </td>
                    <td className="px-4 py-2">{data.due_date.split("T")[0]}</td>
                    <td className={clx("px-4 py-2  font-medium")}>
                      <select
                        onChange={(e) =>
                          update_payment(
                            data.tenant_name,
                            data.tenantID,
                            e.target.value
                          )
                        }
                        defaultValue={data.payment_status}
                        // onChange={(e) => setStatus(e.target.value)}
                        className={clx(
                          "cursor-pointer px-1 py-1 border border-gray-300 rounded-full text-black  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                          (data.payment_status === "Paid" &&
                            "bg-green-400 text-white") ||
                            (data.payment_status === "Overdue" &&
                              "bg-red-400 text-white")
                        )}
                      >
                        <option value={"Paid"} className="bg-white text-black">
                          Paid
                        </option>

                        <option
                          value={"Overdue"}
                          className="bg-white text-black"
                        >
                          Overdue
                        </option>
                      </select>
                    </td>
                    <td className="px-4 py-2 font-medium flex flex-row items-center justify-center gap-2">
                      <button
                        onClick={() => setSelectedTenant(data)}
                        className="py-2 px-4 rounded-xl bg-blue-500 hover:bg-blue-600 transition-colors duration-300 cursor-pointer text-white"
                      >
                        <span>Change Room</span>
                      </button>
                      <button
                        onClick={() =>
                          remove_tenant(data.tenant_name, data.tenantID)
                        }
                        className="py-2 px-4 rounded-xl bg-red-500 hover:bg-red-600 transition-colors duration-300 cursor-pointer text-white"
                      >
                        <MdDeleteOutline size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedTenant && (
        <EditTenant
          onClose={() => setSelectedTenant(null)}
          selectedTenant={selectedTenant}
        />
      )}
    </div>
  );
}

export default TenantsTable;
