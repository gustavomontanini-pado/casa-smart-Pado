function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar({
  setActiveArea,
  activeArea,
  onFeedbackClick,
  onReset,
}: any) {
  const navigation = [
    { id: "home", name: "HOME" },
    { id: "externa", name: "ÁREA EXTERNA" },
    { id: "interna", name: "ÁREA INTERNA" },
  ];

  return (
    <nav className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-3xl h-auto min-h-20 bg-white/10 backdrop-blur-md border border-white/20 z-1000 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
      <div className="px-2 sm:px-6 lg:px-8 mx-auto max-w-7xl w-full">
        <div className="flex h-20 items-center justify-between gap-2 md:gap-4">
          <div className="flex shrink-0 items-center">
            <button onClick={onReset} title="Reset Application">
              <img
                alt="Pado"
                src="/Pado-Logo-Novo.webp"
                loading="lazy"
                className="w-16 md:w-24 lg:w-32 h-auto drop-shadow-lg object-contain"
              />
            </button>
          </div>

          <div className="flex-1 flex justify-center overflow-x-auto scrollbar-hide px-2">
            <div className="flex space-x-2 sm:space-x-4 md:space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveArea(item.id)}
                  className={classNames(
                    activeArea === item.id
                      ? "text-black border-b-2 border-black"
                      : "text-gray-600 hover:text-black",
                    "px-1 py-2 text-[9px] sm:text-xs md:text-sm lg:text-lg font-bold tracking-widest uppercase transition-all duration-300 whitespace-nowrap",
                  )}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3 md:gap-6">
            <button
              onClick={onFeedbackClick}
              className="bg-black text-white px-2 md:px-4 py-2 rounded-md text-[9px] md:text-sm font-bold tracking-widest hover:bg-gray-200 transition-all duration-300 uppercase whitespace-nowrap"
            >
              Feedback
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
