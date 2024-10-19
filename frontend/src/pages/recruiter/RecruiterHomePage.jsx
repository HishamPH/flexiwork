import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card } from "@material-tailwind/react";
import { Calendar } from "lucide-react";
import axiosInstance from "../../../interceptors/axiosInterceptors";
import { useSelector } from "react-redux";

const generateRandomData = () => ({
  jobs: Math.floor(Math.random() * 50) + 10,
  applicants: Math.floor(Math.random() * 500) + 100,
  interviews: Math.floor(Math.random() * 20) + 5,
});

const generatePieData = () => [
  { name: "Open", value: 5 },
  { name: "In Progress", value: 10 },
  { name: "Closed", value: 15 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const RecruiterHomePage = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [jobs, setJobs] = useState(0);
  const [candidates, setCandidates] = useState(null);
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axiosInstance.get(
          `/user/get-recruiter-details/${userInfo._id}`
        );
      } catch (err) {
        console.log(err);
      }
    };
  }, []);

  const data = generateRandomData();
  const pieData = generatePieData();
  return (
    <>
      <div className="text-2xl font-semibold mb-6">Welcome, Recruiter!</div>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded shadow">
          <h2 className="text-xl font-bold">Active Job Listings</h2>
          <p>3 Active Listings</p>
        </div>
        <div className="bg-white p-8 rounded shadow">
          <h2 className="text-xl font-bold">Candidates in Pipeline</h2>
          <p>12 Candidates</p>
        </div>
        <div className="bg-white p-8 rounded shadow">
          <h2 className="text-xl font-bold">Upcoming Interviews</h2>
          <p>2 Interviews Scheduled</p>
        </div>
      </div>

      <Card className="w-full mt-6 rounded-sm">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={160}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center space-x-4 mb-10">
          {pieData.map((entry, index) => (
            <div key={`legend-${index}`} className="flex items-center">
              <div
                className="w-3 h-3 mr-1"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span>{entry.name}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card className="w-full mt-6 rounded-sm p-7 ">
        <div className="w-full text-3xl font-bold">Upcoming Interviews</div>
        <div className=" grid grid-cols-1 lg:grid-cols-2">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className=" mx-2 my-2 shadow-md bg-gray-100 p-4">
              <Calendar className="mr-2" />
              <div>
                <div className="font-semibold">Candidate {index + 1}</div>
                <div className="text-sm text-gray-500">
                  {new Date(
                    Date.now() + (index + 1) * 24 * 60 * 60 * 1000
                  ).toLocaleDateString()}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </>
  );
};

export default RecruiterHomePage;
