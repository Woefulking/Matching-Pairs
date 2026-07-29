import { useState } from 'react';
import { GAME_DIFFICULTIES } from 'consts/consts';
import type { GameDifficultyType } from 'types/types';
import { MenuButton } from 'components/MenuButton';
import { Header } from 'components/Header';

interface DifficultySelectionProps {
  onStartRound: (difficulty: GameDifficultyType) => void;
}

export const DifficultySelection = ({ onStartRound }: DifficultySelectionProps) => {
  const [difficulty, setDifficulty] = useState<GameDifficultyType | null>(null);

  const difficulties = Object.keys(GAME_DIFFICULTIES) as GameDifficultyType[];
  const difficutlyParams = difficulty && GAME_DIFFICULTIES[difficulty];

  return (
    <div className="flex min-h-40 w-full flex-col items-center gap-4 px-4 md:min-h-52 md:gap-6 xl:min-h-65">
      <Header value="Choose Difficulty" />
      <div className="flex w-full flex-row flex-wrap justify-center gap-2 md:gap-4">
        {difficulties.map((item) => {
          const label = GAME_DIFFICULTIES[item].label;
          const isSelected = difficulty === item;

          return (
            <MenuButton
              key={item}
              type="button"
              className={`button button-blue xl:text-8 min-w-30 px-2 py-0 text-lg transition-all duration-200 md:max-w-70 md:min-w-36 md:text-2xl lg:min-w-50 lg:px-4 lg:py-1 lg:text-3xl xl:min-w-62 xl:py-2 2xl:min-w-70 ${
                isSelected
                  ? 'border-sky-400 bg-sky-400 text-slate-950 shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                  : ''
              }`}
              onClick={() => {
                const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
                if (isTouchDevice) {
                  setDifficulty(item);
                } else {
                  onStartRound(item);
                }
              }}
              onMouseLeave={() => setDifficulty(null)}
              onMouseEnter={() => setDifficulty(item)}
            >
              {label}
            </MenuButton>
          );
        })}
      </div>
      {difficutlyParams && (
        <div className="mt-2 flex w-full flex-col items-center gap-4">
          <div className="grid w-full max-w-90 grid-cols-3 gap-2 rounded-lg bg-black/20 p-3 text-sm font-medium backdrop-blur-sm md:max-w-105 md:text-lg lg:max-w-150 lg:text-xl xl:max-w-180 xl:text-[24px] 2xl:max-w-200">
            <span className="text-center text-sky-400">{`Timer: ${difficutlyParams.time} sec`}</span>
            <span className="text-center text-emerald-400">{`Total Cards: ${difficutlyParams.pairsCount * 2}`}</span>
            <span className="text-center text-amber-400">{`Coins for win: ${difficutlyParams.coins}`}</span>
          </div>
          {window.matchMedia('(pointer: coarse)').matches && (
            <MenuButton
              type="button"
              className="button button-green xl:text-8 min-w-30 px-2 py-0 text-lg transition-all duration-200 md:max-w-70 md:min-w-36 md:text-2xl lg:min-w-50 lg:px-4 lg:py-1 lg:text-3xl xl:min-w-62 xl:py-2 2xl:min-w-70"
              onClick={() => onStartRound(difficulty!)}
            >
              Start Game
            </MenuButton>
          )}
        </div>
      )}
    </div>
  );
};
