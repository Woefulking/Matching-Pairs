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
    <div className="flex min-h-40 w-full flex-col items-center gap-4 px-4 md:min-h-52 md:gap-6 xl:min-h-65">
      <h1 className="text-center text-3xl font-bold tracking-wide text-white md:text-5xl lg:text-6xl xl:text-[86px]">
        Choose Difficulty
      </h1>
      <div className="flex w-full flex-row flex-wrap justify-center gap-2 md:gap-4">
        {difficulties.map((difficulty) => {
          const label = GAME_DIFFICULTIES[difficulty].label;

          return (
            <button
              type="button"
              className="button sm:min-w-30 md:min-w-36 md:text-2xl lg:min-w-50 lg:text-3xl xl:min-w-62 xl:text-[36px] 2xl:min-w-70"
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
        <div className="mt-2 grid w-full max-w-90 grid-cols-3 gap-2 rounded-lg bg-black/20 p-3 text-sm font-medium backdrop-blur-sm md:max-w-105 md:text-lg lg:max-w-150 lg:text-xl xl:max-w-180 xl:text-[24px] 2xl:max-w-200">
          <span className="text-center text-sky-400">{`Timer: ${difficutlyParams.time} sec`}</span>
          <span className="text-center text-emerald-400">{`Total Cards: ${difficutlyParams.pairsCount * 2}`}</span>
          <span className="text-center text-amber-400">{`Coins for win: ${difficutlyParams.coins}`}</span>
        </div>
      )}
    </div>
  );
};
