"use client";

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

      {/* BACKDROP BLUR LAYER (ONLY BACKGROUND) */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />

      {/* CONTENT */}
      <div
        className={`
          relative w-[70%]
          flex flex-col items-center justify-center
          ${isGlitching ? "animate-pulse" : ""}
        `}
      >

        {/* WARNING IMAGE */}
        <img
          src="/images/warning.png"
          alt="Warning"
          className={`
            w-[420px]
            max-w-[90vw]
            object-contain
            select-none
            pointer-events-none
            opacity-90
            translate-y-[-10rem]
            ${isGlitching ? "animate-pulse" : ""}
          `}
        />

        {/* MESSAGE BOX */}
        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            px-10
            translate-y-[5rem]
          "
        >
          <div
            className="
              bg-black/95
              border border-red-500
              px-8 py-6
              max-w-[70%]
              shadow-[0_0_30px_rgba(255,0,0,0.35)]
            "
          >
            <p
              className={`
                text-red-400
                font-mono text-center
                text-lg md:text-2xl
                tracking-widest
                leading-relaxed
                drop-shadow-[0_0_10px_rgba(255,0,0,0.9)]
                ${isGlitching ? "animate-pulse" : ""}
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