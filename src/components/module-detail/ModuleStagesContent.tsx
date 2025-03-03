
import { Button } from "@/components/ui/button";
import { ArrowLeft, ClipboardList, Dumbbell, PenTool, MessageSquare } from "lucide-react";
import { WorkDay } from "@/types/module";
import { ModuleStage } from "@/components/module/ModuleStage";
import { TrabajoStageContent } from "./TrabajoStageContent";
import { EntrenamientoStageContent } from "./EntrenamientoStageContent";
import { EvaluationStageContent } from "./EvaluationStageContent";
import { FeedbackStageContent } from "./FeedbackStageContent";
import { ModuleProgress } from "./ModuleProgress";

interface ModuleStagesContentProps {
  selectedDay: number;
  workDay: WorkDay;
  stageStatuses: {
    trabajo: "completed" | "in-progress" | "pending";
    entrenamiento: "completed" | "in-progress" | "pending";
    evaluation: "completed" | "in-progress" | "pending";
    feedback: "completed" | "in-progress" | "pending";
  };
  activeStage: string | null;
  handleBackFromStages: () => void;
  handleStageChange: (stage: string) => void;
  
  // Trabajo stage props
  trabajoStageProps: {
    showTrabajoVideo: boolean;
    messages: Array<{ text: string; isBot: boolean }>;
    isLoading: boolean;
    audioCompleted: boolean;
    messagesEndRef: React.RefObject<HTMLDivElement>;
    trabajoVideoSlides: Array<{
      src: string;
      thumbnail: string;
      title: string;
      likes: number;
    }>;
    handleOpenTrabajoVideo: () => void;
    handleCloseTrabajoVideo: () => void;
    handleSendMessage: (text: string) => Promise<void>;
  };
  
  // Entrenamiento stage props
  entrenamientoStageProps: {
    trainingProgress: number;
    exerciseComplete: boolean;
    startTrainingExercise: () => void;
    goToEnergyMapProtocol: (id?: string, moduleId?: string) => void;
  };
  
  // Evaluation and Feedback props
  setShowTest: (show: boolean) => void;
  setShowFeedback: (show: boolean) => void;
}

export const ModuleStagesContent = ({
  selectedDay,
  workDay,
  stageStatuses,
  activeStage,
  handleBackFromStages,
  handleStageChange,
  trabajoStageProps,
  entrenamientoStageProps,
  setShowTest,
  setShowFeedback
}: ModuleStagesContentProps) => {
  return (
    <div className="space-y-4 mb-24">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={handleBackFromStages}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver al módulo
      </Button>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Día {selectedDay}: {workDay.title}
        </h2>
        <p className="text-gray-400">
          {workDay.description}
        </p>
      </div>

      <ModuleProgress stageStatuses={stageStatuses} />
      
      <ModuleStage
        title="Sesión de trabajo"
        icon={<ClipboardList className="w-6 h-6" />}
        description="Identifica y analiza tus momentos de máxima energía y flujo."
        steps={[
          "Registro de actividades energizantes",
          "Análisis de patrones de flujo",
          "Sesión de Q&A sobre el tema"
        ]}
        isActive={activeStage === 'trabajo'}
        stageKey="trabajo"
        status={stageStatuses.trabajo}
        onSelect={() => handleStageChange('trabajo')}
      >
        <TrabajoStageContent {...trabajoStageProps} />
      </ModuleStage>

      <ModuleStage
        title="Entrenamiento"
        icon={<Dumbbell className="w-6 h-6" />}
        description="Practica técnicas para entrar en estado de flujo más frecuentemente."
        steps={[
          "Ejercicios de entrada al estado de flujo",
          "Registro de experiencias",
          "Seguimiento de progreso"
        ]}
        isActive={activeStage === 'entrenamiento'}
        stageKey="entrenamiento"
        status={stageStatuses.entrenamiento}
        onSelect={() => handleStageChange('entrenamiento')}
      >
        <EntrenamientoStageContent {...entrenamientoStageProps} />
      </ModuleStage>

      <ModuleStage
        title="Evaluación"
        icon={<PenTool className="w-6 h-6" />}
        description="Evalúa tu comprensión del estado de flujo y cómo se manifiesta en tu vida."
        steps={[
          "Test de comprensión",
          "Registro de actividades energizantes",
          "Identificación de patrones de flujo"
        ]}
        isActive={activeStage === 'evaluation'}
        stageKey="evaluation"
        status={stageStatuses.evaluation}
        onSelect={() => handleStageChange('evaluation')}
      >
        <EvaluationStageContent setShowTest={setShowTest} />
      </ModuleStage>

      <ModuleStage
        title="Feedback"
        icon={<MessageSquare className="w-6 h-6" />}
        description="Evalúa tu comprensión y experiencia con el estado de flujo."
        steps={[
          "Test de comprensión",
          "Registro de insights",
          "Plan de acción futuro"
        ]}
        isActive={activeStage === 'feedback'}
        stageKey="feedback"
        status={stageStatuses.feedback}
        onSelect={() => handleStageChange('feedback')}
      >
        <FeedbackStageContent setShowFeedback={setShowFeedback} />
      </ModuleStage>
    </div>
  );
};
