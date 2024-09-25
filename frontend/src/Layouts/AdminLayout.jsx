import React from "react";
import AdminNavBar from "../components/admin/AdminNavBar";
import SideBar from "../components/admin/SideBar";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminLayout = () => {
  const { adminInfo } = useSelector((state) => state.admin);
  if (!adminInfo) {
    return <Navigate to={"/admin"} />;
  }
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <SideBar />

      <main className="flex-1">
        <AdminNavBar />
        <div className="p-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
