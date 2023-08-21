import JitsiContainer from "@/utils/Calls";

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
      <div id="CallContainer"></div>
    </div>
  );
};

export default CallsSpace;
