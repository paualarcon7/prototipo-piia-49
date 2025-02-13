
import { WorkDay } from "@/types/module";
import { WorkDayCard } from "./WorkDayCard";

interface WorkDayListProps {
  workDays: WorkDay[];
  onDaySelect: (day: number) => void;
}

export const WorkDayList = ({ workDays, onDaySelect }: WorkDayListProps) => (
  <div className="space-y-4 mb-24">
    <div className="bg-secondary/50 backdrop-blur-sm rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Plan de Trabajo</h2>
      <p className="text-gray-400 mb-6">
        Tu viaje está estructurado en 5 días de trabajo. Cada día está diseñado 
        para ayudarte a profundizar en diferentes aspectos del estado de flow.
      </p>
    </div>
    
    {workDays.map((day) => (
      <WorkDayCard
        key={day.day}
        {...day}
        isActive={false}
        onSelect={() => onDaySelect(day.day)}
      />
    ))}
  </div>
);
