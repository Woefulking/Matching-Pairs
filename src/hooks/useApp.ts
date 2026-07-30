import { useEffect, useReducer, useRef } from 'react';
import { getSavedAppData } from 'utils/getSavedAppData';
import type { GameThemesType, ScreenType, WinResultInterface } from 'types/types';
import { AppReducer, initialState } from '../reducers/appReducer';
import { GAME_DIFFICULTIES } from 'consts/consts';
import { useAudio } from './useAudio/useAudio';

export function useApp() {
  const [state, dispatch] = useReducer(AppReducer, initialState, getSavedAppData);
  const { play, musicVolume, setMusicVolume, sfxVolume, setSfxVolume } = useAudio();
  const isFirstMenuLaunch = useRef<boolean>(true);

  const changeScreen = (screen: ScreenType) => {
    dispatch({ type: 'changeScreen', payload: screen });
  };

  const purchaseTheme = (theme: GameThemesType) => {
    dispatch({ type: 'purchaseTheme', payload: theme });
  };

  const setActiveTheme = (theme: GameThemesType) => {
    dispatch({ type: 'setActiveTheme', payload: theme });
  };

  const handleWin = (result: WinResultInterface) => {
    play('win');
    const coinsForWin = GAME_DIFFICULTIES[result.difficulty].coins;
    dispatch({ type: 'addCoins', payload: coinsForWin });
    dispatch({
      type: 'updateStatistics',
      payload: { difficulty: result.difficulty, time: result.time, moves: result.moves },
    });
  };

  const handleMusicVolumeChange = (volume: number) => setMusicVolume(volume);
  const handleSfxVolumeChange = (volume: number) => setSfxVolume(volume);

  const clearStatistics = () => {
    dispatch({ type: 'clearStatistics' });
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
      const validScreens: ScreenType[] = [
        'menu',
        'game',
        'store',
        'settings',
        'statistics',
        'splash',
      ];

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
        musicVolume,
        sfxVolume,
        purchasedThemes: [...state.purchasedThemes],
      })
    );
  }, [musicVolume, sfxVolume, state]);

  return {
    state,
    isFirstMenuLaunch,
    changeScreen,
    handleWin,
    clearStatistics,
    musicVolume,
    handleMusicVolumeChange,
    sfxVolume,
    handleSfxVolumeChange,
    play,
    purchaseTheme,
    setActiveTheme,
  };
}
