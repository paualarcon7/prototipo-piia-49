
import { Stage } from "@/types/module";

interface ModuleStageProps extends Stage {
  isActive: boolean;
  onSelect: () => void;
}

export const ModuleStage = ({ 
  title, 
  icon, 
  description, 
  steps, 
  isActive, 
  onSelect 
}: ModuleStageProps) => (
  <div
    className={`p-4 rounded-lg cursor-pointer transition-all ${
      isActive ? "bg-secondary" : "bg-secondary/50 hover:bg-secondary/70"
    }`}
    onClick={onSelect}
  >
    <div className="flex items-center gap-3 mb-2">
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <p className="text-sm text-gray-400 mb-2">{description}</p>
    {isActive && (
      <div className="mt-4 space-y-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-sm text-gray-300"
          >
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            {step}
          </div>
        ))}
      </div>
    )}
  </div>
);
