
import { Progress } from "@/components/ui/progress";

interface ModuleProgressProps {
  stageStatuses: {
    trabajo: "completed" | "in-progress" | "pending";
    entrenamiento: "completed" | "in-progress" | "pending";
    evaluation: "completed" | "in-progress" | "pending";
    feedback: "completed" | "in-progress" | "pending";
  };
}

export const ModuleProgress = ({ stageStatuses }: ModuleProgressProps) => {
  const completedStages = Object.values(stageStatuses).filter(s => s === 'completed').length;
  const inProgressStages = Object.values(stageStatuses).filter(s => s === 'in-progress').length;
  
  return (
    <div className="mb-2">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400 font-lato">Progreso de hoy</span>
        <span className="text-sm font-medium text-[#02b1bb]">
          {completedStages}/4 completadas
        </span>
      </div>
      <Progress 
        value={completedStages * 25} 
        className="h-2.5 bg-[#252A3C] rounded-full overflow-hidden"
        indicatorClassName="bg-gradient-to-r from-[#0EA5E9] to-[#02b1bb]"
      />
      <div className="flex justify-between mt-2">
        <span className="text-xs text-gray-500 font-lato">Inicio</span>
        <span className="text-xs text-gray-500 font-lato">Completado</span>
      </div>
    </div>
  );
};
