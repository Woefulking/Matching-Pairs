import { Menu } from './Menu';
import { Game } from './Game';
import { useApp } from './hooks/useApp';
import { Store } from './Store';
import type { WinResultInterface } from './types/types';
import { GAME_DIFFICULTIES } from './consts/consts';
import { Settings } from './Settings';
import { AnimatedBackground } from './components/AnimatedBackground';

function App() {
  const { state, changeScreen, addCoins, updateStatistics, purchaseTheme, setActiveTheme } =
    useApp();

  //TODO
  //Добавить в магазин общее число монет игрока
  //Доработать магазин, чтобы был вертикальный список тем с прокруткой
  //На маленьких экранах  в игре карточка будет примерно 80 пикселей в ширину. Игровой худ сверху и так наверное вплоть до xl
  //Сделать нормальные настройки
  //Подумать над интерфейсом во время раунда
  //Добавить звук клика по карте и звук раздачи карт

  const handleWin = (result: WinResultInterface) => {
    const coinsForWin = GAME_DIFFICULTIES[result.difficulty].coins;
    addCoins(coinsForWin);
    updateStatistics(result.difficulty, result.time, result.moves);
  };

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
        return (
          <Game
            theme={state.activeTheme}
            coins={state.coins}
            onBack={() => changeScreen('menu')}
            onWin={handleWin}
          />
        );
      case 'store':
        return (
          <Store
            totalCoins={state.coins}
            purchadesThemes={state.purchasedThemes}
            onBack={() => changeScreen('menu')}
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
