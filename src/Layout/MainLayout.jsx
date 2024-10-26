import React, { useState } from "react";
import Headers from "./Headers";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => {
  const [show, setShow] = useState(false);
  const showHide = () => {
    setShow(!show);
  };
  return (
    <div className="flex h-screen">
      <Sidebar showHide={showHide} show={show} />
      <div
        onClick={showHide}
        className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-gray-100"
      >
        <Headers showHide={showHide} />
        <main className="p-2 ">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
