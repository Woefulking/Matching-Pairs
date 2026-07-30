import { GAME_THEMES } from 'consts/consts';
import { useGameSession } from './hooks/useGameSession';
import { type CardType, type GameThemesType, type WinResultInterface } from 'types/types';
import { MenuButton } from 'components/MenuButton';
import { Modal } from 'components/Modal';
import { useState } from 'react';
import { DifficultySelection } from './DifficultySelection';
import { GameHub } from './GameHub';
import { GameField } from './GameField';

interface GameProps {
  theme: GameThemesType;
  coins: number;
  onWin: (result: WinResultInterface) => void;
  onBack: () => void;
}

export const Game = ({ theme, coins, onWin, onBack }: GameProps) => {
  const { state, cardClick, startRound, setGameStatus, resolveTurn, clearRoundState } =
    useGameSession(theme, onWin);

  const { firstCard, secondCard } = state.selectedCards;

  const currentTheme = GAME_THEMES[theme];

  const isIdle = state.status === 'idle';
  const isLoose = state.status === 'loss';
  const isGameEnd = state.status === 'win' || state.status === 'loss';

  const comparisonResult = state.comparisonResult;

  const [isConfirmExitOpen, setIsConfirmExitOpen] = useState(false);

  const handleCardClick = (card: CardType) => {
    cardClick(card);
  };

  const handleBackToMenu = () => {
    if (isIdle || isGameEnd) {
      clearRoundState();
      onBack();
    } else {
      setIsConfirmExitOpen(true);
    }
  };

  const handleConfirmExit = () => {
    setIsConfirmExitOpen(false);
    clearRoundState();
    onBack();
  };

  return (
    <>
      <MenuButton
        className="transparent absolute top-0 left-4 flex h-12 w-10 min-w-0 items-center justify-center p-0 transition duration-500 ease-in-out active:scale-95 md:top-4 md:h-14 md:w-14 lg:hover:scale-110 xl:top-10"
        onClick={() => handleBackToMenu()}
      >
        <img
          src="/assets/general/arrow.png"
          alt="back"
          className="pixelated h-full w-full object-contain md:h-auto"
        />
      </MenuButton>
      {isIdle ? (
        <DifficultySelection onStartRound={startRound} />
      ) : (
        <div className="flex justify-center gap-4">
          <GameHub
            totalCoins={coins}
            timeLeft={state.timeLeft}
            moves={state.moves}
            theme={theme}
            pairsFound={state.matchedCards.size}
            onRestart={() => startRound(state.difficulty)}
          />
          <GameField
            deck={state.deck}
            status={state.status}
            firstCard={firstCard}
            secondCard={secondCard}
            matchedCards={state.matchedCards}
            comparisonResult={comparisonResult}
            currentTheme={currentTheme}
            isLoose={isLoose}
            onAnimationEnd={setGameStatus}
            onCardClick={handleCardClick}
            onSecondCardOpened={resolveTurn}
          />
          {isGameEnd && (
            <div
              className={`pointer-events-none absolute inset-0 z-40 flex ${isLoose ? 'animate-pulse' : 'animate-bounce'} items-center justify-center select-none`}
            >
              <span
                className={`text-6xl font-black tracking-widest ${isLoose ? 'text-red-500' : 'text-emerald-400'} uppercase italic drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)] md:text-8xl`}
              >
                {isLoose ? 'Game Over' : 'Victory'}
              </span>
            </div>
          )}
          {isConfirmExitOpen && (
            <Modal>
              <div className="flex w-full max-w-72.5 shrink-0 flex-col items-center gap-3 rounded-xl border border-white/10 bg-slate-950/60 p-4 shadow-2xl backdrop-blur-[6px] transition-all duration-300 sm:max-w-90 md:max-w-105 md:gap-4 lg:max-w-115">
                <div className="flex w-full flex-col gap-1 text-center">
                  <p className="text-base font-bold tracking-wider text-red-400 uppercase sm:text-lg md:text-xl lg:text-3xl xl:text-4xl">
                    Abandon Game?
                  </p>
                  <p className="px-1 text-xs font-medium tracking-wide text-slate-200 sm:text-sm md:text-base lg:text-2xl xl:text-3xl">
                    Are you sure you want to leave? Your current round progress{' '}
                    <span className="mt-1 block font-bold text-red-400 sm:mt-0 sm:inline">
                      will be lost forever.
                    </span>
                  </p>
                </div>

                <div className="my-1 h-0.5 w-full rounded bg-white/5" />

                <div className="flex w-full flex-row items-center justify-center gap-4">
                  <button
                    onClick={handleConfirmExit}
                    className="button button-red w-full max-w-[45%] min-w-0 px-1 py-1 text-xs font-bold tracking-wider uppercase sm:text-sm md:text-base lg:text-lg xl:text-2xl"
                  >
                    Quit
                  </button>
                  <button
                    onClick={() => setIsConfirmExitOpen(false)}
                    className="button button-blue w-full max-w-[45%] min-w-0 px-1 py-1 text-xs font-bold tracking-wider uppercase sm:text-sm md:text-base lg:text-lg xl:text-2xl"
                  >
                    Stay
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      )}
    </>
  );
};
