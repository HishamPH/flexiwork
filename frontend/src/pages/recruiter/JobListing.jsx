import { useState, useEffect } from "react";
import axios from "axios";
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
        const res = await axios.get(
          `/api/user/recruiter/get-jobs/${recruiterId}`
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = async (job) => {
    setSelectedJob(job);
    setOpen(true);
  };
  const handlePost = async () => {
    setSelectedJob(null);
    setOpen(true);
  };

  const handleDelete = async (jobId) => {};

  const handleBlock = async (jobId) => {};

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
          const { _id, jobName } = job;
          return (
            <div className="flex-row justify-between" key={_id}>
              <Card className="flex-row justify-between">
                <div className="flex-col m-4 justify-between">
                  <Typography variant="h5">{jobName}</Typography>
                  <div></div>
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
                    <Button>Block</Button>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-2 justify-center mt-1">
        {Array.from({ length: totalPages }, (_, index) => (
          <IconButton {...getItemProps(index + 1)}>{index + 1}</IconButton>
        ))}
      </div>
      <PostJobModal open={open} setOpen={setOpen} job={selectedJob} />
    </>
  );
};

export default JobListing;
