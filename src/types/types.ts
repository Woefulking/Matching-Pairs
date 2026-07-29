import type { GAME_DIFFICULTIES, GAME_THEMES } from 'consts/consts';

export type ScreenType = 'splash' | 'menu' | 'game' | 'settings' | 'store' | 'statistics';
export type GameStatusType = 'idle' | 'preparing' | 'dealing' | 'playing' | 'win' | 'loss';

export type ComparisonResult = null | 'match' | 'mismatch';

export type GameDifficultyType = keyof typeof GAME_DIFFICULTIES;
export type GameDifficultySettings = (typeof GAME_DIFFICULTIES)[GameDifficultyType];

export type GameThemesType = keyof typeof GAME_THEMES;
export type GameThemesSettings = (typeof GAME_THEMES)[GameThemesType];

export interface StatisticsInterface {
  bestTime: number | null;
  bestMoves: number | null;
  totalWins: number;
}

export interface WinResultInterface {
  difficulty: GameDifficultyType;
  moves: number;
  time: number;
}

export interface AppState {
  screen: ScreenType;
  coins: number;
  purchasedThemes: Set<GameThemesType>;
  activeTheme: GameThemesType;
  statistics: Record<GameDifficultyType, StatisticsInterface>;
}

export type AppActions =
  | { type: 'changeScreen'; payload: ScreenType }
  | { type: 'addCoins'; payload: number }
  | { type: 'purchaseTheme'; payload: GameThemesType }
  | { type: 'setActiveTheme'; payload: GameThemesType }
  | {
      type: 'updateStatistics';
      payload: {
        difficulty: GameDifficultyType;
        time: number;
        moves: number;
      };
    }
  | { type: 'clearStatistics' };

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

export type SoundType =
  | 'menuClick'
  | 'cardClick'
  | 'cardShuffle'
  | 'match'
  | 'mismatch'
  | 'win'
  | 'lose'
  | 'background';

export interface BacgroundCardItem {
  width: number;
  height: number;
  x: number;
  y: number;
  speed: number;
  rotate: number;
  imdIdx: number;
}
