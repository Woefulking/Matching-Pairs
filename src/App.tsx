import { useEffect, useState } from 'react';
import test from './assets/test.png';
import earth from './assets/Earth.png';
import './App.css';

interface cardType {
  id: number;
  img: string;
  name: string;
  uniqueId?: string;
}

function App() {
  const [uniqueCards, setUniqueCards] = useState<cardType[]>([]);

  const [firstSelected, setFirstSelected] = useState<cardType | null>();
  const [secondSelected, setSecondSelected] = useState<cardType | null>();

  const [matchedCards, setMatchedCards] = useState<cardType[]>([]);

  const isBoardLocked = firstSelected && secondSelected;

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
    setUniqueCards(array);
  };

  console.log(firstSelected);
  console.log(secondSelected);
  console.log(matchedCards);

  const handleCardClick = (card: cardType) => {
    if (isBoardLocked) return;

    if (firstSelected) {
      setSecondSelected(card);
    } else {
      setFirstSelected(card);
    }
  };

  useEffect(() => {
    if (isBoardLocked) {
      if (firstSelected.name === secondSelected.name) {
        console.log('Совпали');
        setMatchedCards((prev) => [...prev, firstSelected, secondSelected]);
        setFirstSelected(null);
        setSecondSelected(null);
      }

      if (firstSelected.name !== secondSelected.name) {
        console.log('Несовпали');
        setFirstSelected(null);
        setSecondSelected(null);
      }
    }
  }, [firstSelected, secondSelected, isBoardLocked]);

  return (
    <>
      <button onClick={() => handleStart()} className="btn">
        НАЖМИ НА МЕНЯ
      </button>
      <div className="board">
        {uniqueCards.map((card, index) => {
          const isMatched = matchedCards.some((matched) => matched.uniqueId === card.uniqueId);

          return (
            <button
              type="button"
              className={`card ${isMatched ? 'card--matched' : ''}`}
              key={index}
              onClick={() => handleCardClick(card)}
            >
              {card.img}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default App;
