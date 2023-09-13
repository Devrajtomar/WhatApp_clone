import { modal } from "@/context/store";
import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Title from "./components/Title";
const AccountModal = () => {
  const { setAccount, Account } = modal();
  return (
    <>
      <Title title="Settings" />

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
    </>
  );
};

export default AccountModal;
