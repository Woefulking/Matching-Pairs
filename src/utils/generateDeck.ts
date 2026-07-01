import type { CardType } from '../types/types';

export const generateGameDeck = (cards: ReadonlyArray<CardType>, count: number) => {
  const copy = [...cards];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * (copy.length - i)) + i;
    [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]];
  }

  const uniqueCards = copy.slice(0, count);
  const rawDeck = [...uniqueCards, ...uniqueCards.map((card) => ({ ...card }))];

  const gameDeck = rawDeck.map((card, index) => ({
    ...card,
    uniqueId: `card-${index}`,
  }));

  for (let i = gameDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [gameDeck[i], gameDeck[j]] = [gameDeck[j], gameDeck[i]];
  }

  return gameDeck;
};
