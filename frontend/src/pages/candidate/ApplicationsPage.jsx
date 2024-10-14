import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { Card, Typography, Button, Chip } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../interceptors/axiosInterceptors";
import { Link } from "react-router-dom";
import PDFViewer from "../../components/PDFViewer";
import moment from "moment";
import { Clock } from "lucide-react";

const formatDate = (date) => {
  const momentDate = moment(date);
  const now = moment();

  if (momentDate.isSame(now, "day")) {
    return `Today\t${momentDate.format("hh:mm A")}`;
  } else if (momentDate.isSame(now.subtract(1, "day"), "day")) {
    return `Yesterday\t${momentDate.format("hh:mm A")}`;
  } else if (momentDate.isSame(now.add(2, "day"), "day")) {
    return `Tomorrow\t${momentDate.format("hh:mm A")}`;
  } else {
    return momentDate.format("DD/MM/YYYY\thh:mm A");
  }
};

const ApplicationsPage = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [app, setApp] = useState(null);
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

  const openModal = (pdfPath, data) => {
    setCurrentPdf(pdfPath);
    setApp(data);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setApp(null);
    setCurrentPdf(null);
  };

  return (
    <div>
      <div className="flex justify-center bg-white h-screen align-middle">
        <div className=" w-3/4 h-[600px] bg-blue-gray-50 grid grid-cols-3 gap-1 mt-10">
          {applications?.map(
            ({
              _id,
              resume,
              status,
              jobId,
              challenge,
              motivation,
              expectedSalary,
              updatedAt,
            }) => {
              return (
                <Card
                  key={_id}
                  className="bg-white m-4 h-[260px] rounded-md p-4 flex-col"
                >
                  <Typography variant="h5" className="mb-6">
                    {jobId.jobName}
                  </Typography>
                  <div className="w-max">
                    <div className="w-fit">
                      <Chip
                        size="lg"
                        value={status}
                        className="w-auto text-green-800 bg-green-100 rounded-full"
                      />
                    </div>

                    <div className="mt-2 flex items-center">
                      {" "}
                      <Clock className="h-4 w-4 mr-1" />
                      {formatDate(updatedAt)}
                    </div>
                  </div>
                  <div className="my-3">
                    <Button
                      onClick={() =>
                        openModal(resume, {
                          challenge,
                          motivation,
                          expectedSalary,
                        })
                      }
                    >
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
            }
          )}
        </div>
      </div>
      <PDFViewer
        app={app}
        isOpen={open}
        onClose={closeModal}
        pdfFile={currentPdf}
      />
    </div>
  );
};

export default ApplicationsPage;
