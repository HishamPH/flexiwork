import React from 'react'
import { Link } from 'react-router-dom'
const PublicTwo = () => {
  return (
    <section className="py-10 bg-white sm:py-16 lg:py-24">
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="grid items-center grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-24 gap-y-12">
        <div className="relative lg:mb-12">
          <img
            className="absolute -right-0 -bottom-8 xl:-bottom-12 xl:-right-4"
            src="https://cdn.rareblocks.xyz/collection/celebration/images/content/3/dots-pattern.svg"
            alt=""
          />
          <div className="pl-12 pr-6">
            <img
              className="relative"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/content/3/girl-working-on-laptop.jpg"
              alt=""
            />
          </div>
          <div className="absolute left-0 pr-12 bottom-8 xl:bottom-20">
            <div className="max-w-xs bg-blue-600 rounded-lg sm:max-w-md xl:max-w-md">
              <div className="px-3 py-4 sm:px-5 sm:py-8">
                <div className="flex items-start">
                  <p className="text-3xl sm:text-4xl">👋</p>
                  <blockquote className="ml-5">
                    <p className="text-sm font-medium text-white sm:text-lg">
                      “I'm excited to let you know that your new site is up
                      and running smoothly! It's faster and much easier to
                      navigate than before, making it a breeze to use.”
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="2xl:pl-16">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight">
            Explore the benefits of freelancing.
          </h2>
          <p className="text-xl leading-relaxed text-gray-900 mt-9">
            Connect with clients who inspire you and elevate your career or
            business to new levels.
          </p>
          <p className="mt-6 text-xl leading-relaxed text-gray-900">
            Experience the independence to manage your workload and priorities
            effectively.
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
    </div>
  </section>
  )
}

export default PublicTwo