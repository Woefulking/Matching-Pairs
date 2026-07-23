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
    <div className="flex flex-col items-center justify-between gap-1.5 rounded-xl border border-white/5 bg-black/20 p-2 backdrop-blur-sm md:gap-1 lg:gap-2">
      <h2 className="text-xl font-semibold tracking-wider text-white md:text-xl lg:text-3xl">
        {label}
      </h2>
      <img
        src={backImage}
        className="pixelated aspect-5/7 w-full max-w-[80%] rounded-md shadow-lg"
        alt={label}
      />
      <div className="flex w-full flex-col items-center 2xl:gap-2">
        {!isThemePurchased && (
          <div className="flex flex-row items-center justify-center">
            <img
              src="./src/assets/coin.png"
              className="pixelated h-8 w-8 lg:h-12 lg:w-12 2xl:h-12 2xl:w-12"
              alt="Coins"
            />
            <span className="text-lg font-bold text-amber-400 md:text-xl lg:text-3xl">{price}</span>
          </div>
        )}
        <div className="flex w-full flex-row items-center justify-between">
          {!isThemePurchased ? (
            <button
              className="button md:text-md w-full max-w-16 min-w-0 px-1 py-0.5 text-[16px] lg:max-w-25 lg:py-1 lg:text-2xl xl:text-2xl 2xl:max-w-35 2xl:text-2xl"
              onClick={onBuy}
            >
              Buy
            </button>
          ) : (
            <span className="md:text-md rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-sm font-medium text-emerald-400 md:px-2 lg:px-4 lg:py-1 lg:text-2xl 2xl:text-2xl">
              Purchased
            </span>
          )}
          <button
            className="transparent flex h-10 w-10 min-w-0 shrink-0 items-center justify-center p-0 transition duration-500 ease-in-out active:scale-95 md:h-10 md:w-10 lg:h-14 lg:w-14 lg:hover:scale-110"
            onClick={onPreviewOpen}
          >
            <img
              src="./src/assets/eye.png"
              alt="preview deck"
              className="pixelated h-full w-full object-contain"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
