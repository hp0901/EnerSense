/* =========================
   CORE LIBRARIES
========================= */
import React from "react";
import { Routes, Route } from "react-router-dom";

/* =========================
   GLOBAL COMPONENTS
========================= */
import Navbar from "./Pages/Navbar";
import Chatbot from "./Pages/Chatbot";

/* =========================
   AUTHENTICATION PAGES
========================= */
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgetPassword from "./Pages/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword";
import Otp from "./Pages/Otp";
import VerifyCard from "./components/VerifyCard";

/* =========================
   MAIN APPLICATION PAGES
========================= */
import HomePage from "./Pages/HomePage";
import Dashboard from "./Pages/Dashboard";
import EnergyMeterDashboard from "./Pages/EnergyMeterDashboard";
import DeviceControl from "./Pages/DeviceControl";
import SettingPage from "./Pages/SettingPage";

/* =========================
   PREMIUM FEATURE PAGES
========================= */
import PremiumBenefitsPage from "./Pages/PremiumBenefitsPage";
import MyPlanPage from "./Pages/MyPlanPage";
import MyPayments from "./Pages/MyPayments";

import AlertsPage from "./Pages/AlertsPage";
import FaultDetectionPage from "./Pages/FaultDetectionPage";
import GreenScorePage from "./Pages/GreenScorePage";
import BillPredictionPage from "./Pages/BillPredictionPage";
import ReportsPage from "./Pages/ReportsPage";
import SupportPage from "./Pages/SupportPage";

/* =========================
   PAYMENT & PRICING
========================= */
import PricingPage from "./components/PricingPage.jsx";
import CheckoutPage from "./components/CheckoutPage.jsx";
import PremiumContact from "./Pages/Premium-Contact.jsx";

/* =========================
   INFORMATIONAL / FOOTER PAGES
========================= */
import About from "./Pages/about";
import Contact from "./Pages/Contact";
import EnergyAwareness from "./Pages/EnergyAwareness";
import EnerSenseFAQ from "./Pages/EnerSenseFAQ";

import CompanyCenter from "./Footer/CompanyCenter";
import ResourcesCenter from "./Footer/ResourcesCenter";
import IoTDevices from "./Footer/IoTDevices";
import Legal from "./Footer/Legal";

/* =========================
   ERROR PAGE
========================= */
import Error from "./Pages/Error";

/* =========================
   APP COMPONENT
========================= */

const App = () => {
  return (
    <>
      {/* Global Navigation */}
      <Navbar />

      {/* Floating AI Assistant */}
      <Chatbot />

      {/* Application Routes */}
      <Routes>

        {/* ---------- PUBLIC ROUTES ---------- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faqs" element={<EnerSenseFAQ />} />
        <Route path="/energy-awareness" element={<EnergyAwareness />} />

        {/* ---------- AUTH ROUTES ---------- */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify/:uid" element={<VerifyCard />} />

        {/* ---------- DASHBOARD & CORE FEATURES ---------- */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/energy-meter-dashboard" element={<EnergyMeterDashboard />} />
        <Route path="/device-control" element={<DeviceControl />} />
        <Route path="/settings" element={<SettingPage />} />

        {/* ---------- PREMIUM FEATURES ---------- */}
        <Route path="/premium-benefits" element={<PremiumBenefitsPage />} />
        <Route path="/premium" element={<MyPlanPage />} />
        <Route path="/my-payments" element={<MyPayments />} />

        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/fault-detection" element={<FaultDetectionPage />} />
        <Route path="/green-score" element={<GreenScorePage />} />
        <Route path="/bill-prediction" element={<BillPredictionPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/support" element={<SupportPage />} />

        {/* ---------- PAYMENT & PRICING ---------- */}
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/premium-contact" element={<PremiumContact />} />

        {/* ---------- FOOTER / RESOURCE PAGES ---------- */}
        <Route path="/company-center" element={<CompanyCenter />} />
        <Route path="/resources-center" element={<ResourcesCenter />} />
        <Route path="/iot-devices" element={<IoTDevices />} />
        <Route path="/legal" element={<Legal />} />

        {/* ---------- FALLBACK ---------- */}
        <Route path="*" element={<Error />} />

      </Routes>
    </>
  );
};

export default App;
