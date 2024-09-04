import { useState, useEffect } from "react";
import axios from "axios";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import RecruiterLayout from "../../Layouts/RecruiterLayout";
import JobModal from "../../components/recruiter/JobModal";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../helper/Loader";

const TABLE_HEAD = [
  "JobName",
  "status",
  "post Date",
  "Due Date",
  "action",
  "edit",
];

const JobListing = () => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const { userInfo } = useSelector((state) => state.user);
  useEffect(() => {
    if (!open) {
      const fetchRecruiterJobs = async (recruiterId) => {
        const res = await axios.get(
          `/api/user/recruiter/get-jobs/${recruiterId}`
        );
        setJobs(res.data.result);
        setLoading(false);
      };

      fetchRecruiterJobs(userInfo._id);
    }
  }, [open]);
  const formattedDate = (date = Date.now()) => {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long", // Use 'short' for abbreviated month name
      day: "numeric",
    });
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="flex justify-between py-4">
        <button
          onClick={() => setOpen(true)}
          className="bg-indigo-600 px-4 py-2 rounded-sm hover:bg-indigo-400 text-white"
        >
          Post Job
        </button>
      </div>
      <Card className="h-auto w-auto">
        <CardBody className="px-0">
          <table className="mt-4 w-full min-w-max table-auto ">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-100"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jobs.map(
                (
                  { jobName, status, postDate, dueDate, isBlocked, _id },
                  index
                ) => {
                  const isLast = index === jobs.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={_id}>
                      <td className={classes}>
                        <Link to={`/recruiter/jobs/applicants/${_id}`}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {jobName}
                          </Typography>
                        </Link>
                      </td>

                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={isBlocked ? "online" : "offline"}
                            color={isBlocked ? "green" : "blue-gray"}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {jobName}
                          {postDate?.slice(0, 10)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {jobName}
                          {dueDate?.slice(0, 10)}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <button className="bg-red-800 text-white px-3 py-1 rounded-sm hover:bg-red-400">
                          block
                        </button>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Edit User">
                          <IconButton variant="text">
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
      <JobModal open={open} setOpen={setOpen} />
    </>
  );
};

export default JobListing;
