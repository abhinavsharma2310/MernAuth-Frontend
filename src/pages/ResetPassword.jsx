import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import OTPInput from "../components/OTPInput";
import { assets } from "../assets/Auth-assets/assets";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { backendUrl } = useContext(AppContext);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-reset-otp`,
        { email }
      );

      if (data.success) {
        toast.success(data.message);
        setStep(2);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleOtpSubmit = async (enteredOtp) => {
    console.log("OTP Submitted:", enteredOtp);
    setOtp(enteredOtp);
    setStep(3);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.error("Please enter all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/reset-password`,
        { email, otp, newPassword: password }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-300 to-purple-500 px-4 relative">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />

      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full max-w-md text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white mb-2 text-center">
          Reset Password
        </h2>

        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
            <p className="text-lg text-center mb-6">
              Enter your email to receive OTP.
            </p>
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] relative">
              <FaEnvelope className="text-indigo-400 absolute left-4" />
              <input
                type="email"
                placeholder="Enter your Email"
                className="bg-transparent outline-none text-white w-full pl-10 pr-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-300 to-indigo-900 text-white font-medium hover:opacity-90 transition"
            >
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <div className="text-center">
            <p className="text-lg mb-6">Enter the OTP sent to your email.</p>
            <OTPInput length={6} onSubmit={handleOtpSubmit} />
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
            <p className="text-lg text-center mb-6">Set your new password.</p>
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] relative">
              <FaLock className="text-indigo-400 absolute left-4" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                className="bg-transparent outline-none text-white w-full pl-10 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {showPassword ? (
                <FaEye
                  className="absolute right-4 text-indigo-400 cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaEyeSlash
                  className="absolute right-4 text-indigo-400 cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] relative">
              <FaLock className="text-indigo-400 absolute left-4" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="bg-transparent outline-none text-white w-full pl-10 pr-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {showConfirmPassword ? (
                <FaEye
                  className="absolute right-4 text-indigo-400 cursor-pointer"
                  onClick={() => setShowConfirmPassword(false)}
                />
              ) : (
                <FaEyeSlash
                  className="absolute right-4 text-indigo-400 cursor-pointer"
                  onClick={() => setShowConfirmPassword(true)}
                />
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-300 to-indigo-900 text-white font-medium hover:opacity-90 transition"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
