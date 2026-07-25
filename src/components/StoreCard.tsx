import { MenuButton } from './MenuButton';

interface StoreCardProps {
  label: string;
  deckImage: string;
  price: number;
  isThemeActive: boolean;
  isThemePurchased: boolean;
  onEquip: () => void;
  onBuy: () => void;
  onPreviewOpen: () => void;
}
export const StoreCard = ({
  label,
  deckImage,
  price,
  isThemeActive,
  isThemePurchased,
  onEquip,
  onBuy,
  onPreviewOpen,
}: StoreCardProps) => {
  return (
    <div className="flex h-full flex-col items-center gap-1.5 rounded-xl border border-white/5 bg-black/20 p-2 backdrop-blur-sm md:gap-1 lg:gap-2 lg:p-3">
      <h2 className="text-xl font-semibold tracking-wider text-white md:text-xl lg:text-3xl">
        {label}
      </h2>
      <img
        src={deckImage}
        className="pixelated aspect-5/7 w-full max-w-[80%] rounded-md shadow-lg"
        alt={label}
      />
      <div className="flex w-full flex-col items-center 2xl:gap-2">
        <div className={`flex flex-row items-center justify-center ${isThemePurchased && 'gap-2'}`}>
          <img
            className="pixelated h-8 w-8 lg:h-12 lg:w-12 2xl:h-12 2xl:w-12"
            src={isThemePurchased ? './src/assets/check.png' : './src/assets/coin.png'}
            alt={isThemePurchased ? 'Purchased' : 'Coins'}
          />
          <span
            className={`text-lg font-bold md:text-xl lg:text-3xl ${
              isThemePurchased ? 'font-medium text-emerald-400' : 'text-amber-400'
            }`}
          >
            {isThemePurchased ? 'Purchased' : price}
          </span>
        </div>
        <div className="flex w-full flex-row items-center justify-between">
          <MenuButton
            className={`button md:text-md w-full max-w-16 min-w-0 px-1 py-0.5 text-[16px] lg:max-w-25 lg:py-1 lg:text-2xl xl:text-2xl 2xl:max-w-35 2xl:text-2xl ${!isThemePurchased && 'border-2 border-sky-400 hover:bg-sky-400 hover:text-slate-950'} ${isThemePurchased && !isThemeActive && 'border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-slate-950'} ${isThemeActive && 'pointer-events-none cursor-default border-2 border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]'}`}
            onClick={!isThemePurchased ? onBuy : onEquip}
          >
            {!isThemePurchased && 'Buy'}
            {isThemePurchased && !isThemeActive && 'Equip'}
            {isThemeActive && 'Active'}
          </MenuButton>
          <MenuButton
            className="transparent flex h-10 w-10 min-w-0 shrink-0 items-center justify-center p-0 transition duration-500 ease-in-out active:scale-95 md:h-10 md:w-10 lg:h-14 lg:w-14 lg:hover:scale-110"
            onClick={onPreviewOpen}
          >
            <img
              src="./src/assets/eye.png"
              alt="preview deck"
              className="pixelated h-full w-full object-contain"
            />
          </MenuButton>
        </div>
      </div>
    </div>
  );
};
