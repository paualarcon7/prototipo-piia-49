
import { WeekDay } from "@/types/rutina";

interface DaySelectorProps {
  selectedDays: WeekDay[];
  onToggle: (day: WeekDay) => void;
}

export const DaySelector = ({ selectedDays, onToggle }: DaySelectorProps) => {
  const days: { label: string, value: WeekDay }[] = [
    { label: "L", value: "L" },
    { label: "M", value: "M" },
    { label: "X", value: "X" },
    { label: "J", value: "J" },
    { label: "V", value: "V" },
    { label: "S", value: "S" },
    { label: "D", value: "D" }
  ];

  return (
    <div className="flex justify-between">
      {days.map(day => (
        <button
          key={day.value}
          type="button"
          onClick={() => onToggle(day.value)}
          className={`
            w-10 h-10 rounded-full flex items-center justify-center
            transition-colors duration-200
            ${selectedDays.includes(day.value) 
              ? 'bg-[#FF4081] text-white' 
              : 'bg-secondary/50 text-gray-400 border border-secondary/30'}
          `}
        >
          {day.label}
        </button>
      ))}
    </div>
  );
};
