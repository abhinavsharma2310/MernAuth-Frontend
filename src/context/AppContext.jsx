import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  console.log("Backend URL:", backendUrl);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // ✅ Fetch User Data
  // ✅ Fetch User Data (Fixes incorrect property access)
const getUserData = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/user/data`, {
      withCredentials: true,
    });

    console.log("User Data Response:", data); // ✅ Debugging log

    if (data.success && data.userData) { // ✅ Fix: Accessing `userData` instead of `user`
      setUserData(data.userData);
      localStorage.setItem("userData", JSON.stringify(data.userData)); // ✅ Store user data
    } else {
      toast.error(data.message || "Invalid user data response");
      setUserData(null);
      localStorage.removeItem("userData");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    setUserData(null);
    localStorage.removeItem("userData");
    toast.error(error.response?.data?.message || "Failed to fetch user data");
  }
};


  // ✅ Check Auth State
  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`, {
        withCredentials: true,
      });

      console.log("Auth State Response:", data);

      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
      } else {
        setIsLoggedIn(false);
        setUserData(null);
        localStorage.removeItem("userData");
      }
    } catch (error) {
      console.error("Auth state error:", error);
      setIsLoggedIn(false);
      setUserData(null);
      localStorage.removeItem("userData");
      toast.error(error.response?.data?.message || "Failed to verify authentication");
    }
  };

  // ✅ Run Only Once on Mount & Restore `userData` from Storage
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
