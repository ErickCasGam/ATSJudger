"use client";

import { useEffect, useState } from "react";
import { fakeProfiles } from "@/data/fakeProfiles";

type BackgroundLogsProps = {
  intensity?: "low" | "medium" | "strong";
};

export default function BackgroundLogs({
  intensity = "medium",
}: BackgroundLogsProps) {
  const [logs, setLogs] = useState<string[]>([]);

  const opacityMap = {
    low: "opacity-[0.1]",
    medium: "opacity-[0.4]",
    strong: "opacity-[1]",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const profile =
        fakeProfiles[
          Math.floor(Math.random() * fakeProfiles.length)
        ];

      let currentText = "";
      let charIndex = 0;

      setLogs((prev) => [...prev, ""]);

      const typingInterval = setInterval(() => {
        currentText += profile[charIndex];

        setLogs((prev) => {
          const updated = [...prev];

          updated[updated.length - 1] = currentText;

          return updated.slice(-14);
        });

        charIndex++;

        if (charIndex >= profile.length) {
          clearInterval(typingInterval);
        }
      }, 10);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.08),transparent_70%)]" />

      <div
        className={`absolute inset-0 ${opacityMap[intensity]} text-red-500 font-mono text-xs tracking-wider p-8 leading-6 whitespace-pre-wrap`}
      >
        {logs.map((log, index) => (
          <p
            key={index}
            className="animate-pulse"
          >
            {">"} {log}
          </p>
        ))}
      </div>

      {/* scanlines */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, transparent 50%, rgba(255,0,0,0.08) 51%)",
          backgroundSize: "100% 4px",
        }}
      />
    </div>
  );
}