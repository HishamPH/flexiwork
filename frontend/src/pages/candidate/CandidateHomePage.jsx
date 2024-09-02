import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

const CandidateHomePage = () => {
  const [jobs, setJobs] = useState([]);
  let { userInfo } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchAllJobs = async () => {
      const res = await axios.get("/api/user/get-all-jobs");
      setJobs(res.data.result);
    };
    fetchAllJobs();
  }, []);
  console.log(jobs);

  const handleClick = (e)=>{
    e.stopPropogation();
    console.log('hello');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      {/* Navbar */}

      {/* Main content */}
      <main className="container mx-auto mt-16 px-4">
        <h1 className="text-4xl font-bold mb-2 text-center">
          Find your{" "}
          <span className="text-blue-500 relative">
            dream job
            <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500"></span>
          </span>
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Find your next career at companies like HubSpot, Nike, and Dropbox
        </p>

        {/* Search form */}
        <div className="flex mb-6 shadow-lg rounded-lg overflow-hidden">
          <div className="flex-grow flex items-center bg-white pl-4">
            <svg
              className="w-5 h-5 text-gray-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Job title or keyword"
              className="w-full p-4 outline-none"
            />
          </div>
          <div className="w-64 flex items-center bg-white border-l">
            <svg
              className="w-5 h-5 text-gray-400 ml-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Florence, Italy"
              className="w-full p-4 outline-none"
            />
            <svg
              className="w-5 h-5 text-gray-400 mr-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <button className="bg-indigo-600 text-white px-8 py-4 font-medium">
            Search
          </button>
        </div>

        <div className="text-sm text-gray-500 mb-12">
          Popular : UI Designer, UX Researcher, Android, Admin
        </div>

        {/* Job listings */}
        <div className="flex">
          {/* Filters */}
          <div className="w-1/4 pr-8 bg-white shadow-lg mx-5 p-4 mb-auto">
            <div className="mb-6">
              <h2 className="font-bold mb-2 flex items-center justify-between">
                Type of Employment
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </h2>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-indigo-600 mr-2"
                  />
                  <span className="text-gray-700">Part-Time (5)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-indigo-600 mr-2"
                  />
                  <span className="text-gray-700">Remote (2)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-indigo-600 mr-2"
                  />
                  <span className="text-gray-700">Contract (3)</span>
                </label>
              </div>
            </div>

            <div>
              <h2 className="font-bold mb-2 flex items-center justify-between">
                Categories
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </h2>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-indigo-600 mr-2"
                  />
                  <span className="text-gray-700">Design (24)</span>
                </label>
                {/* Add more categories here */}
              </div>
            </div>
          </div>

          {/* Job list */}
          <div className="w-3/4 bg-white shadow-lg mx-5 p-7">
            {/* <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">All Jobs</h2>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">Sort by:</span>
                <select className="bg-white border rounded-md px-2 py-1">
                  <option>Most relevant</option>
                </select>
              </div>
            </div>
            <p className="text-gray-500 mb-6">Showing 73 results</p> */}

            {/* Job item */}
            {jobs.map(({ _id, jobName,location,jobType,skills }) => {
              return (
                <Link to={`/candidate/job-detail/${_id}`}>
                  <div
                    className=" p-6 mb-6 bg-gray-300 hover:bg-gray-100 shadow-md"
                    key={_id}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex">
                        <div>
                          <h3 className="font-bold text-lg mb-1">
                            {jobName}
                          </h3>
                          <p className="text-gray-800 mb-2">
                            {location}
                          </p>
                          <div className="space-x-2">
                            <span className="bg-emerald-100 text-emerald-600 px-2 py-1 rounded text-sm">
                              {jobType}
                            </span>
                            <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-sm">
                              Marketing
                            </span>
                            <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded text-sm">
                              Design
                            </span>
                          </div>
                        </div>
                      </div>
                      <button 
                      onClick={handleClick}
                      className="bg-indigo-600 hover:bg-indigo-400 text-white px-6 py-2 rounded-sm font-medium">
                        Apply
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CandidateHomePage;
