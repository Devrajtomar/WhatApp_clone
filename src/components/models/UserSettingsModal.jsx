import { modal, state } from "@/context/store";
import React, { useState } from "react";
import { HiOutlineCamera } from "react-icons/hi2";
import axios from "axios";
import toast from "react-hot-toast";
import { LogOut } from "../navigation";
import Title from "./components/Title";

const UserSettingsModal = () => {
  const { setImage } = modal();

  const { user } = state();

  const [name, setName] = useState(user.Name);
  const [about, setAbout] = useState(user.about);
  const [newImage, setNewImage] = useState(user.image);
  const [newImagePreview, setNewImagePreview] = useState(user.image);

  const reader = new FileReader();
  reader.onload = (e) => {
    setNewImagePreview(e.target.result);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newImage !== user.image || name !== user.Name || about !== user.about) {
      const info = new FormData();
      info.append("file", newImage);
      info.append("id", user.id);
      info.append("name", name);
      info.append("about", about);

      const res = await axios.patch("/api/user/updateInfo", info, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      });
      if (res.status === 200) {
        toast.success("Info has been saved!");
      } else {
        toast.error("Failed to save your Info!");
      }
    } else {
      console.log("Info is same");
    }
  };
  return (
    <>
      <Title title="Settings" />
      <div className="mt-4 w-full">
        <div className="flex items-center justify-center flex-col p-1 ">
          <label
            htmlFor="CoverPhoto"
            className="w-[150px] h-[150px] rounded-full bg-zinc-800 text-white hover:opacity-80 cursor-pointer relative overflow-hidden "
          >
            <img src={newImagePreview} className="w-full h-full object-cover" />
            <div className="absolute w-fit h-fit top-[55px] left-[25px] text-zinc-100 flex justify-center items-center flex-col font-semibold">
              <HiOutlineCamera
                className="cursor-pointer"
                color="white"
                size={40}
              />
              <pre>Change Photo</pre>
            </div>
          </label>
          <div
            className="font-semibold text-lg text-blue-600 hover:text-blue-500 cursor-pointer"
            onClick={() => setImage(true)}
          >
            Preview
          </div>
          <form
            className="w-full flex justify-start items-start gap-3 flex-col"
            autoComplete="off"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="heading_2">User Settings</div>

            <input
              type="file"
              name="CoverPhoto"
              id="CoverPhoto"
              className="hidden"
              onChange={(e) => {
                setNewImage(e.target.files[0]);
                reader.readAsDataURL(e.target.files[0]);
              }}
            />
            <label htmlFor="name">Name</label>

            <input
              className="inputForm"
              id="name"
              placeholder={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="about">About</label>
            <input
              className="inputForm"
              name="about"
              placeholder={about}
              onChange={(e) => setAbout(e.target.value)}
            />

            <div className="heading_2">Account Settings</div>
            <LogOut />

            <div className="w-full p-1 flex justify-evenly items-center gap-2">
              <button type="reset" className="btn bg-gray-700">
                Reset
              </button>
              <button
                type="submit"
                className="btn bg-gray-700"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserSettingsModal;
