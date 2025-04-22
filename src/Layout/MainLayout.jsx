import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Headers from "./Headers";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const [show, setShow] = useState(false);
  const showHide = (e) => {
    e.stopPropagation();
    setShow(!show);
  };
  return (
    <div className="flex h-screen">
      <Sidebar showHide={showHide} show={show} />
      <div
        onClick={() => setShow(false)}
        className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-gray-100"
      >
        <Headers showHide={showHide} />
        <main className="p-2 ">
          <Outlet />
        </main>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default MainLayout;
