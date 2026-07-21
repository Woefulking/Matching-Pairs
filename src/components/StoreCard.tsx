interface StoreCardProps {
  label: string;
  backImage: string;
  price: number;
  isThemePurchased: boolean;
  onBuy: () => void;
  onPreviewOpen: () => void;
}
export const StoreCard = ({
  label,
  backImage,
  price,
  isThemePurchased,
  onBuy,
  onPreviewOpen,
}: StoreCardProps) => {
  return (
    <div className="flex flex-col gap-1.5 md:gap-2 items-center bg-black/20 p-3 rounded-xl border border-white/5 backdrop-blur-sm">
      <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-semibold tracking-wider">
        {label}
      </h2>
      <img
        src={backImage}
        className="pixelated aspect-5/7 max-w-[80%] w-full rounded-md shadow-lg"
        alt={label}
      />
      <div className="w-full flex flex-col items-center 2xl:gap-2">
        {!isThemePurchased && (
          <div className="flex flex-row items-center justify-center">
            <img
              src="./src/assets/coin.png"
              className="w-8 h-8 lg:w-12 lg:h-12 2xl:w-12 2xl:h-12 pixelated"
              alt="Coins"
            />
            <span className="text-amber-400 font-bold text-lg md:text-xl lg:text-3xl">{price}</span>
          </div>
        )}
        <div className="w-full flex flex-row justify-between items-center">
          {!isThemePurchased ? (
            <button
              className="button min-w-0 w-full max-w-20 md:max-w-20 lg:max-w-30 2xl:max-w-35 py-0 lg:py-1 px-1 text-base md:text-lg 2xl:text-2xl"
              onClick={onBuy}
            >
              Buy
            </button>
          ) : (
            <span className=" text-emerald-400 font-medium text-sm md:text-xl 2xl:text-2xl bg-emerald-500/10 px-2 md:px-1 lg:px-4 py-0 lg:py-1 rounded-md border border-emerald-500/20">
              Purchased
            </span>
          )}
          <button
            className="transparent min-w-0 p-0 flex items-center justify-center
                      w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 shrink-0
                      transition duration-500 ease-in-out lg:hover:scale-110 active:scale-95"
            onClick={onPreviewOpen}
          >
            <img
              src="./src/assets/eye.png"
              alt="preview deck"
              className="pixelated w-full h-full object-contain"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
