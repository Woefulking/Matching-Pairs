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
            className="pixelated animate-float-diagonal absolute h-20 w-14 opacity-80 will-change-transform"
            style={
              {
                left: card.left,
                '--anim-delay': card.delay,
                '--anim-duration': card.speed,
                '--anim-rotate': card.rotate,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
      <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-[2px]" />
      <div className="flex h-full w-full items-center justify-center overflow-y-auto">
        <div
          className={`relative z-20 flex h-full w-full items-center justify-center ${
            isCompact && 'mx-auto max-w-full lg:max-w-6xl xl:max-w-7xl xl:pb-4'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
