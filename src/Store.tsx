import { useMemo, useState } from 'react';
import { GAME_THEMES } from './consts/consts';
import type { GameThemesType } from './types/types';
import { StorePreview } from './components/StorePreview';
import { StoreCard } from './components/StoreCard';

interface StoreProps {
  onBack: () => void;
  onBuy: (theme: GameThemesType) => void;
  purchadesThemes: Set<GameThemesType>;
}
export const Store = ({ purchadesThemes, onBack, onBuy }: StoreProps) => {
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

  return (
    <>
      <button
        className="border-0 bg-transparent absolute top-4 md:top-4 xl:top-40 left-4 flex items-center justify-center
        min-w-0 w-10 h-12 md:w-14 md:h-14  p-0
        transition duration-500 ease-in-out lg:hover:scale-110 active:scale-95"
        type="button"
        onClick={onBack}
      >
        <img
          src="./src/assets/arrow.png"
          alt="back"
          className="pixelated w-full h-full md:h-auto object-contain"
        />
      </button>
      <div className="flex flex-col items-center gap-4 md:gap-4 w-full px-4">
        <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-[86px] font-bold text-white text-center tracking-wide">
          Store
        </h1>
        <div className="grid grid-cols-3 gap-2 lg:gap-4 w-full max-w-130 md:max-w-130 lg:max-w-200 2xl:max-w-250 items-start">
          {Object.entries(GAME_THEMES).map(([theme, params]) => {
            const isThemePurchased = purchadesThemes.has(theme as GameThemesType);
            const gameTheme = theme as GameThemesType;
            return (
              <StoreCard
                key={theme}
                label={params.label}
                backImage={params.backImage}
                price={params.price}
                isThemePurchased={isThemePurchased}
                onBuy={() => onBuy(gameTheme)}
                onPreviewOpen={() => handleOpenPreview(gameTheme)}
              />
            );
          })}
        </div>
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
