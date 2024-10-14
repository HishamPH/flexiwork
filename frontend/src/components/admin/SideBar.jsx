import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUser, FaUserCircle, FaUsers, FaSuitcase } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import {
  Cog6ToothIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

import { Button } from "@material-tailwind/react";
import { logoutAdmin } from "../../redux/slices/adminAuth";
import { useDispatch } from "react-redux";
import { Success, Failed } from "../../helper/popup";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await dispatch(logoutAdmin());
      Success("logout Successful");
      navigate("/admin");
    } catch (err) {
      Failed(err.response ? err.response.data.message : err.message);
      console.log(err.message);
    }
  };

  const NavItem = ({ icon, text, to }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center py-2 px-4 rounded transition-colors duration-200 ${
          isActive
            ? "bg-indigo-100 text-indigo-700"
            : "text-black hover:bg-gray-100"
        }`
      }
    >
      {icon}
      {isOpen && <span className="ml-3">{text}</span>}
    </NavLink>
  );

  return (
    <aside
      className={`bg-white shadow-md transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-indigo-600 rounded-full"></div>
          {isOpen && <span className="ml-2 text-xl font-bold">FlexiWork</span>}
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-500 hover:text-gray-700"
        >
          <GiHamburgerMenu size={12} />
        </button>
      </div>
      <nav className="mt-6 px-2">
        <NavItem
          to="/admin/dashboard"
          icon={<MdDashboard size={24} />}
          text="Dashboard"
        />
        <NavItem
          to="/admin/recruiters"
          icon={<FaUsers size={24} />}
          text="Recruiters"
        />
        <NavItem
          to="/admin/candidates"
          icon={<FaUser size={24} />}
          text="Candidates"
        />
        {/* <NavItem to="/jobs" icon={<FaSuitcase />} text="Jobs" /> */}
      </nav>
      {isOpen && (
        <div className="mt-3 px-4">
          <div className="text-xs font-semibold text-gray-400 mb-2">
            Personal
          </div>
          <NavItem
            to="/admin/profile"
            icon={<FaUserCircle size={24} />}
            text="My Profile"
          />
          <Button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-400 rounded-md mt-2"
          >
            Logout
          </Button>
        </div>
      )}
    </aside>
  );
};

export default SideBar;
