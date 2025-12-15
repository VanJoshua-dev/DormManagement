import React from "react";
import clx from "clsx";
import { TbHome } from "react-icons/tb";
import { TbHomeCheck } from "react-icons/tb";
import { TbHomeCancel } from "react-icons/tb";
import { MdOutlinePending } from "react-icons/md";
import { FaPeopleRoof } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
function Metric({ metricData }) {
  const iconSize = 30;
  const navigate = useNavigate();
  const metrics = [
    {
      title: "Total Rooms",
      value: metricData.total_rooms,
      icon: <TbHome size={iconSize} />,
      color: "#007BFF",
      link: "/dashboard/rooms",
    },
    {
      title: "Total Tenants",
      value: metricData.total_tenants,
      icon: <FaPeopleRoof size={iconSize} />,
      color: "#6C757D",
      link: "/dashboard/tenants",
    },
    {
      title: "Available Rooms",
      value: metricData.available_rooms,
      icon: <TbHomeCheck size={iconSize} />,
      color: "#198754",
      link: "/dashboard/rooms?status=Available",
    },

    {
      title: "On-Hold Applications",
      value: metricData.pending_applications,
      icon: <MdOutlinePending size={iconSize} />,
      color: "#FFC107",
      link: "/dashboard/application?status=On-Hold",
    },
  ];
  return (
    <div className="w-full py-5 px-4 flex flex-row gap-2 items-center justify-between">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className={clx(
            `flex flex-row items-end px-4 py-4 hover:scale-102 justify-between w-full rounded-sm h-30 transition-transform duration-300 cursor-pointer `
          )}
          style={{ backgroundColor: metric.color }}
          onClick={() => navigate(metric.link)}
        >
          <div className="flex flex-col gap-3 h-full">
            <span className="text-xl font-medium text-white">
              {metric.title}
            </span>
            <span className="text-3xl font-semibold text-white">
              {metric.value}
            </span>
          </div>
          <div className="text-white">{metric.icon}</div>
        </div>
      ))}
    </div>
  );
}

export default Metric;
