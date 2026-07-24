import { type ReactNode } from 'react';
import { ALL_BACK_IMAGES, BACKGROUND_CARDS } from '../consts/consts';

interface AnimatedBackgroundProps {
  children: ReactNode;
  isCompact?: boolean;
}

export const AnimatedBackground = ({ children, isCompact }: AnimatedBackgroundProps) => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-slate-900 select-none">
      <div className="pointer-events-none absolute inset-0">
        {BACKGROUND_CARDS.map((card, index) => (
          <img
            key={index}
            src={ALL_BACK_IMAGES[card.themeIdx]}
            alt=""
            className="pixelated animate-float-diagonal absolute h-20 w-14 opacity-80"
            style={{
              left: card.left,
              animationDelay: card.delay,
              animationDuration: card.speed,
              top: '110%',
              rotate: card.rotate,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-[2px]" />
      <div className="flex h-full w-full items-center justify-center overflow-y-auto">
        <div
          className={`relative z-20 flex h-full w-full items-center justify-center ${
            isCompact && 'mx-auto max-w-full xl:max-w-6xl xl:pb-4 2xl:max-w-7xl'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
