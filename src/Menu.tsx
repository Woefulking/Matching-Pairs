import { Logo } from './components/Logo';
import { MenuButton } from './components/MenuButton';

interface MenuProps {
  onPlay: () => void;
  onOpenStore: () => void;
  onOpenSettings: () => void;
  onOpenStatistics: () => void;
}

export const Menu = (props: MenuProps) => {
  const { onPlay, onOpenStore, onOpenSettings, onOpenStatistics } = props;
  return (
    <div className="flex flex-col items-center gap-8 md:gap-12 xl:gap-16">
      <Logo />
      <div className="flex w-full flex-col items-center gap-2 lg:gap-3">
        <MenuButton
          className="button button-blue xl:text-8 min-w-30 px-2 py-0 text-lg md:max-w-70 md:min-w-36 md:text-2xl lg:min-w-50 lg:px-4 lg:py-1 lg:text-3xl xl:min-w-62 xl:py-2 2xl:min-w-70"
          onClick={onPlay}
        >
          Play
        </MenuButton>
        <MenuButton
          className="button button-blue xl:text-8 min-w-30 px-2 py-0 text-lg md:max-w-70 md:min-w-36 md:text-2xl lg:min-w-50 lg:px-4 lg:py-1 lg:text-3xl xl:min-w-62 xl:py-2 2xl:min-w-70"
          onClick={onOpenStore}
        >
          Store
        </MenuButton>
        <MenuButton
          className="button button-blue xl:text-8 min-w-30 px-2 py-0 text-lg md:max-w-70 md:min-w-36 md:text-2xl lg:min-w-50 lg:px-4 lg:py-1 lg:text-3xl xl:min-w-62 xl:py-2 2xl:min-w-70"
          onClick={onOpenStatistics}
        >
          Statistics
        </MenuButton>
        <MenuButton
          className="button button-blue xl:text-8 min-w-30 px-2 py-0 text-lg md:max-w-70 md:min-w-36 md:text-2xl lg:min-w-50 lg:px-4 lg:py-1 lg:text-3xl xl:min-w-62 xl:py-2 2xl:min-w-70"
          onClick={onOpenSettings}
        >
          Settings
        </MenuButton>
      </div>
    </div>
  );
};
