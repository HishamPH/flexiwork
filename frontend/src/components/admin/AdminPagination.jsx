// import React from 'react';

// const AdminPagination = ({ totalPages, currentPage, onPageChange }) => {
//   const handlePageClick = (page) => {
//     if (page !== currentPage && page > 0 && page <= totalPages) {
//       onPageChange(page);
//     }
//   };

//   const renderPageNumbers = () => {
//     const pageNumbers = [];

//     for (let i = 1; i <= totalPages; i++) {
//       pageNumbers.push(
//         <button
//           key={i}
//           type="button"
//           onClick={() => handlePageClick(i)}
//           className={`min-w-[30px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-1.5 text-sm rounded-full ${
//             currentPage === i
//               ? 'bg-blue-500 text-white'
//               : 'text-gray-800 hover:bg-gray-100'
//           } dark:text-white dark:hover:bg-white/10`}
//           aria-current={currentPage === i ? 'page' : undefined}
//         >
//           {i}
//         </button>
//       );
//     }

//     return pageNumbers;
//   };

//   return (
//     <div className="py-1 px-4 my-2">
//       <nav className="flex items-center space-x-1">
//         <button
//           type="button"
//           onClick={() => handlePageClick(currentPage - 1)}
//           className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//           disabled={currentPage === 1}
//         >
//           <span aria-hidden="true">«</span>
//           <span className="sr-only">Previous</span>
//         </button>
//         {renderPageNumbers()}
//         <button
//           type="button"
//           onClick={() => handlePageClick(currentPage + 1)}
//           className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//           disabled={currentPage === totalPages}
//         >
//           <span className="sr-only">Next</span>
//           <span aria-hidden="true">»</span>
//         </button>
//       </nav>
//     </div>
//   );
// };

// export default AdminPagination;