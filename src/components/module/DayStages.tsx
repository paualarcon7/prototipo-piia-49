
import { Stage, WorkDay } from "@/types/module";
import { ModuleStage } from "./ModuleStage";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface DayStagesProps {
  selectedDay: number;
  workDay: WorkDay;
  stages: Stage[];
  activeStage: number;
  onStageClick: (index: number) => void;
  onBack?: () => void;
}

export const DayStages = ({ 
  selectedDay, 
  workDay, 
  stages, 
  activeStage, 
  onStageClick,
  onBack
}: DayStagesProps) => (
  <div className="space-y-4 mb-24">
    <Button
      variant="ghost"
      className="mb-4"
      onClick={onBack}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Volver al módulo
    </Button>
    
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
