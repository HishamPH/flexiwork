import React, { Fragment, useEffect, useState, memo } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

import { Select, Option, Checkbox } from "@material-tailwind/react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

import TextInput from "../TextInput";
import { Success, Failed } from "../../helper/popup";
import { jobValidation } from "../../validations/validation";
import axiosInstance from "../../../interceptors/axiosInterceptors";

const PostJobModal = ({ open, setOpen, job }) => {
  const { userInfo } = useSelector((state) => state.user);
  console.log("job modal mounted");

  const initialValues = {
    jobName: job?.jobName ?? "",
    description: job?.description ?? "",
    responsibilities: job?.responsibilities ?? "",
    niceToHaves: job?.niceToHaves ?? "",
    postDate: job?.postDate?.slice(0, 10) ?? "",
    dueDate: job?.dueDate?.slice(0, 10) ?? "",
    jobType: job?.jobType ?? "Full Time",
    minSalary: job?.minSalary ?? "",
    maxSalary: job?.maxSalary ?? "",
    skills: job?.skills ?? "",
    location: job?.location ?? "",
    remote: job?.remote ?? false,
    isActive: job?.isActive ?? true,
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
    enableReinitialize: true,
    validationSchema: jobValidation,
    onSubmit: async (values, action) => {
      let path = "";
      if (job) {
        path = `edit-job/${job._id}`;
      } else {
        path = `add-job`;
      }
      try {
        console.log(path);
        const { ...rest } = values;
        rest.recruiterId = userInfo._id;
        console.log(rest);
        const res = await axiosInstance.post(`/user/recruiter/${path}`, rest, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        let data = res.data;
        console.log(res);
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
  const closeModal = () => {
    setOpen(false);
  };

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
              <div className="fixed inset-0 bg-black bg-opacity-50" />
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
                  <DialogPanel className="w-full max-w-xl transform overflow-hidden rounded-sm bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <DialogTitle
                      as="h2"
                      className="text-2xl font-semibold leading-6 text-gray-900"
                    >
                      {job ? "Edit Job" : "Add job"}
                    </DialogTitle>
                    <form
                      className="w-full mt-2 flex flex-col gap-5"
                      onSubmit={handleSubmit}
                    >
                      <div className="w-full">
                        <TextInput
                          name="jobName"
                          label="Job Title"
                          placeholder="Enter the job title"
                          type="text"
                          value={values.jobName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            errors.jobName && touched.jobName
                              ? errors.jobName
                              : ""
                          }
                        />
                        {/* {errors.jobName && touched.jobName ? (
                          <div className="text-red-700">{errors.jobName}</div>
                        ) : null} */}
                      </div>

                      <div className="flex flex-col">
                        <label className="text-gray-600 text-sm mb-1">
                          Job Description
                        </label>
                        <TextInput
                          className="rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 resize-none"
                          rows={3}
                          cols={5}
                          value={values.description}
                          name="description"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            errors.description && touched.description
                              ? errors.description
                              : ""
                          }
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-gray-600 text-sm mb-1">
                          Responsibilities
                        </label>
                        <textarea
                          className="ounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 resize-none"
                          rows={3}
                          cols={5}
                          value={values.responsibilities}
                          name="responsibilities"
                          onChange={handleChange}
                        ></textarea>
                      </div>
                      <div className="flex flex-col">
                        <label className="text-gray-600 text-sm mb-1">
                          Nice To Haves
                        </label>
                        <textarea
                          className="ounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 resize-none"
                          rows={3}
                          cols={5}
                          value={values.niceToHaves}
                          name="niceToHaves"
                          onChange={handleChange}
                        ></textarea>
                      </div>
                      <div className="w-72">
                        <Select
                          label="Select Job Type"
                          value={values.jobType}
                          onChange={(value) => setFieldValue("jobType", value)}
                        >
                          <Option value="Full Time">Full Time</Option>
                          <Option value="Part Time">Part Time</Option>
                          <Option value="Freelance">Freelance</Option>
                          <Option value="Internship">Internship</Option>
                        </Select>
                      </div>
                      <div className="w-full">
                        <Checkbox
                          name="remote"
                          label="Remote"
                          // defaultChecked={values.remote}
                          checked={values.remote}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="w-full">
                        <TextInput
                          name="location"
                          label="Location"
                          placeholder=""
                          type="text"
                          value={values.location}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="w-full">
                        <TextInput
                          name="minSalary"
                          label="Minimum Salary"
                          placeholder=""
                          type="number"
                          value={values.minSalary}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            errors.minSalary && touched.minSalary
                              ? errors.minSalary
                              : ""
                          }
                        />
                      </div>

                      <div className="w-full">
                        <TextInput
                          name="maxSalary"
                          label="Maximum Salary"
                          placeholder=""
                          type="number"
                          value={values.maxSalary}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            errors.maxSalary && touched.maxSalary
                              ? errors.maxSalary
                              : ""
                          }
                        />
                      </div>
                      <div className="w-full">
                        <TextInput
                          name="postDate"
                          label="Start Date"
                          placeholder=""
                          type="date"
                          value={values.postDate}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="w-full">
                        <TextInput
                          name="dueDate"
                          label="Last Date"
                          placeholder=""
                          type="date"
                          value={values.dueDate}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-gray-600 text-sm mb-1">
                          Skills
                        </label>
                        <textarea
                          className="ounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 resize-none"
                          rows={3}
                          cols={5}
                          value={values.skills}
                          name="skills"
                          onChange={handleChange}
                        ></textarea>
                      </div>

                      <div className="mt-4">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none "
                        >
                          Submit
                        </button>
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

export default PostJobModal;
