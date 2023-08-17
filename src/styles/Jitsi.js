import React from "react";

const Jitsi = () => {
  const jitsi = document.getElementById("jitsiConferenceFrame0");
  const container = document.getElementById("CallContainer");

  if (jitsi) {
    const data = container.appendChild(jitsi);
    //console.log(data);
  }
};

export default Jitsi;
