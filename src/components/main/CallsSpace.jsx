import JitsiContainer from "@/utils/Calls";
import Jitsi from "../../styles/Jitsi";
import React, { useState } from "react";

const CallsSpace = () => {
  Jitsi();

  return (
    <div className="page">
      <JitsiContainer />
      <div id="CallContainer"></div>
    </div>
  );
};

export default CallsSpace;
