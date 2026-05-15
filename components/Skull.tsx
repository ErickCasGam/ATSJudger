"use client";

import { useEffect, useState } from "react";

type SkullProps = {
  talking?: boolean;
};

export default function Skull({ talking = false }: SkullProps) {
  const [isDemon, setIsDemon] = useState(false);
  const [glitch, setGlitch] = useState(false);

  // 👹 RANDOM DEMON SHIFT (cada 5-10s)
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);

      setTimeout(() => {
        setIsDemon((prev) => !prev);
        setGlitch(false);
      }, 180);
    }, Math.random() * 5000 + 5000); // 5–10s

    return () => clearInterval(interval);
  }, []);

  // 👄 TALKING PULSE (solo cuando terminal activa)
  const talkingClass = talking
    ? "animate-[pulse_0.15s_infinite]"
    : "";

  return (
    <div className="relative w-[500px] h-[500px] flex items-center justify-center overflow-visible">

      {/* GLOW */}
      <div className="absolute w-72 h-72 bg-red-500/20 blur-3xl rounded-full animate-pulse" />

      {/* GLITCH FLASH OVERLAY */}
      {glitch && (
        <div className="absolute inset-0 bg-red-500/30 mix-blend-screen animate-pulse z-30" />
      )}

      {/* SKULL / DEMON */}
      <img
        src={
          isDemon
            ? "/images/demon.png"
            : talking
            ? "/images/skull-open.png"
            : "/images/skull-closed.png"
        }
        alt="Skull"
        className={`
          relative z-10 w-full h-full object-contain select-none pointer-events-none
          transition-all duration-150
          ${talkingClass}
          ${glitch ? "translate-x-[2px] translate-y-[1px]" : ""}
        `}
      />

      {/* SCANLINES */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, transparent 50%, rgba(255,0,0,0.08) 51%)",
          backgroundSize: "100% 4px",
        }}
      />
    </div>
  );
}