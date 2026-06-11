import { useState } from 'react';
import './App.css';

interface cardType {
  id: number;
  img: string;
  name: string;
  uniqueId?: string;
}

function App() {
  const [deck, setDeck] = useState<cardType[]>([]);
  const uniqueCardsInDeck = new Set(deck.map((card) => card.name));

  const [selectedCards, setSelectedCards] = useState<cardType[]>([]);
  const [matchedCards, setMatchedCards] = useState<Set<string>>(new Set());

  const isBoardLocked = selectedCards.length === 2;
  const isWin = deck.length > 0 && matchedCards.size === uniqueCardsInDeck.size;

  console.log(uniqueCardsInDeck);

  const allCards: cardType[] = [
    { id: 1, img: '🍎', name: 'apple' },
    { id: 2, img: '🍌', name: 'banana' },
    { id: 3, img: '🍇', name: 'grape' },
    { id: 4, img: '🍒', name: 'cherry' },
    { id: 5, img: '🍓', name: 'strawberry' },
    { id: 6, img: '🍉', name: 'watermelon' },
    { id: 7, img: '🍊', name: 'orange' },
  ];

  const generateGameDeck = (cardsArray: cardType[], count: number) => {
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

  const handleStart = () => {
    const array = generateGameDeck(allCards, 4);
    setDeck(array);
  };

  console.log('selected', selectedCards);
  console.log('locked', isBoardLocked);

  const handleCardClick = (card: cardType) => {
    if (isBoardLocked) return;
    console.log('click', card.name);

    const isAlreadySelected = selectedCards.some((selected) => selected.uniqueId === card.uniqueId);

    if (isAlreadySelected) return;

    const nextSelectedCards = [...selectedCards, card];
    setSelectedCards(nextSelectedCards);

    if (nextSelectedCards.length === 2) {
      handleCompareCards(nextSelectedCards);
    }
  };

  const handleCompareCards = (cards: cardType[]) => {
    const [first, second] = cards;

    if (first.name === second.name) {
      setMatchedCards((prev) => {
        const next = new Set(prev);
        next.add(first.name);
        return next;
      });

      setSelectedCards([]);
      return;
    }

    setTimeout(() => {
      setSelectedCards([]);
    }, 1000);
  };

  return (
    <>
      <button onClick={() => handleStart()} className="btn">
        НАЖМИ НА МЕНЯ
      </button>
      <div className="board">
        {deck.map((card, index) => {
          const isSelected = selectedCards.some((selected) => selected.uniqueId === card.uniqueId);
          const isMatched = matchedCards.has(card.name);

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
      {isWin && <div>ПОБЕДА</div>}
    </>
  );
}

export default App;
