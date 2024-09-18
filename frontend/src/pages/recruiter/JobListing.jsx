import { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../../interceptors/axiosInterceptors";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Typography,
  Button,
  Chip,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

import PostJobModal from "../../components/recruiter/PostJobModal";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../helper/Loader";
import Swal from "sweetalert2";
import { Failed, Success } from "../../helper/popup";

const JobListing = () => {
  let ITEMS_PER_PAGE = 6;
  const { userInfo } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!open) {
      const fetchRecruiterJobs = async (recruiterId) => {
        const res = await axiosInstance.get(
          `/user/recruiter/get-jobs/${recruiterId}`
        );
        setJobs(res.data.result);
        setTotalPages(Math.ceil(res.data.result.length / ITEMS_PER_PAGE));
        setLoading(false);
      };

      fetchRecruiterJobs(userInfo._id);
    }
  }, [open]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentJobs = jobs.slice(startIndex, endIndex);

  const handleEdit = async (job) => {
    setSelectedJob(job);
    setOpen(true);
  };
  const handlePost = async () => {
    setSelectedJob(null);
    setOpen(true);
  };

  async function handleDelete(jobId) {
    try {
      Swal.fire({
        title: `Do you want to Delete the Job`,
        showCancelButton: true,
        confirmButtonText: "Yes",
        confirmButtonColor: "red",
      }).then(async (result) => {
        if (result.isConfirmed) {
          let res = await axiosInstance.post(
            "/user/recruiter/delete-job",
            {
              jobId,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(res);
          setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
          Swal.fire("", "job Deleted", "success");
        }
      });
    } catch (err) {
      Failed(err.response ? err.response.data.message : err.message);
      console.log(err.message);
    }
  }

  async function handleBlock(jobId) {
    try {
      const res = await axiosInstance.post(
        "/user/recruiter/block-job",
        {
          jobId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId ? { ...job, isActive: !job.isActive } : job
        )
      );
      Success(res.data.message);
    } catch (err) {
      Failed(err.response ? err.response.data.message : err.message);
      console.log(err.message);
    }
  }

  //=======================================================

  const getItemProps = (index) => ({
    variant: currentPage === index ? "filled" : "text",
    color: "gray",
    onClick: () => setCurrentPage(index),
  });

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="flex justify-between py-3">
        <Button
          onClick={() => handlePost()}
          className="bg-indigo-600 px-4 py-3 rounded-sm hover:bg-indigo-400 text-white"
        >
          Post Job
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-3 bg-white p-3 h-[525px]">
        {currentJobs.map((job) => {
          const { _id, jobName, isActive } = job;
          return (
            <div key={_id} className="flex-row justify-between">
              <Card className="flex-row justify-between">
                <div className="flex-col m-4 justify-between">
                  <Typography variant="h5" className="mb-5">
                    {jobName}
                  </Typography>
                  <div>
                    <Chip
                      size="md"
                      value={isActive ? `open` : `closed`}
                      className={`w-max mb-3 rounded-sm ${
                        isActive
                          ? "text-green-800 bg-green-100"
                          : "text-red-800 bg-red-100"
                      }`}
                    />
                  </div>
                  <Link to={`/recruiter/jobs/applicants/${_id}`}>
                    <Button className="rounded-full">Applicants</Button>
                  </Link>
                </div>
                <div className="flex-col justify-end gap-3">
                  <div>
                    <Tooltip content="Edit Job">
                      <IconButton
                        variant="text"
                        onClick={() => handleEdit(job)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </div>

                  <div>
                    <Tooltip content="Delete Job">
                      <IconButton
                        variant="text"
                        onClick={() => handleDelete(_id)}
                      >
                        <TrashIcon className="h-4 w-4 text-red-800" />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <div className="m-2">
                    {isActive ? (
                      <button
                        onClick={() => handleBlock(_id)}
                        className="bg-red-800 text-white px-3 py-1 rounded-sm hover:bg-red-400"
                      >
                        close
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBlock(_id)}
                        className="bg-green-800 text-white px-3 py-1 rounded-sm hover:bg-green-400"
                      >
                        open
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-2 justify-center mt-1">
        {Array.from({ length: totalPages }, (_, index) => (
          <IconButton key={index} {...getItemProps(index + 1)}>
            {index + 1}
          </IconButton>
        ))}
      </div>
      <PostJobModal open={open} setOpen={setOpen} job={selectedJob} />
    </>
  );
};

export default JobListing;
