import { useEffect, useRef } from 'react';
import { Card } from './components/card';
import { DifficultySelection } from './components/DifficultySelection';
import { Timer } from './components/Timer';
import { GAME_DIFFICULTIES, GAME_THEMES } from './consts/consts';
import { useGameSession } from './hooks/useGameSession';
import { type GameThemesType } from './types/types';
import { shuffle } from './utils/shuffle';

interface GameProps {
  theme: GameThemesType;
  onBack: () => void;
  onWin: (coins: number) => void;
}

interface Test {
  id: number;
  dx: number;
  dy: number;
}
export const Game = ({ theme, onBack, onWin }: GameProps) => {
  const { state, cardClick, startGame, clear } = useGameSession(theme, onWin);
  const { firstCard, secondCard } = state.selectedCards;

  const isIdle = state.status === 'idle';
  const isPlaying = state.status === 'playing';
  const isLoose = state.status === 'loss';

  const deckRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  const deckRectRef = useRef<DOMRect | null>(null);
  const childCoordsRef = useRef<DOMRect[]>([]);

  const diffCoordsRef = useRef<Test[]>([]);

  useEffect(() => {
    if (!boardRef.current) return;
    if (!deckRef.current) return;

    deckRectRef.current = deckRef.current.getBoundingClientRect();
    childCoordsRef.current = Array.from(boardRef.current.children).map((child) =>
      child.getBoundingClientRect()
    );

    console.log(deckRectRef.current);
    console.log(childCoordsRef.current);
  }, []);

  const order = shuffle(Array.from({ length: state.deck.length }, (_, index) => index));
  console.log(order);

  useEffect(() => {
    if (!deckRectRef.current) return;
    const deckCoords = { top: deckRectRef.current?.top, left: deckRectRef.current?.left };
    childCoordsRef.current.forEach((child, index) => {
      diffCoordsRef.current.push({
        id: index,
        dx: child.left - deckCoords.left,
        dy: child.top - deckCoords.top,
      });
    });

    console.log(diffCoordsRef);
  });

  const handleBackToMenu = () => {
    clear();
    onBack();
  };
  return (
    <>
      <button className="w-12 h-12" type="button" onClick={() => handleBackToMenu()}>
        Назад
      </button>
      {isIdle ? (
        <DifficultySelection onStartGame={startGame} />
      ) : (
        <div className="flex flex-row gap-24">
          <div className="" ref={deckRef}>
            <img src={GAME_THEMES[theme].backImage} className="pixelated w-50 h-70" alt="" />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-row justify-center items-baseline gap-6">
              <Timer timeLeft={state.timeLeft} />
              {!isPlaying && (
                <div className="flex flex-row items-center gap-6">
                  <div className="flex flex-col justify-center">
                    <span className="text-[100px]">
                      You {state.status === 'win' ? 'win' : 'lose'}
                    </span>
                    {!isLoose && (
                      <div className="flex flex-row gap-2 items-center justify-center">
                        <span className="text-[36px]">{`+${GAME_DIFFICULTIES[state.difficulty].coins}`}</span>
                        <img src="./src/assets/coin.png" className="pixelated w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <button
                    className="button"
                    type="button"
                    onClick={() => startGame(state.difficulty)}
                  >
                    Restart
                  </button>
                </div>
              )}
            </div>
            <div
              ref={boardRef}
              className={`grid grid-cols-[repeat(${GAME_DIFFICULTIES[state.difficulty].pairsCount},200px)] gap-4`}
            >
              {state.deck.map((card, index) => {
                const isSelected =
                  firstCard?.uniqueId === card.uniqueId || secondCard?.uniqueId === card.uniqueId;
                const isMatched = state.matchedCards.has(card.name);
                const isOpened = isSelected || isMatched || isLoose;

                return (
                  <Card
                    // transform={{ dx: diffCoordsRef[index].dx, dy: arr[index].dy }}
                    key={index}
                    image={card.img}
                    frontImage={GAME_THEMES[theme].frontImage}
                    backImage={GAME_THEMES[theme].backImage}
                    isOpened={isOpened}
                    onClick={() => cardClick(card)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
