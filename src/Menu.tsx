interface MenuProps {
  onPlay: () => void;
  onOpenStore: () => void;
  onOpenSettings: () => void;
}

interface MenuButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export function MenuButton({ children, onClick }: MenuButtonProps) {
  return (
    <button
      className="min-w-40 bg-white text-[36px] font-medium border-4 border-black py-1 rounded
           hover:-translate-y-1 hover:shadow-[0px_0px_0px_2px_rgba(0,0,0,1)]
           transition-all duration-200"
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export const Menu = (props: MenuProps) => {
  const { onPlay, onOpenStore, onOpenSettings } = props;
  return (
    <div className="min-w-150 py-8 flex flex-col items-center gap-15">
      <div className="flex flex-row gap-8">
        <div className="flex items-center gap-2">
          <img className="test w-20" src="./src/assets/p.png"></img>
          <img className="test w-20" src="./src/assets/i.png"></img>
          <img className="test w-20" src="./src/assets/x.png"></img>
          <img className="test w-20" src="./src/assets/e.png"></img>
          <img className="test w-20" src="./src/assets/l.png"></img>
        </div>
        <div className="flex items-center gap-2">
          <img className="test w-20" src="./src/assets/p.png"></img>
          <img className="test w-20" src="./src/assets/a.png"></img>
          <img className="test w-20" src="./src/assets/i.png"></img>
          <img className="test w-20" src="./src/assets/r.png"></img>
          <img className="test w-20" src="./src/assets/s.png"></img>
        </div>
      </div>
      <img className="test w-8" src="./src/assets/coin.png" alt="" />
      <div className="flex flex-col gap-4">
        <MenuButton onClick={onPlay}>Play</MenuButton>
        <MenuButton onClick={onOpenStore}>Store</MenuButton>
        <MenuButton onClick={onOpenSettings}>Settings</MenuButton>
      </div>
    </div>
  );
};
