import React, { useEffect, useState, Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

import { HomeIcon } from "@heroicons/react/24/solid";

import { Button } from "@material-tailwind/react";
import { useParams } from "react-router-dom";

import { useFormik } from "formik";
import { Success, Failed } from "../../helper/popup";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axiosInstance from "../../../interceptors/axiosInterceptors";

const UserForm = ({ open, setOpen, jobId }) => {
  const { userInfo } = useSelector((state) => state.user);

  const initialValues = {
    resume: null,
    motivation: "",
    challenge: "",
    expectedSalary: "",
  };
  const {
    handleChange,
    values,
    errors,
    handleSubmit,
    handleBlur,
    touched,
    isSubmitting,
    setValues,
    setFieldValue,
  } = useFormik({
    initialValues,
    onSubmit: async (values, action) => {
      const { ...rest } = values;
      rest.candidateId = userInfo._id;
      try {
        const res = await axiosInstance.put(
          `/user/candidate/apply-job/${jobId}`,
          rest,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(res.data);
        const data = res.data;
        action.resetForm();
        Success(data.message);
        setOpen(false);
      } catch (err) {
        Failed(err.response ? err.response.data.message : err.message);
        console.log(err.message);
      } finally {
        action.setSubmitting(false);
      }
    },
  });
  const closeModal = () => setOpen(false);

  return (
    <>
      <div className="flex-1 w-auto justify-center">
        <Transition appear show={open ?? false} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-semibold leading-6 text-gray-900"
                    >
                      Apply for the job
                    </DialogTitle>
                    <form
                      className="w-full mt-2 flex flex-col gap-5"
                      onSubmit={handleSubmit}
                    >
                      <div className="w-full flex gap-2 text-sm">
                        <div className="w-1/2">
                          <label className="text-gray-600 text-sm mb-1">
                            Choose Resume
                          </label>
                          <input
                            type="file"
                            name="resume"
                            accept=".pdf"
                            onChange={(e) => {
                              setFieldValue("resume", e.target.files[0]);
                            }}
                            required
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="text-gray-600 text-sm mb-1">
                          What motivates you to apply for this position?
                        </label>
                        <input
                          type="text"
                          name="motivation"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.motivation}
                          className="border border-gray-300 rounded-md p-2 w-full"
                          required
                        />
                      </div>

                      {/* Question 2: Challenge */}
                      <div className="mt-4">
                        <label className="text-gray-600 text-sm mb-1">
                          Describe a challenging situation and how you handled
                          it.
                        </label>
                        <input
                          type="text"
                          name="challenge"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.challenge}
                          className="border border-gray-300 rounded-md p-2 w-full"
                          required
                        />
                      </div>

                      {/* Expected Salary */}
                      <div className="mt-4">
                        <label className="text-gray-600 text-sm mb-1">
                          Expected Salary
                        </label>
                        <input
                          type="number"
                          name="expectedSalary"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.expectedSalary}
                          className="border border-gray-300 rounded-md p-2 w-full"
                          required
                        />
                      </div>
                      <div className="mt-4">
                        <Button type="submit" className="">
                          Apply
                        </Button>
                      </div>
                    </form>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};

const ViewJobPage = () => {
  const [open, setOpen] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [job, setJob] = useState({});

  let { id } = useParams();

  useEffect(() => {
    const fetchJob = async (jobId) => {
      const res = await axiosInstance.get(
        `/user/candidate/job-detail/${jobId}`
      );
      console.log(res.data);
      setJob(res.data.result);
      setIsApplied(res.data.isApplied);
    };
    fetchJob(id);
  }, [open]);

  return (
    <>
      <div className="w-3/4 mx-auto p-14 bg-gray-100 rounded-lg shadow-md mt-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <h1 className="ml-4 text-3xl text-indigo-700 font-bold">
              {job.jobName}
            </h1>
          </div>
          <div>
            <Link to={`/candidate/chats/${job.recruiterId}`}>
              <Button className="px-4 py-2 me-4 rounded-sm text-white bg-green-500 hover:bg-green-300">
                chat
              </Button>
            </Link>

            <Button
              className="px-4 py-2 rounded-sm bg-indigo-600 hover:bg-indigo-400 text-white "
              onClick={() => setOpen(true)}
              disabled={isApplied}
            >
              Apply
            </Button>
          </div>
        </div>

        <div className="lg:flex">
          <div className="w-full lg:w-3/4">
            {/* Description */}
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{job.description}</p>
            </div>

            {/* Responsibilities */}
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Responsibilities</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                {job.responsibilities ? (
                  job.responsibilities?.split(",").map((item, index) => {
                    return <li key={index}>{item}</li>;
                  })
                ) : (
                  <div>No Job Responsiblities Mentioned</div>
                )}
              </ul>
            </div>

            {/* Nice-To-Haves */}
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Nice-To-Haves</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                {job.niceToHaves ? (
                  job.niceToHaves?.split(",").map((item, index) => {
                    return <li key={index}>{item}</li>;
                  })
                ) : (
                  <div>No Job Responsiblities Mentioned</div>
                )}
              </ul>
            </div>
            <div className="mb-4 flex-col">
              <h2 className="text-lg font-semibold mb-0 flex">
                <HomeIcon className="w-4 me-2" />
                Remote
              </h2>
              <p>yes</p>
            </div>
          </div>

          <div className="w-full lg:w-1/4 flex-col">
            {/* About this Role */}
            <div className="flex-col justify-between items-start mb-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">About this role</h2>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Apply Before : </strong>
                  {new Date(job.postDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Posted On :</strong>{" "}
                  {new Date(job.dueDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Job Type:</strong> {job.jobType}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Salary:</strong>{" "}
                  {`${Math.round(job.minSalary / 1000)}k - ${Math.round(
                    job.maxSalary / 1000
                  )}k INR`}
                </p>
              </div>

              {/* Categories and Skills */}
              <div className="text-sm">
                <div>
                  <h2 className="font-semibold mb-2">Required Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {job.skills ? (
                      job.skills?.split(",").map((item, index) => {
                        return (
                          <span
                            key={index}
                            className="bg-gray-400 text-gray-800 px-2 py-1 rounded-full"
                          >
                            {item}
                          </span>
                        );
                      })
                    ) : (
                      <div>No Job Responsiblities Mentioned</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserForm open={open} setOpen={setOpen} jobId={job._id} />
    </>
  );
};

export default ViewJobPage;
