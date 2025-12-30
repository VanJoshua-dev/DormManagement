import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
function Header() {
  const location = useLocation();
  const [headerLocation, setHeaderLocation] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  console.log();

  useEffect(() => {
    const titles = {
      "/dashboard": "Dashboard",
      "/dashboard/application": "Application",
      "/dashboard/tenants": "Tenants",
      "/dashboard/rooms": "Rooms",
    };

    setHeaderLocation(titles[location.pathname] || "");
  }, [location.pathname]);

  return (
    <div className="w-full h-full flex items-center shadow">
      <div className="w-full h-full flex items-center px-10 bg-white justify-between">
        <span className="text-3xl font-semibold">{headerLocation}</span>

        <div className="flex items-center justify-center gap-4">
          <span>
            <FaUserCircle size={40} />
          </span>

          <div>
            <h1 className="text-xl font-medium">
              {user.name || "Unkown User"}
            </h1>
            <span className="text-blue-400 text-sm">
              {user.role || "Unknown role"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
