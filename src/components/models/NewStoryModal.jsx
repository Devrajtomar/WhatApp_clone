import { Dialog, Transition } from "@headlessui/react";
import { modal } from "../../context/store";
import React, { Fragment, useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";
import { HiDocumentAdd } from "react-icons/hi";

const NewStoryModal = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const { NewStory, setNewStory } = modal();

  const newStory = async () => {
    const reader = new FileReader();

    reader.onload = (e) => {
      setPreview(e.target.result);
    };

    const DataUrl = reader.readAsDataURL(selectedFile);
    const Type = selectedFile.type;

    if (preview !== "") {
      const story = await axios.post("/api/stories/newStory", {
        Type,
        DataUrl: preview,
      });
      console.log(story);
    }
  };
  if (selectedFile !== null) {
    newStory();
  }
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
                    <div>Create Group</div>
                    <AiOutlineCloseCircle
                      size={27}
                      onClick={() => setNewStory(false)}
                      className="hover:bg-white hover:text-black hover:scale-105 cursor-pointer"
                    />
                  </div>
                </Dialog.Title>
                <div className="mt-4 flex justify-center items-start gap-1 p-2 rounded-md border-1 border-emerald-100 w-full h-full">
                  <div>
                    <label
                      htmlFor="inputStory"
                      className="w-full h-full min-w-[320px] min-h-[400px] bg-slate-200 rounded-sm border-[1px] border-zinc-100 cursor-pointer flex flex-col justify-center items-center"
                    >
                      <HiDocumentAdd />
                      <div>Create Story</div>
                    </label>
                    {preview !== "" && <video src={preview} controls />}
                    <input
                      type="file"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                      // className="fixed left-[9999999999px] top-[9999999px]"
                      id="inputStory"
                    />
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

export default NewStoryModal;
