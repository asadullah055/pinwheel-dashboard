import toast from "react-hot-toast";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../features/auth/authApi";
import { clearCredentials } from "../features/auth/authSlice";
const LogoutButton = ({ bgTextColor = "bg-blue-600 text-white" }) => {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await logout().unwrap(); // RTK Query call
      dispatch(clearCredentials()); // clear local auth state
      localStorage.clear();
      toast.success(res?.message || "Logged out successfully!");
      navigate("/seller/login");
    } catch (error) {
      toast.error(error?.data?.message || "Logout failed!");
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={`${bgTextColor} p-2 rounded cursor-pointer flex gap-1 items-center`}
    >
      {isLoading ? "Logging out..." : "Logout"}
      <RiLogoutCircleRLine />
    </button>
  );
};

export default LogoutButton;
