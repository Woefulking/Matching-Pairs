import { Menu } from './Menu';
import { Game } from './Game';
import { useApp } from './hooks/useApp';
import { Store } from './Store';

function App() {
  const { state, changeScreen, addCoins, purchaseTheme, setActiveTheme } = useApp();

  //TODO
  //Подумать над интерфейсом во время раунда
  //Разделить Game на компоненты
  //Добавить звук клика по карте и звук раздачи карт
  //Сделать динамический фон

  function getCurrentScreen() {
    switch (state.screen) {
      case 'menu':
        return (
          <Menu onPlay={() => changeScreen('game')} onOpenStore={() => changeScreen('store')} />
        );
      case 'game':
        return (
          <Game
            theme={state.activeTheme}
            coins={state.coins}
            onBack={() => changeScreen('menu')}
            onWin={addCoins}
          />
        );
      case 'store':
        return (
          <Store
            purchadesThemes={state.purchasedThemes}
            onBack={() => changeScreen('menu')}
            onBuy={purchaseTheme}
          />
        );
    }
  }

  return getCurrentScreen();
}

export default App;
