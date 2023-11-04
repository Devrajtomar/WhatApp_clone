import axios from "axios";
import { HiOutlineCamera } from "react-icons/hi2";
import VideoPlayer from "../../containers/Player";
import Title from "./components/Title";
import { useState } from "react";
import { state } from "@/context/store";

const NewStoryModal = () => {
  const { user } = state();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
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
    const reader = new FileReader();

    reader.onload = (e) => {
      setPreview(e.target.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <Title title="Create Story" />
      <div className="mt-4 flex justify-center items-center gap-2 rounded-md border-1 border-emerald-100 h-full">
        <div className="flex-grow h-full flex flex-col justify-center items-center">
          <label
            htmlFor="file"
            className="flex justify-center items-center text-xl flex-col gap-1 bg-zinc-200 min-w-[320px] md:min-w-[400px] min-h-[500px] h-full rounded-sm hover:border-1 border-zinc-300 "
          >
            <HiOutlineCamera />
            <div>{preview !== null ? "Change Story" : "Create Story"}</div>
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
            {selectedFile.type === "video/mp4" && (
              <VideoPlayer Source={preview} />
            )}
            {selectedFile.type === "image/jpeg" && (
              <img
                src={preview}
                alt="Story/Image"
                className="flex justify-center items-center text-xl flex-col gap-1 bg-zinc-200 min-w-[320px] md:min-h-[400px] min-h-[300px] rounded-sm hover:border-1 border-zinc-300 p-1 max-w-[400px] max-h-[400px] object-contain"
              />
            )}
            {selectedFile !== null && (
              <div className="btn w-full py-1 px-4 text-2xl" onClick={newStory}>
                Post Story
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default NewStoryModal;
