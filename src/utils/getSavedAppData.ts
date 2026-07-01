import { initialState } from '../hooks/useApp';
import type { AppState, GameThemesType } from '../types/types';

export const getSavedAppData = (): AppState => {
  try {
    const savedState = localStorage.getItem('savedAppState');
    if (!savedState) return initialState;

    const parsedState = JSON.parse(savedState) as Omit<AppState, 'purchasedThemes'> & {
      purchasedThemes: GameThemesType[];
    };
    return {
      ...parsedState,
      purchasedThemes: new Set(parsedState.purchasedThemes),
    };
  } catch {
    console.log('1egfregerfgr');
    return initialState;
  }
};
