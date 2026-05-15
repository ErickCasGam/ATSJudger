"use client";

import { useState } from "react";

import WarningOverlay from "./WarningOverlay";

import { captcha1Options } from "@/data/captcha1Responses";

type CaptchaSalaryProps = {
  onSuccess: () => void;
};

export default function CaptchaSalary({
  onSuccess,
}: CaptchaSalaryProps) {
  const [selectedOption, setSelectedOption] =
    useState("");

  const [warningMessage, setWarningMessage] =
    useState("");

  const [showWarning, setShowWarning] =
    useState(false);

  const [isGlitching, setIsGlitching] =
    useState(false);

  const handleCheck = () => {
    const selected =
      captcha1Options.find(
        (option) =>
          option.label === selectedOption
      );

    if (!selected) return;

    // SUCCESS
    if (selected.success) {
      const successMessage =
        selected.successResponses[
          Math.floor(
            Math.random() *
              selected.successResponses.length
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

    // FAIL
    const failResponses =
      selected.failResponses || [];

    const failMessage =
      failResponses[
        Math.floor(
          Math.random() *
            failResponses.length
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

        {/* WINDOW */}
        <div className="relative w-[650px] max-w-[92vw] border border-red-500 bg-black shadow-[0_0_40px_rgba(255,0,0,0.4)] overflow-hidden">

          {/* TOP BAR */}
          <div className="flex items-center justify-between border-b border-red-900 px-4 py-2 bg-red-950/40">

            <p className="font-mono text-red-400 text-sm tracking-widest">
              HUMAN VERIFICATION.exe
            </p>

            <span className="text-red-700 text-xs">
              salary_expectation.dll
            </span>
          </div>

          {/* CONTENT */}
          <div className="p-8">

            <h2 className="text-2xl text-red-500 font-bold mb-3 font-[family-name:var(--font-orbitron)]">
              Select your realistic salary expectations
            </h2>

            <p className="text-zinc-400 mb-8 text-sm">
              This emotional calibration process
              ensures compatibility with the
              modern hiring ecosystem.
            </p>

            {/* SELECT */}
            <div className="flex flex-col items-center">

              <select
                value={selectedOption}
                onChange={(e) =>
                  setSelectedOption(
                    e.target.value
                  )
                }
                className="
                  w-full
                  border
                  border-red-900
                  bg-black
                  px-5
                  py-4
                  text-red-400
                  font-mono
                  outline-none
                  focus:border-red-500
                  shadow-[0_0_15px_rgba(255,0,0,0.2)]
                "
              >
                <option value="">
                  Select your future disappointment
                </option>

                {captcha1Options.map(
                  (option) => (
                    <option
                      key={option.label}
                      value={option.label}
                    >
                      {option.label}
                    </option>
                  )
                )}
              </select>

              {/* BUTTON */}
              <button
                onClick={handleCheck}
                disabled={!selectedOption}
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
                  disabled:opacity-40
                  disabled:cursor-not-allowed
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