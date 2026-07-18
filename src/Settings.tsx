import { GAME_THEMES } from './consts/consts';
import type { GameThemesType } from './types/types';

interface SettingsProps {
  activeTheme: GameThemesType;
  onChangeTheme: (theme: GameThemesType) => void;
}
export const Settings = ({ activeTheme, onChangeTheme }: SettingsProps) => {
  const themes = Object.keys(GAME_THEMES) as GameThemesType[];
  return (
    <div className="w-full flex flex-col items-center gap-6">
      <span>Current active theme - {activeTheme}</span>
      {themes.map((theme) => (
        <div key={theme} className="flex flex-col gap-4">
          <span>{theme}</span>
          <button type="button" className="button" onClick={() => onChangeTheme(theme)}>
            Сделать тему активной
          </button>
        </div>
      ))}
    </div>
  );
};
