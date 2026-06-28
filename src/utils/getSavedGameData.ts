import { initialState } from '../hooks/useGameSession';
import { type GameSessionState } from '../types/types';

export const getSavedState = (): GameSessionState => {
  try {
    const savedState = localStorage.getItem('savedState');

    if (!savedState) {
      return initialState;
    }

    const parsedState = JSON.parse(savedState) as Omit<GameSessionState, 'matchedCards'> & {
      matchedCards: string[];
    };

    return {
      ...parsedState,
      matchedCards: new Set(parsedState.matchedCards),
    };
  } catch {
    return initialState;
  }
};
