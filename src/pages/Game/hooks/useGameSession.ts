import { useEffect, useReducer } from 'react';
import {
  type CardType,
  type GameDifficultyType,
  type GameStatusType,
  type GameThemesType,
  type WinResultInterface,
} from 'types/types';
import { getSavedState } from 'utils/getSavedGameData';
import { generateGameDeck } from 'utils/generateDeck';
import { GAME_DIFFICULTIES, GAME_THEMES } from 'consts/consts';
import { useAudio } from 'hooks/useAudio/useAudio';
import { GameSessionReducer, initialState } from '../reducers/gameSessionReducer';

export function useGameSession(theme: GameThemesType, onWin: (result: WinResultInterface) => void) {
  const { play } = useAudio();
  const [state, dispatch] = useReducer(GameSessionReducer, initialState, getSavedState);

  const startRound = (difficulty: GameDifficultyType) => {
    const deck = generateGameDeck(
      GAME_THEMES[theme].cards,
      GAME_DIFFICULTIES[difficulty].pairsCount
    );
    dispatch({ type: 'startRound', payload: { deck, difficulty } });
  };

  const setGameStatus = (status: GameStatusType) => {
    dispatch({ type: 'setGameStatus', payload: status });
  };

  const cardClick = (card: CardType) => {
    if (state.status !== 'playing') return;
    if (state.matchedCards.has(card.name)) return;

    if (state.selectedCards.firstCard && state.selectedCards.secondCard) return;
    play('cardClick');
    dispatch({ type: 'selectCard', payload: card });
  };

  const resolveTurn = () => {
    if (state.status !== 'playing') return;
    dispatch({ type: 'resolveTurn' });
  };

  const collectReward = () => {
    dispatch({ type: 'collectReward' });
  };

  const clearRoundState = () => {
    dispatch({ type: 'clear' });
    localStorage.removeItem('savedGameState');
  };

  useEffect(() => {
    if (state.status !== 'playing') return;

    const timer = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.status]);

  useEffect(() => {
    localStorage.setItem(
      'savedGameState',
      JSON.stringify({
        ...state,
        matchedCards: [...state.matchedCards],
      })
    );
  }, [state]);

  useEffect(() => {
    if (state.status !== 'win') return;
    if (state.rewardGiven) return;

    const elapsedTime = GAME_DIFFICULTIES[state.difficulty].time - state.timeLeft;
    onWin({
      difficulty: state.difficulty,
      time: elapsedTime,
      moves: state.moves,
    });
    collectReward();
  }, [state.status, state.difficulty, state.rewardGiven, onWin, state.timeLeft, state.moves]);

  useEffect(() => {
    if (state.status !== 'loss') return;
    play('lose');
  }, [state.status, play]);

  return {
    state,
    startRound,
    setGameStatus,
    cardClick,
    resolveTurn,
    collectReward,
    clearRoundState,
  };
}
