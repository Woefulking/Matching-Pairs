import { Menu } from './Menu';
import { Game } from './Game';
import { useApp } from './hooks/useApp';
import { Store } from './Store';
import type { WinResultInterface } from './types/types';
import { GAME_DIFFICULTIES } from './consts/consts';
import { Settings } from './Settings';
import { AnimatedBackground } from './components/AnimatedBackground';
import { useAudio } from 'src/hooks/useAudio/useAudio';
import { MenuButton } from './components/MenuButton';

function App() {
  const { state, changeScreen, addCoins, updateStatistics, purchaseTheme, setActiveTheme } =
    useApp();

  const { play } = useAudio();

  //TODO
  //Сделать первым экраном предупреждение, по тапу которого начнется играть музыка
  //Сделать анимацию появления названия игры сверху, а меню снизу
  //На маленьких экранах  в игре карточка будет примерно 80 пикселей в ширину. Игровой худ сверху и так наверное вплоть до xl
  //Сделать нормальные настройки
  //Подумать над интерфейсом во время раунда

  const handleWin = (result: WinResultInterface) => {
    play('win');
    const coinsForWin = GAME_DIFFICULTIES[result.difficulty].coins;
    addCoins(coinsForWin);
    updateStatistics(result.difficulty, result.time, result.moves);
  };

  // useEffect(() => {
  //   play('background');
  // }, [play]);

  function getCurrentScreen() {
    switch (state.screen) {
      case 'menu':
        return (
          <Menu
            onPlay={() => changeScreen('game')}
            onOpenStore={() => changeScreen('store')}
            onOpenSettings={() => changeScreen('settings')}
          />
        );
      case 'game':
        return <Game theme={state.activeTheme} coins={state.coins} onWin={handleWin} />;
      case 'store':
        return (
          <Store
            totalCoins={state.coins}
            activeTheme={state.activeTheme}
            purchadesThemes={state.purchasedThemes}
            onEquip={setActiveTheme}
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
      {state.screen !== 'menu' && (
        <MenuButton
          className="transparent absolute top-0 left-4 flex h-12 w-10 min-w-0 items-center justify-center p-0 transition duration-500 ease-in-out active:scale-95 md:top-4 md:h-14 md:w-14 lg:hover:scale-110 xl:top-10"
          onClick={() => changeScreen('menu')}
        >
          <img
            src="./src/assets/arrow.png"
            alt="back"
            className="pixelated h-full w-full object-contain md:h-auto"
          />
        </MenuButton>
      )}
      {getCurrentScreen()}
    </AnimatedBackground>
  );
}

export default App;
