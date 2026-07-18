import { type ReactNode } from 'react';
import { GAME_THEMES } from '../consts/consts';

interface AnimatedBackgroundProps {
  children: ReactNode;
  isCompact?: boolean;
}

const ALL_IMAGES = Object.values(GAME_THEMES).map((theme) => theme.backImage);
const CARDS_COUNT = 60;

const BACKGROUND_CARDS = Array.from({ length: CARDS_COUNT }).map((_, index) => {
  const calculatedDelay = index * 2 + Math.random() * 2;

  return {
    left: `${Math.floor(Math.random() * 90)}%`,
    delay: `${calculatedDelay}s`,
    speed: `${Math.floor(Math.random() * 10) + 25}s`,
    themeIdx: Math.floor(Math.random() * ALL_IMAGES.length),
  };
});

export const AnimatedBackground = ({ children, isCompact }: AnimatedBackgroundProps) => {
  return (
    <div className="fixed inset-0 overflow-hidden bg-slate-900 z-0 select-none">
      <div className="absolute inset-0 pointer-events-none">
        {BACKGROUND_CARDS.map((card, index) => (
          <img
            key={index}
            src={ALL_IMAGES[card.themeIdx]}
            alt=""
            className="pixelated absolute w-14 h-20 opacity-15 animate-float-diagonal"
            style={{
              left: card.left,
              animationDelay: card.delay,
              animationDuration: card.speed,
              top: '110%',
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="w-full h-full overflow-y-auto flex items-center justify-center">
        <div
          className={`relative z-20 h-full w-full flex items-center justify-center ${
            isCompact && 'max-w-300 mx-auto px-6'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
