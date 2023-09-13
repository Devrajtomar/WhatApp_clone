import { modal } from "@/context/store";
import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Title from "./components/Title";

const ImageModal = ({ data }) => {
  const { image, setImage } = modal();
  return (
    <>
      <Title title="Image" />
      <div className="mt-4">
        <img
          src="/DefaultUser.jpg"
          alt="Default"
          className=" bg-black rounded-full border-gray-500 border-2 w-[250px] h-[250px]  sm:w-[300px] sm:h-[300px] mx-auto object-cover"
        />
      </div>
    </>
  );
};

export default ImageModal;
