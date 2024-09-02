import React from 'react'
import { Link } from 'react-router-dom'
const PublicOne = () => {
  return (
    <section className="pt-10 mt-5 bg-gray-100 sm:pt-16 lg:pt-24">
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight">
          Talented developers are available to assist you in building your
          Project
        </h2>
        <p className="mt-6 text-lg text-gray-900">
          Collaborate with the extensive network of freelance experts to
          accomplish tasks swiftly and achieve significant changes.
        </p>
        <Link
          to="/signup"
          className="inline-flex items-center justify-center px-6 py-4 mt-12 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:bg-blue-700"
          role="button"
        >
          <svg
            className="w-5 h-5 mr-2 -ml-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Get Started now
        </Link>
      </div>
    </div>

    <div className="container mx-auto 2xl:px-12">
      <img
        className="w-full mt-6"
        src="https://cdn.rareblocks.xyz/collection/celebration/images/team/4/group-of-people.png"
        alt=""
      />
    </div>
  </section>
  )
}

export default PublicOne