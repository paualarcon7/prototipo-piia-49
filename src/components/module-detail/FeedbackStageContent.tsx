
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface FeedbackStageContentProps {
  setShowFeedback: (show: boolean) => void;
}

export const FeedbackStageContent = ({
  setShowFeedback
}: FeedbackStageContentProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-secondary/70 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Comparte tu Experiencia</h2>
        
        <p className="text-gray-300 mb-6">
          Comparte tu experiencia y aprendizajes sobre el estado de flujo.
          Tu retroalimentación nos ayuda a mejorar y adaptar el contenido a tus necesidades.
        </p>

        <div className="flex flex-col items-center">
          <Button 
            className="bg-[#02b1bb] hover:bg-[#02b1bb]/90 text-white w-full max-w-xs"
            onClick={() => setShowFeedback(true)}
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Dar feedback
          </Button>
        </div>
      </div>
    </div>
  );
};
