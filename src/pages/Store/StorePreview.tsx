import { GAME_THEMES } from 'consts/consts';
import type { GameThemesType } from 'types/types';
import { MenuButton } from 'components/MenuButton';
import { Modal } from 'components/Modal';

import Close from 'assets/general/close.png';
import Arrow from 'assets/general/arrow.png';

interface StorePreviewProps {
  theme: GameThemesType;
  getPreviewDeck: () => { name: string; src: string; position: number }[];
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
  return (
    <Modal>
      <>
        <MenuButton
          className="transparent absolute top-4 right-10 flex h-8 w-8 min-w-0 items-center justify-center p-0 transition duration-500 ease-in-out active:scale-95 md:top-4 md:h-10 md:w-10 lg:hover:scale-110 xl:top-10 xl:right-0 xl:h-12 xl:w-12"
          type="button"
          onClick={onClose}
        >
          <img
            src={Close}
            alt="close"
            className="pixelated h-full w-full object-contain md:h-auto"
          />
        </MenuButton>

        <MenuButton
          type="button"
          className="transparent absolute top-1/2 left-30 h-10 w-10 min-w-0 -translate-y-1/2 p-0 transition duration-500 ease-in-out active:scale-95 md:h-16 md:w-16 lg:left-40 lg:hover:scale-110 xl:left-40"
          onClick={onPrev}
        >
          <img
            src={Arrow}
            alt="last"
            className="pixelated h-full w-full object-contain md:h-auto"
          />
        </MenuButton>
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
                <div className="absolute inset-0 flex h-full w-full items-center justify-center">
                  <img
                    src={GAME_THEMES[theme].frontImage}
                    className="pixelated absolute inset-0 h-full w-full"
                    alt={card.name}
                  />
                  <img className="pixelated inset-0 z-10 w-[80%]" src={card.src} alt="" />
                </div>
              </div>
            );
          })}
        </div>
        <MenuButton
          type="button"
          className="transparent absolute top-1/2 right-30 h-10 w-10 min-w-0 -translate-y-1/2 p-0 transition duration-500 ease-in-out active:scale-95 md:h-16 md:w-16 lg:right-40 lg:hover:scale-110 xl:right-40"
          onClick={onNext}
        >
          <img
            src={Arrow}
            alt="next"
            className="pixelated h-full w-full rotate-180 object-contain md:h-auto"
          />
        </MenuButton>
      </>
    </Modal>
  );
};
