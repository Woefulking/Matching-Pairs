import { ALL_BACK_IMAGES, LOGO_WORDS } from '../consts/consts';
import { LogoCard } from './LogoCard';

export const Logo = () => {
  return (
    <div className="flex w-full flex-row items-center justify-center gap-4 md:gap-4 lg:gap-6 xl:gap-10">
      {LOGO_WORDS.map((word, index) => (
        <div key={index} className="flex flex-row gap-1 md:gap-1.5 lg:gap-2">
          {word.map((letter, letterIndex) => (
            <div key={letterIndex} className="w-14 md:w-16 lg:w-22 xl:w-28 2xl:w-32">
              <LogoCard letter={letter} allImages={ALL_BACK_IMAGES} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
