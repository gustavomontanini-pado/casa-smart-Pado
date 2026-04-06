import { useState, useRef, useEffect } from "react";
import Threads from "./Threads.component.tsx";

export default function FormScreen({ onComplete, onBack, isExiting }: any) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    profissao: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const [mounted, setMounted] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  // Drag slider state
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submitData = new URLSearchParams({
      "form-name": "lead-form",
      ...formData,
    }).toString();

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: submitData,
      });
      localStorage.setItem("casaSmartUser", JSON.stringify(formData));
      onComplete(formData);
    } catch (error) {
      console.error("Form submission failed:", error);
      localStorage.setItem("casaSmartUser", JSON.stringify(formData));
      onComplete(formData);
    }
  };

  // --- POINTER-BASED DRAG LOGIC ---
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isSubmitting || isUnlocked) return;
    setIsDragging(true);
    dragStartX.current = e.clientX - dragX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const newX = Math.max(0, Math.min(224, e.clientX - dragStartX.current));
    setDragX(newX);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragX > 180) {
      // Check form validity
      if (formRef.current && !formRef.current.checkValidity()) {
        setDragX(0);
        submitBtnRef.current?.click();
        return;
      }
      // Lock and submit
      setIsUnlocked(true);
      setDragX(224);
      submitBtnRef.current?.click();
    } else {
      // Snap back
      setDragX(0);
    }
  };

  const handleSkip = () => {
    const fakeUser = {
      nome: "Test User",
      email: "test@pado.com",
      profissao: "Tester",
    };
    localStorage.setItem("casaSmartUser", JSON.stringify(fakeUser));
    onComplete(fakeUser);
  };

  return (
    <div
      className={`fixed inset-0 z-9998 bg-black flex items-center justify-center px-6 md:px-12 py-12 overflow-y-auto transition-opacity duration-800 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isExiting || !mounted ? "opacity-0" : "opacity-100"
      }`}
    >
      <div style={{ width: "100%", height: "600px", position: "absolute" }}>
        <Threads amplitude={1} distance={0} enableMouseInteraction />
      </div>

      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 md:top-5 md:left-6 lg:top-8 lg:left-10 2xl:top-12 2xl:left-12 z-50 flex items-center gap-2 lg:gap-3 bg-white/5 hover:bg-white/10 active:bg-white/20 backdrop-blur-md border border-white/10 px-4 py-2 lg:px-6 lg:py-3 2xl:px-8 2xl:py-4 rounded-full text-white/50 hover:text-white transition-all duration-300 shadow-lg group"
      >
        {/* Home icon SVG */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6 opacity-50 group-hover:opacity-100 transition-opacity"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span className="text-[9px] md:text-[10px] lg:text-xs 2xl:text-sm font-bold tracking-widest uppercase">
          Voltar
        </span>
      </button>

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="absolute top-4 right-4 md:top-5 md:right-6 lg:top-8 lg:right-10 2xl:top-12 2xl:right-12 z-50 flex items-center gap-2 lg:gap-3 bg-white/5 hover:bg-white/10 active:bg-white/20 backdrop-blur-md border border-white/10 px-4 py-2 lg:px-6 lg:py-3 2xl:px-8 2xl:py-4 rounded-full text-white/50 hover:text-white transition-all duration-300 shadow-lg group"
      >
        <span className="text-[9px] md:text-[10px] lg:text-xs 2xl:text-sm font-bold tracking-widest uppercase">
          Pular
        </span>
        {/* FastForward icon SVG */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6 opacity-50 group-hover:opacity-100 transition-opacity"
        >
          <polygon points="13 19 22 12 13 5 13 19" />
          <polygon points="2 19 11 12 2 5 2 19" />
        </svg>
      </button>

      <div className="max-w-6xl w-full min-h-[80vh] md:h-[80vh] grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-4 py-10 md:py-0">
        {/* LEFT COLUMN: Branding */}
        <div className="flex flex-col justify-between gap-12 md:gap-0 h-full">
          <div>
            <img
              src="/logo_pado_branca.webp"
              alt="Pado Logo"
              loading="lazy"
              className="h-8 md:h-12 w-auto object-contain mb-16 md:mb-0"
            />
          </div>
          <div className="mb-12 md:mb-0">
            <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight">
              Queremos saber <br /> mais sobre você
            </h1>
          </div>
          <div>
            <p className="text-white text-3xl tracking-widest">
              Casa <span className="font-bold">Smart</span>
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: The Form Card */}
        <div className="flex items-center justify-end h-full">
          <div className="bg-[#111111] border border-white/10 rounded-3xl p-8 md:p-12 w-full max-w-md shadow-2xl">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
              name="lead-form"
              data-netlify="true"
            >
              <input type="hidden" name="form-name" value="lead-form" />

              <div className="flex flex-col gap-2">
                <label className="text-gray-300 text-sm">Nome</label>
                <input
                  type="text"
                  name="nome"
                  required
                  placeholder="nome completo"
                  value={formData.nome}
                  onChange={handleChange}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-gray-300 text-sm">E-mail</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="endereço de e-mail"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-gray-300 text-sm">Profissão</label>
                <input
                  type="text"
                  name="profissao"
                  required
                  placeholder="Sua área de atuação"
                  value={formData.profissao}
                  onChange={handleChange}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>

              <button type="submit" ref={submitBtnRef} className="hidden" />

              {/* DRAG SLIDER — native pointer events instead of framer-motion drag */}
              <div className="mt-4 relative w-70 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                <span className="absolute w-full text-center text-white/70 text-xs font-bold tracking-widest uppercase pointer-events-none select-none">
                  {isSubmitting
                    ? "Enviando..."
                    : isUnlocked
                      ? "Acesso Liberado"
                      : "Deslize para enviar"}
                </span>

                {/* Draggable thumb */}
                <div
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  style={{
                    transform: `translateX(${dragX}px)`,
                    transition: isDragging ? "none" : "transform 0.3s ease-out",
                    touchAction: "none",
                  }}
                  className="absolute left-1 w-12 h-12 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing z-10 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:bg-white/30 transition-colors"
                >
                  {/* ArrowRight SVG */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`w-5 h-5 transition-colors ${isUnlocked ? "text-green-400" : "text-white"}`}
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
