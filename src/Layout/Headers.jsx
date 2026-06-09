import { useEffect, useRef, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { LuSettings } from "react-icons/lu";
import { useSelector } from "react-redux";
import LogoutButton from "../components/LogoutButton";

const Headers = ({ showHide }) => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 🔹 Outside click handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sticky top-0 z-999 w-full bg-white drop-shadow-1">
      <header className="relative flex items-center justify-between px-4 py-4 shadow-2">

        {/* Left */}
        <div className="flex gap-2">
          <button className="md:hidden block text-2xl" onClick={showHide}>
            <FiMenu />
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
          <h3 className="capitalize">
            {user.role === "admin" ? "admin" : user.name}
          </h3>

          {/* 🔹 Avatar (toggle button) */}
          <div
            className="cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            {user.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt={user.name}
                className="rounded-full w-10 h-10"
              />
            ) : (
              <div className="bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center text-xl font-semibold">
                {user.name?.trim().charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* <LogoutButton /> */}

          {/* 🔹 Dropdown */}
          <div
            className={`
        absolute right-0 top-[150%]  bg-white rounded-xl shadow-xl border w-min 
        transition-all duration-200 ease-out origin-top-right
        ${open ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}
      `}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b">
              {user.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt={user.name}
                  className="rounded-full w-10 h-10"
                />
              ) : (
                <div className="bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center text-xl font-semibold">
                  {user.name?.trim().charAt(0).toUpperCase()}
                </div>
              )}
              <div className="leading-tight">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="">
              <button className="flex items-center gap-2 w-full px-4 py-4 border-b hover:bg-gray-200 text-md">
                <LuSettings size={20} />
                Settings
              </button>

              <div className="px-4 py-2 hover:bg-gray-200">
                <LogoutButton bgTextColor="w-full text-md" />
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Headers;
