import { GAME_THEMES } from './consts/consts';
import type { GameThemesType } from './types/types';

interface StoreProps {
  onBack: () => void;
  onBuy: (theme: GameThemesType) => void;
  purchadesThemes: Set<GameThemesType>;
}
export const Store = ({ purchadesThemes, onBack, onBuy }: StoreProps) => {
  return (
    <div>
      <button onClick={() => onBack()}>НАЗАД</button>
      {Object.entries(GAME_THEMES).map(([theme, params]) => {
        const isThemePurchased = purchadesThemes.has(theme as GameThemesType);
        return (
          <div key={theme}>
            <span>{params.label}</span>
            <span>{params.preview}</span>
            {!isThemePurchased ? (
              <>
                <span>{params.price}</span>
                <button onClick={() => onBuy(theme as GameThemesType)}>Купить Тему</button>
              </>
            ) : (
              <span>Куплено</span>
            )}
          </div>
        );
      })}
    </div>
  );
};
