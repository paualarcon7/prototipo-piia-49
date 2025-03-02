
import { Button } from "@/components/ui/button";

interface EvaluationStageContentProps {
  setShowTest: (show: boolean) => void;
}

export const EvaluationStageContent = ({
  setShowTest
}: EvaluationStageContentProps) => {
  return (
    <div className="p-2 text-center">
      <p className="text-gray-400 mb-4">Completa el cuestionario para evaluar tu comprensión.</p>
      <Button onClick={() => setShowTest(true)}>
        Iniciar evaluación
      </Button>
    </div>
  );
};
