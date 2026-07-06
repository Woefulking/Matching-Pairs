import { useEffect, useReducer } from 'react';
import { type CardType, type GameDifficultyType, type GameThemesType } from '../types/types';
import { getSavedState } from '../utils/getSavedGameData';
import { generateGameDeck } from '../utils/generateDeck';
import { GAME_DIFFICULTIES, GAME_THEMES } from '../consts/consts';
import { GameSessionReducer, initialState } from '../reducers/gameSessionReducer';

export function useGameSession(theme: GameThemesType, onWin: (coins: number) => void) {
  const [state, dispatch] = useReducer(GameSessionReducer, initialState, getSavedState);

  const startGame = (difficulty: GameDifficultyType) => {
    const deck = generateGameDeck(
      GAME_THEMES[theme].cards,
      GAME_DIFFICULTIES[difficulty].pairsCount
    );
    dispatch({ type: 'startGame', payload: { deck, difficulty } });
  };

  const cardClick = (card: CardType) => {
    if (state.status !== 'playing') return;

    if (state.selectedCards.firstCard && state.selectedCards.secondCard) return;
    dispatch({ type: 'selectCard', payload: card });
  };

  const clear = () => {
    localStorage.removeItem('savedGameState');
    dispatch({ type: 'clear' });
  };

  //Таймер
  // useEffect(() => {
  //   if (state.status !== 'playing') return;

  //   const timer = setInterval(() => {
  //     dispatch({ type: 'tick' });
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [state.status]);

  //Показ выбранных карточек и их сравнение
  useEffect(() => {
    const selectedCards = state.selectedCards;
    const firstCard = selectedCards.firstCard;
    const secondCard = selectedCards.secondCard;

    if (!firstCard || !secondCard) return;

    const timer = setTimeout(() => {
      dispatch({ type: 'compareCards' });
    }, 1000);

    return () => clearTimeout(timer);
  }, [state.selectedCards]);

  //Сохранение данных в localStorage
  useEffect(() => {
    localStorage.setItem(
      'savedGameState',
      JSON.stringify({
        ...state,
        matchedCards: [...state.matchedCards],
      })
    );
  }, [state]);

  //Отслеживание победы и добавление монет в этот момент
  useEffect(() => {
    if (state.status !== 'win') return;
    const coins = GAME_DIFFICULTIES[state.difficulty].coins;
    onWin(coins);
  }, [state.status, state.difficulty, onWin]);

  return { state, startGame, cardClick, clear };
}
