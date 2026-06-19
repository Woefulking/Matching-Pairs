type ScreenType = 'menu' | 'game' | 'settings' | 'store' | 'leaderboard';
type GameStatusType = 'playing' | 'won' | 'lost';
type GameDifficultyType = 'easy' | 'medium' | 'hard';

export interface DifficultyConfig {
  cardsCount: number;
  durataion: number;
}

export interface AppState {
  screen: ScreenType;
  coins: number;
  purchasedThemes: string[];
  activeTheme: string;
}

interface cardType {
  id: number;
  img: string;
  name: string;
  uniqueId?: string;
}

export interface GameSessionState {
  status: GameStatusType;
  difficulty: GameDifficultyType;
  deck: cardType[];
  matchedCards: Set<string>;
  timeLeft: number;
}
