import JitsiContainer from "@/utils/Calls";
import { useEffect } from "react";

const CallsSpace = () => {
  const frame = document.getElementById("jitsiConferenceFrame0");
  if (frame !== null) {
    const container = document.getElementById("CallContainer");
    container.appendChild(frame);
  }

  return (
    <div className="page">
      <JitsiContainer />
      <div id="CallContainer"></div>
    </div>
  );
};

export default CallsSpace;
