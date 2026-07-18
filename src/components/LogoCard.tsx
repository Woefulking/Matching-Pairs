import { useEffect, useState } from 'react';

interface LogoCardProps {
  letter: string;
  allImages: string[];
}

const getRandomDelay = () => Math.floor(Math.random() * 3000) + 2500;
const getRandomImage = (images: string[]) => images[Math.floor(Math.random() * images.length)];

export const LogoCard = ({ letter, allImages }: LogoCardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [delay, setDelay] = useState<number>(() => getRandomDelay());

  const [frontImage, setFrontImage] = useState<string>(() => getRandomImage(allImages));
  const [backImage, setBackImage] = useState<string>(() => getRandomImage(allImages));

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
    <div className="aspect-5/7">
      <div className="w-full h-full perspective-distant group">
        <div
          onTransitionEnd={handleTransitionEnd}
          className={`w-33 h-46 relative transition-transform duration-300 transform-3d ${isOpen && 'transform-[rotateY(180deg)]'}`}
        >
          <div className="absolute inset-0 w-full h-full transform-[rotateY(180deg)] backface-hidden flex items-center justify-center">
            <img src={frontImage} className="pixelated absolute inset-0 w-full h-full "></img>
            <img className="pixelated w-30 z-10 inset-0" src={letter} alt="" />
          </div>
          <img src={backImage} className="pixelated w-full h-full inset-0 backface-hidden"></img>
        </div>
      </div>
    </div>
  );
};
