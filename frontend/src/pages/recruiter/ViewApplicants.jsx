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
import RecruiterLayout from "../../Layouts/RecruiterLayout";
import JobModal from "../../components/recruiter/JobModal";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const TABLE_HEAD = [
  "JobName",
  "status",
  "post Date",
  "Due Date",
  "action",
  "edit",
];

const ViewApplicants = () => {
  const [applicants,setApplicants] = useState([]);
  let {id} = useParams(); 
  useEffect(()=>{
    const fetchApplicants = async(jobId)=>{
      const res = await axios.get(`/api/user/recruiter/get-applicants/${jobId}`);
      console.log(res.data.result);
      setApplicants(res.data.result.applicants);
    }
    fetchApplicants(id)
  },[])


  return (
    <div>
      
        
        <Card className="h-auto">
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
                {applicants.map(
                  (
                    { _id,name,isBlocked },
                    index
                  ) => {
                    const isLast = index === applicants.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={_id}>
                        <td className={classes}>
                          <Typography
                            variant="large"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
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
                          <button className="bg-red-800 text-white px-3 py-1 rounded-sm hover:bg-red-400">
                            block
                          </button>
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
                  }
                )}
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
        {/* <JobModal open={open} setOpen={setOpen} /> */}
      
    </div>
  )
}

export default ViewApplicants