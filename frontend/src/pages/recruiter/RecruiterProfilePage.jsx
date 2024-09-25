import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import {
  Button,
  IconButton,
  Tooltip,
  Card,
  CardBody,
  Typography,
  Input,
  Avatar,
} from "@material-tailwind/react";
import { PencilIcon, CloudArrowUpIcon } from "@heroicons/react/24/solid";
import { TextField } from "@mui/material";

import { Success, Failed } from "../../helper/popup";
import { setUser } from "../../redux/slices/userAuth";
import axiosInstance from "../../../interceptors/axiosInterceptors";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const RecruiterProfilePage = () => {
  const { userInfo } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [edit, setEdit] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const dispatch = useDispatch();

  // const renderCountRef = useRef(0);
  // useEffect(() => {
  //   renderCountRef.current += 1;
  // });
  // console.log(renderCountRef.current);

  useEffect(() => {
    const fetchUser = async (userId) => {
      try {
        let res = await axiosInstance.get(`/user/get-user/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        let data = res.data;
        setProfile(data);
        setPreviewUrl(`/api/images/${data.profilePic}`);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser(userInfo._id);
    return () => console.log("profile page unmounted");
  }, [edit]);

  const initialValues = {
    name: profile?.name ?? "",
    contact: profile?.contact ?? "",
    location: profile?.location ?? "",
    profilePic: profile?.profilePic ?? null,
    email: profile?.email ?? "",
    about: profile?.about ?? "",
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
    onSubmit: async (values, action) => {
      const { ...rest } = values;
      rest._id = userInfo._id;

      try {
        const res = await axiosInstance.post("/user/update-profile", rest, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const data = res.data;
        dispatch(setUser({ ...userInfo, ...data }));

        Success(data.message);
        setEdit((prev) => !prev);

        action.resetForm();
      } catch (err) {
        Failed(err.response ? err.response.data.message : err.message);
        console.log(err.message);
      } finally {
        action.setSubmitting(false);
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setFieldValue("profilePic", file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setFieldValue("profilePic", file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="">
      <div className="containerflex shadow-lg mx-auto ">
        <div className="w-full bg-white shadow-lg p-10 pb-20 rounded-lg">
          <div className={`flex justify-end ${edit ? "invisible" : ""}`}>
            <div>
              <Tooltip content="Edit Profile">
                <IconButton
                  variant="text"
                  className="bg-blue-gray-100"
                  onClick={() => setEdit((prev) => !prev)}
                >
                  <PencilIcon className="h-4 w-4" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <div className="">
            <div className="flex justify-between">
              {edit ? (
                <div
                  className={`relative mb-6 border-2 border-dashed rounded-full text-center ${"border-blue-gray-200"}`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="mx-auto max-h-40 max-w-40 rounded-full object-cover"
                  />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              ) : (
                <Avatar
                  src={`/api/images/${profile.profilePic}`}
                  alt="avatar"
                  className="w-40 h-40 mb-6"
                />
              )}
            </div>

            <form action="" onSubmit={handleSubmit}>
              <Card className="mb-6 shadow-md bg-gray-50 rounded-md">
                <CardBody>
                  <Typography variant="h4" className="mb-4 text-indigo-800">
                    Personal Information
                  </Typography>
                  <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                    <TextField
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      disabled={true}
                      slotProps={{
                        input: {
                          readOnly: true,
                        },
                      }}
                      className="text-black disabled:text-black"
                    />
                    <div className="invisible">
                      <TextField
                        id="filled-read-only-input"
                        name="email"
                        label="email"
                        value={values.email}
                        onChange={handleChange}
                        variant="filled"
                        slotProps={{
                          input: {
                            readOnly: true,
                          },
                        }}
                        className="invisibile"
                      />
                    </div>

                    <TextField
                      required
                      name="name"
                      id="outlined-read-only-input"
                      label="Name"
                      value={values.name}
                      onChange={handleChange}
                      className="border-lime-100"
                      slotProps={{
                        input: {
                          readOnly: !edit,
                        },
                      }}
                    />
                    <TextField
                      id="filled-read-only-input"
                      label="Location"
                      name="location"
                      value={values.location}
                      onChange={handleChange}
                      slotProps={{
                        input: {
                          readOnly: !edit,
                        },
                      }}
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="Contact"
                      name="contact"
                      value={values.contact}
                      onChange={handleChange}
                      className="border-lime-100"
                      type="number"
                      slotProps={{
                        input: {
                          readOnly: !edit,
                        },
                      }}
                    />
                    <div className="invisible">
                      <TextField
                        id="filled-read-only-input"
                        name="email"
                        label="email"
                        variant="filled"
                        className="invisibile"
                      />
                    </div>
                    <TextField
                      name="about"
                      value={values.about}
                      onChange={handleChange}
                      fullWidth
                      label="About"
                      variant="outlined"
                      type="text"
                      className="col-span-2"
                      multiline
                      rows={4}
                      slotProps={{
                        input: {
                          readOnly: !edit,
                        },
                      }}
                    />
                  </div>
                </CardBody>
              </Card>

              <Card className="mb-6">
                <CardBody>
                  <Typography variant="h4" className="mb-4 text-blue-500">
                    Company Details
                  </Typography>
                </CardBody>
              </Card>
              {edit && (
                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex justify-center">
                      <div className="h-5 w-5 animate-spin rounded-full border-4 border-solid border-white border-t-transparent my-0"></div>
                    </div>
                  ) : (
                    "Save Profile"
                  )}
                </Button>
              )}
            </form>
          </div>

          <hr />
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfilePage;
