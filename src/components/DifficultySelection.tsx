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
    <div className="flex flex-col items-center gap-4 min-h-50">
      <div className="text-[86px] text-white">Choose Difficulty</div>
      <div className="flex flex-row gap-4">
        {difficulties.map((difficulty) => {
          const label = GAME_DIFFICULTIES[difficulty].label;

          return (
            <button
              type="button"
              className="button"
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
        <div className="grid grid-cols-[repeat(3,180px)] text-[24px] font-medium">
          <span className="text-center text-white">{`Timer: ${difficutlyParams.time} sec`}</span>
          <span className="text-center  text-white">{`Total Cards: ${difficutlyParams.pairsCount * 2}`}</span>
          <span className="text-center  text-white">{`Coins for win: ${difficutlyParams.coins}`}</span>
        </div>
      )}
    </div>
  );
};
