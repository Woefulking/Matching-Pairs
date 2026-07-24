import menuClick from 'assets/sounds/menu click.ogg';
import cardClick from 'assets/sounds/card click.ogg';
import match from 'assets/sounds/match.ogg';
import misMatch from 'assets/sounds/mismatch.ogg';
import win from 'assets/sounds/win.ogg';
import lose from 'assets/sounds/lose.ogg';
import background from 'assets/sounds/background.ogg';

import { useEffect, useRef } from 'react';

export type SoundType =
  | 'menuClick'
  | 'cardClick'
  | 'match'
  | 'misMatch'
  | 'win'
  | 'lose'
  | 'background';

const soundConfig: Record<SoundType, { src: string; type: 'music' | 'sfx' }> = {
  menuClick: { src: menuClick, type: 'sfx' },
  cardClick: { src: cardClick, type: 'sfx' },
  match: { src: match, type: 'sfx' },
  misMatch: { src: misMatch, type: 'sfx' },
  win: { src: win, type: 'sfx' },
  lose: { src: lose, type: 'sfx' },
  background: { src: background, type: 'music' },
};

export function useAudio(musicVolume: number, sfxVolume: number) {
  const audioMapRef = useRef<Record<
    SoundType,
    { audio: HTMLAudioElement; type: 'music' | 'sfx' }
  > | null>(null);

  const play = (sound: SoundType) => {
    const item = audioMapRef.current?.[sound];
    if (!item) return;

    item.audio.currentTime = 0;
    item.audio.play();
  };

  const stop = (sound: SoundType) => {
    const item = audioMapRef.current?.[sound];
    if (!item) return;

    item.audio.pause();
    item.audio.currentTime = 0;
  };

  useEffect(() => {
    audioMapRef.current = Object.fromEntries(
      Object.entries(soundConfig).map(([key, config]) => {
        const audioInstance = new Audio(config.src);

        if (config.type === 'music') {
          audioInstance.loop = true;
        }

        return [key as SoundType, { audio: audioInstance, type: config.type }];
      })
    ) as Record<SoundType, { audio: HTMLAudioElement; type: 'music' | 'sfx' }>;

    return () => {
      if (audioMapRef.current) {
        Object.values(audioMapRef.current).forEach(({ audio }) => audio.pause());
      }
    };
  }, []);

  useEffect(() => {
    if (!audioMapRef.current) return;

    Object.values(audioMapRef.current).forEach(({ audio, type }) => {
      if (type === 'music') {
        audio.volume = musicVolume / 100;
      } else {
        audio.volume = sfxVolume / 100;
      }
    });
  }, [musicVolume, sfxVolume]);

  return { play, stop };
}
