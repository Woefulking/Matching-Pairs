import { DifficultySelection } from './components/DifficultySelection';
import { GAME_DIFFICULTIES, GAME_THEMES } from './consts/consts';
import { useGameSession } from './hooks/useGameSession';
import { type CardType, type GameThemesType, type WinResultInterface } from './types/types';
import { GameHub } from './components/GameHub';
import { GameField } from './components/GameField';
import { useAudio } from 'src/hooks/useAudio/useAudio';

interface GameProps {
  theme: GameThemesType;
  coins: number;
  onWin: (result: WinResultInterface) => void;
}

export const Game = ({ theme, coins, onWin }: GameProps) => {
  const { play } = useAudio();
  const { state, cardClick, startRound, setGameStatus, resolveTurn } = useGameSession(theme, onWin);

  const { firstCard, secondCard } = state.selectedCards;

  const difficultySettings = GAME_DIFFICULTIES[state.difficulty];
  const currentTheme = GAME_THEMES[theme];

  const isIdle = state.status === 'idle';
  const isLoose = state.status === 'loss';
  const isGameEnd = state.status === 'win' || state.status === 'loss';

  const comparisonResult = state.comparisonResult;

  const handleCardClick = (card: CardType) => {
    play('cardClick');
    cardClick(card);
  };

  return (
    <>
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
            diffuculty={difficultySettings}
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
        </div>
      )}
    </>
  );
};
