import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./navbar/Navbar";
export default function Layout() {
  const location = useLocation();
  const pathName = location.pathname;
  return (
    <main
      className={`main-lg main-md main-mobile ${
        pathName == "/"
          ? "h-[225dvh]"
          : pathName == "/cites"
          ? "h-[120dvh]"
          : pathName == "/map"
          ? "h-[170dvh]"
          : ""
      } bg-shades-5 size-full `}
    >
      <div className=" border size-full rounded-3xl bg-shades-2 p-5 lg:grid grid-cols-[8%_90%] grid-rows-1 gap-5 ">
        <div className="container-mobile container-lg lg:border-none lg:bg-shades-4/20 bg-shades-2/95 bottom-0 right-0 lg:rounded-3xl  flex items-center justify-center">
          <Navbar />
        </div>
        <div className="border size-full rounded-3xl bg-shades-5/20 p-5">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
