import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

const WebCam = ({ classes, audio, video, mirror }) => {
  const webcamRef = useRef(null);
  const [cameraPermission, setCameraPermission] = useState(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, voice: true })
      .then(() => {
        setCameraPermission(true);
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });
  }, []);

  return (
    <div className={classes}>
      {cameraPermission ? (
        video ? (
          <Webcam
            width="100%"
            audio={audio}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            mirrored={mirror}
            className={`${
              video ? "hidden" : "block"
            } h-full bg-black object-contain `}
          />
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
