import { initialState } from '../reducers/appReducer';
import type { AppState, GameThemesType, ScreenType } from '../types/types';

export const getSavedAppData = (): AppState => {
  try {
    const savedState = localStorage.getItem('savedAppState');
    if (!savedState) return initialState;

    const parsedState = JSON.parse(savedState) as Omit<AppState, 'purchasedThemes'> & {
      purchasedThemes: GameThemesType[];
    };

    const path = window.location.pathname.replace('/', '');
    const screen: ScreenType = ['menu', 'game', 'store', 'settings', 'statistics'].includes(path)
      ? (path as ScreenType)
      : 'menu';

    return {
      ...parsedState,
      screen,
      purchasedThemes: new Set(parsedState.purchasedThemes),
    };
  } catch {
    return initialState;
  }
};
