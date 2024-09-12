import React from "react";
import { Route, Routes } from "react-router-dom";
import CandidateHomePage from "../pages/candidate/CandidateHomePage";
import CandidateProfilePage from "../pages/candidate/CandidateProfilePage";
import ViewJobPage from "../pages/candidate/ViewJobPage";
import AppliedJobs from "../pages/candidate/AppliedJobs";
import CandidateChat from "../pages/candidate/CandidateChat";
import MessageContainer from "../components/chat/MessageContainer";
import ApplicationsPage from "../pages/candidate/ApplicationsPage";
import Chat from "../components/Chat";

const CandidateRouter = () => {
  return (
    <Routes>
      <Route path="home" element={<CandidateHomePage />} />
      <Route path="profile" element={<CandidateProfilePage />} />
      <Route path="job-detail/:id" element={<ViewJobPage />} />
      <Route path="applied-jobs" element={<AppliedJobs />} />
      <Route path="chats" element={<CandidateChat />}>
        <Route path=":id" element={<MessageContainer />} />
      </Route>
      <Route path="applications" element={<ApplicationsPage />} />
    </Routes>
  );
};

export default CandidateRouter;
