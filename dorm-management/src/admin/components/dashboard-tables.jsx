import React from "react";
import { motion } from "framer-motion";
import TableSkeleton from "./skeleton-loader";

const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05 },
  }),
};

function DashboardTables({ tableData, loading }) {
  return (
    <div className="grid grid-cols-6 gap-4 py-5 px-4 h-120]">
      {/* ================= RECENT APPLICATIONS ================= */}
      <div className="col-span-3 flex flex-col h-100">
        <div className="flex items-center justify-between px-2">
          <h1 className="text-2xl font-medium py-2">Recent Applications</h1>
          <a
            href="/dashboard/application"
            className="text-blue-600 hover:underline"
          >
            View All
          </a>
        </div>

        <div className="flex-1 shadow-[0px_0px_20px_1px_#cbd5e0] rounded-sm p-4 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <table className="w-full border-collapse">
              <thead className="bg-[#343A40] text-white sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2 text-left">Student ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Gender</th>
                  <th className="px-4 py-2 text-left">Year</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>

              {loading ? (
                <TableSkeleton />
              ) : (
                <tbody className="divide-y">
                  {tableData?.recent_applications?.length > 0 ? (
                    tableData.recent_applications.map((recent, i) => (
                      <motion.tr
                        key={i}
                        custom={i}
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                        className="hover:bg-gray-100"
                      >
                        <td className="px-4 py-2">
                          {recent.student_id_number}
                        </td>
                        <td className="px-4 py-2">
                          {recent.first_name} {recent.last_name}
                        </td>
                        <td className="px-4 py-2">{recent.gender}</td>
                        <td className="px-4 py-2">{recent.year_level}</td>
                        <td className="px-4 py-2">
                          <span
                            className={`px-2 py-1 rounded-full text-white text-sm
                              ${
                                recent.status === "Approved"
                                  ? "bg-green-500"
                                  : recent.status === "Rejected"
                                  ? "bg-red-500"
                                  : "bg-amber-500"
                              }`}
                          >
                            {recent.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-4 text-gray-500"
                      >
                        No recent applications
                      </td>
                    </tr>
                  )}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>

      {/* ================= OVERDUE PAYMENTS ================= */}
      <div className="col-span-3 flex flex-col h-100">
        <div className="flex items-center justify-between px-2">
          <h1 className="text-2xl font-medium py-2">Overdue Payments</h1>
          <a
            href="/dashboard/tenants"
            className="text-blue-600 hover:underline"
          >
            View All
          </a>
        </div>

        <div className="flex-1 shadow-[0px_0px_20px_1px_#cbd5e0] rounded-sm p-4 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <table className="w-full border-collapse">
              <thead className="bg-[#343A40] text-white sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2 text-left">Tenant</th>
                  <th className="px-4 py-2 text-left">Room</th>
                  <th className="px-4 py-2 text-left">Due Date</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>

              {loading ? (
                <TableSkeleton columns={4} />
              ) : (
                <tbody className="divide-y">
                  {tableData?.pending_payments?.length > 0 ? (
                    tableData.pending_payments.map((p, i) => (
                      <motion.tr
                        key={i}
                        custom={i}
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                        className="hover:bg-gray-100"
                      >
                        <td className="px-4 py-2">{p.tenant_name}</td>
                        <td className="px-4 py-2">{p.room_number}</td>
                        <td className="px-4 py-2">
                          {p.due_date.split("T")[0]}
                        </td>
                        <td className="px-4 py-2">
                          <span className="px-2 py-1 bg-red-500 text-white rounded-full text-sm">
                            {p.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-4 text-gray-500"
                      >
                        No overdue payments
                      </td>
                    </tr>
                  )}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardTables;
