import { useLayoutEffect, useRef } from 'react';
import type {
  CardType,
  ComparisonResult,
  GameDifficultySettings,
  GameStatusType,
  GameThemesSettings,
} from '../types/types';
import { Card } from './Card';

interface GameFieldProps {
  deck: CardType[];
  status: GameStatusType;
  firstCard: CardType | null;
  secondCard: CardType | null;
  matchedCards: Set<string>;
  comparisonResult: ComparisonResult;
  diffuculty: GameDifficultySettings;
  currentTheme: GameThemesSettings;
  isLoose: boolean;
  onAnimationEnd: (status: GameStatusType) => void;
  onCardClick: (card: CardType) => void;
  onSecondCardOpened: () => void;
}
export const GameField = ({
  deck,
  status,
  firstCard,
  secondCard,
  matchedCards,
  comparisonResult,
  diffuculty,
  currentTheme,
  isLoose,
  onAnimationEnd,
  onCardClick,
  onSecondCardOpened,
}: GameFieldProps) => {
  const deckRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const cardsRefs = useRef<HTMLButtonElement[]>([]);

  useLayoutEffect(() => {
    if (status !== 'dealing') return;
    if (!boardRef.current || !deckRef.current) return;

    const deckCoords = deckRef.current.getBoundingClientRect();
    const cardsCoords = cardsRefs.current.map((card) => card?.getBoundingClientRect());

    let maxDuration = 0;

    const totalCards = deck.length;
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
          onAnimationEnd('playing');
        };
      }
    }
  }, [status, deck.length, onAnimationEnd]);

  return (
    <>
      <div
        ref={deckRef}
        className="absolute top-1/2 right-0 aspect-5/7 -translate-y-1/2"
        style={{ width: diffuculty.cardWidth }}
      />
      <div className="flex w-full flex-row justify-center">
        <div
          ref={boardRef}
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(4, ${diffuculty.cardWidth})`,
          }}
        >
          {deck.map((card, index) => {
            const isSelected =
              firstCard?.uniqueId === card.uniqueId || secondCard?.uniqueId === card.uniqueId;
            const isMatched = matchedCards.has(card.name);
            const isOpened = isSelected || isMatched || isLoose;

            const runMatchAnimation = comparisonResult === 'match' && isSelected;
            const runMismatchAnimation = comparisonResult === 'mismatch' && isSelected;

            const handleSecondCardOpened = () => {
              if (card.uniqueId === secondCard?.uniqueId) {
                onSecondCardOpened();
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
                onClick={() => onCardClick(card)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
