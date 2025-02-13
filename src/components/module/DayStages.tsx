
import { Stage, WorkDay } from "@/types/module";
import { ModuleStage } from "./ModuleStage";

interface DayStagesProps {
  selectedDay: number;
  workDay: WorkDay;
  stages: Stage[];
  activeStage: number;
  onStageClick: (index: number) => void;
}

export const DayStages = ({ 
  selectedDay, 
  workDay, 
  stages, 
  activeStage, 
  onStageClick 
}: DayStagesProps) => (
  <div className="space-y-4 mb-24">
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">
        Día {selectedDay}: {workDay.title}
      </h2>
      <p className="text-gray-400">
        {workDay.description}
      </p>
    </div>
    
    {stages.map((stage, index) => (
      <ModuleStage
        key={index}
        {...stage}
        isActive={activeStage === index}
        onSelect={() => onStageClick(index)}
      />
    ))}
  </div>
);
