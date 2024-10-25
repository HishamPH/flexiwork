import React, { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

import { Avatar } from "@material-tailwind/react";

const ApplicantProfileModal = ({ open, setOpen, user }) => {
  const closeModal = () => setOpen(false);
  return (
    <>
      <div className="flex-1 w-auto justify-center">
        <Transition appear show={open ?? false} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-50" />
            </TransitionChild>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <DialogPanel className="w-full max-w-xl transform overflow-hidden rounded-sm bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <DialogTitle
                      as="h2"
                      className="text-2xl font-semibold leading-6 text-gray-900 mb-5"
                    >
                      Profile
                    </DialogTitle>
                    <Avatar
                      src={`/api/images/${user.profilePic}`}
                      alt="avatar"
                      className="w-24 h-24 mb-6"
                    />
                    <div>Name : {user.name}</div>
                    <div>email : {user.email}</div>
                    <div>location : {user.location}</div>
                    <div>contact : {user.contact}</div>
                    <div>about : {user.about}</div>
                    {user?.education?.length !== 0 && (
                      <div>
                        education :{" "}
                        {user?.education?.map((edu, index) => (
                          <div key={index} className="ms-5 mb-4 flex-col">
                            <div>college : {edu.college}</div>
                            <div>degree : {edu.degree}</div>
                            <div>
                              {edu?.from?.slice(0, 10)} -{" "}
                              {edu?.to?.slice(0, 10)}
                            </div>
                            <div></div>
                          </div>
                        ))}
                      </div>
                    )}
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};

export default ApplicantProfileModal;
