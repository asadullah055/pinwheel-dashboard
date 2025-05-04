import React from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const LogoutButton = ({ bgTextColor = "bg-blue-600 text-white" }) => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const result = await dispatch(logout());
    if (logout.fulfilled.match(result)) {
      toast.success(result.payload.message); // ✅ Show toast here
    }
  };
  return (
    <button
      onClick={handleLogout}
      className={`${bgTextColor} p-2 rounded cursor-pointer flex gap-1 items-center`}
    >
      Logout
      <RiLogoutCircleRLine />
    </button>
  );
};

export default LogoutButton;
