import React from "react";
import RecruiterSidebar from "../components/recruiter/RecruiterSidebar";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
const RecruiterLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="flex h-[664px] max-w-full">
        <RecruiterSidebar />
        <div className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RecruiterLayout;
