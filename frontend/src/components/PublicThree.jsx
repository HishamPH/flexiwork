import React from 'react'

const PublicThree = () => {
  return (
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto text-center">
        <div className="inline-flex px-4 py-1.5 mx-auto rounded-full bg-gradient-to-r from-fuchsia-600 to-blue-600">
          <p className="text-xs font-semibold tracking-widest text-white uppercase">
            World's finest freelance marketplace
          </p>
        </div>
        <h2 className="mt-6 text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
          Tap into a global talent network
        </h2>
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          Discover top talent quickly with CodeSquad's vast pool of
          professionals. Stay in control with real-time updates anytime,
          anywhere.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 mt-12 sm:grid-cols-3 lg:mt-20 lg:gap-x-12">
        <div className="transition-all duration-200 bg-white hover:shadow-xl">
          <div className="py-10 px-9">
            <svg
              className="m-auto w-16 h-16 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <h3 className="text-center mt-8 text-lg font-semibold text-black">
              Secured Works
            </h3>
            <p className="mt-4 text-base text-gray-600">
              Focus on your work knowing we help protect your data and
              privacy. We’re here with 24/7 support if you need it.
            </p>
          </div>
        </div>

        <div className="transition-all duration-200 bg-white hover:shadow-xl">
          <div className="py-10 px-9">
            <svg
              className="m-auto w-16 h-16 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-center mt-8 text-lg font-semibold text-black">
              Trust Hiring
            </h3>
            <p className=" mt-4 text-base text-gray-600">
              Interview potential fits for your job, negotiate rates, and only
              pay for work you approve.
            </p>
          </div>
        </div>

        <div className="transition-all duration-200 bg-white hover:shadow-xl">
          <div className="py-10 px-9">
            <svg
              className=" m-auto w-16 h-16 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <h3 className=" text-center mt-8 text-lg font-semibold text-black">
              Expert Assistance
            </h3>
            <p className="mt-4 text-base text-gray-600">
              Your time is precious. We're happy to receive your feedback as
              our experts save you time finding the right talent.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default PublicThree