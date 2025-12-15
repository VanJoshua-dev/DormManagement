import React from "react";
import logo from "../../assets/dormLogo.png";
import { MdDashboard } from "react-icons/md";
import { SiGoogleforms } from "react-icons/si";
import { FaPeopleRoof } from "react-icons/fa6";
import { FaKey } from "react-icons/fa6";
import { IoLogOutSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import clx from "clsx";
import { useNavigate, useLocation } from "react-router-dom";

function SideBar() {
  const iconSize = 25;
  const location = useLocation();
  const navigate = useNavigate();
  const tabs = [
    {
      tabName: "Dashboard",
      icon: <MdDashboard size={iconSize} />,
      route: "/dashboard",
    },
    {
      tabName: "Applications",
      icon: <SiGoogleforms size={iconSize} />,
      route: "/dashboard/application",
    },
    {
      tabName: "Tenants",
      icon: <FaPeopleRoof size={iconSize} />,
      route: "/dashboard/tenants",
    },
    {
      tabName: "Rooms",
      icon: <FaKey size={iconSize} />,
      route: "/dashboard/rooms",
    },
  ];

  const handleLogout = async () => {
    const result = await Swal.fire({
      icon: "question",
      title: "Leaving Already?",
      text: "You'll need to sign in again to access your account.",
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: "Not Yet",
      confirmButtonText: "Log out",
    });

    if (result.isConfirmed) {
      localStorage.removeItem("user");
      navigate("/", { replace: true });
    }
  };
  return (
    <div className="bg-[#343A40] h-full py-3 flex flex-col items-center justify-between">
      {/**
       * Logo + Tabs
       */}
      <div className="w-full flex flex-col gap-4 ">
        <div className=" flex flex-col gap-2 py-4 px-2 border-b-2 border-white  items-center justify-center">
          <div className="px-3 py-3 bg-white rounded-full border-3">
            <img src={logo} className="w-20 h-20 rounded-full" alt="" />
          </div>

          <h1 className="text-lg text-center font-bold text-white">
            Dormitory Management System
          </h1>
        </div>
        <ul className="flex flex-col items-center gap-2 px-5 justify-center">
          {tabs.map((tab, index) => (
            <li
              key={index}
              onClick={() => navigate(tab.route)}
              className={clx(
                "px-4 py-2 flex flex-row items-center rounded-lg cursor-pointer w-full gap-4 transition-colors duration-300",
                location.pathname === tab.route
                  ? "bg-[#495057]"
                  : "hover:bg-gray-500/40 "
              )}
            >
              <span className="text-gray-300">{tab.icon}</span>
              <span className="text-lg text-white font-medium">
                {tab.tabName}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/**
       * Logout Button
       */}
      <div className="w-full flex pt-3 px-4 border-t-2 border-white  items-center justify-center">
        <button
          onClick={handleLogout}
          className="px-2 py-2 min-w-full rounded-sm flex flex-row items-center justify-center gap-5 hover:bg-gray-500/40 transition-colors duration-300 cursor-pointer"
        >
          <span className="text-white text-lg">Logout</span>
          <span className="text-gray-300">
            <IoLogOutSharp size={iconSize} />
          </span>
        </button>
      </div>
    </div>
  );
}

export default SideBar;
