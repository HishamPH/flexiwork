import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Calendar, Filter } from "lucide-react";

import { Button } from "@material-tailwind/react";

import { HiOutlineUserGroup } from "react-icons/hi2";
import { FaRupeeSign } from "react-icons/fa";
import { HiOutlineAcademicCap } from "react-icons/hi";

import { Success, Failed } from "../../helper/popup";
import axiosInstance from "../../../interceptors/axiosInterceptors";
import moment from "moment";

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState("week");
  const [data, setData] = useState([]);
  const [recruiters, setRecruiters] = useState(0);
  const [candidates, setCandidates] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    fetchData(timeRange);
  }, [timeRange]);

  const fetchData = async (range) => {
    try {
      const res = await axiosInstance.get(`/admin/fetch-summary`, {
        params: {
          filter: range,
        },
      });
      const result = res.data.result;
      let rev = 0;
      result.forEach((item) => {
        rev += item.totalAmount;
      });
      setRevenue(rev);
      setCandidates(res.data.totalCandidates);
      setRecruiters(res.data.totalRecruiters);
      let newData;
      if (timeRange === "week") {
        newData = generateWeekData(result);
      } else if (timeRange === "month") {
        newData = generateMonthData(result);
      } else if (timeRange === "year") {
        newData = generateYearData(result);
      }
      setData(newData);
    } catch (err) {
      Failed(err.response ? err.response.data.message : err.message);
      console.log(err.message);
    }
  };

  // Generate an array of days of the week
  const generateWeekData = (data) => {
    // Generate the last 7 days formatted as 'MMM DD' (e.g., "Oct 07")
    const last7Days = Array.from({ length: 7 }, (_, index) => {
      const date = moment().subtract(6 - index, "days");
      return {
        name: date.format("MMM DD"),
        value: 0,
      };
    });

    // Fill in the values from the fetched data
    data.forEach((item) => {
      const dateStr = moment(
        `${item._id.year}-${item._id.month}-${item._id.day}`,
        "YYYY-MM-DD"
      ).format("MMM DD");
      const dayData = last7Days.find((d) => d.name === dateStr);
      if (dayData) {
        dayData.value = item.totalAmount;
      }
    });

    return last7Days;
  };

  const generateMonthData = (data) => {
    // Generate the last 30 days formatted as 'MMM DD' (e.g., "Sep 15")
    const last30Days = Array.from({ length: 30 }, (_, index) => {
      const date = moment().subtract(29 - index, "days");
      return {
        name: date.format("MMM DD"),
        totalAmount: 0,
      };
    });

    // Fill in the values from the fetched data
    data.forEach((item) => {
      const dateStr = moment(
        `${item._id.year}-${item._id.month}-${item._id.day}`,
        "YYYY-MM-DD"
      ).format("MMM DD");
      const dayData = last30Days.find((d) => d.name === dateStr);
      if (dayData) {
        dayData.value = item.totalAmount;
      }
    });

    return last30Days;
  };

  // Generate an array of months in the year
  const generateYearData = (data) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const yearData = months.map((month) => ({
      name: month,
      value: 0,
    }));

    // Fill in the values from the fetched data
    data.forEach((item) => {
      yearData[item._id.month - 1].value = item.totalAmount;
    });

    return yearData;
  };

  // const getXAxisDataKey = () => {
  //   console.log(timeRange);
  //   switch (timeRange) {
  //     case "week":
  //       return "day";
  //     case "month":
  //       return "date";
  //     case "year":
  //       return month;
  //     default:
  //       return "hello";
  //   }
  // };

  const getXAxisProps = () => {
    const baseProps = {
      stroke: "#4B5563",
      tick: { fill: "#4B5563" },
    };

    switch (timeRange) {
      case "week":
        return { ...baseProps, interval: 0 };
      case "month":
        return {
          ...baseProps,
          angle: -90,
          textAnchor: "end",
          height: 60,
          interval: 0,
        };
      case "year":
        return { ...baseProps, interval: 0 };
      default:
        return baseProps;
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-sm shadow-md">
          <h3 className="text-xl font-semibold text-blue-800">
            Total Revenue
            <span className="text-md font-thin text-gray-500">
              | This {timeRange}
            </span>
          </h3>
          <div className="flex items-center mt-4">
            <div className="bg-green-100 rounded-full p-3 flex items-center justify-center">
              <FaRupeeSign size={32} className="text-green-700" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-blue-800">₹{revenue}</p>
              {/* <div className="flex items-center text-green-500 mt-1">
                <span className="text-sm">8% increase</span>
              </div> */}
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-sm shadow-md">
          <h3 className="text-xl font-semibold text-blue-800">Recruiters</h3>
          <div className="flex items-center mt-4">
            <div className="bg-yellow-100 rounded-full p-3 flex items-center justify-center">
              <HiOutlineUserGroup size={32} className="text-yellow-800" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-blue-800">{recruiters}</p>
              {/* <div className="flex items-center text-green-500 mt-1">
                <span className="text-sm">8% increase</span>
              </div> */}
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-sm shadow-md ">
          <h3 className="text-xl font-semibold text-blue-800">Candidates</h3>
          <div className="flex items-center mt-4">
            <div className="bg-green-100 rounded-full p-3 flex items-center justify-center">
              <HiOutlineAcademicCap size={32} />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-blue-800">{candidates}</p>
              {/* <div className="flex items-center text-green-500 mt-1">
                <span className="text-sm">8% increase</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* well well welll */}

      <div className="w-full mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Calendar className="mr-2 text-blue-500" />
            Revenue last {timeRange}
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setTimeRange("week")}
              className={timeRange === "week" ? "bg-gray-600" : ""}
            >
              week
            </Button>
            <Button
              onClick={() => setTimeRange("month")}
              className={timeRange === "month" ? "bg-gray-600" : ""}
            >
              month
            </Button>
            <Button
              onClick={() => setTimeRange("year")}
              className={timeRange === "year" ? "bg-gray-600" : ""}
            >
              year
            </Button>
          </div>
        </div>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" {...getXAxisProps()} />
              <YAxis stroke="#4B5563" tick={{ fill: "#4B5563" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#F3F4F6",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
              />
              <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Candidates</h3>
          <div className="text-3xl font-bold mb-2">76</div>
          <div className="text-green-500">This Week 6.4% ↑</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">total jobs</h3>
          <div className="text-3xl font-bold mb-2">34</div>
          <div>Jobs Opened</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Applicants Summary</h3>
          <div className="text-3xl font-bold mb-2">67</div>
          <div>Applicants</div>
          {/* Add progress bar component here */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
