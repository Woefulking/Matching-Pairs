import { Menu } from './Menu';
import { Game } from './Game';
import { useApp } from './hooks/useApp';
import { Store } from './Store';
import { useAudio } from './hooks/useAudio';

function App() {
  const { state, changeScreen, addCoins, purchaseTheme, setActiveTheme } = useApp();
  const { play, stop } = useAudio(state.volume);

  //TODO
  //Подумать как совместить анимацию колоды и раздачи карт
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
            onBack={() => changeScreen('menu')}
            onWin={addCoins}
            playSound={play}
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
