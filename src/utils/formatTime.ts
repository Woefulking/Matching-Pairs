export const formatTime = (timeLeft: number) => {
  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};
