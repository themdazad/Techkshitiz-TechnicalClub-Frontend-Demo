import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";

function LiveStream({ videoIdProps }) {
  const [width, setwidth] = useState("");
  const [height, setHeight] = useState("");
  useEffect(() => {
    if (window.screen.width <= 1600 && window.screen.width >= 1000) {
      setwidth("1000");
    } else if (window.screen.width <= 1000 && window.screen.width >= 800) {
      setwidth("800");
    } else if (window.screen.width <= 800 && window.screen.width >= 500) {
      setwidth("500");
    } else if (window.screen.width <= 500 && window.screen.width >= 200) {
      setwidth(String(window.screen.width - 50));
    }
    if (window.screen.height <= 1600 && window.screen.width >= 800) {
      setHeight("500");
    } else if (window.screen.height <= 1000 && window.screen.width >= 800) {
      setHeight("400");
    } else if (window.screen.height <= 800 && window.screen.height >= 500) {
      setHeight("300");
    } else if (window.screen.height <= 500 && window.screen.height >= 200) {
      setHeight("250");
    }
  }, []);
  const opts = {
    height: height,
    width: width,
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <YouTube
      videoId={String(videoIdProps)}
      opts={opts}
      onReady={(event) => {
        event.target.playVideo();
      }}
    />
  );
}

export default LiveStream;
