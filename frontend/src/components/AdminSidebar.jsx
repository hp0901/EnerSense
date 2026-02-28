import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Mail, CreditCard, Cpu } from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Manage Users", path: "/admin/manage-users", icon: <Users size={18} /> },
    { name: "Manage Devices", path: "/admin/create-unique-id", icon: <Cpu size={18} /> },
    { name: "Send Bulk Email", path: "/admin/send-bulk-email", icon: <Mail size={18} /> },
    { name: "Payments", path: "/admin/payments", icon: <CreditCard size={18} /> },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen fixed left-0 top-0 pt-20 px-5">
      
      <div className="space-y-3">
        {links.map((link) => {
          const isActive = location.pathname === link.path;

          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-green-600"
                  : "hover:bg-slate-700"
              }`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AdminSidebar;