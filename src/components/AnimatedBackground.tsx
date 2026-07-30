import { useEffect, useRef, type ReactNode } from 'react';
import { ALL_BACK_IMAGES, BACKGROUND_CARDS_COUNT } from '../consts/consts';
import type { BacgroundCardItem } from 'types/types';

interface AnimatedBackgroundProps {
  children: ReactNode;
  isCompact?: boolean;
}

export const AnimatedBackground = ({ children, isCompact }: AnimatedBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;

    let animationFrameId: number;
    let images: HTMLImageElement[] = [];
    let cards: BacgroundCardItem[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const initCards = () => {
      cards = Array.from({ length: BACKGROUND_CARDS_COUNT }).map((_, index) => {
        const calculatedDelay = index * 4.5 + Math.random();
        const speed = Math.random() * 0.5 + 0.3;

        return {
          width: 56,
          height: 80,

          x: Math.random() * (canvas.width - 56),
          y: canvas.height + calculatedDelay * speed * 60,
          speed: speed,
          rotate: (Math.floor(Math.random() * -40) + 25) * (Math.PI / 180),
          imdIdx: Math.floor(Math.random() * ALL_BACK_IMAGES.length),
        };
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cards.forEach((card) => {
        const img = images[card.imdIdx];

        if (!img || !img.complete) return;

        card.y -= card.speed;

        if (card.y < -card.height) {
          card.y = canvas.height + Math.random() * 300;
          card.x = Math.random() * (canvas.width - card.width);
        }

        ctx.save();
        ctx.globalAlpha = 0.8;

        ctx.translate(card.x + card.width / 2, card.y + card.height / 2);
        ctx.rotate(card.rotate);

        ctx.drawImage(img, -card.width / 2, -card.height / 2, card.width, card.height);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const loadImages = async () => {
      const promises = ALL_BACK_IMAGES.map((src) => {
        return new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          img.src = src;

          img.onload = () => resolve(img);
        });
      });

      images = await Promise.all(promises);

      initCards();
      animate();
    };

    loadImages();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-slate-900 select-none">
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute top-0 left-0 -z-1 h-screen w-screen"
        style={{ imageRendering: 'pixelated' }}
      />
      <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-[2px]" />
      <div className="flex h-full w-full items-center justify-center overflow-y-auto">
        <div
          className={`relative z-20 flex h-full w-full items-center justify-center ${
            isCompact && 'mx-auto max-w-full lg:max-w-6xl xl:max-w-7xl xl:pb-4'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
