import React from "react";

function DashboardTables() {
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
                      Course
                    </th>
                    <th className="w-1/5 px-4 py-2   text-left font-semibold">
                      Year
                    </th>
                    <th className="w-1/5 px-4 py-2   text-left font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="align-top">
                  <tr className="hover:bg-gray-200 transition-colors duration-300">
                    <td className="px-4 py-2  ">
                      220100234
                    </td>
                    <td className="px-4 py-2  ">
                      Van Joshua Escalante
                    </td>
                    <td className="px-4 py-2  ">BSIT</td>
                    <td className="px-4 py-2  ">1</td>
                    <td className="px-4 py-2 text-white font-medium">
                       <span className="py-1 px-2 bg-amber-400 rounded-full">PENDING</span>
                    </td>
                  </tr>
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
                      Course
                    </th>
                    <th className="w-1/5 px-4 py-2   text-left font-semibold">
                      Year
                    </th>
                    <th className="w-1/5 px-4 py-2   text-left font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="align-top">
                  <tr className="hover:bg-gray-200 transition-colors duration-300">
                    <td className="px-4 py-2  ">
                      220100234
                    </td>
                    <td className="px-4 py-2  ">
                      Van Joshua Escalante
                    </td>
                    <td className="px-4 py-2  ">BSIT</td>
                    <td className="px-4 py-2  ">1</td>
                    <td className="px-4 py-2   text-white font-medium">
                        <span className="py-1 px-2 bg-red-400 rounded-full">UNPAID</span>
                    </td>
                  </tr>
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
