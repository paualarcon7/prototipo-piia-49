
import { Button } from "@/components/ui/button";
import { ChevronRight, Check } from "lucide-react";

interface BottomNavProps {
  currentStep: number;
  totalSteps: number;
  onNextStep: () => void;
}

export const BottomNav = ({ currentStep, totalSteps, onNextStep }: BottomNavProps) => {
  return (
    <div className="fixed bottom-16 inset-x-0 p-4 bg-[#1A1F2C]/50 backdrop-blur-sm border-t border-[#1A1F2C]/20">
      <Button 
        onClick={onNextStep}
        className="w-full bg-[#02b1bb] hover:bg-[#02b1bb]/80"
      >
        {currentStep < totalSteps ? (
          <>
            Siguiente <ChevronRight className="ml-2 h-4 w-4" />
          </>
        ) : (
          <>
            Guardar rutina <Check className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};
