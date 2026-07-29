import { initialState } from '../store/appReducer';
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
      screen: 'splash',
      purchasedThemes: new Set(parsedState.purchasedThemes),
    };
  } catch {
    return initialState;
  }
};
