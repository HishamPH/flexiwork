import React from "react";

const RecruiterHomePage = () => {
  return (
    <>
      <div className="text-2xl font-semibold mb-6">Welcome, Recruiter!</div>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold">Active Job Listings</h2>
          <p>3 Active Listings</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold">Candidates in Pipeline</h2>
          <p>12 Candidates</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold">Upcoming Interviews</h2>
          <p>2 Interviews Scheduled</p>
        </div>
      </div>
    </>
  );
};

export default RecruiterHomePage;
