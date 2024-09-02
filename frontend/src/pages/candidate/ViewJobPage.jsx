import React, { useEffect, useState,Fragment } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import axios from 'axios'
import { useFormik } from "formik";
import { Success,Failed } from "../../helper/popup";
import CustomButton from "../../components/CustomButton";
import TextInput from "../../components/TextInput";
import { useSelector } from "react-redux";


const UserForm = ({ open, setOpen,jobId}) => {
  const {userInfo} = useSelector(state=>state.user);

  const initialValues = {
    resume:null,
  }
  const {
    handleChange,
    values,
    errors,
    handleSubmit,
    handleBlur,
    touched,
    isSubmitting,
    setValues,
    setFieldValue
  } = useFormik({
    initialValues,
    onSubmit: async (values, action) => {
      const {...rest } = values;
      rest.candidateId = userInfo._id;
      try {
        const res = await axios.put(`/api/user/candidate/apply-job/${jobId}`, rest, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(res.data);
        const data = res.data;
        action.resetForm();
        Success(data.message);
        setOpen(false);
      } catch (err) {
        Failed(err.response ? err.response.data.message : err.message);
        console.log(err.message)
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
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </TransitionChild>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <TransitionChild
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <DialogTitle
                    as='h3'
                    className='text-lg font-semibold leading-6 text-gray-900'
                  >
                    Apply for the job
                  </DialogTitle>
                  <form
                    className='w-full mt-2 flex flex-col gap-5'
                    onSubmit={handleSubmit}
                  >
                  

                    <div className='w-full flex gap-2 text-sm'>
                      <div className='w-1/2'>
                        <label className='text-gray-600 text-sm mb-1'>
                          Choose Resume
                        </label>
                        <input
                          type='file'
                          name='resume'
                          onChange={(e)=>{
                            setFieldValue('resume',e.target.files[0])
                          }}
                          required
                        />
                      </div>

        
                    </div>
                    <div className='mt-4'>
                      <CustomButton
                        type='submit'
                        containerStyles='inline-flex justify-center rounded-sm border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none '
                        title={"Apply"}
                      />
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
  const [job, setJob] = useState({});
  const {userInfo} = useSelector(state=>state.user);
  let { id } = useParams();
  useEffect(() => {
    const fetchJob = async (jobId) => {
      const res = await axios.get(`/api/user/candidate/job-detail/${jobId}`);
      console.log(res.data);
      setJob(res.data.result);
    };
    fetchJob(id)
  }, [open]);

  let buttonStat = false
  if(job&&job.applicants){
    buttonStat = job.applicants.includes(userInfo._id)
    console.log(buttonStat)
  }
  return (
    <>
      <NavBar />
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <h1 className="ml-4 text-2xl font-bold">{job.jobName}</h1>
          </div>
          <button 
            className="text-sm px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-400 disabled:bg-indigo-400"
            onClick={() => setOpen(true)}
            disabled={buttonStat}
            >
            Apply
          </button>
        </div>

        <div className="flex">
          <div className="w-3/4">
            {/* Description */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700">
                Stripe is looking for a Social Media Marketing expert to help
                manage our online networks. You will be responsible for
                monitoring our social media channels, creating content, finding
                effective ways to engage the community and incentivize others to
                engage on our channels.
              </p>
            </div>

            {/* Responsibilities */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Responsibilities</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>
                  Community engagement to ensure that is supported and actively
                  represented online
                </li>
                <li>
                  Focus on social media content development and publication
                </li>
                <li>Marketing and strategy support</li>
                <li>
                  Stay on top of trends on social media platforms, and suggest
                  content ideas to the team
                </li>
                <li>Engage with online communities</li>
              </ul>
            </div>

            {/* Nice-To-Haves */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Nice-To-Haves</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Fluent in English</li>
                <li>Project management skills</li>
                <li>Copy editing skills</li>
              </ul>
            </div>
          </div>
          <div className="w-1/4 flex-col">
            {/* About this Role */}
            <div className="flex-col justify-between items-start mb-6 border-l-black border-l-[1px] pl-5">
              <div>
                <h2 className="text-lg font-semibold mb-2">About this role</h2>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Apply Before:</strong> July 31, 2021
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Job Posted On:</strong> July 1, 2021
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Job Type:</strong> Full-Time
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Salary:</strong> $75k-$85k USD
                </p>
              </div>

              {/* Categories and Skills */}
              <div className="text-sm">
                <div className="mb-4">
                  <h2 className="font-semibold mb-2">Categories</h2>
                  <div className="flex space-x-2">
                    <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">
                      Marketing
                    </span>
                    <span className="bg-teal-200 text-teal-800 px-2 py-1 rounded-full">
                      Design
                    </span>
                  </div>
                </div>

                <div>
                  <h2 className="font-semibold mb-2">Required Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      Project Management
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Copywriting
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                      English
                    </span>
                    <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full">
                      Social Media Marketing
                    </span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full">
                      Copy Editing
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserForm open={open} setOpen={setOpen} jobId={job._id}/>
    </>
  );
};

export default ViewJobPage;
