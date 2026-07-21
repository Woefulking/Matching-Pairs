import { Logo } from './components/Logo';

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
      <div className="flex flex-col gap-3 lg:gap-4 w-full items-center">
        <button
          className="button sm:min-w-30 md:min-w-36 lg:min-w-50 xl:min-w-62 2xl:min-w-70 md:text-2xl lg:text-3xl xl:text-[36px]"
          onClick={onPlay}
        >
          Play
        </button>
        <button
          className="button sm:min-w-30 md:min-w-36 lg:min-w-50 xl:min-w-62 2xl:min-w-70 md:text-2xl lg:text-3xl xl:text-[36px]"
          onClick={onOpenStore}
        >
          Store
        </button>
        <button
          className="button sm:min-w-30 md:min-w-36 lg:min-w-50 xl:min-w-62 2xl:min-w-70 md:text-2xl lg:text-3xl xl:text-[36px]"
          onClick={onOpenSettings}
        >
          Settings
        </button>
      </div>
    </div>
  );
};
