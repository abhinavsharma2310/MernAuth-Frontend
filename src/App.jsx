import React from "react";
import { Routes, Route } from "react-router-dom"; // ❌ Removed extra BrowserRouter
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";

import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ToastContainer /> {/* ✅ ToastContainer doesn't need to wrap Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default App;
