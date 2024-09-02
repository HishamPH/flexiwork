// // import React from 'react';

// // const Hello = () => {
// //   return (
// //     <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
// //       <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 h-24"></div>
// //       <div className="px-6 py-4">
// //         <div className="flex items-center">
// //           <img className="w-24 h-24 rounded-full border-4 border-white -mt-16" src={`/api/images/user.png`} alt="Profile" />
// //           <div className="ml-4 flex-grow">
// //             <h2 className="text-2xl font-bold text-gray-800">Jake Gyll</h2>
// //             <p className="text-gray-600">Product Designer at Twitter</p>
// //             <p className="text-gray-500 text-sm">Manchester, UK</p>
// //           </div>
// //           <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm">Edit Profile</button>
// //         </div>
// //         <div className="mt-4">
// //           <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">OPEN FOR OPPORTUNITIES</span>
// //         </div>
// //         <div className="mt-6">
// //           <h3 className="text-xl font-semibold text-gray-800">About Me</h3>
// //           <p className="mt-2 text-gray-600">
// //             I'm a product designer + filmmaker currently working remotely at Twitter from beautiful Manchester, United Kingdom. I'm passionate about designing digital products that have a positive impact on the world.
// //           </p>
// //           <p className="mt-2 text-gray-600">
// //             For 10 years, I've specialised in interface, experience & interaction design as well as working in user research and product strategy for product agencies, big tech companies & start-ups.
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Hello;

// import React from 'react';

// const Hello = () => {
//   const jobs = [
//     { role: 'Social Media Assistant', status: 'Live', datePosted: '20 May 2020', dueDate: '24 May 2020', jobType: 'Fulltime', applicants: 19, needs: '4 / 11' },
//     { role: 'Senior Designer', status: 'Live', datePosted: '16 May 2020', dueDate: '24 May 2020', jobType: 'Fulltime', applicants: 1234, needs: '0 / 20' },
//     { role: 'Visual Designer', status: 'Live', datePosted: '15 May 2020', dueDate: '24 May 2020', jobType: 'Freelance', applicants: 2435, needs: '1 / 5' },
//     { role: 'Data Sience', status: 'Closed', datePosted: '13 May 2020', dueDate: '24 May 2020', jobType: 'Freelance', applicants: 6234, needs: '10 / 10' },
//     { role: 'Kotlin Developer', status: 'Closed', datePosted: '12 May 2020', dueDate: '24 May 2020', jobType: 'Fulltime', applicants: 12, needs: '20 / 20' },
//     { role: 'React Developer', status: 'Closed', datePosted: '11 May 2020', dueDate: '24 May 2020', jobType: 'Fulltime', applicants: 14, needs: '10 / 10' },
//   ];

//   const StatusBadge = ({ status }) => (
//     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//       status === 'Live' ? 'bg-teal-100 text-teal-800' : 'bg-red-100 text-red-800'
//     }`}>
//       {status}
//     </span>
//   );

//   const JobTypeBadge = ({ type }) => (
//     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//       type === 'Fulltime' ? 'bg-purple-100 text-purple-800' : 'bg-yellow-100 text-yellow-800'
//     }`}>
//       {type}
//     </span>
//   );

//   return (
//     <div className="container mx-auto p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Job List</h1>
//         <button className="px-4 py-2 bg-gray-200 rounded-md">Filters</button>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roles</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Posted</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Type</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Needs</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {jobs.map((job, index) => (
//               <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.role}</td>
//                 <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={job.status} /></td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.datePosted}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.dueDate}</td>
//                 <td className="px-6 py-4 whitespace-nowrap"><JobTypeBadge type={job.jobType} /></td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.applicants}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.needs}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <button className="text-indigo-600 hover:text-indigo-900">...</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="flex items-center justify-between mt-4">
//         <div className="flex items-center">
//           <span className="mr-2">View</span>
//           <select className="border rounded px-2 py-1">
//             <option>10</option>
//           </select>
//           <span className="ml-2">Applicants per page</span>
//         </div>
//         <div className="flex items-center">
//           <button className="px-2 py-1 border rounded mr-1">&lt;</button>
//           <button className="px-3 py-1 bg-indigo-600 text-white rounded mr-1">1</button>
//           <button className="px-2 py-1 border rounded mr-1">2</button>
//           <button className="px-2 py-1 border rounded">&gt;</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hello;

// import React from "react";

// function Hello() {
//   return (
//     <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center">

//           <h1 className="ml-4 text-2xl font-bold">Social Media Assistant</h1>
//         </div>
//         <button className="text-sm px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-400">
//           Edit Job Details
//         </button>
//       </div>

//       <div className="flex">
//         <div className="w-3/4">
//           {/* Description */}
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold mb-2">Description</h2>
//             <p className="text-gray-700">
//               Stripe is looking for a Social Media Marketing expert to help
//               manage our online networks. You will be responsible for monitoring
//               our social media channels, creating content, finding effective
//               ways to engage the community and incentivize others to engage on
//               our channels.
//             </p>
//           </div>

//           {/* Responsibilities */}
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold mb-2">Responsibilities</h2>
//             <ul className="list-disc pl-5 text-gray-700 space-y-2">
//               <li>
//                 Community engagement to ensure that is supported and actively
//                 represented online
//               </li>
//               <li>Focus on social media content development and publication</li>
//               <li>Marketing and strategy support</li>
//               <li>
//                 Stay on top of trends on social media platforms, and suggest
//                 content ideas to the team
//               </li>
//               <li>Engage with online communities</li>
//             </ul>
//           </div>

//           {/* Nice-To-Haves */}
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold mb-2">Nice-To-Haves</h2>
//             <ul className="list-disc pl-5 text-gray-700 space-y-2">
//               <li>Fluent in English</li>
//               <li>Project management skills</li>
//               <li>Copy editing skills</li>
//             </ul>
//           </div>
//         </div>
//         <div className="w-1/4 flex-col">
//           {/* About this Role */}
//           <div className="flex-col justify-between items-start mb-6 border-l-black border-l-[1px] pl-5">
//             <div>
//               <h2 className="text-lg font-semibold mb-2">About this role</h2>
//               <p className="text-sm text-gray-700 mb-1">
//                 <strong>Apply Before:</strong> July 31, 2021
//               </p>
//               <p className="text-sm text-gray-700 mb-1">
//                 <strong>Job Posted On:</strong> July 1, 2021
//               </p>
//               <p className="text-sm text-gray-700 mb-1">
//                 <strong>Job Type:</strong> Full-Time
//               </p>
//               <p className="text-sm text-gray-700 mb-1">
//                 <strong>Salary:</strong> $75k-$85k USD
//               </p>
//             </div>

//             {/* Categories and Skills */}
//             <div className="text-sm">
//               <div className="mb-4">
//                 <h2 className="font-semibold mb-2">Categories</h2>
//                 <div className="flex space-x-2">
//                   <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">
//                     Marketing
//                   </span>
//                   <span className="bg-teal-200 text-teal-800 px-2 py-1 rounded-full">
//                     Design
//                   </span>
//                 </div>
//               </div>

//               <div>
//                 <h2 className="font-semibold mb-2">Required Skills</h2>
//                 <div className="flex flex-wrap gap-2">
//                   <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
//                     Project Management
//                   </span>
//                   <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
//                     Copywriting
//                   </span>
//                   <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
//                     English
//                   </span>
//                   <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full">
//                     Social Media Marketing
//                   </span>
//                   <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full">
//                     Copy Editing
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Hello;

// import {
//   Card,
//   Typography,
//   List,
//   ListItem,
//   ListItemPrefix,
//   ListItemSuffix,
//   Chip,
// } from "@material-tailwind/react";
// import {
//   PresentationChartBarIcon,
//   ShoppingBagIcon,
//   UserCircleIcon,
//   Cog6ToothIcon,
//   InboxIcon,
//   PowerIcon,
// } from "@heroicons/react/24/solid";
// import NavBar from "../components/NavBar";
// import { useState } from "react";

// export default function Hello() {
//   const [isOpen, setIsOpen] = useState(true);
//   return (
//     <>
//     <NavBar />
//       <Card className="h-[calc(100vh-2rem)] w-full max-w-[16rem] p-2 shadow-xl shadow-blue-gray-900/5">
//         <div className="mb-2 p-2 flex justify-between">
//           <Typography variant="h5" color="blue-gray">
//             Sidebar
//           </Typography>
//           <button onClick={() => setIsOpen(!isOpen)}>Hello</button>
//         </div>
//         <List>
//           <ListItem>
//             <ListItemPrefix>
//               <PresentationChartBarIcon className="h-5 w-5" />
//             </ListItemPrefix>
//             Dashboard
//           </ListItem>
//           <ListItem>
//             <ListItemPrefix>
//               <ShoppingBagIcon className="h-5 w-5" />
//             </ListItemPrefix>
//             E-Commerce
//           </ListItem>
//           <ListItem>
//             <ListItemPrefix>
//               <InboxIcon className="h-5 w-5" />
//             </ListItemPrefix>
//             Inbox
//             <ListItemSuffix>
//               <Chip
//                 value="14"
//                 size="sm"
//                 variant="ghost"
//                 color="blue-gray"
//                 className="rounded-full"
//               />
//             </ListItemSuffix>
//           </ListItem>
//           <ListItem>
//             <ListItemPrefix>
//               <UserCircleIcon className="h-5 w-5" />
//             </ListItemPrefix>
//             Profile
//           </ListItem>
//           <ListItem>
//             <ListItemPrefix>
//               <Cog6ToothIcon className="h-5 w-5" />
//             </ListItemPrefix>
//             Settings
//           </ListItem>
//           <ListItem>
//             <ListItemPrefix>
//               <PowerIcon className="h-5 w-5" />
//             </ListItemPrefix>
//             Log Out
//           </ListItem>
//         </List>
//       </Card>
//     </>
//   );
// }

// import { useState } from "react";

// import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

// export default function Hello() {
//   let [open, setOpen] = useState(true);
//   return (
//     <>

//       <Sidebar collapsed={open} className="rounded-md h-full flex-col justify-center">
//       <button onClick={() => setOpen(!open)}>Hello</button>
//         <List className="rounded-md">
//           <ListItem>
//             <ListItemPrefix>
//               <PresentationChartBarIcon className="h-5 w-5" />
//             </ListItemPrefix>
//             Dashboard
//           </ListItem>
//           <ListItem>
//             <ListItemPrefix>
//               <ShoppingBagIcon className="h-5 w-5" />
//             </ListItemPrefix>
//             E-Commerce
//           </ListItem>
//           <ListItem>
//             <ListItemPrefix>
//               <InboxIcon className="h-5 w-5" />
//             </ListItemPrefix>
//             Inbox
//             <ListItemSuffix>
//               <Chip
//                 value="14"
//                 size="sm"
//                 variant="ghost"
//                 color="blue-gray"
//                 className="rounded-full"
//               />
//             </ListItemSuffix>
//           </ListItem>
//           <ListItem>
//             <ListItemPrefix>
//               <UserCircleIcon className="h-5 w-5" />
//             </ListItemPrefix>
//             Profile
//           </ListItem>
//           <ListItem>
//             <ListItemPrefix>
//               <Cog6ToothIcon className="h-5 w-5" />
//             </ListItemPrefix>
//             Settings
//           </ListItem>
//           <ListItem>
//             <ListItemPrefix>
//               <PowerIcon className="h-5 w-5" />
//             </ListItemPrefix>
//             Log Out
//           </ListItem>
//         </List>
//       </Sidebar>
//     </>
//   );
// }

//======================================================================================================================

import {useState} from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import NavBar from "../components/NavBar";

export default function Hello() {
  const [open, setOpen] = useState(0);
  const [openAlert, setOpenAlert] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
    <NavBar />
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2 md:hidden" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2 md:hidden" />
        )}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer} className="w-62 md:hidden" overlay={false}>
        <Card
          color="transparent"
          shadow={false}
          className="h-auto w-full p-1"
        >

          <List>
            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Inbox
              <ListItemSuffix>
                <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Profile
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Settings
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
          
        </Card>
      </Drawer>
      <div className="hidden md:block w-64"> {/* Hidden on small screens, visible on medium and up */}
        <Card
          color="white"
          shadow={true}
          className="h-auto p-1 left-0"
        >
          <List>
            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Inbox
              <ListItemSuffix>
                <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Profile
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Settings
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        </Card>
      </div>
    </>
  );
}

//=======================================================================================================================

// import React, { useState } from "react";
// import {
//   List,
//   ListItem,
//   ListItemPrefix,
//   ListItemSuffix,
//   Typography,
//   Chip,
// } from "@material-tailwind/react";
// import {
//   PresentationChartBarIcon,
//   ShoppingBagIcon,
//   InboxIcon,
//   UserCircleIcon,
//   Cog6ToothIcon,
//   PowerIcon,
//   Bars3Icon,
// } from "@heroicons/react/24/outline";
// import NavBar from "../components/NavBar";


// export default function Hello() {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <>
//     <NavBar />
//       <div
//         className={`left-0 top-0 ${
//           isOpen ? "w-[16rem]" : "w-[4rem]" // Adjust the height here
//         } h-full  transition-all duration-300 bg-white shadow-xl shadow-blue-gray-900/5`}
//       >
//         <div className="p-2 flex justify-between items-center">
//           <Typography
//             variant="h5"
//             color="blue-gray"
//             className={`${isOpen ? "" : "hidden"}`}
//           >
//             Sidebar
//           </Typography>
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="p-2 rounded-md hover:bg-blue-gray-100"
//           >
//             <Bars3Icon className="h-6 w-6 text-blue-gray-700" />
//           </button>
//         </div>
//         <List className="w-auto">
//           <ListItem>
//             <ListItemPrefix>
//               <PresentationChartBarIcon className="h-5 w-5" />
//             </ListItemPrefix>
//             {isOpen && "Dashboard"}
//           </ListItem>
//           <ListItem>
//             <ListItemPrefix>
//               <ShoppingBagIcon className="h-5 w-5" />
//             </ListItemPrefix>
//             {isOpen && "E-Commerce"}
//           </ListItem>
//           <ListItem>
//             <ListItemPrefix>
//               <InboxIcon className="h-5 w-5" />
//             </ListItemPrefix>
//             {isOpen && (
//               <>
//                 Inbox
//                 <ListItemSuffix>
//                   <Chip
//                     value="14"
//                     size="sm"
//                     variant="ghost"
//                     color="blue-gray"
//                     className="rounded-full"
//                   />
//                 </ListItemSuffix>
//               </>
//             )}
//           </ListItem>
//           <ListItem>
//             <ListItemPrefix>
//               <UserCircleIcon className="h-5 w-5" />
//             </ListItemPrefix>
//             {isOpen && "Profile"}
//           </ListItem>
//           <ListItem>
//             <ListItemPrefix>
//               <Cog6ToothIcon className="h-5 w-5" />
//             </ListItemPrefix>
//             {isOpen && "Settings"}
//           </ListItem>
//           <ListItem>
//             <ListItemPrefix>
//               <PowerIcon className="h-5 w-5" />
//             </ListItemPrefix>
//             {isOpen && "Log Out"}
//           </ListItem>
//         </List>
//       </div>
//     </>
//   );
// }
