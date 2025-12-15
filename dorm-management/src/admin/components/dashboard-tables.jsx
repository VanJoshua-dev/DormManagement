import React from "react";

function DashboardTables({ tableData }) {
  return (
    <div className="grid grid-cols-6 grid-rows-5 gap-4 py-5 px-4 h-100">
      <div className="col-span-3 row-span-5">
        <h1 className="text-2xl font-medium py-2">Recent Applications</h1>
        <div className="w-full h-full px-5 py-5 shadow-[0px_0px_20px_1px_#cbd5e0] rounded-sm">
          <div className="w-full h-full overflow-hidden">
            <div className="overflow-y-auto max-h-full">
              <table className="w-full table-auto border-collapse">
                <thead className="bg-[#343A40] text-white  sticky top-0 z-10">
                  <tr>
                    <th className="w-1/5 px-4 py-2   text-left font-semibold">
                      Student ID
                    </th>
                    <th className="w-1/5 px-4 py-2   text-left font-semibold">
                      Name
                    </th>
                    <th className="w-1/5 px-4 py-2   text-left font-semibold">
                      Gender
                    </th>
                    <th className="w-1/5 px-4 py-2   text-left font-semibold">
                      Year Level
                    </th>
                    <th className="w-1/5 px-4 py-2   text-left font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="align-top">
                  {tableData?.recent_applications?.length > 0 ? (
                    tableData.recent_applications.map((recent, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-200 transition-colors duration-300"
                      >
                        <td className="px-4 py-2">
                          {recent.student_id_number}
                        </td>
                        <td className="px-4 py-2">
                          {recent.first_name} {recent.last_name}
                        </td>
                        <td className="px-4 py-2">{recent.gender}</td>
                        <td className="px-4 py-2">{recent.year_level}</td>
                        <td className="px-4 py-2 font-medium">
                          {recent.status === "On-Hold" && (
                            <span className="py-1 px-2 bg-amber-400 text-white rounded-full">
                              {recent.status}
                            </span>
                          )}
                          {recent.status === "Approved" && (
                            <span className="py-1 px-2 bg-green-400 text-white rounded-full">
                              {recent.status}
                            </span>
                          )}
                          {recent.status === "Rejected" && (
                            <span className="py-1 px-2 bg-red-400 text-white rounded-full">
                              {recent.status}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-4 text-lg text-gray-500"
                      >
                        No recent application yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-3 row-span-5 col-start-4">
        <h1 className="text-2xl font-medium py-2">Pending Payments</h1>
        <div className="w-full h-full px-5 py-5 shadow-[0px_0px_20px_1px_#cbd5e0] rounded-sm">
          <div className="w-full h-full overflow-hidden">
            <div className="overflow-y-auto max-h-full">
              <table className="w-full table-auto border-collapse">
                <thead className="bg-[#343A40] text-white  sticky top-0 z-10">
                  <tr>
                    <th className="w-1/5 px-4 py-2   text-left font-semibold">
                      Student ID
                    </th>
                    <th className="w-1/5 px-4 py-2   text-left font-semibold">
                      Tenant
                    </th>
                    <th className="w-1/5 px-4 py-2   text-left font-semibold">
                      Gender
                    </th>
                    <th className="w-1/5 px-4 py-2   text-left font-semibold">
                      Year Level
                    </th>
                    <th className="w-1/5 px-4 py-2   text-left font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="align-top">
                  {tableData?.pending_payments?.length > 0 ? (
                    tableData.pending_payments.map((pending, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-200 transition-colors duration-300"
                      >
                        <td className="px-4 py-2">
                          {pending.student_id_number}
                        </td>
                        <td className="px-4 py-2">
                          {pending.first_name} {pending.last_name}
                        </td>
                        <td className="px-4 py-2">{pending.gender}</td>
                        <td className="px-4 py-2">{pending.year_level}</td>
                        <td className="px-4 py-2 font-medium">
                          {pending.status === "Paid" && (
                            <span className="py-1 px-2 bg-green-400 text-white rounded-full">
                              {pending.status}
                            </span>
                          )}
                          {pending.status === "Unpaid" && (
                            <span className="py-1 px-2 bg-amber-400 text-white rounded-full">
                              {pending.status}
                            </span>
                          )}
                          {pending.status === "Overdue" && (
                            <span className="py-1 px-2 bg-red-400 text-white rounded-full">
                              {pending.status}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-4 text-lg text-gray-500"
                      >
                        No pending payments
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardTables;
