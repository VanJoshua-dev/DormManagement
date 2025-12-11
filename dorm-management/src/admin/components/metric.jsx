import React from "react";
import clx from "clsx";
import { TbHome } from "react-icons/tb";
import { TbHomeCheck } from "react-icons/tb";
import { TbHomeCancel } from "react-icons/tb";
import { MdOutlinePending } from "react-icons/md";
import { FaPeopleRoof } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
function Metric() {
  const iconSize = 30;
  const navigate = useNavigate();
  const metrics = [
    {
      title: "Total Rooms",
      value: "50",
      icon: <TbHome size={iconSize} />,
      color: "#007BFF",
      link: "/dashboard/rooms"
    },
    {
      title: "Total Tenants",
      value: "40",
      icon: <FaPeopleRoof size={iconSize} />,
      color: "#6C757D",
      link: "/dashboard/tenants"
    },
    {
      title: "Available Rooms",
      value: "10",
      icon: <TbHomeCheck size={iconSize} />,
      color: "#198754",
      link: "/dashboard/rooms?status=available"
    },
    
    {
      title: "Pending Applications",
      value: "12",
      icon: <MdOutlinePending size={iconSize} />,
      color: "#FFC107",
      link: "/dashboard/application?status=on-hold"
    },
  ];
  return (
    <div className="w-full py-5 px-4 flex flex-row gap-2 items-center justify-between">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className={clx(`flex flex-row items-end px-4 py-4 hover:scale-102 justify-between w-full rounded-sm h-30 transition-transform duration-300 cursor-pointer `)}
          style={{backgroundColor: metric.color}}
          onClick={() => navigate(metric.link)}
        >
          <div className="flex flex-col gap-3 h-full">
            <span className="text-xl font-medium text-white">{metric.title}</span>
            <span className="text-3xl font-semibold text-white">{metric.value}</span>
          </div>
          <div className="text-white">{metric.icon}</div>
        </div>
      ))}
    </div>
  );
}

export default Metric;
