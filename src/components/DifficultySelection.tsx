import { useState } from 'react';
import { GAME_DIFFICULTIES } from '../consts/consts';
import type { GameDifficultyType } from '../types/types';

interface DifficultySelectionProps {
  onStartGame: (difficulty: GameDifficultyType) => void;
}

export const DifficultySelection = ({ onStartGame }: DifficultySelectionProps) => {
  const [difficulty, setDifficulty] = useState<GameDifficultyType | null>(null);
  const difficulties = Object.keys(GAME_DIFFICULTIES) as GameDifficultyType[];
  const difficutlyParams = difficulty && GAME_DIFFICULTIES[difficulty];

  return (
    <div className="flex flex-col items-center gap-4 min-h-100">
      <div className="text-[86px]">Choose Difficulty</div>
      <div className="flex flex-row gap-4">
        {difficulties.map((difficulty) => {
          const label = GAME_DIFFICULTIES[difficulty].label;

          return (
            <button
              type="button"
              className="button"
              key={difficulty}
              onClick={() => onStartGame(difficulty)}
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
          <span className="text-center">{`Timer: ${difficutlyParams.time} sec`}</span>
          <span className="text-center">{`Total Cards: ${difficutlyParams.pairsCount * 2}`}</span>
          <span className="text-center">{`Coins for win: ${difficutlyParams.coins}`}</span>
        </div>
      )}
    </div>
  );
};
