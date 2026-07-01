import { useEffect, useReducer } from 'react';
import {
  type CardType,
  type GameDifficultyType,
  type GameSessionActions,
  type GameSessionState,
  type GameThemesType,
} from '../types/types';
import { getSavedState } from '../utils/getSavedGameData';
import { generateGameDeck } from '../utils/generateDeck';
import { GAME_DIFFICULTIES, GAME_THEMES } from '../consts/consts';

export const initialState: GameSessionState = {
  status: 'idle',
  difficulty: 'easy',
  deck: [],
  pairsCount: 0,
  selectedCards: { firstCard: null, secondCard: null },
  matchedCards: new Set<string>(),
  timeLeft: 90,
  moves: 0,
};

export function GameSessionReducer(
  state: GameSessionState,
  action: GameSessionActions
): GameSessionState {
  switch (action.type) {
    case 'startGame': {
      const { deck, difficulty } = action.payload;
      return {
        status: 'playing',
        difficulty,
        deck,
        pairsCount: new Set<string>(deck.map((card) => card.name)).size,
        selectedCards: { firstCard: null, secondCard: null },
        matchedCards: new Set<string>(),
        timeLeft: GAME_DIFFICULTIES[difficulty].time,
        moves: 0,
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

      if (!firstCard || !secondCard) return state;

      const nextMoves = state.moves + 1;

      if (firstCard.name === secondCard.name) {
        const newMatched = new Set(state.matchedCards);
        newMatched.add(firstCard.name);

        const isWin = newMatched.size === state.pairsCount;

        return {
          ...state,
          status: isWin ? 'win' : 'playing',
          selectedCards: { firstCard: null, secondCard: null },
          matchedCards: newMatched,
          moves: nextMoves,
        };
      }

      return { ...state, selectedCards: { firstCard: null, secondCard: null }, moves: nextMoves };
    }
    case 'tick': {
      if (state.status !== 'playing') return state;

      const nextTime = Math.max(0, state.timeLeft - 1);
      return {
        ...state,
        timeLeft: nextTime,
        status: nextTime === 0 ? 'loss' : state.status,
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

export function useGameSession(theme: GameThemesType, onWin: (coins: number) => void) {
  const [state, dispatch] = useReducer(GameSessionReducer, initialState, getSavedState);

  const startGame = (difficulty: GameDifficultyType) => {
    const deck = generateGameDeck(GAME_THEMES[theme].cards, 4);
    dispatch({ type: 'startGame', payload: { deck, difficulty } });
  };

  const cardClick = (card: CardType) => {
    if (state.status !== 'playing') return;

    if (state.selectedCards.firstCard && state.selectedCards.secondCard) return;
    dispatch({ type: 'selectCard', payload: card });
  };

  const clear = () => {
    localStorage.removeItem('savedState');
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
      'savedGameState',
      JSON.stringify({
        ...state,
        matchedCards: [...state.matchedCards],
      })
    );
  }, [state]);

  //Отслеживание победы и добавление монет в этот момент
  useEffect(() => {
    if (state.status !== 'win') return;
    const coins = GAME_DIFFICULTIES[state.difficulty].coins;
    onWin(coins);
  }, [state.status, state.difficulty, onWin]);

  return { state, startGame, cardClick, clear };
}
