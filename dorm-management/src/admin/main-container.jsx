import React from "react";
import SideBar from "./components/sidebar";
import Header from "./components/header";
import { Outlet } from "react-router-dom";
function MainContainer() {
  return (
    <div className="grid grid-cols-5 grid-rows-8 min-h-screen">
    <div className="row-span-8">
        <SideBar />
    </div>
    <div className="col-span-4 ">
        <Header />
    </div>
    <div className="col-span-4 row-span-7 col-start-2 row-start-2">
        <Outlet />
    </div>
</div>
  );
}

export default MainContainer;
