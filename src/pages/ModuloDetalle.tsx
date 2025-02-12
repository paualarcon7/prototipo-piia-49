
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import TestQuestion from "@/components/TestQuestion";
import { useToast } from "@/hooks/use-toast";
import { ModuleStage } from "@/components/module/ModuleStage";
import { ModuleHeader } from "@/components/module/ModuleHeader";
import { stages } from "@/constants/moduleStages";
import { evaluationQuestions, feedbackQuestions } from "@/constants/moduleQuestions";

const ModuloDetalle = () => {
  const { id, moduleId } = useParams();
  const navigate = useNavigate();
  const [activeStage, setActiveStage] = useState(0);
  const [showTest, setShowTest] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const { toast } = useToast();

  const handleTestComplete = (results: Record<number, string>) => {
    console.log("Test results:", results);
    toast({
      title: "Evaluación completada",
      description: "Tus respuestas han sido guardadas exitosamente.",
    });
    setShowTest(false);
  };

  const handleFeedbackComplete = (results: Record<number, string>) => {
    console.log("Feedback results:", results);
    toast({
      title: "Feedback enviado",
      description: "¡Gracias por compartir tu experiencia!",
    });
    setShowFeedback(false);
  };

  const handleStageClick = (index: number) => {
    setActiveStage(index);
    if (index === 3) {
      setShowTest(true);
    } else if (index === 4) {
      setShowFeedback(true);
    } else if (index === 0) {
      navigate(`/programa/${id}/modulo/${moduleId}/inicio`);
    } else if (index === 1) {
      navigate(`/programa/${id}/modulo/${moduleId}/trabajo`);
    } else if (index === 2) {
      navigate(`/programa/${id}/modulo/${moduleId}/entrenamiento`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 pb-32">
      {showTest ? (
        <TestQuestion
          questions={evaluationQuestions}
          onComplete={handleTestComplete}
          onBack={() => setShowTest(false)}
        />
      ) : showFeedback ? (
        <TestQuestion
          questions={feedbackQuestions}
          onComplete={handleFeedbackComplete}
          onBack={() => setShowFeedback(false)}
        />
      ) : (
        <>
          <ModuleHeader 
            onBack={() => navigate(`/programa/${id}`)} 
          />
          <div className="space-y-4 mb-24">
            {stages.map((stage, index) => (
              <ModuleStage
                key={index}
                {...stage}
                isActive={activeStage === index}
                onSelect={() => handleStageClick(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ModuloDetalle;
