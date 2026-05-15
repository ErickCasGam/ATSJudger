"use client";

import { useEffect, useState } from "react";

import Skull from "./Skull";
import Terminal from "./Terminal";
import UploadButton from "./UploadButton";
import BackgroundLogs from "./BackgroundLogs";

import CaptchaSalary from "./captcha-1";
import CaptchaSelfworth from "./captcha-2";
import CaptchaWaiting from "./captcha-3";

import { cvAnalysisRules } from "@/data/cvAnalysisRules";
import { defaultTerminalMessages } from "@/data/defaultTerminalMessages";
import { noTextMessages } from "@/data/noTextMessages";

import FinalVerdict from "./FinalVerdict";

export default function MainSystem() {
  // =========================
  // CV DATA
  // =========================
  const [uploadedText, setUploadedText] = useState("");
  const [fileName, setFileName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // =========================
  // TERMINAL
  // =========================
  const [logs, setLogs] = useState<string[]>([
    "> waiting for disappointment...",
    "> neural recruiter sleeping...",
    "> no victims detected...",
  ]);

  const [progress, setProgress] = useState(0);

  // =========================
  // SKULL
  // =========================
  const [talking, setTalking] = useState(false);

  // =========================
  // CAPTCHA
  // =========================
  const [currentCaptcha, setCurrentCaptcha] =
    useState<number | null>(null);

  const captchaPoints = [29, 57, 82];

  const [captchaOrder] = useState(() =>
    [1, 2, 3].sort(() => Math.random() - 0.5)
  );

  // =========================
  // FINAL SCREEN
  // =========================
  const [showVerdict, setShowVerdict] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  // =========================
  // ANALYSIS MESSAGE
  // =========================
  function generateAnalysisMessage(text: string) {
    if (text.trim().length < 40) {
      return noTextMessages[
        Math.floor(Math.random() * noTextMessages.length)
      ];
    }

    const lowerText = text.toLowerCase();

    for (const rule of cvAnalysisRules) {
      for (const keyword of rule.keywords) {
        if (lowerText.includes(keyword.toLowerCase())) {
          return rule.responses[
            Math.floor(Math.random() * rule.responses.length)
          ];
        }
      }
    }

    return defaultTerminalMessages[
      Math.floor(Math.random() * defaultTerminalMessages.length)
    ];
  }

  // =========================
  // PROCESS LOOP
  // =========================
  useEffect(() => {
    if (!isProcessing || showVerdict) return;

    const interval = setInterval(() => {
      if (currentCaptcha !== null) return;

      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          const score = Math.floor(Math.random() * 20) + 1;
          setFinalScore(score);
          setShowVerdict(true);
          setIsProcessing(false);

          return 100;
        }

        const nextProgress = prev + Math.floor(Math.random() * 3);

        // CAPTCHA TRIGGERS
        captchaPoints.forEach((point, index) => {
          if (prev < point && nextProgress >= point) {
            setCurrentCaptcha(captchaOrder[index]);

            setLogs((prev) => [
              ...prev,
              "> human verification required...",
              "> emotional instability detected...",
            ]);
          }
        });

        // TALKING EFFECT
        setTalking(true);
        setTimeout(() => setTalking(false), 120);

        // RANDOM LOGS
        if (Math.random() < 0.4) {
          setLogs((prev) => [
            ...prev,
            `> ${generateAnalysisMessage(uploadedText)}`,
          ].slice(-14));
        }

        return Math.min(nextProgress, 100);
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isProcessing, uploadedText, currentCaptcha, showVerdict, captchaOrder]);

  // =========================
  // FINAL SCREEN
  // =========================
  if (showVerdict) {
    return (
      <FinalVerdict
        score={finalScore}
        onRetry={() => window.location.reload()}
      />
    );
  }

  // =========================
  // MAIN UI
  // =========================
  return (
    <main className="relative min-h-screen bg-black overflow-hidden text-red-500 flex items-center justify-center px-6">

      <BackgroundLogs intensity="low" />

      {/* CAPTCHAS */}
      {currentCaptcha === 1 && (
        <CaptchaSalary onSuccess={() => setCurrentCaptcha(null)} />
      )}

      {currentCaptcha === 2 && (
        <CaptchaSelfworth onSuccess={() => setCurrentCaptcha(null)} />
      )}

      {currentCaptcha === 3 && (
        <CaptchaWaiting onSuccess={() => setCurrentCaptcha(null)} />
      )}

      <div className="relative z-10 flex flex-col items-center">

        <div className="mb-4 text-center">
          <h1 className="text-6xl font-bold tracking-[0.4em] text-red-500">
            ATS
          </h1>
          <p className="text-red-700 tracking-[0.5em] text-sm mt-2 uppercase font-bold">
            Judger.exe
          </p>
        </div>

        <div className="-mt-4">
          <Skull talking={talking} />
        </div>

        {!isProcessing && (
          <UploadButton
            onUpload={(text, name) => {
              setUploadedText(text);
              setFileName(name);
              setProgress(0);
              setLogs([
                `> reading file: ${name}`,
                "> scanning emotional damage...",
              ]);
              setIsProcessing(true);
            }}
          />
        )}

        {isProcessing && (
          <p className="mt-4 text-red-700 font-mono animate-pulse">
            ANALYZING SOUL...
          </p>
        )}

        <Terminal logs={logs} progress={progress} />
      </div>
    </main>
  );
}