import type { cardType } from './App';

export const generateGameDeck = (cardsArray: cardType[], count: number) => {
  const copy = [...cardsArray];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * (copy.length - i)) + i;
    [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]];
  }

  const uniqueCards = copy.slice(0, count);
  const rawDeck = [...uniqueCards, ...structuredClone(uniqueCards)];

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
