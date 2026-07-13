import type { GAME_DIFFICULTIES, GAME_THEMES } from '../consts/consts';

export type ScreenType = 'menu' | 'game' | 'settings' | 'store' | 'leaderboard';
export type GameStatusType = 'idle' | 'preparing' | 'dealing' | 'playing' | 'win' | 'loss';

export type ComparisonResult = null | 'match' | 'mismatch';

export type GameDifficultyType = keyof typeof GAME_DIFFICULTIES;

export type GameThemesType = keyof typeof GAME_THEMES;

export interface AppState {
  screen: ScreenType;
  coins: number;
  purchasedThemes: Set<GameThemesType>;
  activeTheme: GameThemesType;
  volume: number;
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
  comparisonResult: ComparisonResult;
  matchedCards: Set<string>;
  timeLeft: number;
  moves: number;
  rewardGiven: boolean;
}

export type GameSessionActions =
  | {
      type: 'startRound';
      payload: { deck: CardType[]; difficulty: GameDifficultyType };
    }
  | { type: 'setGameStatus'; payload: GameStatusType }
  | { type: 'selectCard'; payload: CardType }
  | { type: 'resolveTurn' }
  | { type: 'collectReward' }
  | { type: 'tick' }
  | { type: 'clear' };

export type AppActions =
  | { type: 'changeScreen'; payload: ScreenType }
  | { type: 'addCoins'; payload: number }
  | { type: 'purchaseTheme'; payload: GameThemesType }
  | { type: 'setActiveTheme'; payload: GameThemesType };
