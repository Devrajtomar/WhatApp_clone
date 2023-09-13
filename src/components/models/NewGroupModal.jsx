import { modal, state } from "@/context/store";
import React, { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { HiOutlineCamera } from "react-icons/hi2";
import Select from "react-select";
import Title from "./components/Title";

const NewGroupModal = () => {
  const { user } = state();
  const { NewGroup, setNewGroup } = modal();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Info has been saved");
  };
  return (
    <>
      <Title title="Create Group" />
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

            <input className="inputForm" id="name" placeholder="Name" />
            <label htmlFor="about">About</label>
            <input className="inputForm" name="about" placeholder="About" />
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
    </>
  );
};

export default NewGroupModal;
