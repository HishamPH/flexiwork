import React from "react";
import { Route, Routes } from "react-router-dom";
import CandidateHomePage from "../pages/candidate/CandidateHomePage";
import CandidateProfilePage from "../pages/candidate/CandidateProfilePage";
import ViewJobPage from "../pages/candidate/ViewJobPage";
import AppliedJobs from "../pages/candidate/AppliedJobs";
import CandidateChat from "../pages/candidate/CandidateChat";

const CandidateRouter = () => {
  return (
    <Routes>
      <Route path="home" element={<CandidateHomePage />} />
      <Route path="profile" element={<CandidateProfilePage />} />
      <Route path="job-detail/:id" element={<ViewJobPage />} />
      <Route path="applied-jobs" element={<AppliedJobs />} />
      <Route path="chat/:id" element={<CandidateChat />} />
    </Routes>
  );
};

export default CandidateRouter;
