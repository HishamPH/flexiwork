import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import { Failed } from "../../helper/popup";

import ApplicantProfileModal from "../recruiter/ApplicantProfileModal";

const TABLE_HEAD = ["Sl no.", "Member", "email", "Profile", "action"];

const RecruiterTable = () => {
  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        let res = await axios.get("/api/admin/fetch-recruiters");

        setUsers(res.data.users);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecruiters();
  }, [edit]);

  useEffect(() => {
    const results = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
    setCurrentPage(1);
  }, [searchTerm, users]);

  useEffect(() => {
    let results = users;
    if (statusFilter !== "All") {
      results = users.filter((user) => String(user.isBlocked) !== statusFilter);
    }
    setFilteredUsers(results);
    setCurrentPage(1);
  }, [statusFilter, users]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleBlock = async (userId, status) => {
    try {
      const action = status ? "unblock" : "block";

      Swal.fire({
        title: `Do you want to ${action} the user`,
        showCancelButton: true,
        confirmButtonText: "Yes",
        confirmButtonColor: "red",
      }).then(async (result) => {
        if (result.isConfirmed) {
          let res = await axios.post("/api/admin/block-user", {
            userId,
            action,
          });
          setEdit((prev) => !prev);

          Swal.fire("", "status changed", "success");
        }
      });
    } catch (err) {
      Failed(err.response ? err.response.data.message : err.message);
      console.log(err.message);
    }
  };

  const openProfileModal = async (user) => {
    console.log(user);
    setCurrentUser(user);
    setProfileOpen(true);
  };

  return (
    <>
      <div className="p-10">
        <Card className="h-full">
          <CardBody className="px-0">
            <div className="flex justify-between items-center mb-4 px-4">
              <div className="w-1/4">
                <Input
                  type="text"
                  placeholder="Search applicants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-1/4"
                />
              </div>

              <div className="w-1/4 border-red-600">
                <Select
                  value={statusFilter}
                  onChange={(value) => setStatusFilter(value)}
                  menuProps={{
                    className: "text-white bg-gray-700 rounded-sm font-bold",
                  }}
                  containerProps={{ className: " rounded-0 font-bold" }}
                  labelProps={{ className: "text-red-300" }}
                  className=""
                >
                  <Option value="All">All</Option>
                  <Option value="false">Blocked</Option>
                  <Option value="true">Open</Option>
                </Select>
              </div>
            </div>
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-100"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItems.map((user, index) => {
                  const { name, email, isBlocked, role, _id, profilePic } =
                    user;
                  const isLast = index === currentItems.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={_id}>
                      <td className={classes}>{index + 1}</td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={`/api/images/${profilePic}`}
                            alt={name}
                            size="sm"
                          />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {name}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {email}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {role}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Button
                          onClick={() => openProfileModal(user)}
                          variant="outlined"
                          className="rounded-sm"
                        >
                          View Profile
                        </Button>
                      </td>
                      <td className={classes}>
                        {!isBlocked ? (
                          <button
                            onClick={() => handleBlock(_id, isBlocked)}
                            className="bg-red-800 text-white px-3 py-1 rounded-sm hover:bg-red-400"
                          >
                            block
                          </button>
                        ) : (
                          <button
                            onClick={() => handleBlock(_id, isBlocked)}
                            className="bg-green-800 text-white px-3 py-1 rounded-sm hover:bg-green-400"
                          >
                            unblock
                          </button>
                        )}
                      </td>
                      {/* <td className={classes}>
                          <Tooltip content="Edit User">
                            <IconButton variant="text">
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              Page {currentPage} of{" "}
              {Math.ceil(filteredUsers.length / itemsPerPage)}
            </Typography>
            <div className="flex gap-2">
              <Button
                variant="outlined"
                size="sm"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                size="sm"
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(filteredUsers.length / itemsPerPage)
                }
              >
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      <ApplicantProfileModal
        open={profileOpen}
        setOpen={setProfileOpen}
        user={currentUser}
      />
    </>
  );
};

export default RecruiterTable;
