import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { SoundType } from 'src/types/types';
import { AudioContext } from './context';

const soundConfig: Record<SoundType, { src: string; type: 'music' | 'sfx' }> = {
  menuClick: { src: './src/assets/sounds/menuClick.ogg', type: 'sfx' },
  cardClick: { src: './src/assets/sounds/cardClick.ogg', type: 'sfx' },
  match: { src: './src/assets/sounds/match.ogg', type: 'sfx' },
  mismatch: { src: './src/assets/sounds/mismatch.ogg', type: 'sfx' },
  cardShuffle: { src: './src/assets/sounds/cardShuffle.ogg', type: 'sfx' },
  win: { src: './src/assets/sounds/win.ogg', type: 'sfx' },
  lose: { src: './src/assets/sounds/lose.ogg', type: 'sfx' },
  background: { src: './src/assets/sounds/background.ogg', type: 'music' },
};

interface AudioMapItem {
  audio: HTMLAudioElement;
  type: 'music' | 'sfx';
}

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [musicVolume, setMusicVolume] = useState<number>(50);
  const [sfxVolume, setSfxVolume] = useState<number>(30);

  const audioMapRef = useRef<Record<string, AudioMapItem>>({});

  const play = (sound: SoundType) => {
    const item = audioMapRef.current[sound];
    if (!item) return;

    const nativeAudio = item.audio;
    nativeAudio.currentTime = 0;
    nativeAudio.play().catch(() => {
      console.log('Autoplay blocked by browser.');
    });
  };

  const stop = (sound: SoundType) => {
    const item = audioMapRef.current[sound];
    if (!item) return;

    const nativeAudio = item.audio;
    nativeAudio.pause();
    nativeAudio.currentTime = 0;
  };

  useEffect(() => {
    const currentMap = audioMapRef.current;

    Object.entries(soundConfig).forEach(([key, config]) => {
      const audioInstance = new Audio(config.src);
      if (config.type === 'music') {
        audioInstance.loop = true;
      }
      currentMap[key] = {
        audio: audioInstance,
        type: config.type,
      };
    });

    return () => {
      Object.values(currentMap).forEach(({ audio }) => audio.pause());
    };
  }, []);

  useEffect(() => {
    Object.values(audioMapRef.current).forEach(({ audio, type }) => {
      audio.volume = type === 'music' ? musicVolume / 100 : sfxVolume / 100;
    });
  }, [musicVolume, sfxVolume]);

  return (
    <AudioContext.Provider
      value={{ musicVolume, sfxVolume, setMusicVolume, setSfxVolume, play, stop }}
    >
      {children}
    </AudioContext.Provider>
  );
};
