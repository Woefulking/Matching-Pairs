import { GAME_DIFFICULTIES } from './consts/consts';
import { useGameSession } from './hooks/useGameSession';
import { type GameDifficultyType, type GameThemesType } from './types/types';
import { formatTime } from './utils/formatTime';

interface GameProps {
  theme: GameThemesType;
  onBack: () => void;
  onWin: (coins: number) => void;
}
export const Game = ({ theme, onWin }: GameProps) => {
  const { state, cardClick, startGame, clear } = useGameSession(theme, onWin);
  const { firstCard, secondCard } = state.selectedCards;

  const isIdle = state.status === 'idle';
  const isGameFinished = state.status === 'win' || state.status === 'loss';
  return (
    <>
      {isIdle ? (
        <div className="select">
          {Object.entries(GAME_DIFFICULTIES).map(([difficulty, param]) => (
            <button
              key={difficulty}
              onClick={() => {
                startGame(difficulty as GameDifficultyType);
              }}
            >
              {param.label} ({param.time}s)
            </button>
          ))}
        </div>
      ) : (
        <div className="game">
          {formatTime(state.timeLeft)}
          <div className="board">
            {state.deck.map((card, index) => {
              const isSelected =
                firstCard?.uniqueId === card.uniqueId || secondCard?.uniqueId === card.uniqueId;
              const isMatched = state.matchedCards.has(card.name);
              const isOpened = isSelected || isMatched;

              return (
                <button
                  type="button"
                  className={`card ${isMatched ? 'card--matched' : ''}`}
                  key={index}
                  onClick={() => cardClick(card)}
                >
                  {isOpened && card.img}
                </button>
              );
            })}
          </div>
          {isGameFinished && (
            <>
              <span>Вы {state.status === 'win' ? 'победили' : 'Проиграли'}</span>
              <button type="button" onClick={() => startGame(state.difficulty)}>
                Повторить
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};
