import React, { Fragment } from "react";
import { usePreview } from "../../providers/Preview-Provider";
import Title from "./components/Title";

const ImageModal = ({ data }) => {
  const { previewSrc } = usePreview();
  return (
    <>
      <Title title="Image" />
      <div className="mt-4 w-full rounded-md">
        <img
          src={previewSrc || "/DefaultUser.jpg"}
          alt="Default"
          className=" bg-black border-gray-500 border-2 w-full h-[80%]  rounded-md object-cover"
        />
      </div>
    </>
  );
};

export default ImageModal;
