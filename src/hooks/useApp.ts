import { useReducer } from 'react';
import {
  GAME_THEMES,
  type AppActions,
  type AppState,
  type GameThemesType,
  type ScreenType,
} from '../types/types';

export const initialState: AppState = {
  screen: 'menu',
  coins: 0,
  purchasedThemes: ['fruits'],
  activeTheme: 'fruits',
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

      if (state.purchasedThemes.includes(themeToPurchase)) return state;

      const themePrice = GAME_THEMES[themeToPurchase]['price'];
      if (state.coins >= themePrice) {
        const newCoins = state.coins - themePrice;
        return {
          ...state,
          coins: newCoins,
          purchasedThemes: [...state.purchasedThemes, themeToPurchase],
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
  const [state, dispatch] = useReducer(AppReducer, initialState);

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

  return { state, changeScreen, addCoins, purchaseTheme, setActiveTheme };
}
