import React from "react";
import { FiMenu } from "react-icons/fi";

const Headers = ({ showHide }) => {
  return (
    <div className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1">
      <header className="flex flex-grow items-center justify-between px-4 py-4 shadow-2">
        <div className="flex gap-2">
          <button className="md:hidden block text-2xl" onClick={showHide}>
            <FiMenu />
          </button>
          <input
            type="text"
            placeholder="Type to search..."
            className="border rounded p-2 "
          />
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 bg-gray-200 rounded-full">🔔</button>
          <img
            src="https://via.placeholder.com/40"
            alt="User profile"
            className="rounded-full w-10 h-10"
          />
          <span>Thomas Anree</span>
        </div>
      </header>
    </div>
  );
};

export default Headers;
