"use client";

type TerminalProps = {
  logs: string[];
  progress: number;
};

export default function Terminal({
  logs,
  progress,
}: TerminalProps) {
  return (
    <div
      className="
        mt-10
        w-[850px]
        max-w-[95vw]
        border
        border-red-900
        bg-black/70
        backdrop-blur-sm
        shadow-[0_0_25px_rgba(255,0,0,0.18)]
        overflow-hidden
      "
    >
      {/* TOP BAR */}
      <div className="flex items-center justify-between border-b border-red-950 bg-red-950/30 px-4 py-2">

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />

          <p className="font-mono text-xs tracking-[0.3em] text-red-400 uppercase">
            ATS Terminal
          </p>
        </div>

        <p className="font-mono text-[10px] text-red-800 tracking-[0.2em]">
          neural_recruiter.exe
        </p>
      </div>

      {/* TERMINAL BODY */}
      <div className="relative h-[100px] overflow-hidden">

        {/* SCANLINES */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none z-20"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, transparent 50%, rgba(255,0,0,0.08) 51%)",
            backgroundSize: "100% 4px",
          }}
        />

        {/* GLOW */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.06),transparent_70%)]" />

        {/* LOGS */}
        <div
          className="
            relative
            z-10
            p-5
            h-full
            overflow-y-auto
            font-mono
            text-sm
            text-red-400
            space-y-2
          "
        >
          {logs.map((log, index) => (
            <p
              key={index}
              className="
                break-words
                animate-pulse
                drop-shadow-[0_0_6px_rgba(255,0,0,0.5)]
              "
            >
              {log}
            </p>
          ))}

          {/* CURSOR */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-red-500">
              {">"}
            </span>

            <div className="w-3 h-5 bg-red-500 animate-pulse shadow-[0_0_10px_red]" />
          </div>
        </div>
      </div>

      {/* PROGRESS SECTION */}
      <div className="border-t border-red-950 bg-black px-5 py-4">

        <div className="flex items-center justify-between mb-2">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-red-700">
            Employability Scan
          </p>

          <p className="font-mono text-red-400 text-sm">
            {progress}%
          </p>
        </div>

        {/* PROGRESS BAR */}
        <div className="relative h-5 border border-red-900 bg-black overflow-hidden">

          {/* FILL */}
          <div
            className="
              absolute
              left-0
              top-0
              h-full
              bg-red-500
              shadow-[0_0_20px_red]
              transition-all
              duration-200
            "
            style={{
              width: `${progress}%`,
            }}
          />

          {/* GLITCH OVERLAY */}
          <div
            className="
              absolute
              inset-0
              opacity-20
              mix-blend-screen
              animate-pulse
            "
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent 0px, rgba(255,255,255,0.15) 2px, transparent 4px)",
            }}
          />
        </div>

        {/* STATUS */}
        <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.25em] font-mono text-zinc-600">
          <span>despair</span>
          <span>cope</span>
          <span>rejection</span>
        </div>
      </div>
    </div>
  );
}