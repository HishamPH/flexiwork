import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf"; // For viewing PDFs
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = ({ isOpen, onClose, pdfFile, app }) => {
  const [numPages, setNumPages] = useState(null);
  // const [workerSrc, setWorkerSrc] = useState("");

  // useEffect(() => {
  //   const loadWorker = async () => {
  //     const workerSrcUrl = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  //     setWorkerSrc(workerSrcUrl);
  //   };
  //   loadWorker();
  // }, []);

  // useEffect(() => {
  //   if (workerSrc) {
  //     pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
  //   }
  // }, [workerSrc]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4 w-[900px] h-5/6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">PDF Viewer</h2>
              <button onClick={onClose} className="text-red-500">
                Close
              </button>
            </div>
            <div className="my-5 w-1/2">
              <label className="text-gray-600 text-sm mb-1">
                What motivates you to apply for this position?
              </label>
              <input
                type="text"
                name="motivation"
                value={app?.motivation}
                className="border border-gray-300 rounded-md p-2 w-full"
                disabled
              />
            </div>
            <div className="my-5 w-1/2">
              <label className="text-gray-600 text-sm mb-1">
                What motivates you to apply for this position?
              </label>
              <input
                type="text"
                name="motivation"
                value={app?.challenge}
                className="border border-gray-300 rounded-md p-2 w-full"
                disabled
              />
            </div>
            <div className="my-5 w-1/2">
              <label className="text-gray-600 text-sm mb-1">
                What motivates you to apply for this position?
              </label>
              <input
                type="text"
                name="motivation"
                value={app?.expectedSalary}
                className="border border-gray-300 rounded-md p-2 w-full"
                disabled
              />
            </div>
            {/* PDF Viewer */}
            <iframe
              src={`/api/images/${pdfFile}`}
              frameBorder="0"
              className="w-full h-1/2"
            ></iframe>
            {/* <Document
              file={`/api/images${pdfFile}`}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document> */}
          </div>
        </div>
      )}
    </>
  );
};

export default PDFViewer;

// import React, { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import { X } from "lucide-react";
// import {
//   Dialog,
//   DialogPanel,
//   // DialogHeader,
//   DialogTitle,
// } from "@headlessui/react";
// import { Button } from "@material-tailwind/react";

// Set the worker source (required for react-pdf)
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// const PDFViewer = ({ isOpen, onClose, pdfFile }) => {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//     setPageNumber(1);
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogPanel className="max-w-4xl">
//         <div>
//           <DialogTitle>PDF Viewer</DialogTitle>
//           <Button
//             variant="ghost"
//             className="absolute right-4 top-4"
//             onClick={onClose}
//           >
//             <X className="h-4 w-4" />
//           </Button>
//         </div>
//         <div className="mt-4">
//           <Document
//             file={`/api/images/${pdfFile}`}
//             onLoadSuccess={onDocumentLoadSuccess}
//             className="flex justify-center"
//           >
//             <Page pageNumber={pageNumber} />
//           </Document>
//         </div>
//         <div className="mt-4 flex justify-between items-center">
//           <Button
//             onClick={() => setPageNumber((page) => Math.max(page - 1, 1))}
//             disabled={pageNumber <= 1}
//           >
//             Previous
//           </Button>
//           <p>
//             Page {pageNumber} of {numPages}
//           </p>
//           <Button
//             onClick={() =>
//               setPageNumber((page) => Math.min(page + 1, numPages))
//             }
//             disabled={pageNumber >= numPages}
//           >
//             Next
//           </Button>
//         </div>
//       </DialogPanel>
//     </Dialog>
//   );
// };

// export default PDFViewer;
