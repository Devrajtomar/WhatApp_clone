import React, { useEffect } from "react";

const JitsiContainer = ({ roomName }) => {
  useEffect(() => {
    const domain = "meet.jit.si";
    const options = {
      roomName: "First app", // Replace with your desired room name
      width: "100%",
      height: "100%",
    };

    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = () => {
      const { JitsiMeetExternalAPI } = window;
      new JitsiMeetExternalAPI(domain, options);
    };
    const container = document.getElementById("jitsi-container");
    container.appendChild(script);
  }, []);

  return <div id="jitsi-container" />;
};

export default JitsiContainer;
