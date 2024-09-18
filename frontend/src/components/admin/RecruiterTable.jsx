import { useState, useEffect } from "react";
import axios from "axios";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import { Failed, Success } from "../../helper/popup";

const TABLE_HEAD = ["Member", "Function", "Status", "action", ""];
import { Table } from "./Table";

const RecruiterTable = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        let res = await axios.get("/api/admin/fetch-recruiters");
        // users = res.data.users;
        //console.log(res.data.users);
        setUsers(res.data.users);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecruiters();
  }, [users]);
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
          console.log(res);
          Swal.fire("", "status changed", "success");
        }
      });
    } catch (err) {
      Failed(err.response ? err.response.data.message : err.message);
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="p-10">
        <Card className="h-full">
          <CardBody className="px-0">
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
                {users.map(({ name, email, isBlocked, role, _id }, index) => {
                  const isLast = index === users.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={_id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar alt={name} size="sm" />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {name}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {email}
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
                            {role}
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
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={isBlocked ? "online" : "offline"}
                            color={isBlocked ? "green" : "blue-gray"}
                          />
                        </div>
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
                      <td className={classes}>
                        <Tooltip content="Edit User">
                          <IconButton variant="text">
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
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
              Page 1 of 10
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" size="sm">
                Previous
              </Button>
              <Button variant="outlined" size="sm">
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default RecruiterTable;
