import { AnimatedBackground } from 'components/AnimatedBackground';
import { useApp } from './hooks/useApp';
import { Game, Menu, Settings, SplashScreen, Statistics, Store } from './pages';

function App() {
  const {
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
  } = useApp();

  //TODO
  //Разобраться в файлах и переложить все по папочкам

  function getCurrentScreen() {
    switch (state.screen) {
      case 'splash':
        return (
          <SplashScreen
            onChangeScreen={() => {
              changeScreen('menu');
              play('background');
            }}
          />
        );
      case 'menu':
        return (
          <Menu
            ref={isFirstMenuLaunch}
            onPlay={() => changeScreen('game')}
            onOpenStore={() => changeScreen('store')}
            onOpenSettings={() => changeScreen('settings')}
            onOpenStatistics={() => changeScreen('statistics')}
          />
        );
      case 'game':
        return (
          <Game
            theme={state.activeTheme}
            coins={state.coins}
            onWin={handleWin}
            onBack={() => changeScreen('menu')}
          />
        );
      case 'store':
        return (
          <Store
            totalCoins={state.coins}
            activeTheme={state.activeTheme}
            purchadesThemes={state.purchasedThemes}
            onEquip={setActiveTheme}
            onBuy={purchaseTheme}
            onBack={() => changeScreen('menu')}
          />
        );
      case 'settings': {
        return (
          <Settings
            musicVolume={musicVolume}
            sfxVolume={sfxVolume}
            onChangeMusicVolume={handleMusicVolumeChange}
            onChangeSfxVolume={handleSfxVolumeChange}
            onBack={() => changeScreen('menu')}
          />
        );
      }
      case 'statistics': {
        return (
          <Statistics
            statistics={state.statistics}
            onClearStatistics={clearStatistics}
            onBack={() => changeScreen('menu')}
          />
        );
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
