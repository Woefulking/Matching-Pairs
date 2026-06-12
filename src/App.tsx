import { useEffect, useRef, useState } from 'react';
import './App.css';

interface cardType {
  id: number;
  img: string;
  name: string;
  uniqueId?: string;
}

function App() {
  const [gameDeck, setGameDeck] = useState<cardType[]>([]);
  const uniqueCardsInDeck = new Set(gameDeck.map((card) => card.name));

  const [selectedCards, setSelectedCards] = useState<cardType[]>([]);
  const [matchedCards, setMatchedCards] = useState<Set<string>>(new Set());

  const isBoardLocked = selectedCards.length === 2;
  const isWin = gameDeck.length > 0 && matchedCards.size === uniqueCardsInDeck.size;

  const matchTimerRef = useRef<number | null>(null);
  const gameTimerRef = useRef<number | null>(null);

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
    const newDeck = generateGameDeck(allCards, 4);
    setGameDeck(newDeck);
    endTimeRef.current = Date.now() + timeLeft * 1000;
    localStorage.setItem('endTime', String(endTimeRef.current));
  };

  const handleCardClick = (card: cardType) => {
    if (isBoardLocked) return;

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

    matchTimerRef.current = setTimeout(() => {
      setSelectedCards([]);
    }, 1000);
  };

  const handleRestartGame = () => {
    if (matchTimerRef.current) {
      clearInterval(matchTimerRef.current);
      matchTimerRef.current = null;
    }

    const newDeck = generateGameDeck(allCards, 4);
    setGameDeck(newDeck);
    setSelectedCards([]);
    setMatchedCards(new Set<string>());
  };

  function formatTime(timeLeft: number) {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  const [timeLeft, setTimeLeft] = useState<number>(20);
  const endTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (gameDeck.length) {
      const timer = setInterval(() => {
        if (endTimeRef.current) {
          const saved = Number(localStorage.getItem('endTime'));
          const remaining = Math.ceil((saved - Date.now()) / 1000);
          setTimeLeft(remaining);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameDeck, timeLeft]);

  return (
    <>
      <button onClick={() => handleStart()} className="btn">
        НАЖМИ НА МЕНЯ
      </button>
      <span className="timer">{formatTime(timeLeft)}</span>
      <div className="board">
        {gameDeck.map((card, index) => {
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
      {isWin && (
        <>
          <div>ПОБЕДА</div>
          <button className="btn" type="button" onClick={() => handleRestartGame()}>
            Restart
          </button>
        </>
      )}
    </>
  );
}

export default App;
