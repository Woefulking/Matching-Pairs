import { Menu } from './Menu';
import { Game } from './Game';
import { useApp } from './hooks/useApp';
import { Store } from './Store';

function App() {
  const { state, changeScreen, addCoins, purchaseTheme, setActiveTheme } = useApp();

  //TODO
  //Сделать марштрутизацию по приложению
  //Настроить общие стили
  //Добавить кнопки возвращения в меню в настройках и в игре
  //Разложить по папкам ui и основные компоненты
  //Подумать над QoL в приложении (показ всех карт при проигрыше)
  //Сделать динамический фон
  //Сделать анимацию перемещивания карт

  function getCurrentScreen() {
    switch (state.screen) {
      case 'menu':
        return (
          <Menu onPlay={() => changeScreen('game')} onOpenStore={() => changeScreen('store')} />
        );
      case 'game':
        return (
          <Game theme={state.activeTheme} onBack={() => changeScreen('menu')} onWin={addCoins} />
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
