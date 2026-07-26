import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: ReactNode;
}

export const Modal = ({ children }: ModalProps) => {
  const root = document.getElementById('root');

  if (!root) return null;
  return createPortal(
    <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-[5px]">
      <div className="relative mx-auto flex h-full w-full max-w-full items-center justify-center xl:max-w-6xl 2xl:max-w-7xl">
        {children}
      </div>
    </div>,
    root
  );
};
