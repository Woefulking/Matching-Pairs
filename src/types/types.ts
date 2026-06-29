export type ScreenType = 'menu' | 'game' | 'settings' | 'store' | 'leaderboard';
export type GameStatusType = 'idle' | 'playing' | 'win' | 'loss';

export const GAME_DIFFICULTIES = {
  easy: {
    label: 'Easy',
    time: 90,
    coins: 30,
  },
  medium: {
    label: 'Medium',
    time: 60,
    coins: 60,
  },
  hard: {
    label: 'Hard',
    time: 30,
    coins: 90,
  },
} as const;

export type GameDifficultyType = keyof typeof GAME_DIFFICULTIES;

export const GAME_THEMES = {
  fruits: {
    label: 'Fruits',
    preview: '',
    price: 60,
  },
  space: {
    label: 'Space',
    preview: '',
    price: 90,
  },
  ocean: {
    label: 'Ocean',
    preview: '',
    price: 120,
  },
} as const;

export type GameThemesType = keyof typeof GAME_THEMES;

export interface AppState {
  screen: ScreenType;
  coins: number;
  purchasedThemes: GameThemesType[];
  activeTheme: GameThemesType;
}

export interface CardType {
  id: number;
  img: string;
  name: string;
  uniqueId?: string;
}

export interface GameSessionState {
  status: GameStatusType;
  difficulty: GameDifficultyType;
  deck: CardType[];
  pairsCount: number;
  selectedCards: {
    firstCard: CardType | null;
    secondCard: CardType | null;
  };
  matchedCards: Set<string>;
  timeLeft: number;
  moves: number;
}

export type GameSessionActions =
  | {
      type: 'startGame';
      payload: { deck: CardType[]; difficulty: GameDifficultyType };
    }
  | { type: 'selectCard'; payload: CardType }
  | { type: 'clearSelectedCards' }
  | { type: 'compareCards' }
  | { type: 'tick' }
  | { type: 'clear' };

export type AppActions =
  | { type: 'changeScreen'; payload: ScreenType }
  | { type: 'addCoins'; payload: number }
  | { type: 'purchaseTheme'; payload: GameThemesType }
  | { type: 'setActiveTheme'; payload: GameThemesType };
