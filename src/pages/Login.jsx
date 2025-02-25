import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../assets/Auth-assets/assets";
import { AppContext } from "../context/AppContext";


const Login = () => {
  const [state, setState] = useState("sign-up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext); // ✅ Ensure `getUserData` exists

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    axios.defaults.withCredentials = true; // ✅ Allow credentials (cookies, JWTs)

    const endpoint =
      state === "sign-up" ? `${backendUrl}/api/auth/register` : `${backendUrl}/api/auth/login`;

    const payload = state === "sign-up" ? { name, email, password } : { email, password };

    const { data } = await axios.post(endpoint, payload);

    if (data.success) {
      setIsLoggedIn(true);
      
      // ✅ Check if `getUserData` exists before calling it
      if (typeof getUserData === "function") {
        await getUserData();
      }

      navigate("/");
    } else {
      toast.error(data.message || "Something went wrong!");
    }
  } catch (error) {
    console.error("Login/Register Error:", error);
    toast.error(error.response?.data?.message || "Something went wrong!");
  }

  console.log("User Data:", { name, email, password });
};
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-300 to-purple-500">
      <img 
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white mb-2 text-center">
          {state === "sign-up" ? "Create Account" : "Login!"}
        </h2>
        <p className="text-lg text-center mb-6">
          {state === "sign-up" ? "Create your account" : "Login to continue"}
        </p>

        {/* Form */}
        <form action="" autoComplete="off" onSubmit={handleSubmit}>
          {state === "sign-up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="User Icon" />
              <input
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent outline-none text-white w-full"
                type="text"
                placeholder="Full Name"
                required
                value={name}
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="Mail Icon" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none text-white w-full"
              type="email"
              placeholder="Email Id"
              required
              value={email}
            />
          </div>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="Lock Icon" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none text-white w-full"
              type="password"
              placeholder="Password"
              required
              value={password}
            />
          </div>

          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 text-indigo-400 cursor-pointer text-left"
          >
            Forgot Password?
          </p>

          <button type="submit" className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-300 to-indigo-900 text-white font-medium">
            {state === "sign-up" ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-gray-400 mt-4 text-center text-xs">
          {state === "sign-up"
            ? "Already have an account?"
            : "Don't have an account?"}
          <span
            className="text-blue-400 cursor-pointer underline ml-1"
            onClick={() => setState(state === "sign-up" ? "login" : "sign-up")}
          >
            {state === "sign-up" ? "Login Here" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
