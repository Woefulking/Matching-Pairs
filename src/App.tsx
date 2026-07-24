import { Menu } from './Menu';
import { Game } from './Game';
import { useApp } from './hooks/useApp';
import { Store } from './Store';
import type { ScreenType, WinResultInterface } from './types/types';
import { GAME_DIFFICULTIES } from './consts/consts';
import { Settings } from './Settings';
import { AnimatedBackground } from './components/AnimatedBackground';
import { useAudio } from './hooks/useAudio';
import { useEffect } from 'react';

function App() {
  const { state, changeScreen, addCoins, updateStatistics, purchaseTheme, setActiveTheme } =
    useApp();

  const { play, stop } = useAudio(50, 20);

  //TODO
  //Сделать audio как context
  //На маленьких экранах  в игре карточка будет примерно 80 пикселей в ширину. Игровой худ сверху и так наверное вплоть до xl
  //Сделать нормальные настройки
  //Подумать над интерфейсом во время раунда

  const handleWin = (result: WinResultInterface) => {
    play('win');
    const coinsForWin = GAME_DIFFICULTIES[result.difficulty].coins;
    addCoins(coinsForWin);
    updateStatistics(result.difficulty, result.time, result.moves);
  };

  const handleChangeScreen = (screen: ScreenType) => {
    play('menuClick');
    changeScreen(screen);
  };

  // useEffect(() => {
  //   play('background');
  // }, [play]);

  function getCurrentScreen() {
    switch (state.screen) {
      case 'menu':
        return (
          <Menu
            onPlay={() => handleChangeScreen('game')}
            onOpenStore={() => handleChangeScreen('store')}
            onOpenSettings={() => handleChangeScreen('settings')}
          />
        );
      case 'game':
        return (
          <Game
            play={play}
            theme={state.activeTheme}
            coins={state.coins}
            onBack={() => handleChangeScreen('menu')}
            onWin={handleWin}
          />
        );
      case 'store':
        return (
          <Store
            totalCoins={state.coins}
            activeTheme={state.activeTheme}
            purchadesThemes={state.purchasedThemes}
            onEquip={setActiveTheme}
            onBack={() => handleChangeScreen('menu')}
            onBuy={purchaseTheme}
          />
        );
      case 'settings': {
        return <Settings activeTheme={state.activeTheme} onChangeTheme={setActiveTheme} />;
      }
    }
  }

  return (
    <AnimatedBackground isCompact={state.screen !== 'menu'}>
      {getCurrentScreen()}
    </AnimatedBackground>
  );
}

export default App;
