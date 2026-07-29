import { useState } from 'react';
import { Header } from 'components/Header';
import { MenuButton } from 'components/MenuButton';
import type { GameDifficultyType, StatisticsInterface } from 'types/types';
import { Modal } from 'components/Modal';
import Arrow from 'assets/general/arrow.png';
import Trophy from 'assets/general/trophy.png';
import SandClock from 'assets/general/sandClock.png';
import Moves from 'assets/general/moves.png';

interface StatisticsProps {
  statistics: Record<GameDifficultyType, StatisticsInterface>;
  onClearStatistics: () => void;
  onBack: () => void;
}
export const Statistics = ({ statistics, onClearStatistics, onBack }: StatisticsProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <MenuButton
        className="transparent absolute top-0 left-4 flex h-12 w-10 min-w-0 items-center justify-center p-0 transition duration-500 ease-in-out active:scale-95 md:top-4 md:h-14 md:w-14 lg:hover:scale-110 xl:top-10"
        onClick={onBack}
      >
        <img src={Arrow} alt="back" className="pixelated h-full w-full object-contain md:h-auto" />
      </MenuButton>
      <div className="flex w-full flex-col items-center justify-start gap-3 select-none md:gap-6">
        <Header value="Statistics" />
        <div className="mx-auto flex w-full max-w-full flex-row justify-center gap-3 overflow-x-auto overflow-y-hidden pb-2 lg:gap-4 lg:overflow-visible lg:pb-0">
          {Object.entries(statistics).map(([key, params]) => {
            const totalWins = params.totalWins;
            const bestTime = params.bestTime ? `${params.bestTime} sec` : '-';
            const bestMoves = params.bestMoves ?? '-';
            return (
              <div
                key={key}
                className="flex w-50 shrink-0 flex-col items-center gap-3 rounded-xl border border-white/5 bg-black/20 p-3 shadow-xl backdrop-blur-sm lg:w-70 lg:shrink"
              >
                <h2 className="w-full border-b border-white/5 pb-1 text-center text-sm font-bold tracking-wider text-sky-400 sm:text-base md:text-lg lg:text-2xl xl:text-3xl">
                  {key.toUpperCase()}
                </h2>
                <div className="text-md flex w-full flex-col gap-2 px-1 font-medium text-white md:text-base lg:text-xl xl:text-2xl">
                  <div className="flex flex-row items-center gap-2">
                    <img src={Trophy} className="pixelated h-5 w-5 md:h-6 md:w-6" alt="Trophy" />
                    <div className="flex w-full flex-row justify-between">
                      <span className="text-slate-400">Wins:</span>
                      <span className="font-bold text-emerald-400">{totalWins}</span>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <img src={SandClock} className="pixelated h-5 w-5 md:h-6 md:w-6" alt="time" />
                    <div className="flex w-full flex-row justify-between">
                      <span className="text-slate-400">Best Time:</span>
                      <span className="font-bold text-sky-400">{bestTime}</span>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <img src={Moves} className="pixelated h-5 w-5 md:h-6 md:w-6" alt="moves" />
                    <div className="flex w-full flex-row justify-between">
                      <span className="text-slate-400">Best Moves:</span>
                      <span className="font-bold text-amber-400">{bestMoves}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <MenuButton
          onClick={() => setIsModalOpen(true)}
          className="button button-red xl:text-8 mt-2 min-w-30 px-2 py-0 text-lg md:max-w-70 md:min-w-36 md:text-2xl lg:min-w-50 lg:px-4 lg:py-1 lg:text-3xl xl:min-w-62 2xl:min-w-70"
        >
          Clear Statistics
        </MenuButton>
      </div>
      {isModalOpen && (
        <Modal>
          <div className="flex w-full max-w-72.5 shrink-0 flex-col items-center gap-3 rounded-xl border border-white/10 bg-slate-950/60 p-4 shadow-2xl backdrop-blur-[6px] transition-all duration-300 sm:max-w-90 md:max-w-105 md:gap-4 lg:max-w-115">
            <div className="flex w-full flex-col gap-1 text-center">
              <p className="text-base font-bold tracking-wider text-red-400 uppercase sm:text-lg md:text-xl lg:text-3xl xl:text-4xl">
                Warning!
              </p>
              <p className="px-1 text-xs font-medium tracking-wide text-slate-200 sm:text-sm md:text-base lg:text-2xl xl:text-3xl">
                Are you sure you want to reset all game statistics?{' '}
                <span className="mt-1 block font-bold text-red-400 sm:mt-0 sm:inline">
                  This cannot be undone.
                </span>
              </p>
            </div>
            <div className="my-1 h-0.5 w-full rounded bg-white/5" />
            <div className="flex w-full flex-row items-center justify-center gap-4">
              <MenuButton
                onClick={() => {
                  setIsModalOpen(false);
                  onClearStatistics();
                }}
                className="button button-red w-full max-w-[45%] min-w-0 px-1 py-1 text-xs font-bold tracking-wider uppercase sm:text-sm md:text-base lg:text-lg xl:text-2xl"
              >
                Clear
              </MenuButton>

              <MenuButton
                onClick={() => setIsModalOpen(false)}
                className="button button-blue w-full max-w-[45%] min-w-0 px-1 py-1 text-xs font-bold tracking-wider uppercase sm:text-sm md:text-base lg:text-lg xl:text-2xl"
              >
                Back
              </MenuButton>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
