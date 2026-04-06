import { useState, useEffect, lazy, Suspense } from "react";

const OutdoorList = lazy(() => import("./OutdoorList.component.tsx"));
const IndoorList = lazy(() => import("./IndoorList.component.tsx"));

export default function Hero({ activeArea }: any) {
  const [showInfo, setShowInfo] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [areaVisible, setAreaVisible] = useState(true);
  const [displayedArea, setDisplayedArea] = useState(activeArea);

  // Handle area transitions with CSS instead of framer-motion
  useEffect(() => {
    if (activeArea !== displayedArea) {
      setAreaVisible(false); // fade out
      const timeout = setTimeout(() => {
        setDisplayedArea(activeArea); // swap content
        setAreaVisible(true); // fade in
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [activeArea, displayedArea]);

  // Handle modal open/close with CSS instead of AnimatePresence
  const openModal = () => {
    setShowInfo(true);
    // Small delay so the DOM renders before the transition starts
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setModalVisible(true));
    });
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => setShowInfo(false), 300); // unmount after fade
  };

  return (
    <div className="relative w-full h-screen bg-black">
      <img
        src="/modern-luxury-house.webp"
        alt="Pado Smart Home"
        width={1920}
        height={1080}
        loading="eager"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-0 text-center px-4">
        <div
          className={`flex flex-col items-center relative transition-opacity duration-400 ${
            areaVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {displayedArea === "home" ? (
            <>
              <div className="flex flex-row md:flex-row items-center justify-center gap-0 mt-20">
                <h1 className="text-black text-4xl md:text-7xl tracking-widest">
                  Casa <span className="text-gray-600 font-bold">Smart</span>
                </h1>
                <img
                  src="/Pado-Logo-Novo.webp"
                  alt="Pado's Logo"
                  className="w-55 object-contain ml-5 mt-3"
                />
              </div>
              <div className="relative flex flex-col items-center">
                <button
                  onClick={openModal}
                  className="px-10 py-2 rounded-full border border-white/30 bg-white/10 text-black backdrop-blur-sm transition-all z-20 mt-10"
                >
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
                    {showInfo ? "Fechar" : "Saiba Mais"}
                  </span>
                </button>

                {/* Modal - CSS transitions instead of AnimatePresence */}
                {showInfo && (
                  <div
                    onClick={closeModal}
                    className={`fixed inset-0 z-9999 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 md:p-8 pb-28 sm:pb-32 md:pb-32 transition-opacity duration-300 ${
                      modalVisible ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className={`bg-[#111111]/95 backdrop-blur-xl rounded-2xl md:rounded-3xl w-full max-w-6xl max-h-[75vh] md:max-h-[75vh] flex flex-col shadow-2xl overflow-hidden relative transition-all duration-300 ${
                        modalVisible
                          ? "opacity-100 scale-100 translate-y-0"
                          : "opacity-0 scale-95 translate-y-5"
                      }`}
                    >
                      {/* --- FIXED HEADER --- */}
                      <div className="flex justify-between items-center px-4 sm:px-6 md:px-10 py-4 border-b border-white/10 shrink-0 bg-black/20 z-10">
                        <h3 className="text-white font-bold tracking-widest uppercase text-[10px] sm:text-xs md:text-sm">
                          Sobre a Casa Smart
                        </h3>
                        <button
                          onClick={closeModal}
                          className="text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full"
                        >
                          {/* Simple SVG instead of lucide-react */}
                          <svg
                            width="18"
                            height="18"
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
                      </div>

                      {/* --- SCROLLABLE CONTENT BODY --- */}
                      <div className="flex-1 overflow-y-auto scrollbar-hide p-4 sm:p-6 md:p-10 space-y-10 sm:space-y-12 md:space-y-16">
                        {/* PARAGRAPH 1 */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                          <div className="flex-1 space-y-3 md:space-y-4 w-full">
                            <h4 className="text-white font-bold uppercase text-sm sm:text-base md:text-xl tracking-wide leading-snug">
                              Bem-vindo ao futuro da segurança residencial
                            </h4>
                            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed md:leading-loose">
                              A Pado, marca sinônimo de absoluta confiança, dá o
                              seu maior salto tecnológico com o ecossistema Casa
                              Smart. Fomos além das fechaduras tradicionais para
                              criar um ambiente totalmente conectado, unindo
                              inovação de ponta e design premium para colocar o
                              controle do seu lar nas suas mãos.
                            </p>
                          </div>
                          <div className="flex-1 w-full min-h-50 sm:min-h-62.5 md:min-h-0 md:aspect-video bg-white/5 rounded-xl md:rounded-2xl border border-white/10 overflow-hidden shadow-lg relative">
                            <img
                              src="/saibaMais/house.webp"
                              alt="Pado Inovação"
                              loading="lazy"
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        <hr className="border-white/10" />

                        {/* PARAGRAPH 2 */}
                        <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 items-center">
                          <div className="flex-1 space-y-3 md:space-y-4 w-full">
                            <h4 className="text-white font-bold uppercase text-sm sm:text-base md:text-xl tracking-wide leading-snug">
                              Para dar vida a essa visão, criamos uma
                              experiência digital imersiva e responsiva
                            </h4>
                            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed md:leading-loose">
                              Através de um dashboard fluido e intuitivo, você
                              monitora e interage em tempo real com as áreas
                              interna e externa da sua residência. É uma janela
                              direta para a sua proteção, redefinindo a forma
                              como você se conecta com a sua casa.
                            </p>
                          </div>
                          <div className="flex-1 w-full min-h-50 sm:min-h-62.5 md:min-h-0 md:aspect-square bg-white/5 rounded-xl md:rounded-2xl border border-white/10 overflow-hidden shadow-lg relative">
                            <img
                              src="/saibaMais/sensor.webp"
                              alt="Dashboard Pado"
                              loading="lazy"
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        <hr className="border-white/10" />

                        {/* PARAGRAPH 3 */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                          <div className="flex-1 space-y-3 md:space-y-4 w-full">
                            <h4 className="text-white font-bold uppercase text-sm sm:text-base md:text-xl tracking-wide leading-snug">
                              No coração deste ecossistema está uma linha
                              poderosa de dispositivos inteligentes
                            </h4>
                            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed md:leading-loose">
                              De Câmeras PTZ com rastreamento e Vídeo Porteiros
                              de alta definição, até Sensores Magnéticos de
                              precisão. Nosso visualizador interativo permite
                              que você explore o funcionamento de cada
                              equipamento, garantindo total controle sobre o que
                              há de mais moderno no mercado.
                            </p>
                          </div>
                          <div className="flex-1 w-full min-h-50 sm:min-h-62.5 md:min-h-0 md:aspect-square bg-white/5 rounded-xl md:rounded-2xl border border-white/10 overflow-hidden shadow-lg relative">
                            <img
                              src="/saibaMais/camera1.webp"
                              alt="Dispositivos Inteligentes"
                              loading="lazy"
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        <hr className="border-white/10" />

                        {/* PARAGRAPH 4 */}
                        <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 items-center">
                          <div className="flex-1 space-y-3 md:space-y-4 w-full">
                            <h4 className="text-white font-bold uppercase text-sm sm:text-base md:text-xl tracking-wide leading-snug">
                              Acima de tudo, a Casa Smart foi desenhada para
                              você
                            </h4>
                            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed md:leading-loose">
                              Criamos uma jornada personalizada onde você
                              seleciona seus produtos favoritos, monta seu
                              próprio portfólio de segurança e compartilha a sua
                              avaliação diretamente com a nossa equipe. Entre na
                              nova era da proteção inteligente com a Pado — onde
                              a sua tranquilidade é a nossa maior inovação.
                            </p>
                          </div>
                          <div className="flex-1 w-full min-h-50 sm:min-h-62.5 md:min-h-0 md:aspect-square bg-white/5 rounded-xl md:rounded-2xl border border-white/10 overflow-hidden shadow-lg relative">
                            <img
                              src="/saibaMais/screen.webp"
                              alt="Jornada Personalizada"
                              loading="lazy"
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : displayedArea === "externa" ? (
            <Suspense>
              <OutdoorList />
            </Suspense>
          ) : (
            <Suspense>
              <IndoorList />
            </Suspense>
          )}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/50 to-transparent pointer-events-none" />
    </div>
  );
}
