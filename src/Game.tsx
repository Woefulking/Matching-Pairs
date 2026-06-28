import { useGameSession } from './hooks/useGameSession';
import { GAME_DIFFICULTIES, type GameDifficultyType } from './types/types';
import { formatTime } from './utils/formatTime';

export const Game = () => {
  const { state, handleCardClick, handleStartGame, handleClear } = useGameSession();
  const { firstCard, secondCard } = state.selectedCards;

  const isIdle = state.status === 'idle';
  const isGameFinished = state.status === 'won' || state.status === 'lost';
  return (
    <>
      {isIdle ? (
        <div className="select">
          {Object.entries(GAME_DIFFICULTIES).map(([difficulty, param]) => (
            <button
              key={difficulty}
              onClick={() => {
                handleStartGame(difficulty as GameDifficultyType);
              }}
            >
              {difficulty} ({param.time}s)
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
                  onClick={() => handleCardClick(card)}
                >
                  {isOpened && card.img}
                </button>
              );
            })}
          </div>
          {isGameFinished && (
            <>
              <span>Вы {state.status === 'won' ? 'победили' : 'Проиграли'}</span>
              <button type="button" onClick={() => handleStartGame(state.difficulty)}>
                Повторить
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};
