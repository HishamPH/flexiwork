import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "tailwindcss/tailwind.css";
import { Failed, Success } from "../../helper/popup";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../interceptors/axiosInterceptors";

const localizer = momentLocalizer(moment);

const InterviewScheduler = ({ applicant }) => {
  const { userInfo } = useSelector((state) => state.user);
  const { id } = useParams();

  const [currentApplicant, setCurrentApplicant] = useState({});
  const dummyApplicant = { _id: "123", name: "John Doe" };

  const [events, setEvents] = useState([]);
  const [interviewData, setInterviewData] = useState({
    date: "",
    startTime: "",
    duration: 30,
  });

  const fetchInterviews = async () => {
    try {
      const res = await axiosInstance.post(
        `/user/get-interviews`,
        {
          userId: userInfo._id,
          applicationId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { result, app } = res.data;

      const interviews = result.map((interview) => ({
        title: `${interview.candidate.name} interview`,
        start: new Date(interview.start),
        end: new Date(interview.to),
        applicantId: interview._id,
      }));

      setEvents(interviews);
      setCurrentApplicant(app.candidateId);
      const existingInterview = interviews.find(
        (event) => event.applicantId === app.interview._id
      );
      if (existingInterview) {
        setInterviewData({
          date: moment(existingInterview.start).format("YYYY-MM-DD"),
          startTime: moment(existingInterview.start).format("HH:mm"),
          duration:
            (new Date(existingInterview.end) -
              new Date(existingInterview.start)) /
            (1000 * 60),
        });
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  const isOverlapping = (start, end) => {
    return events.some((event) => start < event.end && end > event.start);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setInterviewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const start = new Date(
        `${interviewData.date}T${interviewData.startTime}`
      );
      const end = new Date(start.getTime() + interviewData.duration * 60000);
      const now = new Date();
      now.setDate(now.getDate() + 1);
      // if (start < now) {
      //   Failed("Interview requires atleast a days notice");
      //   return;
      // }
      // if (isOverlapping(start, end)) {
      //   Failed("the slot is not available");
      //   return;
      // }

      const newInterview = {
        recruiter: userInfo._id,
        start: start,
        to: end,
        remarks: "a very good interview",
      };

      const res = await axiosInstance.post(
        "/user/recruiter/update-interview",
        {
          applicationId: id,
          interview: newInterview,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data.result);
      const updatedInterview = res.data.result;
      const updatedEvents = events.filter(
        (event) => event.applicantId !== updatedInterview._id
      );
      setEvents([
        ...updatedEvents,
        {
          title: `${currentApplicant.name} interview`,
          start,
          end,
          applicantId: updatedInterview._id,
        },
      ]);
      Success("Interview scheduled successfully.");
    } catch (err) {
      Failed(err.response ? err.response.data.message : err.message);
      console.log(err.message);
    }
  };

  return (
    <div className="flex justify-center p-2">
      {/* Left Side: Form for scheduling interview */}
      <div className="w-1/4 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-lg mb-4 font-semibold">
          Schedule Interview for {currentApplicant.name}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={interviewData.date}
              onChange={handleFormChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Start Time</label>
            <input
              type="time"
              name="startTime"
              value={interviewData.startTime}
              onChange={handleFormChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Duration (minutes)</label>
            <input
              type="number"
              name="duration"
              value={interviewData.duration}
              onChange={handleFormChange}
              className="w-full p-2 border rounded"
              min="15"
              step="15"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {events.find(
              (event) =>
                event.applicantId ===
                (applicant ? applicant._id : dummyApplicant._id)
            )
              ? "Update Interview"
              : "Schedule Interview"}
          </button>
        </form>
      </div>

      {/* Right Side: Calendar */}
      <div className="w-3/4 p-4 bg-white ms-2 rounded-md shadow-lg">
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          events={events}
          selectable
          style={{ height: 600 }}
          dayLayoutAlgorithm={"no-overlap"}
        />
      </div>
    </div>
  );
};

export default InterviewScheduler;
