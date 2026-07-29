import { useLayoutEffect, useRef } from 'react';
import type { CardType, ComparisonResult, GameStatusType, GameThemesSettings } from 'types/types';
import { Card } from './Card';
import { useAudio } from 'src/hooks/useAudio/useAudio';

interface GameFieldProps {
  deck: CardType[];
  status: GameStatusType;
  firstCard: CardType | null;
  secondCard: CardType | null;
  matchedCards: Set<string>;
  comparisonResult: ComparisonResult;
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
  currentTheme,
  isLoose,
  onAnimationEnd,
  onCardClick,
  onSecondCardOpened,
}: GameFieldProps) => {
  const { play, stop } = useAudio();
  const deckRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const cardsRefs = useRef<HTMLButtonElement[]>([]);

  useLayoutEffect(() => {
    if (status !== 'dealing') return;
    if (!boardRef.current || !deckRef.current) return;

    const deckCoords = deckRef.current.getBoundingClientRect();
    const cardsCoords = cardsRefs.current.map((card) => card?.getBoundingClientRect());

    const activeAnimations: Animation[] = [];

    play('cardShuffle');
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

      activeAnimations.push(animation);

      if (i === totalCards - 1) {
        animation.onfinish = () => {
          stop('cardShuffle');
          onAnimationEnd('playing');
        };
      }
    }

    return () => {
      stop('cardShuffle');

      activeAnimations.forEach((animation) => {
        animation.onfinish = null;
        animation.cancel();
      });
    };
  }, [status, deck.length, onAnimationEnd, play, stop]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div
        ref={deckRef}
        className="pointer-events-none absolute top-1/2 right-20 aspect-5/7 w-10 -translate-y-1/2 opacity-0 md:right-40 md:w-16 lg:right-20"
      />
      <div
        ref={boardRef}
        className="mx-auto grid max-w-max grid-cols-4 items-center justify-items-center gap-2 md:gap-3 lg:gap-4"
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

              if (comparisonResult === 'match') {
                play('match');
              } else {
                play('mismatch');
              }
            }
          };

          return (
            <Card
              ref={(el) => {
                if (el) cardsRefs.current[index] = el;
              }}
              key={card.uniqueId}
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
  );
};
