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
    <div className="absolute inset-0 bg-black/60 backdrop-blur-[5px] z-10">
      <div className="relative w-full h-full max-w-full xl:max-w-6xl 2xl:max-w-7xl mx-auto flex items-center justify-center">
        <button
          className="transparent absolute top-4 md:top-4 xl:top-10 right-10 xl:right-0 flex items-center justify-center
        min-w-0 w-8 h-8 md:w-10 md:h-10 xl:w-12 xl:h-12 p-0
        transition duration-500 ease-in-out lg:hover:scale-110 active:scale-95"
          type="button"
          onClick={onClose}
        >
          <img
            src="./src/assets/cancel.png"
            alt="back"
            className="pixelated w-full h-full md:h-auto object-contain"
          />
        </button>

        <button
          type="button"
          className="transparent absolute top-1/2 left-30 lg:left-40  xl:left-40 -translate-y-1/2 min-w-0 w-10 h-10 md:w-16 md:h-16 p-0 transition duration-500 ease-in-out lg:hover:scale-110 active:scale-95"
          onClick={onPrev}
        >
          <img
            src="./src/assets/arrow.png"
            alt="back"
            className="pixelated w-full h-full md:h-auto object-contain"
          />
        </button>
        <div className="flex flex-row gap-4 ">
          {getPreviewDeck().map((card, index) => {
            const slotStyles = () => {
              if (card.position === 2) return 'scale-120 z-30 opacity-100';
              if (card.position === 1 || card.position === 3) return 'scale-75 z-20 opacity-75';
              return 'scale-50 z-20 opacity-30 -mx-6 md:-mx-8 lg:-mx-10 xl:-mx-12';
            };

            return (
              <div
                key={index}
                className={`w-16 md:w-20 lg:w-28 xl:w-32 2xl:w-32 aspect-5/7 transition-all duration-300 object-contain ${slotStyles()}`}
              >
                {card.isBack ? (
                  <img
                    key={index}
                    src={card.src}
                    className="pixelated w-full h-full"
                    alt="card back"
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center ">
                    <img
                      src={GAME_THEMES[theme].frontImage}
                      className="pixelated absolute inset-0 w-full h-full "
                    />
                    <img className="pixelated w-[80%] z-10 inset-0" src={card.src} alt="" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <button
          type="button"
          className="transparent absolute top-1/2 right-30 lg:right-40 xl:right-40 -translate-y-1/2 min-w-0 w-10 h-10 md:w-16 md:h-16 p-0 transition duration-500 ease-in-out lg:hover:scale-110 active:scale-95"
          onClick={onNext}
        >
          <img
            src="./src/assets/arrow.png"
            alt="back"
            className="pixelated w-full h-full md:h-auto object-contain rotate-180"
          />
        </button>
      </div>
    </div>,
    document.body
  );
};
