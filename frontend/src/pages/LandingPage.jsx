import React from 'react';
import { Link } from 'react-router-dom';
import PublicThree from '../components/PublicThree';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
const LandingPage = () => {
  return (
    <div className="bg-slate-900 text-white min-h-screen" style={{
      backgroundColor:'#0F172A'
    }}>
      
      <NavBar />
      <main className="container mx-auto mt-20">
        <h1 className="text-5xl font-serif font-bold mb-4 leading-tight">
          Your Gateway to<br />
          Flexible Work<br />
          Opportunities
        </h1>
        <div className="w-1/3 h-2 bg-blue-500 mb-6"></div>
        <p className="text-gray-400 mb-8 max-w-lg">
          Great platform for the job seeker that is searching
          for a part time job for boosting their career.
        </p>
        
        <div className="flex bg-white rounded-lg overflow-hidden max-w-3xl">
          <div className="flex items-center px-4 border-r border-gray-300">
            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Job title or keyword" className="py-3 text-gray-700 focus:outline-none" />
          </div>
          <div className="flex items-center px-4 border-r border-gray-300 flex-1">
            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input type="text" placeholder="Florence, Italy" className="py-3 text-gray-700 focus:outline-none" />
            <svg className="w-5 h-5 text-gray-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <button className="bg-indigo-600 text-white px-6 py-3 font-semibold hover:bg-indigo-700">
            Search my job
          </button>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-4">
            Explore by <span className="text-blue-400">category</span>
          </h2>
          <div className="flex justify-between items-center">
            <div></div>
            <a href="#" className="text-indigo-400 hover:underline">Show all jobs →</a>
          </div>
          {/* Add category cards here */}
        </div>
      </main>
      <PublicThree />
      <Footer />
    </div>
  );
};

export default LandingPage;