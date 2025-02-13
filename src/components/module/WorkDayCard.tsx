
import { WorkDay } from "@/types/module";

interface WorkDayCardProps extends WorkDay {
  isActive: boolean;
  onSelect: () => void;
}

export const WorkDayCard = ({
  day,
  title,
  description,
  color,
  isActive,
  onSelect
}: WorkDayCardProps) => (
  <div
    onClick={onSelect}
    className={`p-6 rounded-lg cursor-pointer transition-all ${
      isActive
        ? `bg-${color}-500/20 border border-${color}-500/50`
        : `bg-secondary/50 hover:bg-${color}-500/10`
    }`}
  >
    <div className="flex items-center gap-2 mb-2">
      <span className={`text-${color}-400 text-sm font-medium`}>
        Día {day}
      </span>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <p className="text-sm text-gray-400">{description}</p>
  </div>
);
