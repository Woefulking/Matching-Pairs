import { useEffect, useReducer } from 'react';
import { getSavedAppData } from '../utils/getSavedAppData';
import type { GameThemesType, ScreenType } from '../types/types';
import { AppReducer, initialState } from '../reducers/appReducer';

export function useApp() {
  const [state, dispatch] = useReducer(AppReducer, initialState, getSavedAppData);

  const changeScreen = (screen: ScreenType) => {
    dispatch({ type: 'changeScreen', payload: screen });
  };

  const addCoins = (coins: number) => {
    dispatch({ type: 'addCoins', payload: coins });
  };

  const purchaseTheme = (theme: GameThemesType) => {
    dispatch({ type: 'purchaseTheme', payload: theme });
  };

  const setActiveTheme = (theme: GameThemesType) => {
    dispatch({ type: 'setActiveTheme', payload: theme });
  };

  useEffect(() => {
    const currentPath = window.location.pathname.replace('/', '');
    if (currentPath !== state.screen) {
      window.history.pushState({}, '', `/${state.screen}`);
    }
  }, [state.screen]);

  useEffect(() => {
    const handlePopState = () => {
      const pathScreen = window.location.pathname.replace('/', '') as ScreenType;
      const validScreens: ScreenType[] = ['menu', 'game', 'store'];

      if (validScreens.includes(pathScreen)) {
        changeScreen(pathScreen);
      } else {
        changeScreen('menu');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'savedAppState',
      JSON.stringify({
        ...state,
        purchasedThemes: [...state.purchasedThemes],
      })
    );
  }, [state]);

  return { state, changeScreen, addCoins, purchaseTheme, setActiveTheme };
}
