import type { AppState } from 'types/types';
import { describe, expect, test } from 'vitest';
import { AppReducer } from './appReducer';
import { GAME_THEMES } from 'consts/consts';

describe('AppReducer Tests', () => {
  const mockInitialState: AppState = {
    screen: 'menu',
    coins: 500,
    purchasedThemes: new Set(['fruits']),
    activeTheme: 'fruits',
    statistics: {
      easy: { bestTime: null, bestMoves: null, totalWins: 0 },
      medium: { bestTime: null, bestMoves: null, totalWins: 0 },
      hard: { bestTime: null, bestMoves: null, totalWins: 0 },
    },
  };

  test('should successfully add coins to total balance', () => {
    const nextState = AppReducer(mockInitialState, {
      type: 'addCoins',
      payload: 100,
    });

    expect(nextState.coins).toBe(600);
    expect(nextState.screen).toBe('menu');
  });

  test('should change the current screen correctly', () => {
    const nextState = AppReducer(mockInitialState, {
      type: 'changeScreen',
      payload: 'store',
    });

    expect(nextState.screen).toBe('store');
  });

  test('should purchase a theme, deduct coins and add theme to purchased list', () => {
    const nextState = AppReducer(mockInitialState, {
      type: 'purchaseTheme',
      payload: 'egypt',
    });

    const themePrice = GAME_THEMES['egypt'].price;
    const expectedCoins = mockInitialState.coins - themePrice;

    expect(nextState.purchasedThemes.has('egypt')).toBe(true);
    expect(nextState.coins).toBe(expectedCoins);
  });
});
