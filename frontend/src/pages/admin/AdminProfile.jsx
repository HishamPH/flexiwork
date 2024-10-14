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
import axiosInstance from "../../../interceptors/axiosInterceptors";
import { setAdmin } from "../../redux/slices/adminAuth";
import { Success } from "../../helper/popup";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const AdminProfile = () => {
  const { adminInfo } = useSelector((state) => state.admin);
  const [edit, setEdit] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(`/api/images/user.png`);

  const initialValues = {
    email: adminInfo?.email ?? "",
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
      rest._id = adminInfo._id;

      try {
        Success("submitted");
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
    <div className="m-5">
      <div className="containerflex shadow-lg mx-auto ">
        <div className="w-full bg-white shadow-lg p-10 pb-20 rounded-sm">
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
                  src={`/api/images/user.png`}
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
                  </div>
                </CardBody>
              </Card>

              {/* <Card className="mb-6">
                <CardBody>
                  <Typography variant="h4" className="mb-4 text-blue-500">
                    Company Details
                  </Typography>
                </CardBody>
              </Card> */}
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

export default AdminProfile;
