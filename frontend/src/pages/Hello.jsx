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

// import {useState} from "react";
// import {
//   IconButton,
//   Typography,
//   List,
//   ListItem,
//   ListItemPrefix,
//   ListItemSuffix,
//   Chip,
//   Accordion,
//   AccordionHeader,
//   AccordionBody,
//   Alert,
//   Input,
//   Drawer,
//   Card,
// } from "@material-tailwind/react";
// import {
//   PresentationChartBarIcon,
//   ShoppingBagIcon,
//   UserCircleIcon,
//   Cog6ToothIcon,
//   InboxIcon,
//   PowerIcon,
// } from "@heroicons/react/24/solid";
// import {
//   ChevronRightIcon,
//   ChevronDownIcon,
//   CubeTransparentIcon,
//   MagnifyingGlassIcon,
//   Bars3Icon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";
// import NavBar from "../components/NavBar";

// export default function Hello() {
//   const [open, setOpen] = useState(0);
//   const [openAlert, setOpenAlert] = useState(true);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//   const handleOpen = (value) => {
//     setOpen(open === value ? 0 : value);
//   };

//   const openDrawer = () => setIsDrawerOpen(true);
//   const closeDrawer = () => setIsDrawerOpen(false);

//   return (
//     <>
//     <NavBar />
//       <IconButton variant="text" size="lg" onClick={openDrawer}>
//         {isDrawerOpen ? (
//           <XMarkIcon className="h-8 w-8 stroke-2 md:hidden" />
//         ) : (
//           <Bars3Icon className="h-8 w-8 stroke-2 md:hidden" />
//         )}
//       </IconButton>
//       <Drawer open={isDrawerOpen} onClose={closeDrawer} className="w-62 md:hidden" overlay={false}>
//         <Card
//           color="transparent"
//           shadow={false}
//           className="h-auto w-full p-1"
//         >

//           <List>
//             <ListItem>
//               <ListItemPrefix>
//                 <InboxIcon className="h-5 w-5" />
//               </ListItemPrefix>
//               Inbox
//               <ListItemSuffix>
//                 <Chip
//                   value="14"
//                   size="sm"
//                   variant="ghost"
//                   color="blue-gray"
//                   className="rounded-full"
//                 />
//               </ListItemSuffix>
//             </ListItem>
//             <ListItem>
//               <ListItemPrefix>
//                 <UserCircleIcon className="h-5 w-5" />
//               </ListItemPrefix>
//               Profile
//             </ListItem>
//             <ListItem>
//               <ListItemPrefix>
//                 <Cog6ToothIcon className="h-5 w-5" />
//               </ListItemPrefix>
//               Settings
//             </ListItem>
//             <ListItem>
//               <ListItemPrefix>
//                 <PowerIcon className="h-5 w-5" />
//               </ListItemPrefix>
//               Log Out
//             </ListItem>
//           </List>

//         </Card>
//       </Drawer>
//       <div className="hidden md:block w-64"> {/* Hidden on small screens, visible on medium and up */}
//         <Card
//           color="white"
//           shadow={true}
//           className="h-auto p-1 left-0"
//         >
//           <List>
//             <ListItem>
//               <ListItemPrefix>
//                 <InboxIcon className="h-5 w-5" />
//               </ListItemPrefix>
//               Inbox
//               <ListItemSuffix>
//                 <Chip
//                   value="14"
//                   size="sm"
//                   variant="ghost"
//                   color="blue-gray"
//                   className="rounded-full"
//                 />
//               </ListItemSuffix>
//             </ListItem>
//             <ListItem>
//               <ListItemPrefix>
//                 <UserCircleIcon className="h-5 w-5" />
//               </ListItemPrefix>
//               Profile
//             </ListItem>
//             <ListItem>
//               <ListItemPrefix>
//                 <Cog6ToothIcon className="h-5 w-5" />
//               </ListItemPrefix>
//               Settings
//             </ListItem>
//             <ListItem>
//               <ListItemPrefix>
//                 <PowerIcon className="h-5 w-5" />
//               </ListItemPrefix>
//               Log Out
//             </ListItem>
//           </List>
//         </Card>
//       </div>
//     </>
//   );
// }

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

//=================================================================================================

// import React from "react";
// import { CloseOutlined } from "@ant-design/icons";
// import { Button, Card, Form, Input, Space, Typography } from "antd";
// const Hello = () => {
//   const [form] = Form.useForm();
//   return (
//     <Form
//       labelCol={{
//         span: 6,
//       }}
//       wrapperCol={{
//         span: 18,
//       }}
//       form={form}
//       name="dynamic_form_complex"
//       style={{
//         maxWidth: 600,
//       }}
//       autoComplete="off"
//       initialValues={{
//         items: [{}],
//       }}
//     >
//       <Form.List name="items">
//         {(fields, { add, remove }) => (
//           <div
//             style={{
//               display: "flex",
//               rowGap: 16,
//               flexDirection: "column",
//             }}
//           >
//             {fields.map((field) => (
//               <Card
//                 size="small"
//                 title={`Item ${field.name + 1}`}
//                 key={field.key}
//                 extra={
//                   <CloseOutlined
//                     onClick={() => {
//                       remove(field.name);
//                     }}
//                   />
//                 }
//               >
//                 <Form.Item label="Name" name={[field.name, "name"]}>
//                   <Input />
//                 </Form.Item>

//                 {/* Nest Form.List */}
//                 <Form.Item label="List">
//                   <Form.List name={[field.name, "list"]}>
//                     {(subFields, subOpt) => (
//                       <div
//                         style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           rowGap: 16,
//                         }}
//                       >
//                         {subFields.map((subField) => (
//                           <Space key={subField.key}>
//                             <Form.Item noStyle name={[subField.name, "first"]}>
//                               <Input placeholder="first" />
//                             </Form.Item>
//                             <Form.Item noStyle name={[subField.name, "second"]}>
//                               <Input placeholder="second" />
//                             </Form.Item>
//                             <CloseOutlined
//                               onClick={() => {
//                                 subOpt.remove(subField.name);
//                               }}
//                             />
//                           </Space>
//                         ))}
//                         <Button
//                           type="dashed"
//                           onClick={() => subOpt.add()}
//                           block
//                         >
//                           + Add Sub Item
//                         </Button>
//                       </div>
//                     )}
//                   </Form.List>
//                 </Form.Item>
//               </Card>
//             ))}

//             <Button type="dashed" onClick={() => add()} block>
//               + Add Item
//             </Button>
//           </div>
//         )}
//       </Form.List>

//       {/* <Form.Item noStyle shouldUpdate>
//         {() => (
//           <Typography>
//             <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
//           </Typography>
//         )}
//       </Form.Item> */}
//     </Form>
//   );
// };
// export default Hello;

//=============================================================================================================

// import React, { useState, useEffect, useRef } from "react";
// import { Typography } from "@material-tailwind/react";

// const DualRangeSlider = ({
//   min,
//   max,
//   step,
//   defaultLow,
//   defaultHigh,
//   onChange,
// }) => {
//   const [lowValue, setLowValue] = useState(defaultLow || min);
//   const [highValue, setHighValue] = useState(defaultHigh || max);
//   const sliderRef = useRef(null);
//   const [isDragging, setIsDragging] = useState(null);

//   useEffect(() => {
//     onChange({
//       low: Math.min(lowValue, highValue),
//       high: Math.max(lowValue, highValue),
//     });
//   }, [lowValue, highValue, onChange]);

//   const handleChange = (newValue, isLow) => {
//     if (isLow) {
//       setLowValue(newValue);
//     } else {
//       setHighValue(newValue);
//     }
//   };

//   const handleMouseDown = (e, isLow) => {
//     e.preventDefault();
//     setIsDragging(isLow ? "low" : "high");
//   };

//   const handleMouseUp = () => {
//     setIsDragging(null);
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging || !sliderRef.current) return;

//     const sliderRect = sliderRef.current.getBoundingClientRect();
//     const newPosition = (e.clientX - sliderRect.left) / sliderRect.width;
//     const newValue =
//       Math.round((min + (max - min) * newPosition) / step) * step;

//     handleChange(Math.max(min, Math.min(newValue, max)), isDragging === "low");
//   };

//   const handleSliderClick = (e) => {
//     if (!sliderRef.current) return;
//     const sliderRect = sliderRef.current.getBoundingClientRect();
//     const clickPosition = (e.clientX - sliderRect.left) / sliderRect.width;
//     const newValue =
//       Math.round((min + (max - min) * clickPosition) / step) * step;

//     if (Math.abs(newValue - lowValue) < Math.abs(newValue - highValue)) {
//       setLowValue(newValue);
//     } else {
//       setHighValue(newValue);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseup", handleMouseUp);
//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [isDragging]);

//   const getTrackStyle = () => {
//     const lowPercent = ((lowValue - min) / (max - min)) * 100;
//     const highPercent = ((highValue - min) / (max - min)) * 100;
//     return {
//       background: `linear-gradient(to right, #e5e7eb ${lowPercent}%, #3b82f6 ${lowPercent}%, #3b82f6 ${highPercent}%, #e5e7eb ${highPercent}%)`,
//     };
//   };

//   const getHandleStyle = (value) => ({
//     left: `calc(${((value - min) / (max - min)) * 100}% - 8px)`,
//   });

//   return (
//     <div
//       className="w-full relative pt-6 pb-4"
//       ref={sliderRef}
//       onClick={handleSliderClick}
//     >
//       <div
//         className="absolute w-full h-2 bg-blue-gray-200 rounded-lg cursor-pointer"
//         style={getTrackStyle()}
//       ></div>
//       <div
//         className="absolute w-4 h-4 bg-blue-500 rounded-full top-5 cursor-pointer"
//         style={getHandleStyle(lowValue)}
//         onMouseDown={(e) => handleMouseDown(e, true)}
//       ></div>
//       <div
//         className="absolute w-4 h-4 bg-blue-500 rounded-full top-5 cursor-pointer"
//         style={getHandleStyle(highValue)}
//         onMouseDown={(e) => handleMouseDown(e, false)}
//       ></div>
//       <div className="flex justify-between mt-6">
//         <Typography variant="small" color="blue-gray">
//           ${min.toLocaleString()}
//         </Typography>
//         <Typography variant="small" color="blue-gray" className="font-medium">
//           ${Math.min(lowValue, highValue).toLocaleString()} - $
//           {Math.max(lowValue, highValue).toLocaleString()}
//         </Typography>
//         <Typography variant="small" color="blue-gray">
//           ${max.toLocaleString()}
//         </Typography>
//       </div>
//     </div>
//   );
// };

// const Hello = () => {
//   const handleSalaryChange = ({ low, high }) => {
//     console.log(`Salary range changed to: $${low} - $${high}`);
//     // You can perform any action with the new salary range here
//   };
//   return (
//     <div className="w-full max-w-md mx-auto p-6">
//       <Typography variant="h6" color="blue-gray" className="mb-4">
//         Select Salary Range
//       </Typography>
//       <DualRangeSlider
//         min={30000}
//         max={200000}
//         step={10000}
//         defaultLow={50000}
//         defaultHigh={150000}
//         onChange={handleSalaryChange}
//       />
//     </div>
//   );
// };
// export default Hello;

// import { useEffect, useState } from "react";
// import RangeSlider from "react-range-slider-input";
// import "react-range-slider-input/dist/style.css";

// const Hello = () => {
//   const [value, setValue] = useState([30, 60]);
//   useEffect(() => {
//     console.log(value);
//   }, [value]);
//   return (
//     <div className="flex-col justify-center">
//       <div>
//         <RangeSlider value={value} onInput={setValue} step={10} />
//       </div>
//     </div>
//   );
// };

// export default Hello;

// import React from "react";
// import Slider from "rc-slider";
// import { Typography } from "@material-tailwind/react";
// import "rc-slider/assets/index.css";

// const Hello = () => {
//   const [range, setRange] = React.useState([50000, 150000]);
//   const min = 30000;
//   const max = 200000;
//   const step = (max - min) / 4;
//   const marks = {};
//   for (let i = 0; i <= 4; i++) {
//     const value = min + i * step;
//     marks[value] = {
//       style: {
//         transform: "translateX(-50%)",
//         whiteSpace: "nowrap",
//       },
//       label: `$${Math.round(value / 1000).toLocaleString()}k`,
//     };
//   }

//   const handleChange = (newRange) => {
//     setRange(newRange);
//     //console.log(`Salary range changed to: $${newRange[0]} - $${newRange[1]}`);
//     // You can perform any action with the new salary range here
//   };

//   return (
//     <div className="w-full max-w-md mx-auto p-6">
//       <Typography variant="h6" color="blue-gray" className="mb-4">
//         Select Salary Range
//       </Typography>
//       <Slider
//         range
//         min={30000}
//         max={200000}
//         step={5000}
//         value={range}
//         marks={marks}
//         onChange={handleChange}
//         railStyle={{ backgroundColor: "#e5e7eb", height: 4 }}
//         trackStyle={[{ backgroundColor: "#3b82f6", height: 4 }]}
//         handleStyle={[
//           { backgroundColor: "#3b82f6", borderColor: "#3b82f6", opacity: 1 },
//           { backgroundColor: "#3b82f6", borderColor: "#3b82f6", opacity: 1 },
//         ]}
//       />
//       <div className="flex justify-between mt-4">
//         <Typography variant="small" color="blue-gray">
//           {"30000".toLocaleString()}
//         </Typography>
//         <Typography variant="small" color="blue-gray" className="font-medium">
//           ${range[0].toLocaleString()} - ${range[1].toLocaleString()}
//         </Typography>
//         <Typography variant="small" color="blue-gray">
//           {"200000".toLocaleString()}
//         </Typography>
//       </div>
//     </div>
//   );
// };

// export default Hello;

//=========================================================================================================================

// import React, { useState } from "react";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   Typography,
//   Input,
//   Textarea,
//   Button,
// } from "@material-tailwind/react";

// const Hello = () => {
//   const [personalInfo, setPersonalInfo] = useState({
//     name: "",
//     email: "",
//     phone: "",
//   });
//   const [resume, setResume] = useState(null);
//   const [workExperience, setWorkExperience] = useState([]);
//   const [education, setEducation] = useState([]);

//   const handlePersonalInfoChange = (e) => {
//     setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
//   };

//   const handleResumeUpload = (e) => {
//     setResume(e.target.files[0]);
//   };

//   const addWorkExperience = () => {
//     setWorkExperience([
//       ...workExperience,
//       { company: "", position: "", duration: "" },
//     ]);
//   };

//   const updateWorkExperience = (index, field, value) => {
//     const updatedExperience = [...workExperience];
//     updatedExperience[index][field] = value;
//     setWorkExperience(updatedExperience);
//   };

//   const removeWorkExperience = (index) => {
//     setWorkExperience(workExperience.filter((_, i) => i !== index));
//   };

//   const addEducation = () => {
//     setEducation([...education, { institution: "", degree: "", year: "" }]);
//   };

//   const updateEducation = (index, field, value) => {
//     const updatedEducation = [...education];
//     updatedEducation[index][field] = value;
//     setEducation(updatedEducation);
//   };

//   const removeEducation = (index) => {
//     setEducation(education.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <Card className="mb-6">
//         <CardHeader color="blue" className="relative h-16">
//           <Typography variant="h5" color="white">
//             Personal Information
//           </Typography>
//         </CardHeader>
//         <CardBody>
//           <div className="mb-4">
//             <Input
//               label="Full Name"
//               name="name"
//               value={personalInfo.name}
//               onChange={handlePersonalInfoChange}
//             />
//           </div>
//           <div className="mb-4">
//             <Input
//               label="Email"
//               name="email"
//               type="email"
//               value={personalInfo.email}
//               onChange={handlePersonalInfoChange}
//             />
//           </div>
//           <div className="mb-4">
//             <Input
//               label="Phone"
//               name="phone"
//               type="tel"
//               value={personalInfo.phone}
//               onChange={handlePersonalInfoChange}
//             />
//           </div>
//         </CardBody>
//       </Card>

//       <Card className="mb-6">
//         <CardHeader color="blue" className="relative h-16">
//           <Typography variant="h5" color="white">
//             Resume
//           </Typography>
//         </CardHeader>
//         <CardBody>
//           <Input type="file" onChange={handleResumeUpload} />
//           {resume && (
//             <Typography className="mt-2">Uploaded: {resume.name}</Typography>
//           )}
//         </CardBody>
//       </Card>

//       <Card className="mb-6">
//         <CardHeader color="blue" className="relative h-16">
//           <Typography variant="h5" color="white">
//             Work Experience
//           </Typography>
//         </CardHeader>
//         <CardBody>
//           {workExperience.map((exp, index) => (
//             <div key={index} className="mb-4 p-4 border rounded">
//               <Input
//                 className="mb-2"
//                 label="Company"
//                 value={exp.company}
//                 onChange={(e) =>
//                   updateWorkExperience(index, "company", e.target.value)
//                 }
//               />
//               <Input
//                 className="mb-2"
//                 label="Position"
//                 value={exp.position}
//                 onChange={(e) =>
//                   updateWorkExperience(index, "position", e.target.value)
//                 }
//               />
//               <Input
//                 className="mb-2"
//                 label="Duration"
//                 value={exp.duration}
//                 onChange={(e) =>
//                   updateWorkExperience(index, "duration", e.target.value)
//                 }
//               />
//               <Button color="red" onClick={() => removeWorkExperience(index)}>
//                 Remove
//               </Button>
//             </div>
//           ))}
//           <Button onClick={addWorkExperience}>Add Work Experience</Button>
//         </CardBody>
//       </Card>

//       <Card className="mb-6">
//         <CardHeader color="blue" className="relative h-16">
//           <Typography variant="h5" color="white">
//             Education
//           </Typography>
//         </CardHeader>
//         <CardBody>
//           {education.map((edu, index) => (
//             <div key={index} className="mb-4 p-4 border rounded">
//               <Input
//                 className="mb-2"
//                 label="Institution"
//                 value={edu.institution}
//                 onChange={(e) =>
//                   updateEducation(index, "institution", e.target.value)
//                 }
//               />
//               <Input
//                 className="mb-2"
//                 label="Degree"
//                 value={edu.degree}
//                 onChange={(e) =>
//                   updateEducation(index, "degree", e.target.value)
//                 }
//               />
//               <Input
//                 className="mb-2"
//                 label="Year"
//                 value={edu.year}
//                 onChange={(e) => updateEducation(index, "year", e.target.value)}
//               />
//               <Button color="red" onClick={() => removeEducation(index)}>
//                 Remove
//               </Button>
//             </div>
//           ))}
//           <Button onClick={addEducation}>Add Education</Button>
//         </CardBody>
//       </Card>

//       <Button className="w-full" color="blue">
//         Save Profile
//       </Button>
//     </div>
//   );
// };

// export default Hello;

//============================================================================================================================

import React, { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

const Hello = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [resume, setResume] = useState(null);
  const [workExperience, setWorkExperience] = useState([]);
  const [education, setEducation] = useState([]);

  const handlePersonalInfoChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handleResumeUpload = (e) => {
    setResume(e.target.files[0]);
  };

  const addWorkExperience = () => {
    setWorkExperience([
      ...workExperience,
      { company: "", position: "", duration: "" },
    ]);
  };

  const updateWorkExperience = (index, field, value) => {
    const updatedExperience = [...workExperience];
    updatedExperience[index][field] = value;
    setWorkExperience(updatedExperience);
  };

  const removeWorkExperience = (index) => {
    setWorkExperience(workExperience.filter((_, i) => i !== index));
  };

  const addEducation = () => {
    setEducation([...education, { institution: "", degree: "", year: "" }]);
  };

  const updateEducation = (index, field, value) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
  };

  const removeEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <Card className="mb-6">
        <CardBody>
          <Typography variant="h4" className="mb-4 text-blue-500">
            Personal Information
          </Typography>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Full Name"
              name="name"
              value={personalInfo.name}
              onChange={handlePersonalInfoChange}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={personalInfo.email}
              onChange={handlePersonalInfoChange}
            />
            <Input
              label="Phone"
              name="phone"
              type="tel"
              value={personalInfo.phone}
              onChange={handlePersonalInfoChange}
            />
          </div>
        </CardBody>
      </Card>

      <Card className="mb-6">
        <CardBody>
          <Typography variant="h4" className="mb-4 text-blue-500">
            Resume
          </Typography>
          <Input type="file" onChange={handleResumeUpload} />
          {resume && (
            <Typography variant="small" className="mt-2 text-gray-500">
              Uploaded: {resume.name}
            </Typography>
          )}
        </CardBody>
      </Card>

      <Card className="mb-6">
        <CardBody>
          <Typography variant="h4" className="mb-4 text-blue-500">
            Work Experience
          </Typography>
          {workExperience.map((exp, index) => (
            <div key={index} className="mb-4 border p-4 rounded-lg bg-gray-100">
              <div className="grid gap-2 md:grid-cols-3">
                <Input
                  label="Company"
                  value={exp.company}
                  onChange={(e) =>
                    updateWorkExperience(index, "company", e.target.value)
                  }
                />
                <Input
                  label="Position"
                  value={exp.position}
                  onChange={(e) =>
                    updateWorkExperience(index, "position", e.target.value)
                  }
                />
                <Input
                  label="Duration"
                  value={exp.duration}
                  onChange={(e) =>
                    updateWorkExperience(index, "duration", e.target.value)
                  }
                />
              </div>
              <Button
                variant="outlined"
                color="red"
                size="sm"
                className="mt-2"
                onClick={() => removeWorkExperience(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button color="blue" onClick={addWorkExperience}>
            Add Work Experience
          </Button>
        </CardBody>
      </Card>

      <Card className="mb-6">
        <CardBody>
          <Typography variant="h4" className="mb-4 text-blue-500">
            Education
          </Typography>
          {education.map((edu, index) => (
            <div key={index} className="mb-4 border p-4 rounded-lg bg-gray-100">
              <div className="grid gap-2 md:grid-cols-3">
                <Input
                  label="Institution"
                  value={edu.institution}
                  onChange={(e) =>
                    updateEducation(index, "institution", e.target.value)
                  }
                />
                <Input
                  label="Degree"
                  value={edu.degree}
                  onChange={(e) =>
                    updateEducation(index, "degree", e.target.value)
                  }
                />
                <Input
                  label="Year"
                  value={edu.year}
                  onChange={(e) =>
                    updateEducation(index, "year", e.target.value)
                  }
                />
              </div>
              <Button
                variant="outlined"
                color="red"
                size="sm"
                className="mt-2"
                onClick={() => removeEducation(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button color="blue" onClick={addEducation}>
            Add Education
          </Button>
        </CardBody>
      </Card>

      <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
        Save Profile
      </Button>
    </div>
  );
};

export default Hello;
