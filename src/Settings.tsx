import { Header } from './components/Header';
import { Range } from './components/Range';

interface SettingsProps {
  musicVolume: number;
  sfxVolume: number;
  onChangeMusicVolume: (volume: number) => void;
  onChangeSfxVolume: (volume: number) => void;
}
export const Settings = ({
  musicVolume,
  sfxVolume,
  onChangeMusicVolume,
  onChangeSfxVolume,
}: SettingsProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-start gap-2 select-none md:gap-4">
      <Header value="Settings" />
      <div className="flex w-full max-w-[320px] flex-col items-center gap-5 rounded-2xl border border-white/5 bg-black/20 p-4 shadow-2xl backdrop-blur-sm sm:max-w-80 md:max-w-115 md:gap-8 md:p-6 lg:max-w-125 lg:gap-10">
        <form className="flex w-full flex-col gap-2 md:gap-5">
          <label className="flex flex-col gap-1 text-lg font-medium text-white md:text-xl lg:text-3xl">
            <div className="flex w-full flex-row justify-between px-1">
              <span>Music Volume</span>
              <span className="font-bold text-sky-400">{musicVolume}%</span>
            </div>
            <Range
              min={0}
              max={100}
              defaultValue={musicVolume}
              onChange={(value) => onChangeMusicVolume(value)}
            />
          </label>
          <label className="flex flex-col gap-1 text-lg font-medium text-white md:text-xl lg:text-3xl">
            <div className="flex w-full flex-row justify-between px-1">
              <span> SFX sound volume</span>
              <span className="font-bold text-sky-400">{sfxVolume}%</span>
            </div>
            <Range
              min={0}
              max={100}
              defaultValue={sfxVolume}
              onChange={(value) => onChangeSfxVolume(value)}
            />
          </label>
        </form>
      </div>
    </div>
  );
};
