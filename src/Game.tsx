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
        className="absolute top-[20%] left-0 translate-y-[-20%] button w-12 h-12"
        type="button"
        onClick={() => handleBackToMenu()}
      >
        Back
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
