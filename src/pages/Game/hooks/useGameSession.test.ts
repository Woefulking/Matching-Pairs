import { renderHook, act } from '@testing-library/react';
import { useGameSession } from './useGameSession';
import { vi, describe, test, expect, beforeEach } from 'vitest';

vi.mock('hooks/useAudio/useAudio', () => ({
  useAudio: () => ({
    play: vi.fn(),
    stop: vi.fn(),
  }),
}));

describe('useGameSession Tests', () => {
  const mockOnWin = vi.fn();
  const theme = 'egypt';

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test('should initialize game deck on startRound', () => {
    const { result } = renderHook(() => useGameSession(theme, mockOnWin));

    expect(result.current.state.status).toBe('idle');
    expect(result.current.state.deck.length).toBe(0);

    act(() => {
      result.current.startRound('easy');
    });

    expect(result.current.state.status).toBe('dealing');
    expect(result.current.state.deck.length).toBeGreaterThan(0);
  });

  test('should ignore clicks if game status is not playing', () => {
    const { result } = renderHook(() => useGameSession(theme, mockOnWin));

    const mockCard = { id: 1, uniqueId: '1', name: 'camel', img: '' };

    act(() => {
      result.current.cardClick(mockCard);
    });

    expect(result.current.state.selectedCards.firstCard).toBeNull();
  });

  test('should trigger onWin and collectReward when all pairs are matched', async () => {
    const { result } = renderHook(() => useGameSession(theme, mockOnWin));

    act(() => {
      result.current.startRound('easy');
      result.current.setGameStatus('win');
    });

    expect(mockOnWin).toHaveBeenCalledTimes(1);

    expect(result.current.state.rewardGiven).toBe(true);
  });
});
