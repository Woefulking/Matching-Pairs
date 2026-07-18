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
      className={`aspect-5/7 ${!isOpened ? 'hover:-translate-y-2 duration-300' : ''} ${effectClass}`}
    >
      <div className="w-full h-full perspective-distant group">
        <div
          onTransitionEnd={(e) => {
            if (e.target !== e.currentTarget) return;

            if (runMatchAnimation || runMismatchAnimation) return;

            onAnimationPhaseEnd();
          }}
          className={`w-full h-full relative transition-transform duration-300 transform-3d ${isOpened && 'transform-[rotateY(180deg)]'}`}
        >
          <div className="absolute inset-0 w-full h-full transform-[rotateY(180deg)] backface-hidden flex items-center justify-center">
            <img src={frontImage} className="pixelated absolute inset-0 w-full h-full "></img>
            <img className="pixelated w-30 z-10 inset-0" src={image} alt="" />
          </div>
          <img src={backImage} className="pixelated w-full h-full inset-0 backface-hidden"></img>
        </div>
      </div>
    </button>
  );
};
