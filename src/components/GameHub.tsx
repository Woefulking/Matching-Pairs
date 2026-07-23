import { useEffect, useState } from 'react';
import { GAME_THEMES } from '../consts/consts';
import type { GameThemesType } from '../types/types';
import { formatTime } from '../utils/formatTime';

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
    <div
      className="pixelated absolute top-1/2 left-0 -translate-y-1/2 px-3 py-2 text-white"
      style={{
        backgroundImage: `url(${GAME_THEMES[theme].frontImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
      }}
    >
      <div className="relative z-10 flex flex-col gap-2">
        {/* Timer */}
        <div className="flex max-h-12 flex-row items-center gap-4">
          <div className="min-w-18">
            <img className="pixelated w-10" src="./src/assets/sandClock.png" alt="" />
          </div>
          <span className={`text-[42px] ${isTimerLow && 'text-red-500'}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
        {/* Moves Count */}
        <div className="flex max-h-12 flex-row items-center gap-4">
          <div className="min-w-18">
            <img className="pixelated w-10" src="./src/assets/moves.png" alt="" />
          </div>
          <span className="text-[36px]">{moves}</span>
        </div>
        {/* Found Pairs Count */}
        <div className="flex max-h-12 flex-row items-center gap-4">
          <div className="flex min-w-18 flex-row items-center gap-1">
            <img className="pixelated w-8" src={GAME_THEMES[theme].backImage} alt="" />
            <img className="pixelated w-8" src={GAME_THEMES[theme].backImage} alt="" />
          </div>
          <span className="text-[36px]">{pairsFound}</span>
        </div>
        {/* Total Coins */}
        <div className="flex max-h-12 flex-row items-center gap-4">
          <div className="min-w-18">
            <img className="pixelated w-12" src="./src/assets/coin.png" alt="" />
          </div>
          <span className="text-[36px]">{coinsHud}</span>
        </div>
        {/* Restart */}
        <button className="button text-black" type="button" onClick={() => onRestart()}>
          Restart
        </button>
      </div>
    </div>
  );
};
