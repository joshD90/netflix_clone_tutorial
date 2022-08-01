import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "./topbar/TopBar";
import SideBar from "./sidebar/SideBar";
import "../app.css";

function Layout() {
  return (
    <>
      <TopBar />
      <div className="container">
        <SideBar />
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
