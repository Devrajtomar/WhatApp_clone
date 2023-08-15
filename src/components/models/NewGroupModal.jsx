import { modal, state } from "@/context/store";
import React, { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { HiOutlineCamera } from "react-icons/hi2";
import Select from "react-select";

const NewGroupModal = () => {
  const { user } = state();
  const { NewGroup, setNewGroup } = modal();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Info has been saved");
  };
  return (
    <Transition appear show={NewGroup} as={Fragment}>
      <Dialog as="div" onClose={() => setNewGroup(false)}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  <div className="w-full p-1 text-xl font-semibold flex items-center justify-between">
                    <div>Create Group</div>
                    <AiOutlineCloseCircle
                      size={27}
                      onClick={() => setNewGroup(false)}
                      className="hover:bg-white hover:text-black hover:scale-105 cursor-pointer"
                    />
                  </div>
                </Dialog.Title>
                <div className="mt-4 w-full">
                  <div className="flex items-center justify-center flex-col p-1 ">
                    <div className="w-[150px] h-[150px] rounded-full bg-zinc-800 text-white hover:opacity-80 cursor-pointer relative overflow-hidden ">
                      <img
                        src="/DefaultUser.jpg"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute w-fit h-fit top-[55px] left-[25px] text-zinc-100 flex justify-center items-center flex-col font-semibold">
                        <HiOutlineCamera
                          className="cursor-pointer"
                          color="white"
                          size={40}
                        />
                        <pre>Change Photo</pre>
                      </div>
                    </div>
                    <div className="font-semibold text-lg text-blue-600 hover:text-blue-500 cursor-pointer">
                      Preview
                    </div>
                    <form
                      className="w-full flex justify-start items-start gap-3 flex-col"
                      autoComplete="off"
                      onSubmit={(e) => handleSubmit(e.preventDefault)}
                    >
                      <label htmlFor="name">Name</label>

                      <input
                        className="inputForm"
                        id="name"
                        placeholder="Name"
                      />
                      <label htmlFor="about">About</label>
                      <input
                        className="inputForm"
                        name="about"
                        placeholder="About"
                      />
                      <div>
                        <div className="heading_2">Admin</div>
                        <Select
                          defaultValue={[{ label: user.Name, value: user.id }]}
                          isMulti
                          styles={{ width: "100vw" }}
                          options={[
                            { value: "chocolate", label: "Chocolate" },
                            { value: "strawberry", label: "Strawberry" },
                            { value: "vanilla", label: "Vanilla" },
                          ]}
                        />
                        <div className="heading_2">Users</div>
                        <Select
                          defaultValue={[{ label: user.Name, value: user.id }]}
                          isMulti
                          styles={{ width: "100vw" }}
                          options={[
                            { value: "chocolate", label: "Chocolate" },
                            { value: "strawberry", label: "Strawberry" },
                            { value: "vanilla", label: "Vanilla" },
                          ]}
                        />
                        <div className="heading_2">Privecy Settings</div>
                      </div>

                      <div className="w-full p-1 flex justify-evenly items-center gap-2">
                        <button type="reset" className="btn ">
                          Reset
                        </button>
                        <button type="submit" className="btn ">
                          Save
                        </button>
                      </div>
                    </form>
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

export default NewGroupModal;
