import { useEffect, useRef, useState } from 'react';
import { allCards, type cardType } from './App';
import { generateGameDeck } from './utils/generateDeck';
import { formatTime } from './utils/formatTime';

interface SavedGameState {
  deck: cardType[];
  matched: string[];
}

export const Game = () => {
  const getSavedGameData = (): SavedGameState | null => {
    const saved = localStorage.getItem('gameState');
    return saved ? JSON.parse(saved) : null;
  };

  const [gameDeck, setGameDeck] = useState<cardType[]>(() => {
    const saved = getSavedGameData();
    return saved ? saved.deck : generateGameDeck(allCards, 4);
  });

  const uniqueCardsInDeck = new Set(gameDeck.map((card) => card.name));
  const [selectedCards, setSelectedCards] = useState<cardType[]>([]);

  const [matchedCards, setMatchedCards] = useState<Set<string>>(() => {
    const saved = getSavedGameData();
    return saved ? new Set(saved.matched) : new Set();
  });

  const matchTimerRef = useRef<number | null>(null);

  type GameStatus = 'playing' | 'won' | 'lost';
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');

  const isCardClickLocked = selectedCards.length === 2 || gameStatus !== 'playing';
  useEffect(() => {
    if (gameStatus !== 'playing') {
      localStorage.removeItem('gameState');
      return;
    }

    const stateToSave: SavedGameState = {
      deck: gameDeck,
      matched: Array.from(matchedCards),
    };

    localStorage.setItem('gameState', JSON.stringify(stateToSave));
  }, [gameDeck, matchedCards, gameStatus]);

  //ОБРАБОТКА КЛИКОВ
  const handleCardClick = (card: cardType) => {
    if (isCardClickLocked) return;

    const isAlreadySelected = selectedCards.some((selected) => selected.uniqueId === card.uniqueId);

    if (isAlreadySelected) return;

    const nextSelectedCards = [...selectedCards, card];
    setSelectedCards(nextSelectedCards);

    if (nextSelectedCards.length === 2) {
      handleCompareCards(nextSelectedCards);
    }
  };

  //ПРОВЕРКА ПОБЕДЫ
  const handleCheckWin = (next: Set<string>) => {
    if (next.size === uniqueCardsInDeck.size) {
      setGameStatus('won');
    }
  };

  //СРАВНЕНИЕ КАРТ
  const handleCompareCards = (cards: cardType[]) => {
    const [first, second] = cards;

    if (first.name === second.name) {
      setMatchedCards((prev) => {
        const next = new Set(prev);
        next.add(first.name);
        handleCheckWin(next);
        return next;
      });

      setSelectedCards([]);
      return;
    }

    matchTimerRef.current = setTimeout(() => {
      setSelectedCards([]);
    }, 1000);
  };

  //РЕСТАРТ ИГРЫ
  const handleRestartGame = () => {
    localStorage.removeItem('savedTime');
    setTimeLeft(20);
    setGameStatus('playing');
    setGameDeck(generateGameDeck(allCards, 4));
    setMatchedCards(new Set<string>());
    setSelectedCards([]);
  };

  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem('savedTime');
    if (savedTime) {
      const remainingTime = Math.ceil((Number(savedTime) - Date.now()) / 1000);
      return remainingTime;
    }
    return 80;
  });

  const gameTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);

    if (gameStatus !== 'playing') {
      localStorage.removeItem('savedTime');
      return;
    }

    let endTime = Number(localStorage.getItem('savedTime'));
    if (!endTime) {
      endTime = Date.now() + 80 * 1000;
      localStorage.setItem('savedTime', endTime.toString());
    }

    gameTimerRef.current = setInterval(() => {
      const remainingTime = Math.ceil((endTime - Date.now()) / 1000);

      if (remainingTime <= 0) {
        setTimeLeft(0);
        setGameStatus('lost');
        localStorage.removeItem('savedTime');
      } else {
        setTimeLeft(remainingTime);
      }
    }, 1000);

    return () => {
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    };
  }, [gameStatus]);

  return (
    <div className="game">
      {formatTime(timeLeft)}
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
      {gameStatus !== 'playing' && (
        <>
          <span>Вы {gameStatus === 'won' ? 'победили' : 'Проиграли'}</span>
          <button type="button" onClick={() => handleRestartGame()}>
            Повторить
          </button>
        </>
      )}
    </div>
  );
};
