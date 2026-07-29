import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ALL_THEMES, GAME_THEMES } from 'consts/consts';
import type { GameThemesType } from 'types/types';

import { Header } from 'components/Header';
import { MenuButton } from 'components/MenuButton';
import { StoreCard } from './StoreCard';
import { StorePreview } from './StorePreview';

import ArrowBack from 'assets/general/arrow.png';
import Coin from 'assets/general/coin.png';

interface StoreProps {
  totalCoins: number;
  activeTheme: GameThemesType;
  purchadesThemes: Set<GameThemesType>;
  onEquip: (theme: GameThemesType) => void;
  onBuy: (theme: GameThemesType) => void;
  onBack: () => void;
}
export const Store = ({
  totalCoins,
  activeTheme,
  purchadesThemes,
  onEquip,
  onBuy,
  onBack,
}: StoreProps) => {
  const [searchedTheme, setSearchedTheme] = useState<string>('');
  const [previewTheme, setPreviewTheme] = useState<GameThemesType | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isPreviewShowen, setIsPreviewShowen] = useState<boolean>(false);

  const [coinsHud, setCoinsHud] = useState(totalCoins);

  useEffect(() => {
    const timer = setInterval(() => {
      setCoinsHud((prev) => {
        if (prev <= totalCoins) {
          clearInterval(timer);
          return prev;
        }

        return prev - 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [totalCoins]);

  const previewImages = useMemo(() => {
    if (!previewTheme) return [];

    const themeData = GAME_THEMES[previewTheme];

    return [...themeData.cards.map((card) => card)];
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
      name: previewImages[index].name,
      src: previewImages[index].img,
      position: posIndex,
    }));
  };

  const handleSearchTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedTheme(event.target.value);
  };

  const foundedThemes = useMemo(() => {
    return ALL_THEMES.filter(([key]) => key.toLowerCase().includes(searchedTheme.toLowerCase()));
  }, [searchedTheme]);

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
      <MenuButton
        className="transparent absolute top-0 left-4 flex h-12 w-10 min-w-0 items-center justify-center p-0 transition duration-500 ease-in-out active:scale-95 md:top-4 md:h-14 md:w-14 lg:hover:scale-110 xl:top-10"
        onClick={onBack}
      >
        <img
          src={ArrowBack}
          alt="back"
          className="pixelated h-full w-full object-contain md:h-auto"
        />
      </MenuButton>
      <div
        ref={containerRef}
        className="flex h-full w-full flex-col items-center gap-1.5 px-4 pt-2 md:gap-1.5 md:pt-2 lg:gap-2 lg:pt-20 xl:pt-4"
      >
        <div ref={headerRef} className="flex w-full flex-col items-center gap-1.5 md:gap-1">
          <Header value="Store" />
          <div className="flex w-full max-w-110 flex-row items-center justify-between md:max-w-120 lg:max-w-220 xl:max-w-230">
            <div className="flex flex-row items-center justify-center">
              <img
                className="pixelated h-8 w-8 lg:h-12 lg:w-12 2xl:h-12 2xl:w-12"
                src={Coin}
                alt="coins"
              />
              <span className="text-lg font-bold text-amber-400 md:text-xl lg:text-3xl">
                {coinsHud}
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
            className={`flex w-full max-w-110 scrollbar-none flex-row justify-start gap-2 overflow-x-auto overflow-y-hidden [-webkit-overflow-scrolling:touch] md:max-w-120 lg:max-w-220 xl:grid xl:max-w-230 xl:scrollbar-thin xl:scrollbar-thumb-sky-400 xl:scrollbar-track-slate-900 xl:grid-cols-3 xl:items-stretch xl:gap-4 xl:gap-y-2 xl:overflow-x-hidden xl:overflow-y-auto xl:pr-4 2xl:gap-y-4`}
            style={{
              maxHeight: 'calc(100vh - var(--header-height, 220px) - 20px)',
            }}
          >
            {foundedThemes.map(([theme, params]) => {
              const isThemePurchased = purchadesThemes.has(theme as GameThemesType);
              const gameTheme = theme as GameThemesType;
              const isThemeActive = theme === activeTheme;
              return (
                <div
                  key={theme}
                  className="w-[32%] shrink-0 md:w-[32%] lg:w-[32.5%] xl:w-full xl:shrink"
                >
                  <StoreCard
                    label={params.label}
                    deckImage={params.deck}
                    price={params.price}
                    isThemeActive={isThemeActive}
                    isThemePurchased={isThemePurchased}
                    onEquip={() => onEquip(gameTheme)}
                    onBuy={() => onBuy(gameTheme)}
                    onPreviewOpen={() => handleOpenPreview(gameTheme)}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex w-full max-w-110 flex-1 flex-col items-center justify-center py-4 text-center md:max-w-120 lg:max-w-220 xl:max-w-230">
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
