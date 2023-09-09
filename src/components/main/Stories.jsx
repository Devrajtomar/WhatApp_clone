import { state } from "@/context/store";
import { Fragment } from "react";
import StoriesMain from "./Main/StoriesMain";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdArrowCircleLeft, MdArrowCircleRight } from "react-icons/md";

const Stories = () => {
  const { currentStoryUser, setStoryUser } = state();
  if (currentStoryUser === null || currentStoryUser === "") {
    return (
      <div className="page">
        <div className="text-2xl font-semibold font-serif h-full w-full flex justify-center items-center  text-center">
          SELECT A USER TO SEA THEIR STORIES
        </div>
      </div>
    );
  }
  if (
    currentStoryUser !== null &&
    currentStoryUser?.Stories?.length &&
    currentStoryUser !== ""
  ) {
    if (window.innerWidth <= 800) {
      return <StoriesMain />;
    } else {
      return (
        <div className="page">
          <div className="w-full h-full">
            <div className="text-2xl font-semibold font-serif h-full w-full flex justify-center items-center  text-center">
              SELECT A USER TO SEA THEIR STORIES
            </div>
          </div>
          <Transition appear show={true} as={Fragment}>
            <Dialog as="div" onClose={() => setStoryUser(null)}>
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
                <div className="flex min-h-full items-center justify-center text-center ">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-fit h-[90vh] transform overflow-hidden bg-zinc-100 p-4 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        <div className="w-full p-1 text-xl font-semibold flex items-center justify-between">
                          <div>Stories</div>
                          <AiOutlineCloseCircle
                            size={27}
                            onClick={() => setStoryUser(null)}
                            className="hover:bg-white hover:text-black hover:scale-105 cursor-pointer"
                          />
                        </div>
                      </Dialog.Title>
                      <div className="mt-4 flex justify-center items-center gap-5 font-semibold text-xl text-zinc-900 p-1 h-[95%] w-full">
                        <MdArrowCircleLeft size={30} />
                        <StoriesMain />
                        <MdArrowCircleRight size={30} />
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      );
    }
  }
};
export default Stories;
