import type { CardType } from '../types/types';
import { shuffle } from './shuffle';

export const generateGameDeck = (cards: ReadonlyArray<CardType>, count: number) => {
  const uniqueCards = shuffle(cards).slice(0, count);
  const rawDeck = [...uniqueCards, ...uniqueCards.map((card) => ({ ...card }))];

  const gameDeck = rawDeck.map((card, index) => ({
    ...card,
    uniqueId: `card-${index}`,
  }));

  return shuffle(gameDeck);
};
