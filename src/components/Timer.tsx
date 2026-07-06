import { formatTime } from '../utils/formatTime';

interface TimerProps {
  timeLeft: number;
}
export const Timer = ({ timeLeft }: TimerProps) => {
  return <span className="text-[56px]">{formatTime(timeLeft)}</span>;
};
