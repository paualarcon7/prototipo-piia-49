
import { WorkDay } from "@/types/module";
import { WorkDayCard } from "./WorkDayCard";
import { Progress } from "@/components/ui/progress";

interface WorkDayListProps {
  workDays: WorkDay[];
  onDaySelect: (day: number) => void;
}

export const WorkDayList = ({ workDays, onDaySelect }: WorkDayListProps) => {
  const completedDays = workDays.filter(day => day.status === 'completed').length;
  const progress = (completedDays / workDays.length) * 100;

  return (
    <div className="space-y-4 mb-24">
      <div className="bg-secondary/50 backdrop-blur-sm rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Plan de Trabajo</h2>
        <p className="text-gray-400 mb-6">
          Tu viaje está estructurado en 5 días de trabajo. Cada día está diseñado 
          para ayudarte a profundizar en diferentes aspectos del estado de flow.
        </p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Progreso del módulo</span>
            <span>{completedDays} de {workDays.length} días completados</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>
      
      {workDays.map((day) => (
        <WorkDayCard
          key={day.day}
          {...day}
          isActive={day.status === 'current'}
          onSelect={() => onDaySelect(day.day)}
        />
      ))}
    </div>
  );
};
