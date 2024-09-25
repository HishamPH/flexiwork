import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminCandidatePage from "../pages/admin/AdminCandidatePage";
import AdminRecruiterPage from "../pages/admin/AdminRecruiterPage";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminLayout from "../Layouts/AdminLayout";

const AdminRouter = () => {
  return (
    <Routes>
      <Route index element={<AdminLogin />} />
      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="candidates" element={<AdminCandidatePage />} />
        <Route path="recruiters" element={<AdminRecruiterPage />} />
      </Route>
    </Routes>
  );
};

export default AdminRouter;
