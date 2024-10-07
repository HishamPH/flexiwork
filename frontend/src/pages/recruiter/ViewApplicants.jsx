import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import {
  Card,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Select,
  Option,
  Input,
} from "@material-tailwind/react";

import { useParams } from "react-router-dom";

import PDFViewer from "../../components/PDFViewer";

import { pdfjs } from "react-pdf";
import axiosInstance from "../../../interceptors/axiosInterceptors";

import ApplicantProfileModal from "../../components/recruiter/ApplicantProfileModal";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

import { Failed, Success } from "../../helper/popup";

const TABLE_HEAD = ["Applicant", "Status", "Application", "Profile", "Chats"];

const ViewApplicants = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [currentPdf, setCurrentPdf] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [applicants, setApplicants] = useState([]);

  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  let { id } = useParams();
  useEffect(() => {
    const fetchApplicants = async (jobId) => {
      const res = await axiosInstance.get(
        `/user/recruiter/get-applicants/${jobId}`
      );
      console.log(res.data.result);
      setApplicants(res.data.result);
    };
    fetchApplicants(id);
  }, []);

  const handleStatusChange = async (applicationId, status) => {
    try {
      const res = await axiosInstance.post(
        "/user/recruiter/application-status",
        { applicationId, status },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Success(res.data.message);

      const updatedApplicants = applicants.map((applicant) =>
        applicant._id === applicationId ? { ...applicant, status } : applicant
      );
      setApplicants(updatedApplicants);
    } catch (err) {
      Failed(err.response ? err.response.data.message : err.message);
      console.log(err.message);
    }
  };

  useEffect(() => {
    const results = applicants.filter((applicant) =>
      applicant.candidateId.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredApplicants(results);
    setCurrentPage(1);
  }, [searchTerm, applicants]);

  useEffect(() => {
    let results = applicants;
    if (statusFilter !== "All") {
      results = applicants.filter(
        (applicant) => applicant.status === statusFilter
      );
    }
    setFilteredApplicants(results);
    setCurrentPage(1);
  }, [statusFilter, applicants]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredApplicants.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openModal = (pdfPath) => {
    setCurrentPdf(pdfPath);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setCurrentPdf(null);
  };

  const openProfileModal = async (user) => {
    console.log(user);
    setCurrentUser(user);
    setProfileOpen(true);
  };

  return (
    <div>
      <Card className="h-auto">
        <CardBody className="px-0">
          <div className="flex justify-end items-center mb-4 px-4">
            {/* <div className="w-1/4">
              <Input
                type="text"
                placeholder="Search applicants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-1/4"
              />
            </div> */}

            <div className="w-1/4">
              <Select
                label="filter"
                value={statusFilter}
                onChange={(value) => setStatusFilter(value)}
                menuProps={{
                  className: "text-white bg-gray-700 rounded-sm font-bold",
                }}
                containerProps={{ className: " rounded-0 font-bold" }}
                labelProps={{ className: "text-black" }}
                className=""
              >
                <Option value="All">All</Option>
                <Option value="Applied">Applied</Option>
                <Option value="Reviewed">Reviewed</Option>
                <Option value="Hired">Hired</Option>
                <Option value="Rejected">Rejected</Option>
              </Select>
            </div>
          </div>
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className=" text-black font-bold leading-none opacity-100"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map(
                ({ _id, candidateId, jobId, resume, status }, index) => {
                  const isLast = index === applicants.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
                  const { _id: userId, name, email, profilePic } = candidateId;
                  return (
                    <tr key={_id}>
                      <td className={classes}>
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="w-[200px]">
                          <Select
                            className="text-black rounded-sm"
                            value={status}
                            onChange={(value) => handleStatusChange(_id, value)}
                          >
                            <Option value="Applied">Applied</Option>
                            <Option value="Reviewed">Reviewed</Option>
                            <Option value="Hired">Hired</Option>
                            <Option value="Rejected">Rejected</Option>
                          </Select>
                        </div>
                      </td>

                      <td className={classes}>
                        <Button
                          onClick={() => openModal(resume)}
                          className="bg-blue-gray-600 text-white px-3 py-3 rounded-sm hover:bg-blue-gray-400"
                        >
                          View Application
                        </Button>
                      </td>
                      <td className={classes}>
                        <Button
                          onClick={() => openProfileModal(candidateId)}
                          variant="outlined"
                          className="rounded-sm"
                        >
                          View Profile
                        </Button>
                      </td>
                      <td className={classes}>
                        <Link to={`/recruiter/chats/${userId}`}>
                          <Button className="bg-green-600 text-white px-4 py-2 rounded-sm hover:bg-green-400">
                            chat
                          </Button>
                        </Link>
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
            Page {currentPage} of{" "}
            {Math.ceil(filteredApplicants.length / itemsPerPage)}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage ===
                Math.ceil(filteredApplicants.length / itemsPerPage)
              }
            >
              Next
            </Button>
          </div>
          {/* <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div> */}
        </CardFooter>
      </Card>
      {/* <JobModal open={open} setOpen={setOpen} /> */}
      <PDFViewer isOpen={open} onClose={closeModal} pdfFile={currentPdf} />
      <ApplicantProfileModal
        open={profileOpen}
        setOpen={setProfileOpen}
        user={currentUser}
      />
    </div>
  );
};

export default ViewApplicants;
