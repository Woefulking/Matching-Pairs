import { useEffect, useReducer } from 'react';
import {
  type AppActions,
  type AppState,
  type GameThemesType,
  type ScreenType,
} from '../types/types';
import { getSavedAppData } from '../utils/getSavedAppData';
import { GAME_THEMES } from '../consts/consts';

export const initialState: AppState = {
  screen: 'menu',
  coins: 500,
  purchasedThemes: new Set<GameThemesType>(['fruits']),
  activeTheme: 'space',
  volume: 70,
};

export function AppReducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case 'changeScreen': {
      const newScreen = action.payload;
      return {
        ...state,
        screen: newScreen,
      };
    }
    case 'addCoins': {
      const coinsForDifficulty = action.payload;
      return {
        ...state,
        coins: state.coins + coinsForDifficulty,
      };
    }
    case 'setActiveTheme': {
      const newTheme = action.payload;
      return {
        ...state,
        activeTheme: newTheme,
      };
    }
    case 'purchaseTheme': {
      const themeToPurchase = action.payload;

      if (state.purchasedThemes.has(themeToPurchase)) return state;

      const themePrice = GAME_THEMES[themeToPurchase]['price'];
      if (state.coins >= themePrice) {
        const newCoins = state.coins - themePrice;
        const newPurchasedThemes = new Set<GameThemesType>(state.purchasedThemes);
        newPurchasedThemes.add(themeToPurchase);
        return {
          ...state,
          coins: newCoins,
          purchasedThemes: newPurchasedThemes,
          activeTheme: themeToPurchase,
        };
      }

      return { ...state };
    }
    default: {
      return state;
    }
  }
}

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
