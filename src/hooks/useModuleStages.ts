
import { useState } from 'react';
import { useToast } from './use-toast';

export const useModuleStages = () => {
  const { toast } = useToast();
  const [stageStatuses, setStageStatuses] = useState({
    trabajo: "pending" as "completed" | "in-progress" | "pending",
    entrenamiento: "pending" as "completed" | "in-progress" | "pending",
    evaluation: "pending" as "completed" | "in-progress" | "pending",
    feedback: "pending" as "completed" | "in-progress" | "pending"
  });

  const [showTest, setShowTest] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [activeStage, setActiveStage] = useState<string | null>(null);

  const setStageStatus = (stage: keyof typeof stageStatuses, status: "completed" | "in-progress" | "pending") => {
    setStageStatuses(prev => ({
      ...prev,
      [stage]: status
    }));
  };

  const handleStageChange = (value: string) => {
    setActiveStage(value);
    
    if (value && stageStatuses[value as keyof typeof stageStatuses] === 'pending') {
      setStageStatus(value as keyof typeof stageStatuses, 'in-progress');
    }

    if (value === 'evaluation') {
      setShowTest(true);
    } else if (value === 'feedback') {
      setShowFeedback(true);
    } else {
      setShowTest(false);
      setShowFeedback(false);
    }
  };

  const handleTestComplete = (results: Record<number, string>) => {
    console.log("Test results:", results);
    toast({
      title: "Evaluación completada",
      description: "Tus respuestas han sido guardadas exitosamente.",
    });
    setShowTest(false);
    setStageStatus("evaluation", "completed");
  };

  const handleFeedbackComplete = (results: Record<number, string>) => {
    console.log("Feedback results:", results);
    toast({
      title: "Feedback enviado",
      description: "¡Gracias por compartir tu experiencia!",
    });
    setShowFeedback(false);
    setStageStatus("feedback", "completed");
  };

  return {
    stageStatuses,
    showTest,
    showFeedback,
    activeStage,
    setStageStatus,
    handleStageChange,
    handleTestComplete,
    handleFeedbackComplete,
    setShowTest,
    setShowFeedback
  };
};
