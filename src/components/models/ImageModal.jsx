import { modal } from "@/context/store";
import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const ImageModal = ({ data }) => {
  const { image, setImage } = modal();
  return (
    <Transition appear show={image} as={Fragment}>
      <Dialog as="div" onClose={() => setImage(false)}>
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
                      onClick={() => setImage(false)}
                      className="hover:bg-white hover:text-black hover:scale-105 cursor-pointer"
                    />
                  </div>
                </Dialog.Title>
                <div className="mt-4">
                  <img
                    src="/DefaultUser.jpg"
                    alt="Default"
                    className=" bg-black rounded-full border-gray-500 border-2 w-[250px] h-[250px]  sm:w-[300px] sm:h-[300px] mx-auto object-cover"
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ImageModal;
