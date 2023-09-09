import { useState } from "react";
import WebCam from "./Main/WebCam";
import {
  MdCall,
  MdSpeaker,
  MdVideoCall,
  MdVideocam,
  MdVideocamOff,
} from "react-icons/md";

const CallsSpace = () => {
  const [video, setVideo] = useState(true);
  const [voice, setVoice] = useState(true);

  return (
    <div className="page">
      <WebCam classes="w-full h-full " video={video} />
      <div className="rounded-md py-2 text-white flex justify-center items-center gap-2 bg-black z-40 absolute w-full h-fit bottom-0 left-0">
        {voice ? (
          <MdSpeaker
            className="CallIcon"
            size={40}
            onClick={() => setVoice(false)}
            style={{ backgroundColor: "white", color: "black" }}
          />
        ) : (
          <MdSpeaker
            className="CallIcon"
            size={40}
            onClick={() => setVoice(true)}
            style={{ backgroundColor: "gray", color: "white" }}
          />
        )}
        {video ? (
          <MdVideocam
            className="CallIcon"
            size={40}
            onClick={() => setVideo(false)}
            style={{ backgroundColor: "white", color: "black" }}
          />
        ) : (
          <MdVideocamOff
            className="CallIcon"
            size={40}
            onClick={() => setVideo(true)}
            style={{ backgroundColor: "gray", color: "white" }}
          />
        )}
        <MdCall
          className="bg-rose-500 hover:bg-red-400 p-1 rounded-full w-[70px] h-fit"
          size={40}
        />
      </div>
      <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center flex-col">
        <img
          src="/DefaultUser.jpg"
          className="w-[150px] h-[150px] rounded-full border border-zinc-200 absolute"
        />
        <div className="heading_1 text-white">Name</div>
      </div>
    </div>
  );
};

export default CallsSpace;
