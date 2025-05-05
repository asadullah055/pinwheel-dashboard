import React from "react";
import { FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import LogoutButton from "../components/LogoutButton";

const Headers = ({ showHide }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1">
      <header className="flex grow items-center justify-between px-4 py-4 shadow-2">
        <div className="flex gap-2">
          <button className="md:hidden block text-2xl" onClick={showHide}>
            <FiMenu />
          </button>
          <input
            type="text"
            placeholder="Type to search..."
            className="border rounded-sm p-2 "
          />
        </div>

        <div className="flex items-center space-x-4">
          <h3 className="capitalize">
            {user.role === "admin" ? "admin" : user.name}
          </h3>
          {user.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt={user.name || "image"}
              className="rounded-full w-10 h-10"
            />
          ) : (
            <h4 className="bg-gray-300 w-10 h-10 rounded-full text-center flex items-center justify-center text-2xl font-semibold">
              {user.name.trim().charAt(0).toUpperCase()}
            </h4>
          )}

          {/* <span className="hidden md:inline-block ">Thomas Anree</span> */}
          <LogoutButton />
        </div>
      </header>
    </div>
  );
};

export default Headers;
