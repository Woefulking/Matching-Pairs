import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Card } from './components/Card';
import { DifficultySelection } from './components/DifficultySelection';
import { Timer } from './components/Timer';
import { GAME_DIFFICULTIES, GAME_THEMES } from './consts/consts';
import { useGameSession } from './hooks/useGameSession';
import { type GameThemesType } from './types/types';

interface GameProps {
  theme: GameThemesType;
  coins: number;
  onBack: () => void;
  onWin: (coins: number) => void;
}

export const Game = ({ theme, coins, onBack, onWin }: GameProps) => {
  const { state, cardClick, startRound, setGameStatus, resolveTurn, collectReward, clear } =
    useGameSession(theme, onWin);
  const { firstCard, secondCard } = state.selectedCards;

  const diffuculty = GAME_DIFFICULTIES[state.difficulty];
  const currentTheme = GAME_THEMES[theme];

  const isIdle = state.status === 'idle';
  const isPlaying = state.status === 'playing';
  const isLoose = state.status === 'loss';
  const isWin = state.status === 'loss';
  const isGameEnd = state.status === 'win' || state.status === 'loss';

  const comparisonResult = state.comparisonResult;

  const deckRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const cardsRefs = useRef<HTMLButtonElement[]>([]);

  useLayoutEffect(() => {
    if (state.status !== 'dealing') return;
    if (!boardRef.current || !deckRef.current) return;

    const deckCoords = deckRef.current.getBoundingClientRect();
    const cardsCoords = cardsRefs.current.map((card) => card?.getBoundingClientRect());

    let maxDuration = 0;

    const totalCards = state.deck.length;
    for (let i = 0; i < totalCards; i++) {
      const card = cardsRefs.current[i];
      const targetRect = cardsCoords[i];
      if (!card || !targetRect) continue;

      const currentCardLayer = totalCards - 1 - i;

      const deckCardOffsetTop = currentCardLayer * 5;

      const dx = deckCoords.left + deckCoords.width / 2 - (targetRect.left + targetRect.width / 2);

      const dy =
        deckCardOffsetTop +
        (deckCoords.top + deckCoords.height / 2) -
        (targetRect.top + targetRect.height / 2);

      const delay = i * 120;
      maxDuration = Math.max(maxDuration, delay + 400);

      card.style.zIndex = String(totalCards - i);
      const animation = card.animate(
        [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'translate(0, 0)' }],
        {
          duration: 400,
          delay: delay,
          easing: 'ease-out',
          fill: 'backwards',
        }
      );

      if (i === totalCards - 1) {
        animation.onfinish = () => {
          setGameStatus('playing');
        };
      }
    }

    // const timerId = setTimeout(() => {
    //   setGameStatus('playing');
    // }, maxDuration);

    // return () => clearTimeout(timerId);
  }, [state.status, state.deck.length, setGameStatus]);

  const handleBackToMenu = () => {
    clear();
    onBack();
  };

  const [coinsUi, setCoinsUi] = useState(coins);
  useEffect(() => {
    if (coinsUi >= coins) return;

    const timer = setInterval(() => {
      setCoinsUi((prev) => {
        if (prev >= coins) {
          clearInterval(timer);
          return prev;
        }

        return prev + 1;
      });
    }, 20);
    collectReward();
    return () => clearInterval(timer);
  }, [coinsUi, coins, collectReward]);

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
            style={{ width: diffuculty.cardWidth }}
          />
          <div className="w-full flex flex-row justify-center gap-12">
            <div className="absolute top-1/2 left-0 -translate-y-1/2">
              <div className="flex flex-col gap-2">
                <Timer timeLeft={state.timeLeft} />
                <span className="text-[36px]">Moves: {state.moves}</span>
                <span className="text-[36px]">Pairs found: {state.matchedCards.size}</span>
                <span className="text-[36px]">Coins: {coinsUi}</span>
                <button
                  className="button"
                  type="button"
                  onClick={() => startRound(state.difficulty)}
                >
                  Restart
                </button>
              </div>
            </div>

            <div
              ref={boardRef}
              className="grid gap-4"
              style={{
                gridTemplateColumns: `repeat(${diffuculty.columns}, ${diffuculty.cardWidth})`,
              }}
            >
              {state.deck.map((card, index) => {
                const isSelected =
                  firstCard?.uniqueId === card.uniqueId || secondCard?.uniqueId === card.uniqueId;
                const isMatched = state.matchedCards.has(card.name);
                const isOpened = isSelected || isMatched || isLoose;

                const runMatchAnimation = comparisonResult === 'match' && isSelected;
                const runMismatchAnimation = comparisonResult === 'mismatch' && isSelected;

                const handleSecondCardOpened = () => {
                  if (card.uniqueId === secondCard?.uniqueId) {
                    resolveTurn();
                  }
                };

                return (
                  <Card
                    ref={(el) => {
                      if (el) cardsRefs.current[index] = el;
                    }}
                    key={index}
                    image={card.img}
                    frontImage={currentTheme.frontImage}
                    backImage={currentTheme.backImage}
                    isOpened={isOpened}
                    runMatchAnimation={runMatchAnimation}
                    runMismatchAnimation={runMismatchAnimation}
                    onAnimationPhaseEnd={handleSecondCardOpened}
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
