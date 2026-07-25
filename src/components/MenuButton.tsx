import type { ButtonHTMLAttributes } from 'react';
import { useAudio } from 'src/hooks/useAudio/useAudio';

interface MenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  onClick: () => void;
}

export const MenuButton = ({ className, children, onClick, ...props }: MenuButtonProps) => {
  const { play } = useAudio();
  const handleClick = () => {
    play('menuClick');
    if (onClick) onClick();
  };

  return (
    <button type="button" className={className} {...props} onClick={handleClick}>
      {children}
    </button>
  );
};
