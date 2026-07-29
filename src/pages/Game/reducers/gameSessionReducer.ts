import { GAME_DIFFICULTIES } from 'consts/consts';
import type { GameSessionActions, GameSessionState } from 'types/types';

export const initialState: GameSessionState = {
  status: 'idle',
  difficulty: 'easy',
  deck: [],
  pairsCount: 0,
  selectedCards: { firstCard: null, secondCard: null },
  comparisonResult: null,
  matchedCards: new Set<string>(),
  timeLeft: 90,
  moves: 0,
  rewardGiven: false,
};

export function GameSessionReducer(
  state: GameSessionState,
  action: GameSessionActions
): GameSessionState {
  switch (action.type) {
    case 'startRound': {
      const { deck, difficulty } = action.payload;
      return {
        status: 'dealing',
        difficulty,
        deck,
        pairsCount: new Set<string>(deck.map((card) => card.name)).size,
        selectedCards: { firstCard: null, secondCard: null },
        comparisonResult: null,
        matchedCards: new Set<string>(),
        timeLeft: GAME_DIFFICULTIES[difficulty].time,
        moves: 0,
        rewardGiven: false,
      };
    }
    case 'setGameStatus': {
      const newStatus = action.payload;
      return {
        ...state,
        status: newStatus,
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
        if (card.uniqueId === selectedCards.firstCard.uniqueId) return state;
        return {
          ...state,
          selectedCards: { ...selectedCards, secondCard: card },
          comparisonResult:
            state.selectedCards.firstCard?.name === card.name ? 'match' : 'mismatch',
        };
      }

      return {
        ...state,
      };
    }
    case 'resolveTurn': {
      const { firstCard, secondCard } = state.selectedCards;
      const comparisonResult = state.comparisonResult;
      if (!firstCard || !secondCard) return state;

      const nextMoves = state.moves + 1;

      if (comparisonResult === 'match') {
        const newMatched = new Set(state.matchedCards);
        newMatched.add(firstCard.name);

        const isWin = newMatched.size === state.pairsCount;

        return {
          ...state,
          status: isWin ? 'win' : 'playing',
          selectedCards: { firstCard: null, secondCard: null },
          comparisonResult: null,
          matchedCards: newMatched,
          moves: nextMoves,
        };
      }

      return {
        ...state,
        status: 'playing',
        selectedCards: { firstCard: null, secondCard: null },
        comparisonResult: null,
        moves: nextMoves,
      };
    }
    case 'collectReward': {
      return {
        ...state,
        rewardGiven: true,
      };
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
