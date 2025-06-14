import { useRef, useState } from "react";

const Verify = () => {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(0);

  /* const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }; */

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    /* if (timeLeft === 0) {
      toast.error("OTP has expired. Please request a new one.");
      return;
    } */
    const otpCode = otp.join("");
    const email = sessionStorage.getItem("email");
    // const res = await verifyOtp(email, otpCode);
  };

  /* const handleResend = async () => {
    try {
      setOtp(["", "", "", "", "", ""]);
      const email = sessionStorage.getItem("email");
      const res = await sendOtp(email);

      const newExpireTime = res.expireTime;
      sessionStorage.setItem("expireTime", newExpireTime);
      const currentTime = Date.now();
      const remainingTime = Math.max(
        0,
        Math.floor((newExpireTime - currentTime) / 1000)
      );
      setTimeLeft(remainingTime);

      toast.success("A new OTP has been sent.");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }; */
  /* useEffect(() => {
    const expireTime = sessionStorage.getItem("expireTime");
    const currentTime = Date.now();
    if (expireTime) {
      const remainingTime = Math.max(
        0,
        Math.floor((expireTime - currentTime) / 1000)
      );
      setTimeLeft(remainingTime);
    }
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]); */
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-[#F2F7FB]">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-4">
            Verify Your Email
          </h2>
          <p className="text-[14px] font-medium text-slate-600 mt-3 mb-3">
            Enter the 6-digit verification code. This code is valid for the
            next.{" "}
            {/* <span className="text-red-600 font-medium">{formatTime()}</span>. */}
          </p>

          <div className="flex gap-2 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                className="border-2 border-gray-200 focus:outline-0 focus:border-blue-500 p-2 rounded w-10 text-center"
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 mt-3 cursor-pointer"
          >
            Submit
          </button>
          {/* <p className="mt-2 text-[13px] font-medium text-slate-600">
            {"Didn't"} receive any code?{" "}
            <button
          className="text-slate-900 font-semibold cursor-pointer"
          onClick={handleResend}
          disabled={timeLeft > 0}
        >
          Resend code
        </button>
          </p> */}
        </div>
      </div>
    </>
  );
};

export default Verify;
