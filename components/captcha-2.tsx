"use client";

import { useState } from "react";

import WarningOverlay from "./WarningOverlay";

import {
  validSelfEsteemResponses,
  invalidSelfEsteemResponses,
} from "@/data/captcha2Responses";

type CaptchaSelfEsteemProps = {
  onSuccess: () => void;
};

export default function CaptchaSelfEsteem({
  onSuccess,
}: CaptchaSelfEsteemProps) {
  const [value, setValue] = useState(50);

  const [warningMessage, setWarningMessage] =
    useState("");

  const [showWarning, setShowWarning] =
    useState(false);

  const [isGlitching, setIsGlitching] =
    useState(false);

  const handleCheck = () => {
    // VALID RANGE
    if (value >= 1 && value <= 12) {
      const successMessage =
        validSelfEsteemResponses[
          Math.floor(
            Math.random() *
              validSelfEsteemResponses.length
          )
        ];

      setWarningMessage(successMessage);

      setShowWarning(true);
      setIsGlitching(false);

      setTimeout(() => {
        onSuccess();
      }, 1800);

      return;
    }

    // INVALID
    const failMessage =
      invalidSelfEsteemResponses[
        Math.floor(
          Math.random() *
            invalidSelfEsteemResponses.length
        )
      ];

    setWarningMessage(failMessage);

    setShowWarning(true);
    setIsGlitching(true);

    setTimeout(() => {
      setShowWarning(false);
      setIsGlitching(false);
    }, 5000);
  };

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

        {/* VIRUS POPUP */}
        <div className="relative w-[650px] max-w-[92vw] border border-red-500 bg-black shadow-[0_0_40px_rgba(255,0,0,0.4)] overflow-hidden">

          {/* TOP BAR */}
          <div className="flex items-center justify-between border-b border-red-900 px-4 py-2 bg-red-950/40">

            <p className="font-mono text-red-400 text-sm tracking-widest">
              HUMAN VERIFICATION.exe
            </p>

            <span className="text-red-700 text-xs">
              selfworth_calibration.dll
            </span>
          </div>

          {/* CONTENT */}
          <div className="p-8">

            <h2 className="text-2xl text-red-500 font-bold mb-3 font-[family-name:var(--font-orbitron)]">
              Drag your self-esteem to the current market average
            </h2>

            <p className="text-zinc-400 mb-8 text-sm">
              This emotional calibration test ensures
              compatibility with modern corporate despair.
            </p>

            {/* SLIDER */}
            <div className="flex flex-col items-center">

              <div className="mb-6 text-center">
                <p className="text-red-400 font-mono text-6xl tracking-widest drop-shadow-[0_0_12px_red]">
                  {value}%
                </p>

                <p className="text-zinc-500 text-xs mt-2 uppercase tracking-[0.3em]">
                  detected self-worth
                </p>
              </div>

              <input
                type="range"
                min="1"
                max="100"
                value={value}
                onChange={(e) =>
                  setValue(Number(e.target.value))
                }
                className="
                  w-full
                  accent-red-500
                  cursor-pointer
                "
              />

              {/* LOW SELF ESTEEM ZONES */}
              <div className="flex justify-between w-full mt-2 text-xs font-mono text-zinc-600">
                <span>broken</span>
                <span>delusional</span>
              </div>

              {/* BUTTON */}
              <button
                onClick={handleCheck}
                className="
                  mt-10
                  border
                  border-red-500
                  bg-black
                  px-8
                  py-4
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
                "
              >
                Validate Humanity
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