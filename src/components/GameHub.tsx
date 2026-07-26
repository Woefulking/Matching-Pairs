import { useEffect, useState } from 'react';
import { GAME_THEMES } from '../consts/consts';
import type { GameThemesType } from '../types/types';
import { formatTime } from '../utils/formatTime';
import { MenuButton } from './MenuButton';

interface GameHubProps {
  totalCoins: number;
  timeLeft: number;
  moves: number;
  theme: GameThemesType;
  pairsFound: number;
  onRestart: () => void;
}

export const GameHub = ({
  totalCoins,
  timeLeft,
  moves,
  theme,
  pairsFound,
  onRestart,
}: GameHubProps) => {
  const [coinsHud, setCoinsHud] = useState(totalCoins);
  useEffect(() => {
    const timer = setInterval(() => {
      setCoinsHud((prev) => {
        if (prev >= totalCoins) {
          clearInterval(timer);
          return prev;
        }

        return prev + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [totalCoins]);

  const isTimerLow = timeLeft <= 15;
  return (
    <div className="absolute top-1/2 left-4 flex w-37.5 shrink-0 -translate-y-1/2 flex-col items-center justify-between gap-2 rounded-xl border border-white/5 bg-black/20 p-3 text-white shadow-2xl backdrop-blur-sm md:w-47.5 md:p-4 lg:w-50 xl:w-55 2xl:w-60">
      <div className="flex w-full flex-col gap-3 text-xs font-semibold sm:text-sm md:gap-3 md:text-xl xl:text-2xl">
        {/* Timer */}
        <div className="flex flex-row items-center gap-2 border-b border-white/5 pb-1 lg:pb-2">
          <img
            className="pixelated h-5 w-5 md:h-6 md:w-6 lg:h-10 lg:w-10 xl:h-12 xl:w-12"
            src="./src/assets/sandClock.png"
            alt="Timer"
          />
          <div className="flex w-full flex-row items-center justify-between">
            <span className="font-medium text-slate-400">Time:</span>
            <span
              className={`font-bold ${isTimerLow ? 'animate-pulse text-red-500' : 'text-sky-400'}`}
            >
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Moves Count */}
        <div className="flex flex-row items-center gap-2 border-b border-white/5 pb-1 lg:pb-2">
          <img
            className="pixelated h-5 w-5 md:h-6 md:w-6 lg:h-10 lg:w-10 xl:h-12 xl:w-12"
            src="./src/assets/moves.png"
            alt="Moves"
          />
          <div className="flex w-full flex-row items-center justify-between">
            <span className="font-medium text-slate-400">Moves:</span>
            <span className="font-bold text-white">{moves}</span>
          </div>
        </div>

        {/* Found Pairs */}
        <div className="flex flex-row items-center gap-2 border-b border-white/5 pb-1 lg:pb-2">
          <img
            className="pixelated h-5 w-4 md:h-6 md:w-6 lg:h-10 lg:w-10 xl:h-12 xl:w-12"
            src={GAME_THEMES[theme].backImage}
            alt=""
          />
          <div className="flex w-full flex-row items-center justify-between">
            <span className="font-medium text-slate-400">Pairs:</span>
            <span className="font-bold text-emerald-400">{pairsFound}</span>
          </div>
        </div>

        {/* Total Coins */}
        <div className="flex flex-row items-center gap-2">
          <img
            className="pixelated h-5 w-5 md:h-6 md:w-6 lg:h-10 lg:w-10 xl:h-12 xl:w-12"
            src="./src/assets/coin.png"
            alt="Coins"
          />
          <div className="flex w-full flex-row items-center justify-between">
            <span className="font-medium text-slate-400">Coins:</span>
            <span className="font-bold text-yellow-400">{coinsHud}</span>
          </div>
        </div>
      </div>

      <MenuButton
        className="button button-blue xl:text-2xllg:py-1 mt-2 w-full min-w-0 py-0.5 text-xs font-bold tracking-wider uppercase sm:text-sm md:text-lg lg:text-2xl"
        type="button"
        onClick={onRestart}
      >
        Restart
      </MenuButton>
    </div>
  );
};
