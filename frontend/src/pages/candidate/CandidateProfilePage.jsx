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
import TextField from "@mui/material/TextField";

import NavBar from "../../components/NavBar";
import { Success, Failed } from "../../helper/popup";
import { setUser } from "../../redux/slices/userAuth";
import axiosInstance from "../../../interceptors/axiosInterceptors";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const CandidateProfilePage = () => {
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
    education: profile?.education ?? [],
    email: profile?.email ?? "",
    about: profile?.about ?? "",
    workExperience: profile?.workExperience ?? [],
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
      setLoading(true);
      const { ...rest } = values;

      rest._id = userInfo._id;
      console.log(rest);
      try {
        //await delay(3000);
        const res = await axiosInstance.post("/user/update-profile", rest, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(res.data);
        const data = res.data;
        dispatch(setUser({ ...userInfo, ...data }));
        action.resetForm();
        Success(data.message);
        setEdit((prev) => !prev);
        setLoading(false);
      } catch (err) {
        Failed(err.response ? err.response.data.message : err.message);
        console.log(err.message);
      } finally {
        action.setSubmitting(false);
      }
    },
  });

  const addEducation = () => {
    setFieldValue("education", [
      ...values.education,
      { college: "", degree: "", from: "", to: "" },
    ]);
  };

  const updateEducation = (index, field, value) => {
    // const newEducation = [...values.education];
    // newEducation[index][field] = value;
    // setFieldValue("education", newEducation);
    setFieldValue(`education[${index}].${field}`, value);
  };

  const removeEducation = (index) => {
    const newEducation = values.education.filter(
      (_, eduIndex) => eduIndex !== index
    );
    setFieldValue("education", newEducation);
  };

  const addWork = () => {
    setFieldValue("workExperience", [
      ...values.workExperience,
      { company: "", position: "", from: "", to: "" },
    ]);
  };

  const updateWork = (index, field, value) => {
    setFieldValue(`workExperience[${index}].${field}`, value);
  };

  const removeWork = (index) => {
    const newWork = values.workExperience.filter(
      (_, workIndex) => workIndex !== index
    );
    setFieldValue("workExperience", newWork);
  };

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
      <div className="container w-3/4 flex shadow-lg mx-auto mt-10">
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
              <Card className="mb-6">
                <CardBody>
                  <Typography variant="h4" className="mb-4 text-indigo-800">
                    Personal Information
                  </Typography>
                  <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                    <div className="col-span-2">
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
                        className="text-black disabled:text-black w-full"
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
                    Education
                  </Typography>
                  {values.education.map((edu, index) => (
                    <div
                      key={index}
                      className="mb-4 border p-4 rounded-md bg-gray-50 shadow-sm"
                    >
                      <div className="grid gap-2 lg:grid-cols-3">
                        <Input
                          label="Institution"
                          name="college"
                          value={edu.college}
                          onChange={(e) =>
                            updateEducation(index, "college", e.target.value)
                          }
                          readOnly={!edit}
                        />
                        <Input
                          label="Degree"
                          name="degree"
                          value={edu.degree}
                          onChange={(e) =>
                            updateEducation(index, "degree", e.target.value)
                          }
                          readOnly={!edit}
                        />
                        <Input
                          name="from"
                          label="Start Date"
                          placeholder=""
                          type="date"
                          value={edu.from?.slice(0, 10)}
                          onChange={(e) =>
                            updateEducation(index, "from", e.target.value)
                          }
                          readOnly={!edit}
                        />
                        <Input
                          name="to"
                          label="End Date"
                          placeholder=""
                          type="date"
                          value={edu.to?.slice(0, 10)}
                          onChange={(e) =>
                            updateEducation(index, "to", e.target.value)
                          }
                          readOnly={!edit}
                        />
                      </div>
                      {edit && (
                        <Button
                          variant="outlined"
                          color="red"
                          size="sm"
                          className="mt-2"
                          onClick={() => removeEducation(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  {edit && (
                    <Button color="blue" onClick={addEducation}>
                      Add Education
                    </Button>
                  )}
                </CardBody>
              </Card>

              <Card className="mb-6">
                <CardBody>
                  <Typography variant="h4" className="mb-4 text-blue-500">
                    Work Experience
                  </Typography>
                  {values?.workExperience.map((work, index) => (
                    <div
                      key={index}
                      className="mb-4 border p-4 rounded-md bg-gray-50 shadow-sm"
                    >
                      <div className="grid gap-2 lg:grid-cols-3">
                        <Input
                          label="Company"
                          name="company"
                          value={work.company}
                          onChange={(e) =>
                            updateWork(index, "company", e.target.value)
                          }
                          readOnly={!edit}
                        />
                        <Input
                          label="Position"
                          name="position"
                          value={work.position}
                          onChange={(e) =>
                            updateWork(index, "position", e.target.value)
                          }
                          readOnly={!edit}
                        />
                        <Input
                          name="from"
                          label="Start Date"
                          placeholder=""
                          type="date"
                          value={work.from?.slice(0, 10)}
                          onChange={(e) =>
                            updateWork(index, "from", e.target.value)
                          }
                          readOnly={!edit}
                        />
                        <Input
                          name="to"
                          label="End Date"
                          placeholder=""
                          type="date"
                          value={work.to?.slice(0, 10)}
                          onChange={(e) =>
                            updateWork(index, "to", e.target.value)
                          }
                          readOnly={!edit}
                        />
                      </div>
                      {edit && (
                        <Button
                          variant="outlined"
                          color="red"
                          size="sm"
                          className="mt-2"
                          onClick={() => removeWork(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  {edit && (
                    <Button color="blue" onClick={addWork}>
                      Add Experience
                    </Button>
                  )}
                </CardBody>
              </Card>

              {edit && (
                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
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

export default CandidateProfilePage;
