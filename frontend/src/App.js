/* =========================
   CORE LIBRARIES
========================= */
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { requestNotificationPermission, listenForMessages  } from "./utils/notification.js";
import axios from "axios";
import { getToken } from "firebase/messaging";
import { messaging } from "./context/firebase.js";
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
import EnergyAnalytics from "./components/analytics/EnergyAnalytics.jsx";
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
   ADMIN PAGES
========================= */
import Admin from "./Pages/Admin.jsx";
import AdminManageUsers from "./Pages/AdminManageUsers.jsx";
import Sendbulkemail from "./Pages/Sendbulkemail.jsx";
import CreateUniqueid from "./Pages/CreateUniqueid.jsx";
import AdminLoginPage from "./Pages/AdminLoginPage.jsx";
import AdminPayments from "./Pages/AdminPayments.jsx";
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import Admin2FAPage from "./Pages/Admin2FAPage.jsx";
import AdminTopbar from "./components/AdminNavbar.jsx";
import AdminViewPage from "./Pages/AdminViewPage.jsx";
import PushNotification from "./Pages/PushNotification.jsx";
import Setup2FA from "./Pages/Setup2fa.js";
import TwoFASetup from "./Pages/TwoFASetup.jsx";
/* =========================
   ERROR PAGE
========================= */
import Error from "./Pages/Error";

/* =========================
   APP COMPONENT
========================= */

const App = () => {
  const location = useLocation();

  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("token")
  );

  // Re-check token on route change
  useEffect(() => {
    setAdminToken(localStorage.getItem("token"));
  }, [location]);

  useEffect(() => {

  const setupNotifications = async () => {
  try {

    // ✅ Step 1: Request permission + get token
    const fcmToken = await requestNotificationPermission();

    if (fcmToken) {

      console.log("FCM Token:", fcmToken);

      const authToken = localStorage.getItem("token");

      // ✅ Step 2: Send token to backend (CORRECT API)
      await axios.post(
        "http://localhost:4000/api/v1/push/save-token",
        { token: fcmToken },
        {
          headers: {
            Authorization: `Bearer ${authToken}` // 🔥 IMPORTANT
          }
        }
      );

      console.log("✅ Token saved in DB");

    }

    // ✅ Step 3: Listen for messages
    listenForMessages();

  } catch (error) {
    console.error("Notification setup failed:", error);
  }
};

setupNotifications();

  // register service worker
  if ("serviceWorker" in navigator) {

    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        console.log("Service Worker registered:", registration);
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });

  }

}, []);
  /* =========================
     PROTECTED ADMIN ROUTE
  ========================= */
  const ProtectedAdminRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  return (
    <>
      {/* Normal Navbar */}
      {!location.pathname.startsWith("/admin") && <Navbar />}

      {/* Admin Navbar (only when logged in) */}
      {location.pathname.startsWith("/admin") && (
      <AdminTopbar />
      )}

      <Chatbot />

      <Routes>

        {/* ---------- ADMIN PANEL (Protected) ---------- */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <Admin />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/manage-users"
          element={
            <ProtectedAdminRoute>
              <AdminManageUsers />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/send-bulk-email"
          element={
            <ProtectedAdminRoute>
              <Sendbulkemail />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/push-notifications"
          element={
            <ProtectedAdminRoute>
              <PushNotification />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/create-unique-id"
          element={
            <ProtectedAdminRoute>
              <CreateUniqueid />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/payments"
          element={
            <ProtectedAdminRoute>
              <AdminPayments />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/view/page/:id"
          element={
            <ProtectedAdminRoute>
              <AdminViewPage />
            </ProtectedAdminRoute>
          }
        />

        {/* ---------- ADMIN LOGIN (Public) ---------- */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin-2fa" element={<Admin2FAPage />} />
        <Route path="/admin/setup-2fa" element={<Setup2FA />} />
        <Route path="/admin/setup-2fa-new" element={<TwoFASetup />} />
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

        {/* ---------- USER DASHBOARD ---------- */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/energy-meter-dashboard" element={<EnergyMeterDashboard />} />
        <Route path="/device-control" element={<DeviceControl />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/energy-analytics" element={<EnergyAnalytics />} />
        {/* ---------- PREMIUM ---------- */}
        <Route path="/premium-benefits" element={<PremiumBenefitsPage />} />
        <Route path="/premium" element={<MyPlanPage />} />
        <Route path="/my-payments" element={<MyPayments />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/fault-detection" element={<FaultDetectionPage />} />
        <Route path="/green-score" element={<GreenScorePage />} />
        <Route path="/bill-prediction" element={<BillPredictionPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/support" element={<SupportPage />} />

        {/* ---------- PAYMENT ---------- */}
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/premium-contact" element={<PremiumContact />} />

        {/* ---------- FOOTER ---------- */}
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