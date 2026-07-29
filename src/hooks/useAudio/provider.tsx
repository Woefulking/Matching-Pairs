import menuClick from 'assets/sounds/menuClick.ogg';
import cardClick from 'assets/sounds/cardClick.ogg';
import match from 'assets/sounds/match.ogg';
import mismatch from 'assets/sounds/mismatch.ogg';
import cardShuffle from 'assets/sounds/cardShuffle.ogg';
import win from 'assets/sounds/win.ogg';
import lose from 'assets/sounds/lose.ogg';
import background from 'assets/sounds/background.ogg';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { SoundType } from 'src/types/types';
import { AudioContext } from './context';

const soundConfig = {
  menuClick: { src: menuClick, type: 'sfx' },
  cardClick: { src: cardClick, type: 'sfx' },
  match: { src: match, type: 'sfx' },
  mismatch: { src: mismatch, type: 'sfx' },
  cardShuffle: { src: cardShuffle, type: 'sfx' },
  win: { src: win, type: 'sfx' },
  lose: { src: lose, type: 'sfx' },
  background: { src: background, type: 'music' },
} satisfies Record<SoundType, { src: string; type: 'music' | 'sfx' }>;

interface AudioMapItem {
  audio: HTMLAudioElement;
  type: 'music' | 'sfx';
}

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [musicVolume, setMusicVolume] = useState<number>(() => {
    const saved = localStorage.getItem('savedAppState');
    if (!saved) return 20;
    const parsed = JSON.parse(saved);
    return +parsed.musicVolume;
  });
  const [sfxVolume, setSfxVolume] = useState<number>(() => {
    const saved = localStorage.getItem('savedAppState');
    if (!saved) return 50;
    const parsed = JSON.parse(saved);
    return +parsed.sfxVolume;
  });

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
