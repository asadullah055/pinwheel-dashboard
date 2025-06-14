import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading"; /*
import { useLoginMutation } from "../../features/auth/authApi";
import { setCredentials } from "../../features/auth/authSlice"; */
import { useLoginMutation } from "../../features/auth/authApi";
import { setCredentials } from "../../features/auth/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { data, error, isLoading, isSuccess }] = useLoginMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const userData = await login(formData).unwrap(); // Optional unwrap()
      dispatch(setCredentials(userData));
      navigate("/");
    } catch (err) {
      // Error handled in useEffect
    }
  };

  useEffect(() => {
    if (isSuccess && data?.message) {
      toast.success(data.message);
    }

    if (error) {
      toast.error(error?.data?.message || "Login failed");
    }
  }, [data, error, isSuccess]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F2F7FB]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          Login to Pinwheel
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[16px] font-bold text-gray-700">
              Email<span className="font-bold text-[20px] text-red-600">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-2">
            <label className="block text-[16px] font-bold text-gray-700">
              Password
              <span className="font-bold text-[20px] text-red-600">*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Link
            to="/seller/forgot-password"
            className="text-blue-600 text-sm hover:underline mb-2 block text-end"
          >
            Forgot Password?
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {isLoading ? <Loading text={"Submitting...."} /> : "Login"}
          </button>
        </form>
        <div className="mt-2">
          <p>
            Don't have an account?{" "}
            <Link className="text-blue-600" to="/seller/sign-up">
              Signup
            </Link>
          </p>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Login;
