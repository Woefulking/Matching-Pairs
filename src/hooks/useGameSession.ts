import { useEffect, useReducer } from 'react';
import {
  GAME_DIFFICULTIES,
  type CardType,
  type GameDifficultyType,
  type GameSessionAction,
  type GameSessionState,
} from '../types/types';
import { getSavedState } from '../utils/getSavedGameData';
import { generateGameDeck } from '../utils/generateDeck';
import { allCards } from '../App';

export const initialState: GameSessionState = {
  status: 'idle',
  difficulty: 'easy',
  deck: [],
  selectedCards: { firstCard: null, secondCard: null },
  matchedCards: new Set<string>(),
  timeLeft: 90,
};

export function GameSessionReducer(
  state: GameSessionState,
  action: GameSessionAction
): GameSessionState {
  switch (action.type) {
    case 'startGame': {
      const { deck, difficulty } = action.payload;
      return {
        deck,
        difficulty,
        timeLeft: GAME_DIFFICULTIES[difficulty].time,
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

export function useGameSession() {
  const [state, dispatch] = useReducer(GameSessionReducer, initialState, getSavedState);

  const handleStartGame = (difficulty: GameDifficultyType) => {
    const deck = generateGameDeck(allCards, 4);
    dispatch({ type: 'startGame', payload: { deck, difficulty } });
  };

  const handleCardClick = (card: CardType) => {
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

  //Сохранение данных в localStorage
  useEffect(() => {
    localStorage.setItem(
      'savedState',
      JSON.stringify({
        ...state,
        matchedCards: [...state.matchedCards],
      })
    );
  }, [state]);

  return { state, handleStartGame, handleCardClick, handleClear };
}
