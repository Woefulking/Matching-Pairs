import { useMemo, type RefObject } from 'react';
import { ALL_BACK_IMAGES, LOGO_WORDS } from 'consts/consts';
import { LogoCard } from './LogoCard';

interface LogoProps {
  ref: RefObject<HTMLDivElement | null>;
}
export const Logo = ({ ref }: LogoProps) => {
  const startImages = useMemo(() => {
    return LOGO_WORDS.map((word) =>
      word.map(() => ({
        front: ALL_BACK_IMAGES[Math.floor(Math.random() * ALL_BACK_IMAGES.length)],
        back: ALL_BACK_IMAGES[Math.floor(Math.random() * ALL_BACK_IMAGES.length)],
      }))
    );
  }, []);
  return (
    <div
      ref={ref}
      className="flex w-full flex-row items-center justify-center gap-4 md:gap-4 lg:gap-6 xl:gap-10"
    >
      {LOGO_WORDS.map((word, wordIndex) => (
        <div key={wordIndex} className="flex flex-row gap-1 md:gap-1.5 lg:gap-2">
          {word.map((letter, letterIndex) => (
            <div key={letterIndex} className="w-14 md:w-16 lg:w-22 xl:w-28 2xl:w-32">
              <LogoCard
                letter={letter}
                allImages={ALL_BACK_IMAGES}
                initialFront={startImages[wordIndex][letterIndex].front}
                initialBack={startImages[wordIndex][letterIndex].back}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
