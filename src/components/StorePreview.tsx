import { createPortal } from 'react-dom';
import { GAME_THEMES } from '../consts/consts';
import type { GameThemesType } from '../types/types';

interface StorePreviewProps {
  theme: GameThemesType;
  getPreviewDeck: () => { src: string; position: number; isBack: boolean }[];
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}
export const StorePreview = ({
  theme,
  getPreviewDeck,
  onPrev,
  onNext,
  onClose,
}: StorePreviewProps) => {
  return createPortal(
    <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-[5px]">
      <div className="relative mx-auto flex h-full w-full max-w-full items-center justify-center xl:max-w-6xl 2xl:max-w-7xl">
        <button
          className="transparent absolute top-4 right-10 flex h-8 w-8 min-w-0 items-center justify-center p-0 transition duration-500 ease-in-out active:scale-95 md:top-4 md:h-10 md:w-10 lg:hover:scale-110 xl:top-10 xl:right-0 xl:h-12 xl:w-12"
          type="button"
          onClick={onClose}
        >
          <img
            src="./src/assets/cancel.png"
            alt="back"
            className="pixelated h-full w-full object-contain md:h-auto"
          />
        </button>

        <button
          type="button"
          className="transparent absolute top-1/2 left-30 h-10 w-10 min-w-0 -translate-y-1/2 p-0 transition duration-500 ease-in-out active:scale-95 md:h-16 md:w-16 lg:left-40 lg:hover:scale-110 xl:left-40"
          onClick={onPrev}
        >
          <img
            src="./src/assets/arrow.png"
            alt="back"
            className="pixelated h-full w-full object-contain md:h-auto"
          />
        </button>
        <div className="flex flex-row gap-4">
          {getPreviewDeck().map((card, index) => {
            const slotStyles = () => {
              if (card.position === 2) return 'scale-120 z-30 opacity-100';
              if (card.position === 1 || card.position === 3) return 'scale-75 z-20 opacity-75';
              return 'scale-50 z-20 opacity-30 -mx-6 md:-mx-8 lg:-mx-10 xl:-mx-12';
            };

            return (
              <div
                key={index}
                className={`aspect-5/7 w-16 object-contain transition-all duration-300 md:w-20 lg:w-28 xl:w-32 2xl:w-32 ${slotStyles()}`}
              >
                {card.isBack ? (
                  <img
                    key={index}
                    src={card.src}
                    className="pixelated h-full w-full"
                    alt="card back"
                  />
                ) : (
                  <div className="absolute inset-0 flex h-full w-full items-center justify-center">
                    <img
                      src={GAME_THEMES[theme].frontImage}
                      className="pixelated absolute inset-0 h-full w-full"
                    />
                    <img className="pixelated inset-0 z-10 w-[80%]" src={card.src} alt="" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <button
          type="button"
          className="transparent absolute top-1/2 right-30 h-10 w-10 min-w-0 -translate-y-1/2 p-0 transition duration-500 ease-in-out active:scale-95 md:h-16 md:w-16 lg:right-40 lg:hover:scale-110 xl:right-40"
          onClick={onNext}
        >
          <img
            src="./src/assets/arrow.png"
            alt="back"
            className="pixelated h-full w-full rotate-180 object-contain md:h-auto"
          />
        </button>
      </div>
    </div>,
    document.body
  );
};
