interface MenuProps {
  onPlay: () => void;
  onOpenStore: () => void;
  onOpenSettings?: () => void;
}

export const Menu = (props: MenuProps) => {
  const { onPlay, onOpenStore, onOpenSettings } = props;
  return (
    <div>
      <button type="button" onClick={onPlay}>
        Играть
      </button>
      <button type="button" onClick={onOpenStore}>
        Магазин
      </button>
      <button type="button" onClick={onOpenSettings}>
        Настройки
      </button>
    </div>
  );
};
