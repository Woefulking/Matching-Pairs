import alarmSound from '@/assets/sounds/alarm.mp3';
import clickSound from '@/assets/sounds/click.mp3';
import { useEffect, useRef } from 'react';

export type SoundType = 'click' | 'alarm';

const sounds: Record<SoundType, string> = {
  alarm: alarmSound,
  click: clickSound,
};

export function useAudio(volume: number) {
  const audioMapRef = useRef<Record<SoundType, HTMLAudioElement> | null>(null);

  const play = (sound: SoundType) => {
    const audio = audioMapRef.current?.[sound];
    if (!audio) return;

    audio.currentTime = 0;
    audio.play();
  };

  const stop = (sound: SoundType) => {
    const audio = audioMapRef.current?.[sound];
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
  };

  //Инициализация звуков
  useEffect(() => {
    audioMapRef.current = {
      alarm: new Audio(sounds.alarm),
      click: new Audio(sounds.click),
    };
  }, []);

  //Изменение громкости
  useEffect(() => {
    if (audioMapRef.current) {
      Object.values(audioMapRef.current).forEach((audio) => {
        audio.volume = volume / 100;
      });
    }
  }, [volume]);

  return { play, stop };
}
