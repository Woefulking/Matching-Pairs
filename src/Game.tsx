import { GAME_DIFFICULTIES, GAME_THEMES } from './consts/consts';
import { useGameSession } from './hooks/useGameSession';
import { MenuButton } from './Menu';
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
  const isLoose = state.status === 'loss';
  const isGameFinished = state.status === 'win' || state.status === 'loss';
  return (
    <>
      {isIdle ? (
        <div className="select">
          {Object.entries(GAME_DIFFICULTIES).map(([difficulty, param]) => (
            <MenuButton
              key={difficulty}
              onClick={() => {
                startGame(difficulty as GameDifficultyType);
              }}
            >
              {param.label} ({param.time}s)
            </MenuButton>
          ))}
        </div>
      ) : (
        <div className="game">
          {formatTime(state.timeLeft)}
          <div className="flex flex-row flex-wrap gap-4">
            {state.deck.map((card, index) => {
              const isSelected =
                firstCard?.uniqueId === card.uniqueId || secondCard?.uniqueId === card.uniqueId;
              const isMatched = state.matchedCards.has(card.name);
              const isOpened = isSelected || isMatched || isLoose;

              return (
                <button
                  type="button"
                  className={`${!isOpened && !isGameFinished && 'hover:-translate-y-2 duration-300'}`}
                  key={index}
                  onClick={() => cardClick(card)}
                >
                  <div className="w-50 h-70 perspective-distant group">
                    <div
                      className={`w-full h-full relative transition-transform duration-500 transform-3d ${isOpened && 'transform-[rotateY(180deg)]'}`}
                    >
                      <div className="absolute inset-0 w-50 h-70 transform-[rotateY(180deg)] backface-hidden flex items-center justify-center">
                        <img
                          src={GAME_THEMES[theme].faceup}
                          className="test absolute inset-0 w-50 h-70 "
                        ></img>
                        <img className="test w-36 z-10 inset-0" src={card.img} alt="" />
                      </div>
                      <img
                        src={GAME_THEMES[theme].facedown}
                        className="test w-50 h-70 inset-0 backface-hidden"
                      ></img>
                    </div>
                  </div>
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
