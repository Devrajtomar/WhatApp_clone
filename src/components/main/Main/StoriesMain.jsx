import { state } from "@/context/store";
import React, { useState } from "react";
import { BsArrowLeft, BsThreeDots } from "react-icons/bs";

const StoriesMain = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const { setIsOpen, currentStoryUser, setStoryUser } = state();

  const stories = currentStoryUser.Stories;
  const lines = [];
  for (let i = 0; i < stories.length; i++) {
    lines.push(i);
  }
  const names = currentStoryUser.Name.split(" ");
  const firstLetter = names[0][0];
  const lastLetter = names[names.length - 1][0];

  return (
    <div className="page">
      <div className="w-full h-full md:min-w-[600px] text-white flex justify-center items-center">
        <div className="w-full h-full bg-black rounded-md relative">
          <div className="w-full flex justify-between items-center bg-transparent absolute top-1 left-0 p-1 z-[999]">
            <div className="flex-grow flex justify-start items-center gap-2.5">
              <BsArrowLeft
                className="icon"
                color="black"
                size={40}
                onClick={() => {
                  setStoryUser(null);
                  setIsOpen(true);
                }}
              />
              {currentStoryUser.image ? (
                <Image
                  src={
                    currentStoryUser.image
                      ? currentStoryUser.image
                      : "/DefaultUser.jpg"
                  }
                  alt={currentStoryUser.Name}
                  height="40"
                  width="40"
                  className="rounded-full object-cover h-[50px] w-[50px]"
                  //onClick={() => setImage(true)}
                />
              ) : (
                <div
                  className="rounded-full object-cover h-[50px] min-w-[50px] bg-zinc-300 text-xl font-bold font-serif flex justify-center items-center text-black"
                  //onClick={() => setImage(true)}
                >
                  {firstLetter + lastLetter}
                </div>
              )}
              <div className="md:heading_3 heading_2 text-white">
                {currentStoryUser.Name}
              </div>
            </div>
            <BsThreeDots className="icon" color="black" size={40} />
          </div>
          <div className="h-full w-full relative flex justify-center items-center  z-[333]">
            <div className="absolute top-0.5 left-0 flex justify-start items-center w-full h-fit gap-1 z-[777]">
              {lines.map((i) => (
                <div
                  key={`Story No. ${i}`}
                  className={`h-1 rounded-full w-full ${
                    currentStory === i
                      ? "bg-zinc-600 bg-opacity-75 "
                      : "bg-white"
                  }`}
                  onClick={() => setCurrentStory(i)}
                />
              ))}
            </div>
            <div
              className="absolute top-0 left-0 flex justify-start items-center w-full h-full gap-1 "
              onClick={() => {
                if (currentStory === lines.length - 1) {
                  return setCurrentStory(0);
                }
                if (currentStory <= lines.length - 1) {
                  return setCurrentStory(currentStory + 1);
                }
              }}
            >
              {stories[currentStory].type === "video" && (
                <video
                  className="w-full h-full object-contain "
                  src={stories[currentStory].DataUrl}
                  autoPlay
                />
              )}
              {stories[currentStory].type === "image" && (
                <img
                  className="w-full h-full object-contain "
                  src={stories[currentStory].DataUrl}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoriesMain;
