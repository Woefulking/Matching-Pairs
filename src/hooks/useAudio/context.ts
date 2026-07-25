import { createContext } from 'react';
import type { SoundType } from 'src/types/types';

interface AudioContextType {
  musicVolume: number;
  sfxVolume: number;
  setMusicVolume: (v: number) => void;
  setSfxVolume: (v: number) => void;
  play: (sound: SoundType) => void;
  stop: (sound: SoundType) => void;
}

export const AudioContext = createContext<AudioContextType | undefined>(undefined);
