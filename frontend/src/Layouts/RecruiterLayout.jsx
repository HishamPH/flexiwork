import React from "react";
import RecruiterSidebar from "../components/recruiter/RecruiterSidebar";
import NavBar from "../components/NavBar";
import { Outlet, useNavigate } from "react-router-dom";
const RecruiterLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="flex min-h-screen max-w-full">
        <RecruiterSidebar />
        <div className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RecruiterLayout;
