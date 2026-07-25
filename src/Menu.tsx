import { Logo } from './components/Logo';
import { MenuButton } from './components/MenuButton';

interface MenuProps {
  onPlay: () => void;
  onOpenStore: () => void;
  onOpenSettings: () => void;
}

export const Menu = (props: MenuProps) => {
  const { onPlay, onOpenStore, onOpenSettings } = props;
  return (
    <div className="flex flex-col items-center gap-8 md:gap-12 xl:gap-16">
      <Logo />
      <div className="flex w-full flex-col items-center gap-3 lg:gap-4">
        <MenuButton
          className="button min-w-30 md:min-w-36 md:text-2xl lg:min-w-50 lg:text-3xl xl:min-w-62 xl:text-[36px] 2xl:min-w-70"
          onClick={onPlay}
        >
          Play
        </MenuButton>
        <MenuButton
          className="button text-md min-w-30 md:min-w-36 md:text-2xl lg:min-w-50 lg:text-3xl xl:min-w-62 xl:text-[36px] 2xl:min-w-70"
          onClick={onOpenStore}
        >
          Store
        </MenuButton>
        <MenuButton
          className="button min-w-30 md:min-w-36 md:text-2xl lg:min-w-50 lg:text-3xl xl:min-w-62 xl:text-[36px] 2xl:min-w-70"
          onClick={onOpenSettings}
        >
          Settings
        </MenuButton>
      </div>
    </div>
  );
};
