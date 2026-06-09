import { useState } from 'react';
import './App.css';

function App() {
  const [uniqueCards, setUniqueCards] = useState([]);

  const allCards = [
    { id: 1, img: '🍎', name: 'apple' },
    { id: 2, img: '🍌', name: 'banana' },
    { id: 3, img: '🍇', name: 'grape' },
    { id: 4, img: '🍒', name: 'cherry' },
    { id: 5, img: '🍓', name: 'strawberry' },
    { id: 6, img: '🍉', name: 'watermelon' },
    { id: 7, img: '🍊', name: 'orange' },
  ];

  const generateGameDeck = (cardsArray, count) => {
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

  console.log(uniqueCards);

  return (
    <>
      <button onClick={() => handleStart()}>НАЖМИ НА МЕНЯ</button>
    </>
  );
}

export default App;
