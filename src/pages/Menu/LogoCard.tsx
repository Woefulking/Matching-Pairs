import { useEffect, useState } from 'react';
import { getRandomDelay, getRandomImage } from 'utils/random';

interface LogoCardProps {
  letter: string;
  allImages: string[];
  initialFront: string;
  initialBack: string;
}

export const LogoCard = ({ letter, allImages, initialFront, initialBack }: LogoCardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [delay, setDelay] = useState<number>(() => getRandomDelay());

  const [frontImage, setFrontImage] = useState<string>(initialFront);
  const [backImage, setBackImage] = useState<string>(initialBack);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen((prev) => !prev);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const handleTransitionEnd = () => {
    setDelay(getRandomDelay());

    if (isOpen) {
      setBackImage(getRandomImage(allImages));
    } else {
      setFrontImage(getRandomImage(allImages));
    }
  };

  return (
    <div className="group aspect-5/7 w-full perspective-distant">
      <div
        onTransitionEnd={handleTransitionEnd}
        className={`relative h-full w-full transition-transform duration-300 transform-3d ${isOpen && 'transform-[rotateY(180deg)]'}`}
      >
        <div className="absolute inset-0 flex h-full w-full transform-[rotateY(180deg)] items-center justify-center backface-hidden">
          <img src={frontImage} className="pixelated absolute inset-0 h-full w-full"></img>
          <img className="pixelated inset-0 z-10 w-[80%]" src={letter} alt="" />
        </div>
        <img src={backImage} className="pixelated inset-0 h-full w-full backface-hidden"></img>
      </div>
    </div>
  );
};
