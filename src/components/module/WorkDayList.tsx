
import { WorkDay } from "@/types/module";
import { WorkDayCard } from "./WorkDayCard";

interface WorkDayListProps {
  workDays: WorkDay[];
  onDaySelect: (day: number) => void;
}

export const WorkDayList = ({ workDays, onDaySelect }: WorkDayListProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {workDays.map((workDay, index) => (
      <WorkDayCard
        key={index}
        {...workDay}
        isActive={workDay.status === 'current'}
        onSelect={() => onDaySelect(workDay.day)}
      />
    ))}
  </div>
);
