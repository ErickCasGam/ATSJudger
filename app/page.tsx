"use client";

import { useEffect, useRef, useState } from "react";

import IntroScreen from "@/components/IntroScreen";
import MainSystem from "@/components/MainSystem";

export default function Home() {
  const [accepted, setAccepted] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    audioRef.current?.play().catch(() => {
      console.log("Autoplay blocked 💀");
    });
  }, []);

  const handleAccept = () => {
    audioRef.current?.play().catch(() => {});

    setAccepted(true);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/futuristic-hub.mp3"
        loop
      />

      {!accepted ? (
        <IntroScreen onAccept={handleAccept} />
      ) : (
        <MainSystem />
      )}
    </>
  );
}