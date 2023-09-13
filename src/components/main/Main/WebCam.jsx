import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

const WebCam = ({ classes, audio, video, mirror }) => {
  const [cameraPermission, setCameraPermission] = useState(false);

  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      setCameraPermission(true);
      const container = document.getElementById("video");
      console.log(container);
      container.srcObject = stream;
      container.play();
    })
    .catch((error) => {
      console.error("Error accessing camera:", error);
    });

  return (
    <div className={classes}>
      {cameraPermission ? (
        video ? (
          <video id="video" className="h-full w-full bg-black object-contain" />
        ) : (
          <div className="w-full h-full bg-black object-contain flex justify-center items-center" />
        )
      ) : (
        <p className="w-full h-full bg-black object-contain flex justify-center items-center">
          Camera access denied or not available.
        </p>
      )}
    </div>
  );
};

export default WebCam;
