import type { SavedGameState } from '../types/types';

export const getSavedGameData = (): SavedGameState | null => {
  const saved = localStorage.getItem('gameState');
  return saved ? JSON.parse(saved) : null;
};
