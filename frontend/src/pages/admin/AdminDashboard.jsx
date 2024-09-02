import React from 'react';
import SideBar from '../../components/admin/SideBar';
import AdminNavBar from '../../components/admin/AdminNavBar';
import AdminLayout from '../../Layouts/AdminLayout';

const AdminDashboard = () => {
  return (
    
      <div className='p-8'>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
         
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-indigo-600 text-white p-6 rounded-lg">
            <div className="text-4xl font-bold mb-2">76</div>
            <div className="flex justify-between items-center">
              <span>New candidates</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
          <div className="bg-emerald-500 text-white p-6 rounded-lg">
            <div className="text-4xl font-bold mb-2">12</div>
            <div className="flex justify-between items-center">
              <span>new Recruiters</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
          <div className="bg-blue-500 text-white p-6 rounded-lg">
            <div className="text-4xl font-bold mb-2">24</div>
            <div className="flex justify-between items-center">
              <span>New Jobs</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Job Statistics */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Job statistics</h2>
            <div>
              <button className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded mr-2">Week</button>
              <button className="text-gray-600 px-3 py-1 rounded mr-2">Month</button>
              <button className="text-gray-600 px-3 py-1 rounded">Year</button>
            </div>
          </div>
          <div className="flex mb-4">
            <button className="text-indigo-700 border-b-2 border-indigo-700 pb-2 mr-4">Overview</button>
            <button className="text-gray-600 pb-2 mr-4">Jobs View</button>
            <button className="text-gray-600 pb-2">Jobs Applied</button>
          </div>
          {/* Add your chart component here */}
          <div className="h-64 bg-gray-200">
            {/* Placeholder for chart */}
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