
import { WorkDay } from "@/types/module";
import { Lock, CheckCircle } from "lucide-react";

interface WorkDayCardProps extends WorkDay {
  isActive: boolean;
  onSelect: () => void;
}

export const WorkDayCard = ({
  day,
  title,
  description,
  color,
  status,
  isActive,
  onSelect
}: WorkDayCardProps) => (
  <div
    onClick={() => status !== 'locked' && onSelect()}
    className={`p-6 rounded-lg transition-all ${
      status === 'locked' 
        ? 'bg-secondary/30 cursor-not-allowed opacity-75'
        : status === 'completed'
        ? `bg-${color}-500/20 border border-${color}-500/50 cursor-pointer`
        : `bg-secondary/50 hover:bg-secondary/70 cursor-pointer`
    }`}
  >
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <span className={`text-${color}-400 text-sm font-medium`}>
          Día {day}
        </span>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      {status === 'locked' ? (
        <Lock className="w-5 h-5 text-gray-400" />
      ) : status === 'completed' ? (
        <CheckCircle className="w-5 h-5 text-green-500" />
      ) : null}
    </div>
    <p className="text-sm text-gray-400">{description}</p>
  </div>
);
