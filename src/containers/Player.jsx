import React from "react";
import {
  Player,
  ControlBar,
  PlayToggle,
  BigPlayButton,
  VolumeMenuButton,
} from "video-react";

import "video-react/dist/video-react.css"; // Import default styles

function VideoPlayer({ Source }) {
  return (
    <div className="min-w-[400px] min-h-[300px]">
      <Player //</div>poster={posterImage}>
      >
        <source src={Source} />
        <BigPlayButton position="center" />
        <VolumeMenuButton position="left bottom" />
        <ControlBar>
          <PlayToggle />
          {/* Add more control buttons here */}
        </ControlBar>
      </Player>
    </div>
  );
}

export default VideoPlayer;
