import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {FaUser,FaUserCircle,FaUsers,FaSuitcase,} from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdDashboard } from "react-icons/md";
const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const NavItem = ({ icon, text, to }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center py-2 px-4 rounded transition-colors duration-200 ${
          isActive
            ? 'bg-indigo-100 text-indigo-700'
            : 'text-black hover:bg-gray-100'
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
        isOpen ? 'w-64' : 'w-20'
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
          <GiHamburgerMenu />
        </button>
      </div>
      <nav className="mt-6 px-2">
        
        <NavItem
          to="/admin/dashboard"
          icon={<MdDashboard />}
          text="Dashboard"
        />
        <NavItem
          to="/admin/recruiters"
          icon={<FaUsers />}
          text="Recruiters"
        />
        <NavItem
          to="/admin/candidates"
          icon={<FaUser />}
          text="Candidates"
        />
        <NavItem
          to="/jobs"
          icon={<FaSuitcase/>}
          text="Jobs"
        />
        <NavItem
          to="/admin/profile"
          icon={<FaUserCircle/>}
          text="My Profile"
        />
      </nav>
      {isOpen && (
        <div className="mt-6 px-4">
          <div className="text-xs font-semibold text-gray-400 mb-2">SETTINGS</div>
          <NavItem
            to="/settings"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
            text="Settings"
          />
          <NavItem
            to="/help"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            text="Help Center"
          />
        </div>
      )}
    </aside>
  );
};

export default SideBar;