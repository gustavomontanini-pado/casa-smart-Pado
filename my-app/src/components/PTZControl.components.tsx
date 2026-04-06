export default function PTZControl({ ptzPos, setPtzPos, povImage }: any) {
  function handleMove(dx: any, dy: any) {
    setPtzPos((prev: any) => ({
      x: Math.max(-20, Math.min(20, prev.x + dx)),
      y: Math.max(-10, Math.min(10, prev.y + dy)),
    }));
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-3">
      {/* --- STATUS BAR --- */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          <span className="text-red-400 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase">
            PTZ_REMOTE_CONTROL // ACTIVE
          </span>
        </div>
        <span className="text-white/40 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase">
          POS: X:{ptzPos.x} Y:{ptzPos.y}
        </span>
      </div>

      {/* --- CAMERA VIEWPORT --- */}
      <div className="relative w-full aspect-video bg-black rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
        <img
          src={povImage}
          alt="Camera Feed"
          loading="lazy"
          style={{
            transform: `translate(${ptzPos.x}%, ${ptzPos.y}%) scale(1.4)`,
            transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* --- FLOATING D-PAD OVERLAY --- */}
        <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 bg-white/30 z-20 flex flex-col rounded-full items-center gap-1 p-2 md:p-3 border border-white/10 shadow-lg">
          {/* UP */}
          <button
            onClick={() => handleMove(0, 5)}
            className="w-6 h-6 md:w-8 md:h-8 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all shadow-inner"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 md:w-5 md:h-5"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>

          {/* MID ROW */}
          <div className="flex items-center gap-1">
            {/* LEFT */}
            <button
              onClick={() => handleMove(5, 0)}
              className="w-6 h-6 md:w-8 md:h-8 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all shadow-inner"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 md:w-5 md:h-5"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* CENTER DOT */}
            <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
              <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.9)]" />
            </div>

            {/* RIGHT */}
            <button
              onClick={() => handleMove(-5, 0)}
              className="w-6 h-6 md:w-8 md:h-8 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all shadow-inner"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 md:w-5 md:h-5"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* DOWN */}
          <button
            onClick={() => handleMove(0, -5)}
            className="w-6 h-6 md:w-8 md:h-8 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all shadow-inner"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 md:w-5 md:h-5"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
