import React from "react";

import NavBar from "../components/NavBar";

import { Outlet } from "react-router-dom";

const CandidateLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default CandidateLayout;
