import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import CustomButton from "../../components/CustomButton";
import TextInput from "../../components/TextInput";

import NavBar from "../../components/NavBar";
import { useFormik } from "formik";
import axios from "axios";
import { Success, Failed } from "../../helper/popup";
import { setUser } from "../../redux/slices/userAuth";

const UserForm = ({ open, setOpen }) => {
  const { userInfo } = useSelector((state) => state.user);
  const initialValues = {
    name: userInfo.name ?? "",
    contact: userInfo.contact ?? "",
    location: userInfo.location ?? "",
    profilePic: userInfo.profilePic ?? null,
    education: userInfo.education ?? "",
  };
  const dispatch = useDispatch();
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
      rest._id = userInfo._id;
      try {
        const res = await axios.post("/api/user/update-profile", rest, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(res.data);
        const data = res.data;
        dispatch(setUser({ ...userInfo, ...data }));
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
                      Edit Profile
                    </DialogTitle>
                    <form
                      className="w-full mt-2 flex flex-col gap-5"
                      onSubmit={handleSubmit}
                    >
                      <div className="w-full flex gap-2">
                        <div className="w-1/2">
                          <TextInput
                            name="name"
                            label="Name"
                            placeholder="Enter your name"
                            type="text"
                            value={values.name}
                            onChange={handleChange}
                            //   register={register("firstName", {
                            //     required: "First Name is required",
                            //   })}
                            //   error={
                            //     errors.firstName ? errors.firstName?.message : ""
                            //   }
                          />
                        </div>
                        <div className="w-1/2 hidden">
                          {/* <TextInput
                          name='lastName'
                          label='Last Name'
                          placeholder='Wagonner'
                          type='text'
                        //   register={register("lastName", {
                        //     required: "Last Name is required",
                        //   })}
                        //   error={
                        //     errors.lastName ? errors.lastName?.message : ""
                        //   }
                        /> */}
                        </div>
                      </div>

                      <div className="w-full flex gap-2">
                        <div className="w-1/2">
                          <TextInput
                            name="contact"
                            label="Contact"
                            placeholder="Phone Number"
                            type="number"
                            value={values.contact}
                            onChange={handleChange}
                            //   register={register("contact", {
                            //     required: "Coontact is required!",
                            //   })}
                            //   error={errors.contact ? errors.contact?.message : ""}
                          />
                        </div>

                        <div className="w-1/2">
                          <TextInput
                            name="location"
                            label="Location"
                            placeholder="Location"
                            type="text"
                            value={values.location}
                            onChange={handleChange}
                            //   register={register("location", {
                            //     required: "Location is required",
                            //   })}
                            //   error={
                            //     errors.location ? errors.location?.message : ""
                            //   }
                          />
                        </div>
                      </div>

                      <div className="w-full flex gap-2 text-sm">
                        <div className="w-1/2">
                          <label className="text-gray-600 text-sm mb-1">
                            Profile Picture
                          </label>
                          <input
                            type="file"
                            name="profilePic"
                            onChange={(e) => {
                              setFieldValue("profilePic", e.target.files[0]);
                            }}
                            //   onChange={(e) => setProfileImage(e.target.files[0])}
                          />
                        </div>

                        {/* <div className='w-1/2'>
                        <label className='text-gray-600 text-sm mb-1'>
                          Resume
                        </label>
                        <input
                          type='file'
                        //   onChange={(e) => setUploadCv(e.target.files[0])}
                        />
                      </div> */}
                      </div>

                      <div className="flex flex-col">
                        <label className="text-gray-600 text-sm mb-1">
                          Education
                        </label>
                        <textarea
                          className="ounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 resize-none"
                          rows={4}
                          cols={6}
                          value={values.education}
                          name="education"
                          onChange={handleChange}
                        ></textarea>
                      </div>

                      <div className="mt-4">
                        <CustomButton
                          type="submit"
                          containerStyles="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none "
                          title={"Submit"}
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

const CandidateProfilePage = () => {
  const [profile, setProfile] = useState({});
  const { userInfo } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  // useEffect(()=>{
  //   const fetchUser = async(userId)=>{
  //     try {
  //       let res = await axios.get(`/api/user/get-user/${userId}`,{
  //         headers:{
  //           "Content-Type":"application/json",
  //         },
  //       })
  //       let data = res.data;

  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   fetchUser(userInfo._id);
  // },[])
  return (
    <div className="">
      <NavBar />
      <div className="container w-full justify-end shadow-lg mx-auto mt-10">
        <div className="w-full bg-white shadow-lg p-10 pb-20 rounded-lg">
          <div className="flex flex-col items-center justify-center mb-4">
            <h1 className="text-4xl font-semibold text-slate-600">
              {userInfo?.name}
            </h1>

            <h5 className="text-blue-700 text-base font-bold">
              {userInfo?.role || "Add Job Title"}
            </h5>

            <div className="w-full flex flex-wrap lg:flex-row justify-between mt-8 text-sm">
              <p className="flex gap-1 items-center justify-center  px-3 py-1 text-slate-600 rounded-full">
                <HiLocationMarker /> {userInfo?.email ?? "No Location"}
              </p>
              <p className="flex gap-1 items-center justify-center  px-3 py-1 text-slate-600 rounded-full">
                <AiOutlineMail /> {userInfo?.email ?? "No Email"}
              </p>
              <p className="flex gap-1 items-center justify-center  px-3 py-1 text-slate-600 rounded-full">
                <FiPhoneCall /> {userInfo?.email ?? "No Contact"}
              </p>
            </div>
          </div>

          <hr />

          <div className="w-full py-10">
            <div className="w-full flex flex-col-reverse md:flex-row gap-8 py-6">
              <div className="w-full md:w-2/3 flex flex-col gap-4 text-lg text-slate-600 mt-20 md:mt-0">
                <p className="text-[#0536e7]  font-semibold text-2xl">
                  EDUCATION
                </p>
                <span className="text-base text-justify leading-7">
                  {userInfo?.education ?? "No Education Found"}
                </span>
              </div>

              <div className="w-auto h-44 bg-black">
                <img
                  src={`/api/images/user.png`}
                  alt={userInfo?.role}
                  className="w-48 h-48 object-contain rounded-lg"
                />
                <button
                  className="w-auto bg-blue-600 text-white mt-4 p-2 rounded"
                  onClick={() => setOpen(true)}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        <UserForm open={open} setOpen={setOpen} user={profile} />
      </div>
    </div>
  );
};

export default CandidateProfilePage;
