interface SplashScreenProps {
  onChangeScreen: () => void;
}
export const SplashScreen = ({ onChangeScreen }: SplashScreenProps) => {
  return (
    <div
      onClick={onChangeScreen}
      className="flex h-full w-full flex-col items-center justify-center bg-transparent outline-none select-none"
    >
      <h1 className="animate-pulse text-3xl font-black tracking-wider text-sky-400 uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] md:text-4xl portrait:hidden">
        Click to Start
      </h1>
      <div className="animate-fade-in hidden flex-col items-center gap-2 rounded-xl border border-red-500/20 bg-black/40 p-4 text-center backdrop-blur-sm portrait:flex">
        <p className="text-md font-bold tracking-wide text-red-400 uppercase md:text-base">
          Landscape Mode Required
        </p>
        <p className="text-md max-w-60 font-medium text-slate-300 md:text-sm">
          Please rotate your device horizontally
        </p>
      </div>
    </div>
  );
};
