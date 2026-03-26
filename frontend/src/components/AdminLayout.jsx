import React from "react";
import { Outlet } from "react-router-dom";
import AdminTopbar from "./AdminTopbar";
import AdminSidebar from './AdminSidebar'

const AdminLayout = () => {
  return (
    <div className="flex">
      
      <AdminSidebar />

      <div className="flex-1 ml-64">
        <AdminTopbar />
        <div className="p-6 bg-gray-100 min-h-screen">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default AdminLayout;