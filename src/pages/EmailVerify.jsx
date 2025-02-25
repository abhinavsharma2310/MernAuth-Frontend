import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/Auth-assets/assets";
import OTPInput from "../components/OTPInput"; // ✅ Import OTP component

const EmailVerify = () => {
  const navigate = useNavigate();

  const handleOTPSubmit = (otp) => {
    console.log("Entered OTP:", otp);
    // Call API to verify OTP
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-300 to-purple-500">
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />

      {/* OTP Verification Form */}
      <form className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Email Verify OTP
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter the 6-Digit code sent to your email.
        </p>

        {/* OTP Input Component */}
        <OTPInput length={6} onSubmit={handleOTPSubmit} />

        {/* Submit Button */}
        <button
          type="submit"
           className="w-full py-3 mt-4 rounded-full bg-gradient-to-r from-indigo-300 to-indigo-900 text-white font-medium"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
