interface CardProps {
  transform: { dx: number; dy: number };
  image: string;
  frontImage: string;
  backImage: string;
  isOpened: boolean;
  onClick: () => void;
}

export const Card = ({ transform, image, frontImage, backImage, isOpened, onClick }: CardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`translate-x-${transform.dx} -translate-y-${transform.dy} ${!isOpened ? 'hover:-translate-y-2 duration-300' : ''}`}
    >
      <div className="w-50 h-70 perspective-distant group">
        <div
          className={`w-full h-full relative transition-transform duration-500 transform-3d ${isOpened && 'transform-[rotateY(180deg)]'}`}
        >
          <div className="absolute inset-0 w-50 h-70 transform-[rotateY(180deg)] backface-hidden flex items-center justify-center">
            <img src={frontImage} className="pixelated absolute inset-0 w-50 h-70 "></img>
            <img className="pixelated w-36 z-10 inset-0" src={image} alt="" />
          </div>
          <img src={backImage} className="pixelated w-50 h-70 inset-0 backface-hidden"></img>
        </div>
      </div>
    </button>
  );
};
