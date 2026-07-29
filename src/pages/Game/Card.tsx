import type { RefCallback } from 'react';

interface CardProps {
  ref: RefCallback<HTMLButtonElement>;
  image: string;
  frontImage: string;
  backImage: string;
  isOpened: boolean;
  runMatchAnimation: boolean;
  runMismatchAnimation: boolean;
  onAnimationPhaseEnd: () => void;
  onClick: () => void;
}

export const Card = ({
  ref,
  image,
  frontImage,
  backImage,
  isOpened,
  runMatchAnimation,
  runMismatchAnimation,
  onAnimationPhaseEnd,
  onClick,
}: CardProps) => {
  const effectClass = runMatchAnimation ? 'jumping' : runMismatchAnimation ? 'shake' : '';

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      onAnimationEnd={(e) => {
        if (e.target !== e.currentTarget) return;
        onAnimationPhaseEnd();
      }}
      className={`aspect-5/7 h-[20vh] w-auto rounded-lg transition-all duration-300 ${!isOpened ? 'hover:-translate-y-1 md:hover:-translate-y-2' : ''} ${effectClass} `}
    >
      <div className="group h-full w-full perspective-distant">
        <div
          onTransitionEnd={(e) => {
            if (e.target !== e.currentTarget) return;

            if (runMatchAnimation || runMismatchAnimation) return;

            onAnimationPhaseEnd();
          }}
          className={`relative h-full w-full transition-transform duration-300 transform-3d ${isOpened && 'transform-[rotateY(180deg)]'}`}
        >
          <div className="absolute inset-0 flex h-full w-full transform-[rotateY(180deg)] items-center justify-center backface-hidden">
            <img
              src={frontImage}
              className="pixelated absolute inset-0 h-full w-full object-contain"
            ></img>
            <img
              className="pixelated relative z-10 h-[80%] w-[80%] object-contain"
              src={image}
              alt=""
            />
          </div>
          <img
            src={backImage}
            className="pixelated absolute inset-0 h-full w-full object-contain backface-hidden"
          />
        </div>
      </div>
    </button>
  );
};
