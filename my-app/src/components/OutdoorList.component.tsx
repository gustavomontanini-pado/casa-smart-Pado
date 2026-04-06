//@ts-ignore
import { outdoorItems } from "../devices/outdoor.js";
import { useState, useRef, Suspense } from "react";
import React from "react";
import DeviceVisualizer from "./DeviceVisualizer.component.tsx";

const PTZControl = React.lazy(() => import("./PTZControl.components.tsx"));

export default function outdoorList() {
  const [selectedItem, setSelectedItem] = useState<
    (typeof outdoorItems)[0] | null
  >(null);
  const [modalVisible, setModalVisible] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isVisualDevice =
    selectedItem?.text.toUpperCase().includes("CAMERA") ||
    selectedItem?.text.toUpperCase().includes("OLHO") ||
    selectedItem?.text.toUpperCase().includes("VIDEO");

  const scrollList = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const openModal = (item: (typeof outdoorItems)[0]) => {
    setSelectedItem(item);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setModalVisible(true));
    });
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  const [ptzPos, setPtzPos] = useState({ x: 0, y: 0 });

  return (
    <>
      <div className="w-[95%] max-w-7xl z-20 relative mx-auto px-4 mt-6 md:mt-8">
        <button
          onClick={() => scrollList("left")}
          className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-8 md:h-8 bg-white/10 active:bg-white/30 backdrop-blur-xl border border-white/20 rounded-md hidden md:flex items-center justify-center text-black shadow-[0_4px_15px_rgba(0,0,0,0.3)] transition-all"
        >
          {/* ChevronLeft SVG */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div
          ref={scrollRef}
          className="flex flex-col md:flex-row justify-start items-stretch md:items-start py-2 md:py-6 px-2 bg-white/1 backdrop-blur-md border border-white/20 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] overflow-y-auto md:overflow-y-visible overflow-x-hidden md:overflow-x-auto scrollbar-hide max-h-[55vh] md:max-h-none"
        >
          {outdoorItems.map((item: any, index: any) => (
            <div
              key={item.id}
              onClick={() => openModal(item)}
              className={`shrink-0 flex flex-row md:flex-col items-center justify-start px-4 py-3 md:py-0 md:px-4 cursor-pointer transition-transform duration-300 min-w-25 sm:min-w-30 md:min-w-37.5 ${
                index < outdoorItems.length - 1
                  ? "border-r border-white/20"
                  : ""
              }`}
            >
              <div className="mr-4 md:mr-0 md:mb-3 flex items-center justify-center h-10 w-10 md:h-24 md:w-full shrink-0">
                <img
                  src={item.image}
                  alt={item.text}
                  loading="lazy"
                  className="w-12 sm:w-16 md:w-20 h-full object-contain drop-shadow-lg"
                />
              </div>
              <p className="flex-1 text-left md:text-center whitespace-normal text-[10px] md:text-xs font-bold text-black tracking-widest uppercase drop-shadow-md leading-snug">
                {item.text}
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={() => scrollList("right")}
          className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-8 md:h-8 bg-white/10 active:bg-white/30 backdrop-blur-xl border border-white/20 rounded-md hidden md:flex items-center justify-center text-black shadow-[0_4px_15px_rgba(0,0,0,0.3)] transition-all"
        >
          {/* ChevronRight SVG */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Modal — CSS transitions instead of AnimatePresence */}
      {selectedItem && (
        <div
          onClick={closeModal}
          className={`fixed inset-0 z-9999 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 pb-32 md:p-8 md:pb-24 transition-opacity duration-300 ${
            modalVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 w-full relative flex flex-col md:flex-row shadow-2xl overflow-y-auto scrollbar-hide max-h-[80vh] md:max-h-[75vh] pt-14 transition-all duration-300 ${
              modalVisible
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-[0.8] translate-y-5"
            } ${
              isVisualDevice
                ? "max-w-5xl gap-8 md:p-8 md:pt-12"
                : "max-w-3xl gap-8 md:p-10 md:pt-12"
            }`}
          >
            {/* Decorative background glow */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close button — inline SVG instead of lucide X */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-400 transition-colors p-2 bg-white/5 rounded-full"
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
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {isVisualDevice ? (
              <>
                {/* Left Side: Image in Action */}
                <div className="w-full md:w-3/5 min-h-62.5 md:min-h-100 bg-black/50 rounded-2xl border border-white/10 overflow-hidden relative flex items-center justify-center">
                  {selectedItem.text.includes("PTZ") ? (
                    <Suspense
                      fallback={
                        <div className="text-white/50 text-xs tracking-widest uppercase">
                          Carregando PTZ...
                        </div>
                      }
                    >
                      <PTZControl
                        ptzPos={ptzPos}
                        setPtzPos={setPtzPos}
                        povImage={selectedItem.actionImage}
                      />
                    </Suspense>
                  ) : (
                    <div className="w-full flex flex-col gap-3">
                      <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                          <span className="text-red-400 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold">
                            VIEWPORT // LIVE_STREAM_STATIC
                          </span>
                        </div>
                      </div>
                      <div className="relative w-full aspect-video bg-black rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl group flex items-center justify-center">
                        {selectedItem.actionImage ? (
                          <img
                            src={selectedItem.actionImage}
                            alt="POV"
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover z-0 opacity-90 transition-opacity duration-500"
                          />
                        ) : (
                          <span className="text-white/30 text-sm tracking-widest uppercase z-10">
                            Imagem de Demonstração
                          </span>
                        )}
                        <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20 flex items-center bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10 shadow-lg">
                          <span className="text-white/80 font-mono text-[9px] md:text-[10px] tracking-widest uppercase drop-shadow-md">
                            CAM_01 // {new Date().toLocaleDateString()} -{" "}
                            {new Date().toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Side */}
                <div className="w-full md:w-2/5 flex flex-col justify-center">
                  <div className="mx-auto mb-5 bg-white/5 backdrop-blur-xl rounded-2xl p-4 w-max border border-white/10 shadow-inner">
                    <img
                      src={selectedItem.realImage}
                      alt={selectedItem.text}
                      loading="lazy"
                      className="size-16 md:w-20 md:h-20 object-contain drop-shadow-2xl"
                    />
                  </div>
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-6 uppercase tracking-wide leading-tight">
                    {selectedItem.text}
                  </h3>
                  <p className="text-blue-400 text-[10px] tracking-[0.2em] uppercase font-bold mb-4">
                    Especificações
                  </p>
                  <ul className="space-y-4">
                    {selectedItem.specs.map((spec: any, i: any) => (
                      <li
                        key={i}
                        className="flex items-center text-gray-300 text-sm md:text-base font-bold"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3 shrink-0" />
                        <div className="w-full">
                          {spec}
                          <hr className="w-full h-px border-t-0 bg-transparent bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-200" />
                        </div>
                      </li>
                    ))}
                  </ul>
                  <DeviceVisualizer item={selectedItem} />
                </div>
              </>
            ) : (
              <>
                <div className="flex-1 bg-black/40 rounded-2xl border border-white/10 p-8 flex items-center justify-center relative min-h-50">
                  <img
                    src={selectedItem.realImage}
                    alt={selectedItem.text}
                    loading="lazy"
                    className="w-full h-auto max-w-50 text-white object-contain drop-shadow-2xl"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-blue-400 text-[10px] tracking-[0.2em] uppercase font-bold mb-2">
                    Especificações
                  </p>
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-4 uppercase tracking-wide">
                    {selectedItem.text}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    {selectedItem.description}
                  </p>
                  <ul className="space-y-3">
                    {selectedItem.specs.map((spec: any, i: any) => (
                      <li
                        key={i}
                        className="flex items-center text-gray-300 text-sm font-bold"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1 shrink-0" />
                        <div className="w-full">
                          {spec}
                          <hr className="w-full h-px border-t-0 bg-transparent bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-200" />
                        </div>
                      </li>
                    ))}
                  </ul>
                  <DeviceVisualizer item={selectedItem} />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
