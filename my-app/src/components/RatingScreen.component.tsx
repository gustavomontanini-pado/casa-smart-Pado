import { useState, useEffect } from "react";
import Threads from "./Threads.component.tsx";
// @ts-ignore
import { indoorItems } from "../devices/indoor.js";
// @ts-ignore
import { outdoorItems } from "../devices/outdoor.js";

const allItems = [...outdoorItems, ...indoorItems];

// Reusable SVG icons as small components
function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`w-8 h-8 md:w-10 md:h-10 ${
        filled
          ? "fill-pink-600 text-pink-600 drop-shadow-[0_0_8px_#ed0c6e]"
          : "fill-none text-white/20"
      }`}
      stroke="currentColor"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3 h-3"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

export default function RatingScreen({
  onComplete,
  userData,
  onBack,
  isExiting,
}: any) {
  const [mounted, setMounted] = useState(false);
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const [uxRating, setUxRating] = useState(0);
  const [exRating, setExRating] = useState(0);
  const [inRating, setInRating] = useState(0);
  const [recoRating, setRecoRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  // Animate cart in/out based on likedItems
  useEffect(() => {
    if (likedItems.length > 0) {
      setShowCart(true);
    } else {
      // Delay unmount to allow fade-out
      const timeout = setTimeout(() => setShowCart(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [likedItems.length]);

  const firstName = userData?.nome ? userData.nome.split(" ")[0] : "Sua";

  const getItemImage = (itemName: string) => {
    const found = allItems.find((i: any) => i.text === itemName);
    return found ? found.imageWhite : "";
  };

  const toggleItem = (itemName: string) => {
    setLikedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((i) => i !== itemName)
        : [...prev, itemName],
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalData = {
      "form-name": "feedback-rating",
      nome: userData?.nome || "Unknown",
      email: userData?.email || "Unknown",
      profissao: userData?.profissao || "Unknown",
      liked_items: likedItems.join(", "),
      externa_rating: exRating,
      interna_rating: inRating,
      ux_rating: uxRating,
      reco_rating: recoRating,
      comments: feedbackText,
    };

    const submitData = new URLSearchParams(finalData as any).toString();

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: submitData,
    }).catch((error) => {
      console.error("Rating submission background error:", error);
    });

    setTimeout(() => {
      setIsSubmitting(false);
      onComplete();
    }, 1500);
  };

  const hasCart = likedItems.length > 0;

  return (
    <div
      className={`fixed inset-0 z-9998 bg-black overflow-hidden transition-opacity duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isExiting || !mounted ? "opacity-0" : "opacity-100"
      }`}
    >
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cart-item-enter {
          animation: fadeSlideIn 0.4s ease-out forwards;
        }
      `}</style>

      <div style={{ width: "100%", height: "600px", position: "absolute" }}>
        <Threads amplitude={1} distance={0} enableMouseInteraction />
      </div>

      <div className="flex h-full items-center justify-center p-4 pt-8 md:p-8 md:pt-12 relative z-10 overflow-hidden">
        <form
          onSubmit={handleSubmit}
          name="feedback-rating"
          data-netlify="true"
          className="w-full flex flex-col items-center"
        >
          <input type="hidden" name="form-name" value="feedback-rating" />
          <input type="hidden" name="nome" value={userData?.nome || ""} />
          <input type="hidden" name="email" value={userData?.email || ""} />
          <input
            type="hidden"
            name="profissao"
            value={userData?.profissao || ""}
          />
          <input
            type="hidden"
            name="liked_items"
            value={likedItems.join(", ")}
          />
          <input type="hidden" name="externa_rating" value={exRating} />
          <input type="hidden" name="interna_rating" value={inRating} />
          <input type="hidden" name="ux_rating" value={uxRating} />
          <input type="hidden" name="reco_rating" value={recoRating} />
          <input type="hidden" name="comments" value={feedbackText} />

          <div className="w-full flex justify-start mb-4">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 lg:gap-3 bg-white/5 hover:bg-white/10 active:bg-white/20 backdrop-blur-md border border-white/10 px-4 py-2 lg:px-6 lg:py-3 2xl:px-8 2xl:py-4 rounded-full text-white/50 hover:text-white transition-all duration-300 shadow-lg group"
            >
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
          </div>

          {/* Grid with CSS transition instead of layout animation */}
          <div
            className={`w-full grid gap-6 transition-all duration-600 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              hasCart
                ? "grid-cols-1 lg:grid-cols-3 max-w-[95vw]"
                : "grid-cols-1 lg:grid-cols-2 max-w-7xl"
            }`}
          >
            {/* --- COLUMN 1: Favorites Selection --- */}
            <div className="flex flex-col gap-6 bg-[#111111]/60 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl h-full overflow-hidden">
              <div>
                <h2 className="text-white text-2xl md:text-3xl font-bold tracking-wide">
                  Monte sua solução em segurança
                </h2>
                <p className="text-white/50 text-sm mt-2">
                  Selecione seus favoritos da Casa Smart.
                </p>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide space-y-8">
                <div>
                  <h3 className="text-white/40 text-xs font-bold tracking-widest uppercase mb-4 border-b border-white/10 pb-2">
                    Área Externa
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {outdoorItems.map((item: any) => (
                      <button
                        type="button"
                        key={`out-${item.id}`}
                        onClick={() => toggleItem(item.text)}
                        className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-300 ${
                          likedItems.includes(item.text)
                            ? "bg-green-500/20 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                        }`}
                      >
                        {likedItems.includes(item.text) && (
                          <span className="absolute top-1 right-1 text-green-400">
                            <CheckIcon />
                          </span>
                        )}
                        <img
                          src={item.imageWhite}
                          alt={item.text}
                          loading="lazy"
                          className="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-lg"
                        />
                        <span className="text-[8px] md:text-[9px] text-white/80 font-bold tracking-wider text-center uppercase leading-tight line-clamp-2">
                          {item.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-white/40 text-xs font-bold tracking-widest uppercase mb-4 border-b border-white/10 pb-2">
                    Área Interna
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {indoorItems.map((item: any) => (
                      <button
                        type="button"
                        key={`in-${item.id}`}
                        onClick={() => toggleItem(item.text)}
                        className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-300 ${
                          likedItems.includes(item.text)
                            ? "bg-blue-500/20 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                        }`}
                      >
                        {likedItems.includes(item.text) && (
                          <span className="absolute top-1 right-1 text-blue-400">
                            <CheckIcon />
                          </span>
                        )}
                        <img
                          src={item.imageWhite}
                          alt={item.text}
                          loading="lazy"
                          className="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-lg"
                        />
                        <span className="text-[8px] md:text-[9px] text-white/80 font-bold tracking-wider text-center uppercase leading-tight line-clamp-2">
                          {item.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* --- COLUMN 2: Ratings & Form --- */}
            <div className="flex flex-col justify-center gap-8 bg-[#111111]/60 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl h-full  overflow-y-auto scrollbar-hide">
              <div className="space-y-2">
                <label className="text-white font-bold text-lg md:text-xl">
                  Como foi sua experiência com os produtos da área externa?
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={`ex-${star}`}
                      onClick={() => setExRating(star)}
                      className="focus:outline-none hover:scale-110 transition-transform"
                    >
                      <StarIcon filled={exRating >= star} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-white font-bold text-lg md:text-xl">
                  Como foi sua experiência com os produtos da área interna?
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={`in-${star}`}
                      onClick={() => setInRating(star)}
                      className="focus:outline-none hover:scale-110 transition-transform"
                    >
                      <StarIcon filled={inRating >= star} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-white font-bold text-lg md:text-xl">
                  Tendo em vista os produtos apresentados, o quão você
                  recomendaria essas soluções para outras pessoas?
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={`reco-${star}`}
                      onClick={() => setRecoRating(star)}
                      className="focus:outline-none hover:scale-110 transition-transform"
                    >
                      <StarIcon filled={recoRating >= star} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-white font-bold text-lg md:text-xl">
                  Como você avalia o fluxo do aplicativo?
                </label>
                <p className="text-white/50 text-sm mt-2">
                  (Home, área externa, área interna, formulário)
                </p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={`ux-${star}`}
                      onClick={() => setUxRating(star)}
                      className="focus:outline-none hover:scale-110 transition-transform"
                    >
                      <StarIcon filled={uxRating >= star} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white font-bold text-lg">
                  O que poderíamos melhorar?
                </label>
                <textarea
                  name="comments"
                  rows={4}
                  placeholder="Deixe seus comentários ou sugestões aqui..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors resize-none"
                />
              </div>

              {/* Submit button when cart is hidden */}
              {!hasCart && (
                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    uxRating === 0 ||
                    exRating === 0 ||
                    inRating === 0 ||
                    recoRating === 0
                  }
                  className="mt-4 flex items-center justify-center gap-3 bg-white text-black py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
                  <SendIcon />
                </button>
              )}
            </div>

            {/* --- COLUMN 3: THE DYNAMIC BAG (CART) --- */}
            {showCart && (
              <div
                className={`flex flex-col bg-linear-to-b from-[#1a1a1a] to-[#0a0a0a] border border-white/20 rounded-3xl p-6 md:p-8 shadow-[0_0_40px_rgba(255,255,255,0.05)] max-h-[85vh] relative overflow-hidden transition-opacity duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  hasCart ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                  {/* ShoppingBag SVG */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-white"
                  >
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  <h3 className="text-white text-xl md:text-2xl font-bold tracking-wide">
                    Carrinho de {firstName}
                  </h3>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
                  {likedItems.map((item) => (
                    <div
                      key={item}
                      className="cart-item-enter flex items-center gap-4 bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-md"
                    >
                      <div className="w-12 h-12 bg-black/40 rounded-lg flex items-center justify-center p-1 shrink-0">
                        <img
                          src={getItemImage(item)}
                          alt={item}
                          loading="lazy"
                          className="w-full h-full object-contain drop-shadow-md"
                        />
                      </div>
                      <span className="text-white/90 text-[10px] md:text-xs font-bold uppercase tracking-wider leading-tight">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 mt-auto border-t border-white/10">
                  <button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      uxRating === 0 ||
                      exRating === 0 ||
                      inRating === 0 ||
                      recoRating === 0
                    }
                    className="w-full flex items-center justify-center gap-3 bg-white text-black py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-xl"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
                    <SendIcon />
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
