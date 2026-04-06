export default function DeviceVisualizer({ item }: any) {
  const title = item.text.toUpperCase();

  const isSiren = title.includes("SIRENE");
  const isMotion = title.includes("MOVIMENTO");
  const isContact = title.includes("MAGNÉTICO");

  if (!isSiren && !isMotion && !isContact) return null;

  return (
    <>
      <style>{`
        @keyframes siren-ring {
          0% { transform: scale(0.5); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: scale(4); opacity: 0; }
        }
        @keyframes siren-flash {
          0%, 100% { opacity: 0; }
          20%, 60% { opacity: 1; }
          40% { opacity: 0; }
        }
        @keyframes contact-slide {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(40px); }
        }
        @keyframes pir-sweep {
          0%, 100% { transform: rotate(-55deg); }
          50% { transform: rotate(55deg); }
        }
      `}</style>

      <div className="w-full flex flex-col gap-3 mt-6 border-t border-white/10 pt-6">
        {isSiren && (
          <>
            <div className="flex items-center gap-2 px-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
              <span className="text-red-400 font-mono text-[10px] tracking-[0.2em] uppercase font-bold">
                ACOUSTIC_OUTPUT // STROBE_ACTIVE
              </span>
            </div>
            <div className="relative w-full h-40 bg-black/50 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center shadow-inner">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="absolute size-16 border border-red-500/50 rounded-full"
                  style={{
                    animation: `siren-ring 2s ease-out ${i * 0.6}s infinite`,
                  }}
                />
              ))}
              <div
                className="absolute size-20 bg-red-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.8)]"
                style={{ animation: "siren-flash 0.4s infinite" }}
              >
                <span className="text-black font-black text-xl tracking-tighter">
                  85dB
                </span>
              </div>
              <div className="absolute bottom-2 left-3 right-3 flex justify-between text-white/40 font-mono text-[8px] tracking-widest">
                <span>FREQ: 433MHz</span>
                <span>BACKUP: 3.7V Li-ion</span>
              </div>
            </div>
          </>
        )}
        {isContact && (
          <>
            <div className="flex items-center gap-2 px-1">
              <span className="size-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              <span className="text-blue-400 font-mono text-[10px] tracking-[0.2em] uppercase font-bold">
                CONTACT_LOGIC // TAMPER_SENSITIVE
              </span>
            </div>
            <div className="relative w-full h-40 bg-black/50 rounded-2xl overflow-hidden border border-white/10 flex flex-col items-center justify-center shadow-inner p-4">
              <div className="flex items-center justify-center gap-1 w-full h-20">
                <div className="w-6 h-16 bg-white/20 backdrop-blur-md border border-white/30 rounded-md relative">
                  <div className="absolute right-1 top-1/2 -translate-y-1/2 w-1 h-2 bg-red-500/50 rounded-full" />
                </div>
                <div
                  className="w-4 h-16 bg-white/40 backdrop-blur-md border border-white/50 rounded-md"
                  style={{ animation: "contact-slide 4s infinite" }}
                />
              </div>
              <div className="mt-2 w-full bg-[#111] p-2 rounded text-green-400 font-mono text-[9px] tracking-wider leading-relaxed border border-white/5">
                <div>IF: SEPARATION &gt; 20mm</div>
                <div>THEN: TRIGGER_ALARM (100dB)</div>
              </div>
            </div>
          </>
        )}
        {isMotion && (
          <>
            <div className="flex items-center gap-2 px-2">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span className="text-emerald-400 font-mono text-[10px] tracking-[0.2em] uppercase font-bold">
                DETECTION_PATTERN//PASSIVE_INFRARED
              </span>
            </div>
            <div className="relative w-full h-40 bg-black/50 rounded-2xl overflow-hidden border border-white/10 flex items-end justify-center shadow-inner pb-2">
              <div className="absolute bottom-2 w-full flex flex-col items-center gap-4 opacity-20">
                <div className="w-48 h-24 border-t-2 border-emerald-400 rounded-t-full" />
                <div className="absolute bottom-0 w-32 h-16 border-t-2 border-emerald-400 rounded-t-full" />
                <div className="absolute bottom-0 w-16 h-8 border-t-2 border-emerald-400 rounded-t-full" />
              </div>
              <div
                className="absolute -bottom-1 w-0.5 h-32 bg-emerald-500 origin-bottom shadow-[0_0_15px_rgba(16,185,129,1)]"
                style={{
                  animation: "pir-sweep 4s ease-in-out infinite",
                }}
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1 text-white/50 font-mono text-[8px] tracking-widest">
                <span>FIELD OF VIEW: 110°</span>
                <span>STATUS: MONITORING</span>
              </div>
              <div className="absolute top-3 right-3 flex flex-col gap-1 text-emerald-500/50 font-mono text-[8px] tracking-widest text-right">
                <span>4m / 8m / 12m</span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
