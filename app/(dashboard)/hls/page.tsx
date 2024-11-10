"use client";

import Hls from "hls.js";
import { useEffect, useRef } from "react";

export default function HLSStream() {
  const videoRef = useRef(null);

  useEffect(() => {
    const hls = new Hls();
    const video = videoRef.current;

    hls.loadSource("http://localhost:5000/hls");
    hls.attachMedia(video);

    return () => {
      hls.destroy();
    };
  }, []);

  return (
    <div>
      <h2>Live Video Stream (HLS)</h2>
      <video
        ref={videoRef}
        autoPlay
        controls
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
}
