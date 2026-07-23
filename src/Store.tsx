import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ALL_THEMES, GAME_THEMES } from './consts/consts';
import type { GameThemesType } from './types/types';
import { StorePreview } from './components/StorePreview';
import { StoreCard } from './components/StoreCard';

interface StoreProps {
  totalCoins: number;
  purchadesThemes: Set<GameThemesType>;
  onBack: () => void;
  onBuy: (theme: GameThemesType) => void;
}
export const Store = ({ totalCoins, purchadesThemes, onBack, onBuy }: StoreProps) => {
  const [searchedTheme, setSearchedTheme] = useState<string>('');
  const [previewTheme, setPreviewTheme] = useState<GameThemesType | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isPreviewShowen, setIsPreviewShowen] = useState<boolean>(false);

  const previewImages = useMemo(() => {
    if (!previewTheme) return [];

    const themeData = GAME_THEMES[previewTheme];

    return [themeData.backImage, ...themeData.cards.map((card) => card.img)];
  }, [previewTheme]);

  const getPreviewDeck = () => {
    const len = previewImages.length;
    if (len === 0) return [];

    const indices = [
      (currentCardIndex - 2 + len) % len,
      (currentCardIndex - 1 + len) % len,
      currentCardIndex,
      (currentCardIndex + 1) % len,
      (currentCardIndex + 2) % len,
    ];

    return indices.map((index, posIndex) => ({
      src: previewImages[index],
      position: posIndex,
      isBack: index === 0,
    }));
  };

  const foundedThemes = useMemo(() => {
    return ALL_THEMES.filter(([key]) => key.toLowerCase().includes(searchedTheme.toLowerCase()));
  }, [searchedTheme]);

  const handleSearchTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedTheme(event.target.value);
  };

  const handlePrev = () => {
    setCurrentCardIndex((prev) => (prev - 1 + previewImages.length) % previewImages.length);
  };

  const handleNext = () => {
    setCurrentCardIndex((prev) => (prev + 1) % previewImages.length);
  };

  const handleOpenPreview = (theme: GameThemesType) => {
    setPreviewTheme(theme);
    setIsPreviewShowen(true);
  };

  const handleClosePreview = () => {
    setCurrentCardIndex(0);
    setIsPreviewShowen(false);
    setPreviewTheme(null);
  };

  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!headerRef.current || !containerRef.current) return;

    const updateHeight = () => {
      const rect = headerRef.current!.getBoundingClientRect();
      containerRef.current!.style.setProperty('--header-height', `${rect.height}px`);
    };

    updateHeight();

    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <>
      <button
        className="absolute top-0 left-4 flex h-12 w-10 min-w-0 items-center justify-center border-0 bg-transparent p-0 transition duration-500 ease-in-out active:scale-95 md:top-4 md:h-14 md:w-14 lg:hover:scale-110 xl:top-10"
        type="button"
        onClick={onBack}
      >
        <img
          src="./src/assets/arrow.png"
          alt="back"
          className="pixelated h-full w-full object-contain md:h-auto"
        />
      </button>
      <div
        ref={containerRef}
        className="flex h-full w-full flex-col items-center gap-1.5 px-4 pt-2 md:gap-1.5 md:pt-2 lg:gap-2 lg:pt-20 xl:pt-4"
      >
        <div ref={headerRef} className="flex w-full flex-col items-center gap-1.5 md:gap-1">
          <h1 className="text-center text-3xl font-bold tracking-wide text-white md:text-5xl lg:text-6xl xl:text-[86px]">
            Store
          </h1>
          <div className="flex w-full max-w-110 flex-row items-center justify-between md:max-w-120 lg:max-w-220 xl:max-w-230 2xl:max-w-250">
            <div className="flex flex-row items-center justify-center">
              <img
                className="pixelated h-8 w-8 lg:h-12 lg:w-12 2xl:h-12 2xl:w-12"
                src="./src/assets/coin.png"
                alt="coins"
              />
              <span className="text-lg font-bold text-amber-400 md:text-xl lg:text-3xl">
                {totalCoins}
              </span>
            </div>
            <input
              type="text"
              id="search"
              name="search"
              value={searchedTheme}
              placeholder="Search deck"
              onChange={handleSearchTheme}
              className="max-w-[30%] rounded-xl border border-white/5 bg-black/20 px-4 py-1.5 text-white caret-sky-400 outline-none focus:ring-2 focus:ring-slate-900 md:py-2 lg:max-w-[20%] lg:text-[24px] xl:text-[26px] 2xl:max-w-[20%] 2xl:text-[24px]"
            />
          </div>
        </div>
        {foundedThemes.length > 0 ? (
          <div
            className={`flex w-full max-w-110 scrollbar-none flex-row items-start justify-start gap-2 overflow-x-auto overflow-y-hidden [-webkit-overflow-scrolling:touch] md:max-w-120 lg:max-w-220 xl:grid xl:max-w-230 xl:scrollbar-thin xl:scrollbar-thumb-sky-400 xl:scrollbar-track-slate-900 xl:grid-cols-3 xl:items-stretch xl:gap-4 xl:gap-y-2 xl:overflow-x-hidden xl:overflow-y-auto xl:pr-4 2xl:max-w-250 2xl:gap-y-4`}
            style={{
              maxHeight: 'calc(100vh - var(--header-height, 220px) - 20px)',
            }}
          >
            {foundedThemes.map(([theme, params]) => {
              const isThemePurchased = purchadesThemes.has(theme as GameThemesType);
              const gameTheme = theme as GameThemesType;
              return (
                <div
                  key={theme}
                  className="w-[32%] shrink-0 md:w-[32%] lg:w-[32.5%] xl:w-full xl:shrink"
                >
                  <StoreCard
                    label={params.label}
                    backImage={params.backImage}
                    price={params.price}
                    isThemePurchased={isThemePurchased}
                    onBuy={() => onBuy(gameTheme)}
                    onPreviewOpen={() => handleOpenPreview(gameTheme)}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex w-full max-w-110 flex-1 flex-col items-center justify-center py-4 text-center md:max-w-120 lg:max-w-220">
            <span className="text-lg font-medium tracking-wide text-slate-400 md:text-2xl lg:text-4xl xl:text-4xl">
              No themes found for "{searchedTheme}"
            </span>
          </div>
        )}
      </div>
      {isPreviewShowen && previewTheme && (
        <StorePreview
          theme={previewTheme}
          getPreviewDeck={() => getPreviewDeck()}
          onPrev={() => handlePrev()}
          onNext={() => handleNext()}
          onClose={() => handleClosePreview()}
        />
      )}
    </>
  );
};
