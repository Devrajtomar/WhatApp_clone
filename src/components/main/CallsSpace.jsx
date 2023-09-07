import { MdCall, MdSpeaker, MdVideoCall } from "react-icons/md";

const CallsSpace = () => {
  const frame = document.querySelector("body>iframe#jitsiConferenceFrame0");
  const container = document.querySelector(".page > #CallContainer");
  console.log({ frame });
  console.log({ container });
  if (frame !== null && container !== null) {
    console.log("Fonction runs");
    container.append(frame);
  }
  //if (frame) {
  //  frame.remove();
  //}

  return (
    <div className="page">
      <div className="w-full h-full rounded-md p-1 text-white flex justify-center items-center bg-black">
        <img
          src="/DefaultUser.jpg"
          className="w-[150px] h-[150px] rounded-full border border-zinc-200"
        />
        <div className="heading_1">Name</div>
        <div className="flex justify-center items-center flex-col gap-2">
          <div className="flex justify-center items-center flex-col gap-2">
            <MdSpeaker className="icon" size={40} />
            <MdVideoCall className="icon" size={40} />
          </div>
          <div className="flex justify-center items-center flex-col gap-2">
            <MdCall
              className="rounded-full p-1 bg-red-600 hover:bg-red-500 "
              size={40}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallsSpace;
