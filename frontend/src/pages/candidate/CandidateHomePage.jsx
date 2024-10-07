import React, { useCallback, useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import axiosInstance from "../../../interceptors/axiosInterceptors";
import RCSlider from "../../components/candidate/RCSlider";
import { MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { Select, Option, Checkbox } from "@material-tailwind/react";
import { IconButton } from "@material-tailwind/react";

const CandidateHomePage = () => {
  let { userInfo } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("All");
  const [isRemote, setIsRemote] = useState(false);
  const [range, setRange] = useState([30000, 400000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const jobsPerPage = 2;

  useEffect(() => {
    console.log("home page mounted");
    const fetchAllJobs = async () => {
      const res = await axiosInstance.get("/user/get-all-jobs", {
        params: {
          page: currentPage,
          limit: jobsPerPage,
          name: searchName,
          location: searchLocation,
          type: employmentType,
          remote: isRemote,
          minSalary: range[0],
          maxSalary: range[1],
        },
      });
      setJobs(res.data.jobs);
      setTotalPages(res.data.totalPages);
    };
    fetchAllJobs();

    return () => console.log("home page unmounted");
  }, [
    searchName,
    searchLocation,
    employmentType,
    isRemote,
    range,
    currentPage,
  ]);

  const getItemProps = (index) => ({
    variant: currentPage === index ? "filled" : "text",
    color: "gray",
    onClick: () => setCurrentPage(index),
  });

  const handleClick = (e) => {
    e.stopPropogation();
    console.log("hello");
  };

  const handleSearchNameChange = useCallback((e) => {
    setCurrentPage(1);
    setSearchName(e.target.value);
  }, []);

  const handleSearchLocationChange = (e) => {
    setCurrentPage(1);
    setSearchLocation(e.target.value);
  };

  const handleRemoteChange = (e) => {
    setCurrentPage(1);
    setIsRemote(e.target.checked);
  };

  const handleEmploymentTypeChange = (val) => {
    setCurrentPage(1);
    setEmploymentType(val);
  };

  return (
    <main className="container mx-auto mt-10 px-4">
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
          <MagnifyingGlassIcon className="h-6 w-6" />
          <input
            type="text"
            placeholder="Job title or keyword"
            value={searchName}
            onChange={handleSearchNameChange}
            className="w-full p-4 outline-none"
          />
        </div>
        <div className="w-64 flex items-center bg-white border-l">
          <MapPinIcon className="w-5 h-5 ms-4" />
          <input
            type="text"
            placeholder="Florence, Italy"
            value={searchLocation}
            onChange={handleSearchLocationChange}
            className="w-full p-4 outline-none"
          />
        </div>
        <button className="bg-indigo-600 text-white px-8 py-4 font-medium">
          Search
        </button>
      </div>

      <div className="text-sm text-gray-500 mb-12">
        Popular : UI Designer, UX Researcher, Android, Admin
      </div>

      {/* Job listings */}
      <div className="w-full lg:flex">
        {/* Filters */}
        <div className="w-full lg:w-1/4 pr-8 bg-white shadow-lg mx-5 p-4 mb-auto">
          <div className="mb-6">
            <h2 className="font-bold mb-2 flex items-center justify-between">
              Type of Employment
            </h2>
            <div className="space-y-2">
              <Select
                className="text-black rounded-sm"
                value={employmentType}
                onChange={(val) => handleEmploymentTypeChange(val)}
              >
                <Option value="All">All</Option>
                <Option value="Full Time">Full Time</Option>
                <Option value="Part Time">Part Time</Option>
                <Option value="Freelance">Freelance</Option>
                <Option value="Internship">Internship</Option>
              </Select>
            </div>
          </div>
          <Checkbox
            name="remote"
            label="Remote"
            checked={isRemote}
            onChange={handleRemoteChange}
          />
          <div>
            <RCSlider
              range={range}
              setRange={setRange}
              max={400000}
              min={30000}
              step={10000}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>

        {/* Job list */}
        <div className="flex-col w-full lg:w-3/4">
          <div className="   bg-white shadow-lg mx-5 p-7">
            {/* Job item */}
            {jobs?.map(({ _id, jobName, location, jobType, skills }) => {
              return (
                <Link to={`/candidate/job-detail/${_id}`} key={_id}>
                  <div
                    className=" p-6 mb-6 bg-gray-300 hover:bg-gray-100 shadow-md"
                    key={_id}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex">
                        <div>
                          <h3 className="font-bold text-lg mb-1">{jobName}</h3>
                          <p className="text-gray-800 mb-2">{location}</p>
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
                        className="bg-indigo-600 hover:bg-indigo-400 text-white px-6 py-2 rounded-sm font-medium"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-2 justify-center mt-1 ">
            {Array.from({ length: totalPages }, (_, index) => (
              <IconButton {...getItemProps(index + 1)} key={index}>
                {index + 1}
              </IconButton>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CandidateHomePage;
