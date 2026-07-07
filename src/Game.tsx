import { useLayoutEffect, useRef } from 'react';
import { Card } from './components/Card';
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

export const Game = ({ theme, onBack, onWin }: GameProps) => {
  const { state, cardClick, startRound, startPlaying, clear } = useGameSession(theme, onWin);
  const { firstCard, secondCard } = state.selectedCards;

  const isIdle = state.status === 'idle';
  const isPlaying = state.status === 'playing';
  const isLoose = state.status === 'loss';

  const deckRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const cardsRefs = useRef<HTMLButtonElement[]>([]);

  useLayoutEffect(() => {
    if (state.status !== 'dealing') return;
    if (!boardRef.current || !deckRef.current) return;

    const deckCoords = deckRef.current.getBoundingClientRect();
    const cardsCoords = cardsRefs.current.map((card) => card?.getBoundingClientRect());
    const order = shuffle(Array.from({ length: state.deck.length }, (_, index) => index));

    let maxDuration = 0;

    order.forEach((targetIndex, i) => {
      const card = cardsRefs.current[targetIndex];
      const targetRect = cardsCoords[targetIndex];
      if (!card || !targetRect) return;

      const dx = deckCoords.left + deckCoords.width / 2 - (targetRect.left + targetRect.width / 2);
      const dy = deckCoords.top + deckCoords.height / 2 - (targetRect.top + targetRect.height / 2);

      const delay = i * 120;

      maxDuration = Math.max(maxDuration, delay + 400);

      card.animate(
        [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'translate(0, 0)' }],
        {
          duration: 400,
          delay: delay,
          easing: 'ease-out',
          fill: 'backwards',
        }
      );
    });

    const timerId = setTimeout(() => {
      startPlaying();
    }, maxDuration);

    return () => clearTimeout(timerId);
  }, [state.status, state.deck.length, startPlaying]);

  const handleBackToMenu = () => {
    clear();
    onBack();
  };
  return (
    <div className="relative w-full">
      <button className="w-12 h-12" type="button" onClick={() => handleBackToMenu()}>
        Назад
      </button>
      {isIdle ? (
        <DifficultySelection onStartRound={startRound} />
      ) : (
        <div className="flex justify-center gap-4">
          <div
            ref={deckRef}
            className="absolute top-1/2 left-0 -translate-y-1/2 aspect-5/7"
            style={{ width: GAME_DIFFICULTIES[state.difficulty].cardWidth }}
          >
            <div className="relative w-full h-full">
              {Array.from({ length: Math.min(state.deck.length, 5) }).map((_, index) => (
                <img
                  key={index}
                  className="pixelated absolute w-full h-full"
                  style={{
                    bottom: `${index * 10}px`,
                    left: `${-index * 2}px`,
                    zIndex: index,
                  }}
                  src={GAME_THEMES[theme].backImage}
                  alt=""
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {/* <Timer timeLeft={state.timeLeft} /> */}
            <div
              ref={boardRef}
              className="grid gap-4"
              style={{
                gridTemplateColumns: `repeat(${GAME_DIFFICULTIES[state.difficulty].columns}, ${GAME_DIFFICULTIES[state.difficulty].cardWidth})`,
              }}
            >
              {state.deck.map((card, index) => {
                const isSelected =
                  firstCard?.uniqueId === card.uniqueId || secondCard?.uniqueId === card.uniqueId;
                const isMatched = state.matchedCards.has(card.name);
                const isOpened = isSelected || isMatched || isLoose;

                return (
                  <Card
                    ref={(el) => {
                      if (el) cardsRefs.current[index] = el;
                    }}
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
    </div>
  );
};

{
  /* <>
              <Timer timeLeft={state.timeLeft} />
              {!isPlaying && (
                <div className="">
                  <div className="">
                    <span className="text-[100px]">
                      You {state.status === 'win' ? 'win' : 'lose'}
                    </span>
                    {!isLoose && (
                      <div className="">
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
            </> */
}
