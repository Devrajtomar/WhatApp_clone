import { useState } from "react";
import WebCam from "./Main/WebCam";
import {
  MdCall,
  MdVideocam,
  MdVideocamOff,
  MdVolumeOff,
  MdVolumeUp,
} from "react-icons/md";
import { state } from "@/context/store";

const CallsSpace = () => {
  const { setIsOpen } = state();
  const [video, setVideo] = useState(true);
  const [voice, setVoice] = useState(true);
  const EndCall = () => {
    if (window.innerWidth <= 800) {
      return setIsOpen(true);
    }
  };
  return (
    <div className="page">
      <WebCam classes="w-full h-full " video={video} />
      <div className="rounded-md py-2 text-white flex justify-center items-center gap-2 bg-black z-40 absolute w-full h-fit bottom-0 left-0">
        {voice ? (
          <MdVolumeUp
            className="CallIcon"
            size={30}
            onClick={() => setVoice(false)}
            style={{ backgroundColor: "white", color: "black" }}
            title="voice off"
          />
        ) : (
          <MdVolumeOff
            className="CallIcon"
            size={30}
            onClick={() => setVoice(true)}
            style={{ backgroundColor: "gray", color: "white" }}
            title="voice on"
          />
        )}
        {video ? (
          <MdVideocam
            className="CallIcon"
            size={30}
            onClick={() => setVideo(false)}
            style={{ backgroundColor: "white", color: "black" }}
            title="camera off"
          />
        ) : (
          <MdVideocamOff
            className="CallIcon"
            size={30}
            onClick={() => setVideo(true)}
            style={{ backgroundColor: "gray", color: "white" }}
            title="camera on"
          />
        )}
        <MdCall
          className="bg-rose-500 hover:bg-red-400 p-1 rounded-full w-[70px] h-[30px] cursor-pointer"
          size={40}
          onClick={EndCall}
        />
      </div>
      <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center flex-col">
        <img
          src="/DefaultUser.jpg"
          className="w-[120px] h-[120px] rounded-full border border-zinc-200"
        />
        <div className="heading_1 text-white">Devraj</div>
      </div>
    </div>
  );
};

export default CallsSpace;
