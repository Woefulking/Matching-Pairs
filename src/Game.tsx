import { DifficultySelection } from './components/DifficultySelection';
import { GAME_DIFFICULTIES, GAME_THEMES } from './consts/consts';
import { useGameSession } from './hooks/useGameSession';
import { type CardType, type GameThemesType, type WinResultInterface } from './types/types';
import { GameHub } from './components/GameHub';
import { GameField } from './components/GameField';

interface GameProps {
  theme: GameThemesType;
  coins: number;
  onBack: () => void;
  onWin: (result: WinResultInterface) => void;
}

export const Game = ({ theme, coins, onBack, onWin }: GameProps) => {
  const { state, cardClick, startRound, setGameStatus, resolveTurn, clear } = useGameSession(
    theme,
    onWin
  );
  const { firstCard, secondCard } = state.selectedCards;

  const difficultySettings = GAME_DIFFICULTIES[state.difficulty];
  const currentTheme = GAME_THEMES[theme];

  const isIdle = state.status === 'idle';
  const isPlaying = state.status === 'playing';
  const isLoose = state.status === 'loss';
  const isWin = state.status === 'loss';
  const isGameEnd = state.status === 'win' || state.status === 'loss';

  const comparisonResult = state.comparisonResult;

  const handleCardClick = (card: CardType) => {
    cardClick(card);
  };
  const handleBackToMenu = () => {
    clear();
    onBack();
  };

  const handleRestartGame = () => {
    startRound(state.difficulty);
  };

  return (
    <>
      <button
        className="transparent absolute top-4 md:top-4 xl:top-40 left-4 flex items-center justify-center
         min-w-0 w-10 h-12 md:w-14 md:h-14 p-0
         transition duration-500 ease-in-out lg:hover:scale-110 active:scale-95"
        type="button"
        onClick={handleBackToMenu}
      >
        <img
          src="./src/assets/arrow.png"
          className="pixelated w-full h-full md:h-auto object-contain"
        />
      </button>
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
            onRestart={handleRestartGame}
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
        </div>
      )}
    </>
  );
};
