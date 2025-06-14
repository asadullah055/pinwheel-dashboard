import React from "react";

const ForgetPassword = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F2F7FB]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">
          Forgot your password?
        </h2>
        <p className="text-[14px] font-medium text-slate-600 mt-3 mb-3">
          Please enter the account for which you want to reset the password.
        </p>

        <div className="mb-4">
          <label className="block text-[16px] font-bold text-gray-700">
            Email<span className="font-bold text-[20px] text-red-600">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            /*  value={formData.email}
            onChange={handleChange} */
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          //   onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 mt-3 cursor-pointer"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ForgetPassword;
