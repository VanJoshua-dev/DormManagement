import React from "react";
import clx from "clsx";
import { TbHome } from "react-icons/tb";
import { TbHomeCheck } from "react-icons/tb";
import { TbHomeCancel } from "react-icons/tb";
import { MdOutlinePending } from "react-icons/md";
function Metric() {
  const iconSize = 30;
  const metrics = [
    {
      title: "Total Rooms",
      value: "50",
      icon: <TbHome size={iconSize} />,
      color: "#007BFF",
    },
    {
      title: "Available Rooms",
      value: "10",
      icon: <TbHomeCheck size={iconSize} />,
      color: "#198754",
    },
    {
      title: "Unavailable Rooms",
      value: "40",
      icon: <TbHomeCancel size={iconSize} />,
      color: "#6C757D",
    },
    {
      title: "Pending Applications",
      value: "12",
      icon: <MdOutlinePending size={iconSize} />,
      color: "#FFC107",
    },
  ];
  return (
    <div className="w-full py-5 px-4 flex flex-row gap-2 items-center justify-between">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className={clx(`flex flex-row items-end px-4 py-4 justify-between w-full rounded-sm h-30 `)}
          style={{backgroundColor: metric.color}}
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
