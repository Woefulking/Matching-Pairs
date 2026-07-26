import { Menu } from './Menu';
import { Game } from './Game';
import { useApp } from './hooks/useApp';
import { Store } from './Store';
import { Settings } from './Settings';
import { AnimatedBackground } from './components/AnimatedBackground';
import { MenuButton } from './components/MenuButton';
import { Statistics } from './Statistics';

function App() {
  const {
    state,
    changeScreen,
    handleWin,
    clearStatistics,
    musicVolume,
    handleMusicVolumeChange,
    sfxVolume,
    handleSfxVolumeChange,
    purchaseTheme,
    setActiveTheme,
  } = useApp();

  //TODO
  //Разобраться в файлах и переложить все по папочкам
  //Сделать первым экраном предупреждение, по тапу которого начнется играть музыка
  //Сделать анимацию появления названия игры сверху, а меню снизу
  //На маленьких экранах  в игре карточка будет примерно 80 пикселей в ширину. Игровой худ сверху и так наверное вплоть до xl
  //Подумать над интерфейсом во время раунда

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
            onOpenStatistics={() => changeScreen('statistics')}
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
        return (
          <Settings
            musicVolume={musicVolume}
            sfxVolume={sfxVolume}
            onChangeMusicVolume={handleMusicVolumeChange}
            onChangeSfxVolume={handleSfxVolumeChange}
          />
        );
      }
      case 'statistics': {
        return <Statistics statistics={state.statistics} onClearStatistics={clearStatistics} />;
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
