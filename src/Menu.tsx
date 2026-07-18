import { Logo } from './components/Logo';

interface MenuProps {
  onPlay: () => void;
  onOpenStore: () => void;
  onOpenSettings: () => void;
}

export const Menu = (props: MenuProps) => {
  const { onPlay, onOpenStore, onOpenSettings } = props;
  return (
    <div className="flex flex-col items-center gap-15">
      <Logo />
      <div className="flex flex-col gap-4">
        <button className="button" onClick={onPlay}>
          Play
        </button>
        <button className="button" onClick={onOpenStore}>
          Store
        </button>
        <button className="button" onClick={onOpenSettings}>
          Settings
        </button>
      </div>
    </div>
  );
};
