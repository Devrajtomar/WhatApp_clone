import { Dialog, Transition } from "@headlessui/react";
import { modal, state } from "../../context/store";
import React, { Fragment, useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";
import { HiDocumentAdd } from "react-icons/hi";
import { HiOutlineCamera } from "react-icons/hi2";
import VideoPlayer from "../../containers/Player";

const NewStoryModal = () => {
  const { user } = state();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const { NewStory, setNewStory } = modal();
  const newStory = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("type", selectedFile.type);
    formData.append("userId", user.id);

    const story = await axios.post("/api/stories/newStory", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(story.data);
  };

  const handelFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    if (selectedFile !== null && selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setPreview(e.target.result);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Transition appear show={NewStory} as={Fragment}>
      <Dialog as="div" onClose={() => setNewStory(false)}>
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
          <div className="flex min-w-fit h-full items-center justify-center text-center ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-fit max-h-screen transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-2">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  <div className="w-full p-1 text-xl font-semibold flex items-center justify-between">
                    <div>Create Story</div>
                    <AiOutlineCloseCircle
                      size={27}
                      onClick={() => setNewStory(false)}
                      className="hover:bg-white hover:text-black hover:scale-105 cursor-pointer"
                    />
                  </div>
                </Dialog.Title>
                <div className="mt-4 flex justify-center items-center gap-2 rounded-md border-1 border-emerald-100 h-full">
                  <div className="flex-grow h-full flex flex-col justify-center items-center">
                    <label
                      htmlFor="file"
                      className="flex justify-center items-center text-xl flex-col gap-1 bg-zinc-200 min-w-[320px] md:min-w-[400px] min-h-[500px] h-full rounded-sm hover:border-1 border-zinc-300 "
                    >
                      <HiOutlineCamera />
                      <div>
                        {preview !== null && preview
                          ? "Change Story"
                          : "Create Story"}
                      </div>
                    </label>
                    <input
                      type="file"
                      id="file"
                      className="hidden"
                      onChange={(e) => handelFileChange(e)}
                    />
                  </div>
                  {preview !== null && (
                    <div className=" w-full min-h-[500px] h-full rounded-sm bg-gray-100 flex justify-around items-stretch flex-col gap-1 ">
                      {
                        selectedFile.type === "video/mp4" && (
                          <VideoPlayer Source={preview} />
                        )
                        /* <video
                          src={preview}
                          controls
                          autoPlay
                          className="flex justify-start items-start text-xl flex-col gap-1 w-full bg-zinc-200 min-w-[320px] md:min-h-[400px] min-h-[500px] rounded-sm hover:border-1 border-zinc-300 p-1 max-w-[600px] h-auto object-contain"
                        /> */
                      }

                      {selectedFile.type === "image/jpeg" && (
                        <img
                          src={preview}
                          alt="Story/Image"
                          className="flex justify-center items-center text-xl flex-col gap-1 bg-zinc-200 min-w-[320px] md:min-h-[400px] min-h-[300px] rounded-sm hover:border-1 border-zinc-300 p-1 max-w-[400px] max-h-[400px] object-contain"
                        />
                      )}
                      {selectedFile !== null && selectedFile && (
                        <div
                          className="btn w-full py-1 px-4 text-2xl"
                          onClick={newStory}
                        >
                          Post Story
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NewStoryModal;
