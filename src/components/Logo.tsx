import { GAME_THEMES, LOGO_WORDS } from '../consts/consts';
import { LogoCard } from './LogoCard';

const ALL_IMAGES = Object.values(GAME_THEMES).map((theme) => theme.backImage);

export const Logo = () => {
  return (
    <div className="flex flex-row gap-12 items-center">
      {LOGO_WORDS.map((word, index) => (
        <div key={index} className="flex flex-row gap-2">
          {word.map((letter, letterIndex) => (
            <LogoCard key={letterIndex} letter={letter} allImages={ALL_IMAGES} />
          ))}
        </div>
      ))}
    </div>
  );
};
