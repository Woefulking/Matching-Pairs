import { useEffect, useState } from 'react';
import { GAME_THEMES } from '../consts/consts';
import type { GameDifficultyType, GameThemesType } from '../types/types';
import { formatTime } from '../utils/formatTime';

interface GameHubProps {
  totalCoins: number;
  timeLeft: number;
  moves: number;
  theme: GameThemesType;
  pairsFound: number;
  currentDifficulty: GameDifficultyType;
  collectReward: () => void;
  onRestart: (difficulty: GameDifficultyType) => void;
}
export const GameHub = ({
  totalCoins,
  timeLeft,
  moves,
  theme,
  pairsFound,
  currentDifficulty,
  collectReward,
  onRestart,
}: GameHubProps) => {
  const [coinsUi, setCoinsUi] = useState(totalCoins);
  useEffect(() => {
    if (coinsUi >= totalCoins) return;

    const timer = setInterval(() => {
      setCoinsUi((prev) => {
        if (prev >= totalCoins) {
          clearInterval(timer);
          return prev;
        }

        return prev + 1;
      });
    }, 20);
    collectReward();
    return () => clearInterval(timer);
  }, [coinsUi, totalCoins, collectReward]);

  const isTimerLow = timeLeft <= 15;
  return (
    <div className="absolute top-1/2 left-0 -translate-y-1/2">
      <div className="flex flex-col gap-2">
        {/* Timer */}
        <div className="flex flex-row items-center gap-4 max-h-12">
          <div className="min-w-18">
            <img className="pixelated w-10" src="./src/assets/sandClock.png" alt="" />
          </div>
          <span className={`text-[42px] ${isTimerLow && 'text-red-500'}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
        {/* Moves Count */}
        <div className="flex flex-row items-center gap-4 max-h-12">
          <div className="min-w-18">
            <img className="pixelated w-10" src="./src/assets/moves.png" alt="" />
          </div>
          <span className="text-[36px]">{moves}</span>
        </div>
        {/* Found Pairs Count */}
        <div className="flex flex-row items-center gap-4 max-h-12">
          <div className="flex flex-row items-center gap-1 min-w-18">
            <img className="pixelated w-8" src={GAME_THEMES[theme].backImage} alt="" />
            <img className="pixelated w-8" src={GAME_THEMES[theme].backImage} alt="" />
          </div>
          <span className="text-[36px]">{pairsFound}</span>
        </div>
        {/* Total Coins */}
        <div className="flex flex-row items-center gap-4 max-h-12">
          <div className="min-w-18">
            <img className="pixelated w-12" src="./src/assets/coin.png" alt="" />
          </div>
          <span className="text-[36px]">{coinsUi}</span>
        </div>
        {/* Restart */}
        <button className="button" type="button" onClick={() => onRestart(currentDifficulty)}>
          Restart
        </button>
      </div>
    </div>
  );
};
