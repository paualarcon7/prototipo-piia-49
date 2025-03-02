
import { Button } from "@/components/ui/button";

interface FeedbackStageContentProps {
  setShowFeedback: (show: boolean) => void;
}

export const FeedbackStageContent = ({
  setShowFeedback
}: FeedbackStageContentProps) => {
  return (
    <div className="p-2 text-center">
      <p className="text-gray-400 mb-4">Comparte tu experiencia y aprendizajes sobre el estado de flujo.</p>
      <Button onClick={() => setShowFeedback(true)}>
        Dar feedback
      </Button>
    </div>
  );
};
