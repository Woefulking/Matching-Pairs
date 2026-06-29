import './App.css';
import { Menu } from './Menu';
import { Game } from './Game';
import { useApp } from './hooks/useApp';
import type { CardType } from './types/types';

// eslint-disable-next-line react-refresh/only-export-components
export const allCards: CardType[] = [
  { id: 1, img: '🍎', name: 'apple' },
  { id: 2, img: '🍌', name: 'banana' },
  { id: 3, img: '🍇', name: 'grape' },
  { id: 4, img: '🍒', name: 'cherry' },
  { id: 5, img: '🍓', name: 'strawberry' },
  { id: 6, img: '🍉', name: 'watermelon' },
  { id: 7, img: '🍊', name: 'orange' },
];

function App() {
  const { state, changeScreen, addCoins, purchaseTheme, setActiveTheme } = useApp();

  function getCurrentScreen() {
    switch (state.screen) {
      case 'menu':
        return <Menu onPlay={() => changeScreen('game')} />;
      case 'game':
        return <Game onWin={addCoins} />;
    }
  }

  return <>{getCurrentScreen()}</>;
}

export default App;
