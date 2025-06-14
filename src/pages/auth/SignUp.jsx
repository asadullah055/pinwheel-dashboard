import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { useRegisterMutation } from "../../features/auth/authApi";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "seller", // Default role
  });

  // RTK Query mutation
  const [registerUser, { data, error, isLoading, isSuccess }] = useRegisterMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // === Validation ===
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const payload = {
      name,
      email,
      password,
      role: formData.role,
    };

    try {
      await registerUser(payload).unwrap(); // await because we handle error via try-catch
    } catch (err) {
      // Do nothing - handled in useEffect
    }
  };

  useEffect(() => {
    if (isSuccess && data?.message) {
      toast.success(data.message || "Account created successfully!");
      navigate("/seller/login");
    }

    if (error) {
      toast.error(error?.data?.message || "Registration failed");
    }
  }, [data, error, isSuccess, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F2F7FB]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up to Pinwheel</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-[16px] font-bold text-gray-700">
              Your Name <span className="text-red-600 text-[20px]">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-[16px] font-bold text-gray-700">
              Email <span className="text-red-600 text-[20px]">*</span>
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
          <div>
            <label className="block text-[16px] font-bold text-gray-700">
              Password <span className="text-red-600 text-[20px]">*</span>
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
          <div>
            <label className="block text-[16px] font-bold text-gray-700">
              Re-type Password <span className="text-red-600 text-[20px]">*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {isLoading ? <Loading text={"Submitting..."} /> : "Create account"}
          </button>
        </form>
        <div className="mt-2">
          <p>
            Have an account?{" "}
            <Link className="text-blue-600" to="/seller/login">
              Login
            </Link>
          </p>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default SignUp;