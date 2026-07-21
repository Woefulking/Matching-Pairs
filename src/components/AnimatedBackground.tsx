import { type ReactNode } from 'react';
import { ALL_BACK_IMAGES, BACKGROUND_CARDS } from '../consts/consts';

interface AnimatedBackgroundProps {
  children: ReactNode;
  isCompact?: boolean;
}

export const AnimatedBackground = ({ children, isCompact }: AnimatedBackgroundProps) => {
  return (
    <div className="fixed inset-0 overflow-hidden bg-slate-900 z-0 select-none">
      <div className="absolute inset-0 pointer-events-none">
        {BACKGROUND_CARDS.map((card, index) => (
          <img
            key={index}
            src={ALL_BACK_IMAGES[card.themeIdx]}
            alt=""
            className="pixelated absolute w-14 h-20 opacity-80 animate-float-diagonal"
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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-10" />
      <div className="w-full h-full overflow-y-auto flex items-center justify-center">
        <div
          className={`relative z-20 h-full w-full flex items-center justify-center ${
            isCompact && 'max-w-full xl:max-w-6xl 2xl:max-w-7xl mx-auto'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
