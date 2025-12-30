import React from "react";
import clx from "clsx";
import Swal from "sweetalert2";
import noResult from "../../assets/search-cross-svgrepo-com.svg";
import EmptyState from "../../assets/folder-open-svgrepo-com.svg";
import { useApproveApplication } from "../../services/application-module-services";
import { TopLoader } from "../../components/lightswind/top-loader";
import { useRejectApplication } from "../../services/application-module-services";
function ApplicationTable({ tableData, isFilter }) {
  const { loading, handleApprove } = useApproveApplication();
  const { loading1, handleReject } = useRejectApplication();
 
  if (loading || loading1) return <TopLoader isLoading={loading || loading1} />;

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
          {isFilter
            ? "Try adjusting your filter settings."
            : "Once students submit application, they will appear here."}
        </p>
      </div>
    );
  }

  return (
    <div className="px-5 w-full h-120">
      <div className="w-full h-full shadow-[0px_0px_20px_1px_#cbd5e0] rounded-sm flex flex-col">
        {/* SCROLL CONTAINER */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full border-collapse">
            <thead className="bg-[#343A40] text-white sticky top-0 z-20">
              <tr>
                <th className="px-4 py-3 text-left">Student ID</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Gender</th>
                <th className="px-4 py-3 text-left">Year</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Contact</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Date Applied</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {tableData.map((data, index) => (
                <tr key={index} className="hover:bg-gray-100 transition-colors">
                  <td className="px-4 py-2">{data.studentIdNumber}</td>
                  <td className="px-4 py-2">
                    {data.firstName} {data.lastName}
                  </td>
                  <td className="px-4 py-2">{data.gender}</td>
                  <td className="px-4 py-2">{data.yearLevel}</td>
                  <td className="px-4 py-2">{data.email}</td>
                  <td className="px-4 py-2">{data.contactNumber}</td>

                  <td className="px-4 py-2">
                    <span
                      className={clx(
                        "px-2 py-1 rounded-full text-white text-sm",
                        data.status === "On-Hold" && "bg-amber-400",
                        data.status === "Approved" && "bg-blue-400",
                        data.status === "Rejected" && "bg-red-400"
                      )}
                    >
                      {data.status}
                    </span>
                  </td>

                  <td className="px-4 py-2">
                    {data.dateApplied.split("T")[0]}
                  </td>

                  <td className="px-4 py-2">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() =>
                          handleApprove(
                            `${data.firstName} ${data.lastName}`,
                            data.applicationId,
                            data.gender
                          )
                        }
                        disabled={
                          data.status === "Approved" ||
                          data.status === "Rejected"
                        }
                        className={clx(
                          "px-3 py-1 rounded-full text-white text-sm transition",
                          data.status === "Approved" ||
                            data.status === "Rejected"
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                        )}
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          handleReject(
                            `${data.firstName} ${data.lastName}`,
                            data.applicationId
                          )
                        }
                        disabled={
                          data.status === "Approved" ||
                          data.status === "Rejected"
                        }
                        className={clx(
                          "px-3 py-1 rounded-full text-white text-sm transition",
                          data.status === "Approved" ||
                            data.status === "Rejected"
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600"
                        )}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ApplicationTable;
