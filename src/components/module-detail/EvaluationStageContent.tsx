
import { Button } from "@/components/ui/button";
import { PenTool } from "lucide-react";

interface EvaluationStageContentProps {
  setShowTest: (show: boolean) => void;
}

export const EvaluationStageContent = ({
  setShowTest
}: EvaluationStageContentProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-secondary/70 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Evaluación de Conocimientos</h2>
        
        <p className="text-gray-300 mb-6">
          Esta evaluación te ayudará a medir tu comprensión sobre el estado de flow
          y cómo aplicarlo en tu vida diaria para maximizar tu rendimiento y bienestar.
        </p>

        <div className="flex flex-col items-center">
          <Button 
            className="bg-[#02b1bb] hover:bg-[#02b1bb]/90 text-white w-full max-w-xs"
            onClick={() => setShowTest(true)}
          >
            <PenTool className="mr-2 h-5 w-5" />
            Iniciar evaluación
          </Button>
        </div>
      </div>
    </div>
  );
};
