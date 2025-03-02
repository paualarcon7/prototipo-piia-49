
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
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">Progreso de hoy</span>
        <span className="text-sm font-medium">
          {completedStages}/4
        </span>
      </div>
      <Progress 
        value={completedStages * 25} 
        className="h-2 bg-gray-800"
      />
    </div>
  );
};
