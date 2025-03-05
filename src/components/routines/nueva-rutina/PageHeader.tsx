
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { StepIndicator } from "./StepIndicator";

interface PageHeaderProps {
  currentStep: number;
  onPrevStep: () => void;
}

export const PageHeader = ({ currentStep, onPrevStep }: PageHeaderProps) => {
  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return "Crear nueva rutina";
      case 2: return "Seleccionar protocolos";
      case 3: return "Personalizar rutina";
      default: return "Nueva rutina";
    }
  };

  return (
    <div className="px-4 py-4 border-b border-[#1A1F2C]/20 backdrop-blur-sm sticky top-0 z-10 bg-[#1A1F2C]/10">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onPrevStep}
          className="text-white mr-2"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold font-oswald text-white">
          {getStepTitle(currentStep)}
        </h1>
      </div>
      <StepIndicator currentStep={currentStep} totalSteps={3} />
    </div>
  );
};
