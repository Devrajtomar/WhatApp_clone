import { modal } from "@/context/store";
import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
const AccountModal = () => {
  const { setAccount, Account } = modal();
  return (
    <Transition appear show={Account} as={Fragment}>
      <Dialog as="div" onClose={() => setAccount(false)}>
        <div>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="modal" />
          </Transition.Child>
        </div>
        <div className="fixed inset-0 overflow-y-auto z-[99999]">
          <div className="flex min-h-full items-center justify-center p-2 text-center ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  <div className="w-full p-1 text-xl font-semibold flex items-center justify-between">
                    <div>Name</div>
                    <AiOutlineCloseCircle
                      size={27}
                      onClick={() => setAccount(false)}
                      className="hover:bg-white hover:text-black hover:scale-105 cursor-pointer"
                    />
                  </div>
                </Dialog.Title>
                <div className="mt-4 flex justify-center items-start flex-col">
                  <img
                    src="/DefaultUser.jpg"
                    alt="Default"
                    className=" bg-black rounded-full border-gray-500 border-2 w-[100px] h-[100px] mx-auto object-cover"
                  />
                  <div className="heading_2 text-center w-full">Name</div>
                  <div className="text-md text-zinc-800 font-serif text-center w-full mt-1">
                    Status or Last Seen
                  </div>
                  <div className="text-lg text-zinc-800 font-semibold font-serif w-full mt-4">
                    About
                  </div>
                  <div className="text-md text-zinc-800 font-serif w-full">
                    Status or Last Seen
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AccountModal;
