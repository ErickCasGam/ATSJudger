"use client";

import { useEffect, useState } from "react";
import BackgroundLogs from "./BackgroundLogs";
import { verdictResponses } from "@/data/verdictResponses";

const glitchChars = "!@#$%^&*()_+-=[]{}|;:<>?/█▓▒░";

function corruptText(text: string) {
  return text
    .split("")
    .map((char) => {
      if (Math.random() < 0.12 && char !== " ") {
        return glitchChars[
          Math.floor(Math.random() * glitchChars.length)
        ];
      }
      return char;
    })
    .join("");
}

type Props = {
  score: number;
  onRetry: () => void;
};

export default function FinalVerdict({
  score,
  onRetry,
}: Props) {
  const [displayed, setDisplayed] = useState("");
  const [verdict, setVerdict] = useState("");

  useEffect(() => {
    // pick deterministic-ish verdict based on score
    const index = Math.min(
      verdictResponses.length - 1,
      Math.floor((score / 20) * verdictResponses.length)
    );

    const v = verdictResponses[index];

    setVerdict(v);

    let count = 0;

    const interval = setInterval(() => {
      setDisplayed(corruptText(v));
      count++;

      if (count > 8) {
        clearInterval(interval);
        setDisplayed(v);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [score]);

  return (
    <main className="relative min-h-screen bg-black text-red-500 flex items-center justify-center overflow-hidden p-6">

      <BackgroundLogs intensity="strong" />

      <div className="relative z-10 border border-red-500 p-10 max-w-2xl w-full bg-black/80 backdrop-blur-sm shadow-[0_0_50px_rgba(255,0,0,0.25)]">

        <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-red-500 mb-6">
          FINAL VERDICT.exe
        </h1>

        {/* SCORE REAL */}
        <div className="mb-6">
          <p className="text-sm text-zinc-400 uppercase tracking-[0.3em]">
            Your eligibility for work is
          </p>

          <p className="text-6xl font-bold text-red-400 drop-shadow-[0_0_15px_red]">
            {score}%
          </p>
        </div>

        {/* VERDICT */}
        <div className="border border-red-900 bg-black p-4 mb-8 min-h-[80px] flex items-center">
          <p className="font-mono text-red-400">
            {displayed}
          </p>
        </div>

        {/* DISCLAIMER */}
        <div className="text-zinc-400 text-sm mb-8 space-y-2">
          <p>System has completed emotional analysis.</p>
          <p>Result is final and legally insulting.</p>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4">

          <button
            onClick={onRetry}
            className="
              border border-red-500 px-6 py-3
              hover:bg-red-500 hover:text-black
              transition-all duration-300
            "
          >
            REPROVE
          </button>

          <a
            href="https://buymeacoffee.com/dazeddevs"
            target="_blank"
            className="
              border border-zinc-700 px-6 py-3
              text-zinc-400
              hover:text-red-400 hover:border-red-500
              transition-all
            "
          >
            DONATE
          </a>

        </div>
      </div>
    </main>
  );
}