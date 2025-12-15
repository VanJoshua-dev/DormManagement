import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./components/sidebar";
import Header from "./components/header";
import { Outlet } from "react-router-dom";

function MainContainer() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate("/", { replace: true });
      
    }
  }, []);

  if(user === null){
    return <div>Checking...</div>
  }

  return (
    <div className="grid grid-cols-7 grid-rows-12 gap-0 min-h-screen">
      <div className="row-span-12">
        <SideBar />
      </div>
      <div className="col-span-6">
        <Header />
      </div>
      <div className="col-span-6 row-span-11 col-start-2 row-start-2">
        <Outlet />
      </div>
    </div>
  );
}

export default MainContainer;
