import { useEffect, useRef, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { LuSettings } from "react-icons/lu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

const Headers = ({ showHide }) => {
  const { user } = useSelector((state) => state.auth);
  const avatarUrl =
    user.shopLogo && user.shopLogo !== user.profileImageUrl ? user.shopLogo : "";
  const displayName = user.shopName || user.name;
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
            {user.role === "admin" ? "admin" : displayName}
          </h3>

          {/* 🔹 Avatar (toggle button) */}
          <div
            className="h-10 w-10 cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="rounded-full w-10 h-10 object-cover"
              />
            ) : null}
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
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="rounded-full w-10 h-10 object-cover"
                />
              ) : null}
              <div className="leading-tight">
                <p className="font-semibold">{displayName}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="">
              <Link
                to="/settings"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 w-full px-4 py-4 border-b hover:bg-gray-200 text-md"
              >
                <LuSettings size={20} />
                Settings
              </Link>

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
