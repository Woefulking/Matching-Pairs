import { useEffect, useReducer } from 'react';
import { generateGameDeck } from '../utils/generateDeck';
import { allCards } from '../App';

type ScreenType = 'menu' | 'game' | 'settings' | 'store' | 'leaderboard';
type GameStatusType = 'idle' | 'playing' | 'won' | 'lost';
type GameDifficultyType = 'easy' | 'medium' | 'hard';

export interface DifficultyConfig {
  cardsCount: number;
  durataion: number;
}

export interface AppState {
  screen: ScreenType;
  coins: number;
  purchasedThemes: string[];
  activeTheme: string;
}

interface cardType {
  id: number;
  img: string;
  name: string;
  uniqueId?: string;
}

export interface GameSessionState {
  status: GameStatusType;
  difficulty: GameDifficultyType;
  deck: cardType[];
  selectedCards: {
    firstCard: cardType | null;
    secondCard: cardType | null;
  };
  matchedCards: Set<string>;
  timeLeft: number | null;
}

export type GameSessionAction =
  | {
      type: 'startGame';
      payload: { deck: cardType[]; difficulty: GameDifficultyType; timeLeft: number };
    }
  | { type: 'selectCard'; payload: cardType }
  | { type: 'clearSelectedCards' }
  | { type: 'compareCards' }
  | { type: 'tick' }
  | { type: 'clear' };

export type GameSessionActions = {
  dispatch: (action: GameSessionAction) => void;
};

export function GameSessionReducer(
  state: GameSessionState,
  action: GameSessionAction
): GameSessionState {
  switch (action.type) {
    case 'startGame': {
      const { deck, difficulty, timeLeft } = action.payload;
      return {
        deck,
        difficulty,
        timeLeft,
        status: 'playing',
        selectedCards: { firstCard: null, secondCard: null },
        matchedCards: new Set<string>(),
      };
    }
    case 'selectCard': {
      const card = action.payload;
      const selectedCards = state.selectedCards;

      if (!selectedCards.firstCard) {
        return {
          ...state,
          selectedCards: { ...selectedCards, firstCard: card },
        };
      }

      if (!selectedCards.secondCard) {
        return {
          ...state,
          selectedCards: { ...selectedCards, secondCard: card },
        };
      }

      return {
        ...state,
      };
    }
    case 'compareCards': {
      const { firstCard, secondCard } = state.selectedCards;
      if (firstCard && secondCard) {
        if (firstCard.name === secondCard.name) {
          const newMatched = new Set(state.matchedCards);
          newMatched.add(firstCard.name);
          return {
            ...state,
            selectedCards: { firstCard: null, secondCard: null },
            matchedCards: newMatched,
          };
        }
      }
      return { ...state, selectedCards: { firstCard: null, secondCard: null } };
    }
    case 'tick': {
      if (state.status !== 'playing') return state;

      if (state.timeLeft === null) return state;

      const nextTime = Math.max(0, state.timeLeft - 1);
      return {
        ...state,
        timeLeft: nextTime,
        status: nextTime === 0 ? 'lost' : state.status,
      };
    }
    case 'clear': {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

const initialState: GameSessionState = {
  status: 'idle',
  difficulty: 'easy',
  deck: [],
  selectedCards: { firstCard: null, secondCard: null },
  matchedCards: new Set<string>(),
  timeLeft: null,
};

export function useGameSession() {
  const [state, dispatch] = useReducer(GameSessionReducer, initialState);

  const handleStartGame = (difficulty: GameDifficultyType) => {
    const deck = generateGameDeck(allCards, 4);
    dispatch({ type: 'startGame', payload: { deck, difficulty, timeLeft: 20 } });
  };

  const handleCardClick = (card: cardType) => {
    dispatch({ type: 'selectCard', payload: card });
  };

  const handleClear = () => {
    dispatch({ type: 'clear' });
  };

  //Таймер
  useEffect(() => {
    if (state.status !== 'playing') return;

    const timer = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.status]);

  //Показ выбранных карточек и их сравнение
  useEffect(() => {
    const selectedCards = state.selectedCards;
    const firstCard = selectedCards.firstCard;
    const secondCard = selectedCards.secondCard;

    if (!firstCard || !secondCard) return;

    const timer = setTimeout(() => {
      dispatch({ type: 'compareCards' });
    }, 1000);

    return () => clearTimeout(timer);
  }, [state.selectedCards]);

  return handleStartGame;
}
