import React from "react";
import { Link } from "react-router-dom";
import {
  FiBarChart2,
  FiUsers,
  FiMail,
  FiCpu,
  FiCreditCard
} from "react-icons/fi";

const Admin = () => {

  const adminCards = [
    {
      title: "Dashboard Stats",
      description:
        "View overall platform statistics and revenue analytics.",
      link: "/admin/dashboard",
      button: "View Dashboard →",
      icon: <FiBarChart2 size={28} className="text-blue-500" />
    },
    {
      title: "Manage Users",
      description: "View and manage registered users.",
      link: "/admin/manage-users",
      button: "View Users →",
      icon: <FiUsers size={28} className="text-green-500" />
    },
    {
      title: "Send Bulk Email",
      description: "Send emails to all registered users.",
      link: "/admin/send-bulk-email",
      button: "Send Bulk Email →",
      icon: <FiMail size={28} className="text-purple-500" />
    },
    {
      title: "Devices",
      description: "Monitor and control connected devices.",
      link: "/admin/create-unique-id",
      button: "Manage Devices →",
      icon: <FiCpu size={28} className="text-orange-500" />
    },
    {
      title: "Payments",
      description: "View premium subscriptions and payments.",
      link: "/admin/payments",
      button: "View Payments →",
      icon: <FiCreditCard size={28} className="text-pink-500" />
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-red-600">
            ⚡ EnerSense Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome to the EnerSense Admin Panel.  
            Manage users, devices, and energy analytics efficiently.
          </p>
        </div>

        {/* Energy Awareness Info */}
        <div className="bg-white shadow-sm rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-2">
            🌍 About EnerSense
          </h2>
          <p className="text-gray-600 text-sm">
            EnerSense helps monitor electricity usage and promotes
            smarter energy consumption. By tracking devices and
            analyzing power usage, we aim to reduce energy waste
            and encourage sustainable electricity practices.
          </p>

          <p className="text-gray-500 text-sm mt-3">
            💡 Tip: Turning off idle devices can reduce electricity
            consumption by up to 10% annually.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {adminCards.map((card, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg hover:scale-[1.02] transition duration-300"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                {card.icon}

                <h2 className="text-lg font-semibold">
                  {card.title}
                </h2>
              </div>

              <p className="text-sm text-gray-500 mb-4">
                {card.description}
              </p>

              <Link
                to={card.link}
                className="text-blue-600 hover:underline font-medium"
              >
                {card.button}
              </Link>
            </div>
          ))}

        </div>

        {/* Footer Info */}
        <div className="bg-white shadow-sm rounded-xl p-6 mt-10 text-center">
          <h3 className="font-semibold text-lg mb-2">
            🔌 Smart Energy Management
          </h3>

          <p className="text-gray-600 text-sm">
            EnerSense empowers users to understand their electricity
            consumption patterns and make informed decisions to
            improve efficiency and reduce carbon footprint.
          </p>

          <p className="text-gray-500 text-xs mt-3">
            ⚡ "Saving energy today ensures a brighter tomorrow."
          </p>
        </div>

      </div>

    </div>
  );
};

export default Admin;