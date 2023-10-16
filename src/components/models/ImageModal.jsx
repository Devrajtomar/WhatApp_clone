import { modal } from "@/context/store";
import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Title from "./components/Title";

const ImageModal = ({ data }) => {
  return (
    <>
      <Title title="Image" />
      <div className="mt-4 w-full rounded-md">
        <img
          src="/DefaultUser.jpg"
          alt="Default"
          className=" bg-black border-gray-500 border-2 w-full h-[80%]  rounded-md object-cover"
        />
      </div>
    </>
  );
};

export default ImageModal;
