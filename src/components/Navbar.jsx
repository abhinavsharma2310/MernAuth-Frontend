import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { assets } from "../assets/Auth-assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      if (data.success) {
        setIsLoggedIn(false);
        setUserData(null);
        localStorage.removeItem("userData"); // ✅ Clear storage on logout
        navigate("/");
        toast.success("Logged out successfully!");
      } else {
        toast.error(data.message || "Logout failed!");
      }
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  const sendVerificationOtp = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-verify-otp`,
        {}, // ✅ Empty body (unless required by backend)
        { withCredentials: true } // ✅ Correct placement for credentials
      );
  
      if (data.success) {
        navigate('/email-verify');
        toast.success(data.message); // ✅ Fixed string interpolation
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  };
  

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img src={assets.logo} alt="auth-logo" className="w-28 sm:w-32" />

      {userData ? (
        <div className="relative group w-8 h-8 flex justify-center items-center rounded-full bg-black text-white">
          {userData.name?.[0]?.toUpperCase()}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
              {!userData.isAccountVerified && (
                <li onClick={sendVerificationOtp} className="py-1 px-2 hover:bg-gray-200">Verify Email</li>
              )}
              <li onClick={logout} className="py-1 px-2 hover:bg-gray-200 pr-10">
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
        >
          Login <img src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
