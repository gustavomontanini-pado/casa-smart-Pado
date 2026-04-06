import Threads from "./Threads.component.tsx";

export default function IntroScreen({ onStart, isExiting }: any) {
  return (
    <div
      className={`fixed inset-0 z-9999 bg-white flex flex-col items-center justify-center transition-opacity duration-800 ease-[cubic-bezier(0.76,0,0.24,1)] ${isExiting ? "opacity-0" : "opacity-100"}`}
    >
      <div style={{ width: "100%", height: "600px", position: "absolute" }}>
        <Threads amplitude={1} distance={0} enableMouseInteraction />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center w-full min-h-screen gap-12 md:gap-20 py-12">
        <div className="shrink-0">
          <img
            src="/Pado-Logo-Novo.webp"
            alt="Pado's Logo"
            className="h-8 md:h-12 w-auto object-contain"
          />
        </div>
        <button
          onClick={onStart}
          className="group shrink-0 w-64 h-64 md:w-80 md:h-80 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center transition-all duration-500 hover:bg-[#1a1a1a] hover:scale-105 hover:border-white/30 shadow-2xl text-white text-4xl animate-pulse"
        >
          Casa <span className="font-bold"> Smart </span>
        </button>
      </div>
    </div>
  );
}

// <span className="font-bold">Smart</span>
