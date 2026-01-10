import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Pages/Navbar";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import SettingPage from "./Pages/SettingPage";
import ForgetPassword from "./Pages/ForgetPassword";
import Otp from "./Pages/Otp";
import EnergyAwareness from "./Pages/EnergyAwareness";
import Contact from './Pages/Contact';
import About from './Pages/about'
import Chatbot from "./Pages/Chatbot";
import Error from "./Pages/Error";

const App = () => {
  return (
    <>
      <Navbar />
      <Chatbot />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/energy-awareness" element={<EnergyAwareness />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
