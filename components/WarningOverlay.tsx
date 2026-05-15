"use client";

import Image from "next/image";

type WarningOverlayProps = {
  message: string;
  isGlitching?: boolean;
};

export default function WarningOverlay({
  message,
  isGlitching = false,
}: WarningOverlayProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">

      {/* BACKDROP (OPTIMIZED) */}
      <div className="absolute inset-0 bg-black/60" />

      {/* BLUR LAYER SEPARADO (MUCHO MÁS BARATO) */}
      <div className="absolute inset-0 backdrop-blur-[2px]" />

      {/* CONTENT */}
      <div
        className={`
          relative w-[70%]
          flex flex-col items-center justify-center
          will-change-transform
          ${isGlitching ? "animate-pulse" : ""}
        `}
      >

        {/* WARNING IMAGE (OPTIMIZED NEXT IMAGE) */}
        <div className="relative w-[420px] max-w-[90vw] h-[420px] -translate-y-40">
          <Image
            src="/images/warning.png"
            alt="Warning"
            fill
            priority
            sizes="(max-width: 768px) 90vw, 420px"
            className={`
              object-contain
              select-none
              pointer-events-none
              ${isGlitching ? "opacity-90" : "opacity-100"}
            `}
          />
        </div>

        {/* MESSAGE BOX */}
        <div className="absolute inset-0 flex items-center justify-center px-10 translate-y-20">

          <div
            className="
              bg-black/95
              border border-red-500
              px-8 py-6
              max-w-[70%]
              shadow-[0_0_20px_rgba(255,0,0,0.25)]
              will-change-transform
            "
          >
            <p
              className={`
                text-red-400
                font-mono text-center
                text-lg md:text-2xl
                tracking-widest
                leading-relaxed
                drop-shadow-[0_0_6px_rgba(255,0,0,0.8)]
              `}
            >
              {message}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}