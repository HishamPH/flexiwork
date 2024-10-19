import React, { useEffect, useState } from "react";
import { Video, Clock, CircleCheckBig, LoaderCircle } from "lucide-react";
import {
  Card,
  Typography,
  Button,
  Chip,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import axiosInstance from "../../interceptors/axiosInterceptors";
import { useSocketContext } from "../socket/SocketContext";
import moment from "moment";
import { useNavigate } from "react-router-dom";

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

const Meetings = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { socket } = useSocketContext();
  const [meetings, setMeetings] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentMeet, setCurrentMeet] = useState(null);

  const navigate = useNavigate();

  const handleMeetAlert = (data) => {
    setCurrentMeet(data);
    console.log(data);
  };

  useEffect(() => {
    if (socket) {
      socket.on("meetAlert", handleMeetAlert);
      return () => {
        socket.off("meetAlert", handleMeetAlert);
      };
    }
  }, [socket]);

  const handleJoinMeeting = (meetingId) => {
    console.log(`Joining meeting ${meetingId}`);
    navigate(`/video-call/${meetingId}`);
  };

  useEffect(() => {
    const fetchMeetings = async () => {
      const res = await axiosInstance.get(
        `/user/get-meetings/${userInfo._id}`,
        {
          params: {
            date: filter,
            role: userInfo.role,
          },
        }
      );
      setMeetings(res.data.result);
    };
    fetchMeetings(userInfo._id);
  }, [filter]);

  return (
    <div className=" bg-white p-6">
      <h2 className="text-2xl font-bold mb-4">Meetings</h2>
      <div className="flex justify-end mb-4">
        <select
          className="border p-2 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="today">Today</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <ul className="overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-4">
        {meetings.length === 0 ? (
          <div>No meetings to show</div>
        ) : (
          meetings.map((meeting) => {
            const status = new Date(meeting.to) >= new Date();
            const alert =
              new Date(meeting.start) - new Date() <= 300 * 1000 ||
              currentMeet?._id === meeting._id;
            return (
              <li
                key={meeting._id}
                className="border rounded-lg shadow-md hover:shadow-lg h-[140px]"
              >
                <div className="flex justify-between p-4 hover:bg-gray-50 h-full">
                  <div className="flex">
                    <div className="flex-col">
                      <div className="text-lg font-semibold mb-8">
                        meeting with{" "}
                        {userInfo.role == "candidate"
                          ? meeting.recruiter.name
                          : meeting.candidate.name}
                      </div>
                      <div className="text-gray-600 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatDate(meeting.start)}
                      </div>
                    </div>
                  </div>
                  {status ? (
                    alert ? (
                      <Button
                        onClick={() => handleJoinMeeting(meeting._id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 flex items-center h-fit"
                      >
                        <div>Join Meeting</div>

                        <Video className="h-6 w-6 text-white ms-2" />
                      </Button>
                    ) : (
                      <div className="bg-blue-100 text-blue-600 py-1 px-2 flex items-center h-fit rounded-md">
                        <div>Pending</div>

                        <Clock className="h-6 w-6 ms-2" />
                      </div>
                    )
                  ) : (
                    <div className="bg-green-200 text-green-600 py-1 px-2 flex items-center h-fit rounded-md">
                      <div>Meeting ended</div>

                      <CircleCheckBig className="h-6 w-6 ms-2" />
                    </div>
                  )}
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default Meetings;
