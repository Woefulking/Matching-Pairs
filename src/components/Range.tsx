import { useState } from 'react';

interface RangeProps {
  min: number;
  max: number;
  defaultValue: number;
  onChange: (value: number) => void;
}

export const Range = ({ min, max, defaultValue, onChange }: RangeProps) => {
  const [value, setValue] = useState<number>(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    if (onChange) onChange(newValue);
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        style={{
          background: `linear-gradient(to right, #38bdf8 ${percentage}%, #0f172a ${percentage}%)`,
        }}
        className={`pixelated h-2 w-full cursor-pointer appearance-none rounded-lg outline-none [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-[url(./src/assets/general/circle.png)] [&::-moz-range-thumb]:bg-contain [&::-moz-range-thumb]:bg-center [&::-moz-range-thumb]:bg-no-repeat [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:duration-100 hover:[&::-moz-range-thumb]:scale-110 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-[url(./src/assets/general/circle.png)] [&::-webkit-slider-thumb]:bg-contain [&::-webkit-slider-thumb]:bg-center [&::-webkit-slider-thumb]:bg-no-repeat [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-100 hover:[&::-webkit-slider-thumb]:scale-110`}
      />
    </div>
  );
};
