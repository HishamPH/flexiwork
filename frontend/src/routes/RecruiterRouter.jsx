import React from "react";
import { Routes, Route } from "react-router-dom";
import RecruiterProfilePage from "../pages/recruiter/RecruiterProfilePage";
import RecruiterHomePage from "../pages/recruiter/RecruiterHomePage";
import JobListing from "../pages/recruiter/JobListing";
import ViewApplicants from "../pages/recruiter/ViewApplicants";
import RecruiterLayout from "../Layouts/RecruiterLayout";
import RecruiterChat from "../pages/recruiter/RecruiterChat";
import MessageContainer from "../components/chat/MessageContainer";
import Meetings from "../pages/recruiter/Meetings";

const RecruiterRouter = () => {
  return (
    <Routes>
      <Route element={<RecruiterLayout />}>
        <Route path="home" element={<RecruiterHomePage />} />
        <Route path="profile" element={<RecruiterProfilePage />} />
        <Route path="jobs" element={<JobListing />} />
        <Route path="jobs/applicants/:id" element={<ViewApplicants />} />
        <Route path="chats" element={<RecruiterChat />}>
          <Route path=":id" element={<MessageContainer />} />
        </Route>
        <Route path="meetings" element={<Meetings />} />
      </Route>
    </Routes>
  );
};

export default RecruiterRouter;
