import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { Card, Typography, Button, Chip } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../interceptors/axiosInterceptors";
import { Link } from "react-router-dom";
import PDFViewer from "../../components/PDFViewer";

const ApplicationsPage = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [applications, setApplications] = useState([]);
  const [currentPdf, setCurrentPdf] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fetchApplications = async () => {
      const res = await axiosInstance.get(
        `/user/candidate/get-applications/${userInfo._id}`
      );
      console.log(res.data);
      setApplications(res.data.result);
    };
    fetchApplications();
  }, []);

  const openModal = (pdfPath) => {
    setCurrentPdf(pdfPath);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setCurrentPdf(null);
  };

  return (
    <div>
      <NavBar />

      <div className="flex justify-center bg-white h-screen align-middle">
        <div className=" w-3/4 h-[600px] bg-blue-gray-50 grid grid-cols-3 gap-1 mt-10">
          {applications?.map(({ _id, resume, status, jobId }) => {
            return (
              <Card
                key={_id}
                className="bg-white m-4 h-[260px] rounded-md p-4 flex-col"
              >
                <Typography variant="h5" className="mb-6">
                  {jobId.jobName}
                </Typography>
                <div className="w-max">
                  <Chip
                    size="lg"
                    value={status}
                    className="w-auto text-green-800 bg-green-100 rounded-full"
                  />
                </div>
                <div className="my-6">
                  <Button onClick={() => openModal(resume)}>
                    View Application
                  </Button>
                </div>
                <div>
                  <Link to={`/candidate/chats/${jobId.recruiterId}`}>
                    <Button>Chat</Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
      <PDFViewer isOpen={open} onClose={closeModal} pdfFile={currentPdf} />
    </div>
  );
};

export default ApplicationsPage;
