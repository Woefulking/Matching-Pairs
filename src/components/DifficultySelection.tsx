import { useState } from 'react';
import { GAME_DIFFICULTIES } from '../consts/consts';
import type { GameDifficultyType } from '../types/types';

interface DifficultySelectionProps {
  onStartRound: (difficulty: GameDifficultyType) => void;
}

export const DifficultySelection = ({ onStartRound }: DifficultySelectionProps) => {
  const [difficulty, setDifficulty] = useState<GameDifficultyType | null>(null);

  const difficulties = Object.keys(GAME_DIFFICULTIES) as GameDifficultyType[];
  const difficutlyParams = difficulty && GAME_DIFFICULTIES[difficulty];

  return (
    <div className="flex flex-col items-center gap-4 md:gap-6 min-h-40 md:min-h-52 xl:min-h-65 w-full px-4">
      <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-[86px] font-bold text-white text-center tracking-wide">
        Choose Difficulty
      </h1>
      <div className="flex flex-row gap-2 md:gap-4 justify-center w-full flex-wrap">
        {difficulties.map((difficulty) => {
          const label = GAME_DIFFICULTIES[difficulty].label;

          return (
            <button
              type="button"
              className="button sm:min-w-30 md:min-w-36 lg:min-w-50 xl:min-w-62 2xl:min-w-70 md:text-2xl lg:text-3xl xl:text-[36px]"
              key={difficulty}
              onClick={() => onStartRound(difficulty)}
              onMouseLeave={() => setDifficulty(null)}
              onMouseEnter={() => setDifficulty(difficulty)}
            >
              {label}
            </button>
          );
        })}
      </div>
      {difficutlyParams && (
        <div className="grid grid-cols-3 gap-2 w-full max-w-90 md:max-w-105 lg:max-w-150 xl:max-w-180 2xl:max-w-200 text-sm md:text-lg lg:text-xl xl:text-[24px] font-medium mt-2 bg-black/20 p-3 rounded-lg backdrop-blur-sm">
          <span className="text-center text-sky-400">{`Timer: ${difficutlyParams.time} sec`}</span>
          <span className="text-center  text-emerald-400">{`Total Cards: ${difficutlyParams.pairsCount * 2}`}</span>
          <span className="text-center  text-amber-400">{`Coins for win: ${difficutlyParams.coins}`}</span>
        </div>
      )}
    </div>
  );
};
