import React from "react";
import { Routes, Route } from "react-router-dom";

import EnergyMeterDashboard from "./Pages/EnergyMeterDashboard";
import Navbar from "./Pages/Navbar";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import SettingPage from "./Pages/SettingPage";
import ForgetPassword from "./Pages/ForgetPassword";
import Otp from "./Pages/Otp";
import CompanyCenter from "./Footer/CompanyCenter";
import EnergyAwareness from "./Pages/EnergyAwareness";
import Contact from './Pages/Contact';
import About from './Pages/about'
import IoTDevices from "./Footer/IoTDevices";
import Legal from "./Footer/Legal"
import ResourcesCenter from "./Footer/ResourcesCenter";
import ResetPassword from "./Pages/ResetPassword";
import DeviceControl from "./Pages/DeviceControl";
import EnerSenseFAQ from "./Pages/EnerSenseFAQ";
import VerifyCard from "./components/VerifyCard";
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
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify/:uid" element={<VerifyCard />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/faqs" element={<EnerSenseFAQ />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/energy-awareness" element={<EnergyAwareness />} />
        <Route path="/iot-devices" element={<IoTDevices />} />
        <Route path="/company-center" element={<CompanyCenter />} />
        <Route path="/resources-center" element={<ResourcesCenter />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/device-control" element={<DeviceControl />} />
        <Route path="/energy-meter-dashboard" element={<EnergyMeterDashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
