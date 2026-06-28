type ScreenType = 'menu' | 'game' | 'settings' | 'store' | 'leaderboard';
type GameStatusType = 'idle' | 'playing' | 'won' | 'lost';

export const GAME_DIFFICULTIES = {
  easy: {
    label: 'Easy',
    time: 90,
  },
  medium: {
    label: 'Medium',
    time: 60,
  },
  hard: {
    label: 'Hard',
    time: 30,
  },
} as const;

export type GameDifficultyType = keyof typeof GAME_DIFFICULTIES;
export type GameDifficultyLabel = (typeof GAME_DIFFICULTIES)[GameDifficultyType]['label'];

export interface AppState {
  screen: ScreenType;
  coins: number;
  purchasedThemes: string[];
  activeTheme: string;
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
  selectedCards: {
    firstCard: CardType | null;
    secondCard: CardType | null;
  };
  matchedCards: Set<string>;
  timeLeft: number;
}

export type GameSessionAction =
  | {
      type: 'startGame';
      payload: { deck: CardType[]; difficulty: GameDifficultyType };
    }
  | { type: 'selectCard'; payload: CardType }
  | { type: 'clearSelectedCards' }
  | { type: 'compareCards' }
  | { type: 'tick' }
  | { type: 'clear' };

export type GameSessionActions = {
  dispatch: (action: GameSessionAction) => void;
};
