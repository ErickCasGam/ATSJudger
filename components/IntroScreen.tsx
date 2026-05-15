"use client";

import { useEffect, useState } from "react";
import { atsMeanings } from "@/data/atsMeanings";
import { fakeProfiles } from "@/data/fakeProfiles";
import BackgroundLogs from "./BackgroundLogs";

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

type IntroScreenProps = {
  onAccept: () => void;
};

export default function IntroScreen({
  onAccept,
}: IntroScreenProps) {
  const [meaning, setMeaning] = useState("");
  const [displayedMeaning, setDisplayedMeaning] = useState("");

  // GLITCH ATS TEXT
  useEffect(() => {
    const updateMeaning = () => {
      const randomMeaning =
        atsMeanings[Math.floor(Math.random() * atsMeanings.length)];

      let glitchCount = 0;

      const glitchInterval = setInterval(() => {
        setDisplayedMeaning(corruptText(randomMeaning));

        glitchCount++;

        if (glitchCount > 6) {
          clearInterval(glitchInterval);

          setDisplayedMeaning(randomMeaning);
          setMeaning(randomMeaning);
        }
      }, 80);
    };

    updateMeaning();

    const interval = setInterval(updateMeaning, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-red-500 flex items-center justify-center overflow-hidden p-6">

      {/* BACKGROUND TERMINAL */}
      <BackgroundLogs intensity="strong" />

      {/* MAIN PANEL */}
      <div className="relative z-10 border border-red-500 p-8 max-w-2xl w-full bg-black/80 backdrop-blur-sm shadow-[0_0_40px_rgba(255,0,0,0.2)]">

        <h1 className="text-5xl font-bold mb-6 font-[family-name:var(--font-orbitron)] tracking-widest text-red-500">
          ATSJudger.exe
        </h1>
        <p className="mb-4 text-red-400 font-mono animate-pulse">
          ATS = {displayedMeaning || meaning}
        </p>

        <div className="space-y-3 text-zinc-300 text-sm">
          <p>
            This experimental recruitment analysis software may cause:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Emotional damage</li>
            <li>AIDS</li>
            <li>Temporary ego collapse</li>
            <li>Corporate humiliation</li>
            <li>LinkedIn depression</li>
            <li>Skill issue exposure</li>
            <li>Psychological instability</li>
            <li>Data Selling</li>
          </ul>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={onAccept}
            className="border border-red-500 px-6 py-3 hover:bg-red-500 hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_red]"
          >
            ACCEPT FATE
          </button>

          <button className="border border-zinc-700 px-6 py-3 text-zinc-600 cursor-not-allowed">
            CRY
          </button>
          <a
            href="https://buymeacoffee.com/dazeddevs"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-zinc-700 px-6 py-3 text-zinc-600 hover:text-red-400 hover:border-red-500 transition-all"
            >
            DONATE
            </a>
        </div>
      </div>
    </main>
  );
}