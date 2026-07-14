import { GAME_THEMES } from '../consts/consts';
import type { AppActions, AppState, GameThemesType } from '../types/types';

export const initialState: AppState = {
  screen: 'menu',
  coins: 500,
  purchasedThemes: new Set<GameThemesType>(['fruits']),
  activeTheme: 'ocean',
  volume: 70,
  statistics: {
    easy: { bestTime: null, bestMoves: null, totalWins: 0 },
    medium: { bestTime: null, bestMoves: null, totalWins: 0 },
    hard: { bestTime: null, bestMoves: null, totalWins: 0 },
  },
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
    case 'updateStatistics': {
      const { difficulty, time, moves } = action.payload;
      const current = state.statistics[difficulty];

      return {
        ...state,
        statistics: {
          ...state.statistics,
          [difficulty]: {
            bestTime: current.bestTime === null ? time : Math.min(current.bestTime, time),
            bestMoves: current.bestMoves === null ? moves : Math.min(current.bestMoves, moves),
            totalWins: current.totalWins + 1,
          },
        },
      };
    }
    default: {
      return state;
    }
  }
}
