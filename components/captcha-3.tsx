"use client";

import { useEffect, useRef, useState } from "react";

import WarningOverlay from "./WarningOverlay";

import {
  loadingResponses,
  proceedResponses,
} from "@/data/captcha3Responses";

type CaptchaHoldProps = {
  onSuccess: () => void;
};

export default function CaptchaHold({
  onSuccess,
}: CaptchaHoldProps) {
  const [progress, setProgress] = useState(0);

  const [holding, setHolding] = useState(false);

  const [loadingMessage, setLoadingMessage] =
    useState(
      "Waiting for recruiter response..."
    );

  const [warningMessage, setWarningMessage] =
    useState("");

  const [showWarning, setShowWarning] =
    useState(false);

  const [isGlitching, setIsGlitching] =
    useState(false);

  const completedRef = useRef(false);

  // RANDOM LOADING MESSAGES
  useEffect(() => {
    if (!holding) return;

    const interval = setInterval(() => {
      const randomMessage =
        loadingResponses[
          Math.floor(
            Math.random() *
              loadingResponses.length
          )
        ];

      setLoadingMessage(randomMessage);
    }, 1800);

    return () => clearInterval(interval);
  }, [holding]);

  // PROGRESS SYSTEM
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        // HOLDING
        if (holding) {
          let increase =
            Math.random() * 0.8 + 0.2;

          // RANDOM GLITCH BACK
          if (Math.random() < 0.12) {
            increase -=
              Math.random() * 6;
          }

          const next =
            prev + increase;

          // COMPLETE
          if (
            next >= 100 &&
            !completedRef.current
          ) {
            completedRef.current = true;

            const finalMessage =
              proceedResponses[
                Math.floor(
                  Math.random() *
                    proceedResponses.length
                )
              ];

            setWarningMessage(finalMessage);

            setShowWarning(true);
            setIsGlitching(true);

            setTimeout(() => {
              onSuccess();
            }, 2200);

            return 100;
          }

          return Math.max(
            0,
            Math.min(next, 100)
          );
        }

        // NOT HOLDING
        return Math.max(
          0,
          prev - 1.2
        );
      });
    }, 120);

    return () => clearInterval(interval);
  }, [holding, onSuccess]);

  return (
    <>
      {/* WARNING OVERLAY */}
      {showWarning && (
        <WarningOverlay
          message={warningMessage}
          isGlitching={isGlitching}
        />
      )}

      {/* CAPTCHA */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

        {/* POPUP */}
        <div className="relative w-[700px] max-w-[92vw] border border-red-500 bg-black shadow-[0_0_40px_rgba(255,0,0,0.4)] overflow-hidden">

          {/* TOP BAR */}
          <div className="flex items-center justify-between border-b border-red-900 px-4 py-2 bg-red-950/40">

            <p className="font-mono text-red-400 text-sm tracking-widest">
              HUMAN VERIFICATION.exe
            </p>

            <span className="text-red-700 text-xs">
              recruiter_response.dll
            </span>
          </div>

          {/* CONTENT */}
          <div className="p-8">

            <h2 className="text-2xl text-red-500 font-bold mb-3 font-[family-name:var(--font-orbitron)]">
              Hold Until Recruiters Respond
            </h2>

            <p className="text-zinc-400 mb-8 text-sm">
              Maintain pressure to preserve
              your application status.
            </p>

            {/* PERCENT */}
            <div className="mb-5 text-center">

              <p className="text-red-400 font-mono text-6xl tracking-widest drop-shadow-[0_0_12px_red]">
                {Math.floor(progress)}%
              </p>

              <p className="text-zinc-600 uppercase tracking-[0.3em] text-xs mt-2">
                emotional endurance
              </p>
            </div>

            {/* BAR */}
            <div className="w-full h-6 border border-red-900 bg-black overflow-hidden relative">

              <div
                className={`
                  h-full
                  bg-red-500
                  transition-all
                  duration-100
                  ${
                    holding
                      ? "shadow-[0_0_20px_red]"
                      : ""
                  }
                `}
                style={{
                  width: `${progress}%`,
                }}
              />

              {/* GLITCH FLASH */}
              {holding &&
                Math.random() < 0.08 && (
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                )}
            </div>

            {/* MESSAGE */}
            <div className="mt-5 border border-red-950 bg-black/70 p-4 min-h-[80px] flex items-center">

              <p className="font-mono text-red-400 text-sm animate-pulse">
                {">"} {loadingMessage}
              </p>
            </div>

            {/* BUTTON */}
            <div className="flex justify-center">

              <button
                onMouseDown={() =>
                  setHolding(true)
                }
                onMouseUp={() =>
                  setHolding(false)
                }
                onMouseLeave={() =>
                  setHolding(false)
                }
                onTouchStart={() =>
                  setHolding(true)
                }
                onTouchEnd={() =>
                  setHolding(false)
                }
                className="
                  mt-8
                  border
                  border-red-500
                  bg-black
                  px-10
                  py-5
                  text-red-400
                  tracking-[0.3em]
                  uppercase
                  font-mono
                  hover:bg-red-500
                  hover:text-black
                  transition-all
                  duration-300
                  shadow-[0_0_20px_rgba(255,0,0,0.3)]
                  hover:shadow-[0_0_40px_red]
                  active:scale-[0.98]
                "
              >
                HOLD TO WAIT
              </button>
            </div>
          </div>

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
      </div>
    </>
  );
}