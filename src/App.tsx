import { useEffect, useState } from 'react';
import './App.css';
import { Menu } from './Menu';
import { Game } from './Game';

export interface cardType {
  id: number;
  img: string;
  name: string;
  uniqueId?: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const allCards: cardType[] = [
  { id: 1, img: '🍎', name: 'apple' },
  { id: 2, img: '🍌', name: 'banana' },
  { id: 3, img: '🍇', name: 'grape' },
  { id: 4, img: '🍒', name: 'cherry' },
  { id: 5, img: '🍓', name: 'strawberry' },
  { id: 6, img: '🍉', name: 'watermelon' },
  { id: 7, img: '🍊', name: 'orange' },
];

function App() {
  type ScreenType = 'menu' | 'game' | 'settings' | 'store' | 'leaderboard';
  const [screen, setScreen] = useState<ScreenType>(() => {
    const savedScreen = localStorage.getItem('screen') as ScreenType;
    if (savedScreen) return savedScreen;
    return 'menu';
  });

  useEffect(() => {
    localStorage.setItem('screen', screen);
  }, [screen]);

  function getCurrentScreen() {
    switch (screen) {
      case 'menu':
        return <Menu onPlay={() => setScreen('game')} />;
      case 'game':
        return <Game />;
      // case 'settings':
      //   return <Settings />;
      // case 'store':
      //   return <Store />;
      // case 'leaderboard':
      //   return <LeaderBoard />;
    }
  }

  return <>{getCurrentScreen()}</>;
}

export default App;
