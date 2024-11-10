"use client";

import Image from "next/image";
import { useState } from "react";

export default function Block() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
  };

  return (
    <div>
      <h2>Live Video Stream</h2>
      {!isPlaying ? (
        <button
          onClick={handlePlay}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Play Stream
        </button>
      ) : (
        <>
          {/* <img
            src="/api/cctv"
            alt="Live Stream"
            style={{ width: "100%", height: "auto" }}
          /> */}
          <Image src="/api/cctv" alt="cctv stream" width={100} height={100} />
          <button
            onClick={handleStop}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              marginTop: "10px",
            }}
          >
            Stop Stream
          </button>
        </>
      )}
    </div>
  );
}
