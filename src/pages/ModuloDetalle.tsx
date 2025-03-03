
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import TestQuestion from "@/components/TestQuestion";
import { evaluationQuestions, feedbackQuestions } from "@/constants/moduleQuestions";
import { workDays } from "@/constants/workDays";
import { ClipboardList, Dumbbell, PenTool, MessageSquare } from "lucide-react";
import { WorkDayList } from "@/components/module/WorkDayList";
import { useModuleStages } from "@/hooks/useModuleStages";
import { useTrabajoStage } from "@/hooks/useTrabajoStage";
import { useEntrenamientoStage } from "@/hooks/useEntrenamientoStage";
import { useModuleVideo } from "@/hooks/useModuleVideo";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { ModuleVideoSection } from "@/components/module-detail/ModuleVideoSection";
import { ModuleStagesContent } from "@/components/module-detail/ModuleStagesContent";

const ModuloDetalle = () => {
  const { id, moduleId } = useParams();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Custom hooks
  const { 
    stageStatuses, 
    showTest, 
    showFeedback, 
    activeStage,
    setActiveStage, // Important: Make sure to extract this function
    setStageStatus,
    handleStageChange,
    handleTestComplete,
    handleFeedbackComplete,
    setShowTest,
    setShowFeedback
  } = useModuleStages();

  const {
    showTrabajoVideo,
    messages,
    isLoading,
    audioCompleted,
    messagesEndRef,
    trabajoVideoSlides,
    handleOpenTrabajoVideo,
    handleCloseTrabajoVideo,
    handleSendMessage
  } = useTrabajoStage(setStageStatus);

  const {
    trainingProgress,
    exerciseComplete,
    startTrainingExercise
  } = useEntrenamientoStage(setStageStatus);

  const {
    showFullScreenVideo,
    videoSlides,
    handleOpenFullScreenVideo,
    handleCloseFullScreenVideo
  } = useModuleVideo();

  const {
    resetAudioPlayer
  } = useAudioPlayer();

  // Event handlers
  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
    setActiveStage('trabajo');
    setStageStatus('trabajo', 'in-progress');
  };

  const handleBackFromStages = () => {
    setSelectedDay(null);
    setActiveStage(null);
    resetAudioPlayer();
  };

  // Selected work day
  const currentWorkDay = selectedDay !== null ? workDays[selectedDay - 1] : null;

  return (
    <div className="container mx-auto px-4 py-6 pb-32">
      {showTest ? (
        <TestQuestion
          questions={evaluationQuestions}
          onComplete={handleTestComplete}
          onBack={() => {
            setShowTest(false);
            setActiveStage(null);
          }}
        />
      ) : showFeedback ? (
        <TestQuestion
          questions={feedbackQuestions}
          onComplete={handleFeedbackComplete}
          onBack={() => {
            setShowFeedback(false);
            setActiveStage(null);
          }}
        />
      ) : (
        <>
          {selectedDay === null && (
            <ModuleVideoSection
              id={id}
              showFullScreenVideo={showFullScreenVideo}
              videoSlides={videoSlides}
              handleOpenFullScreenVideo={handleOpenFullScreenVideo}
              handleCloseFullScreenVideo={handleCloseFullScreenVideo}
            />
          )}
          
          {selectedDay === null ? (
            <WorkDayList 
              workDays={workDays} 
              onDaySelect={handleDaySelect} 
            />
          ) : currentWorkDay && (
            <ModuleStagesContent
              selectedDay={selectedDay}
              workDay={currentWorkDay}
              stageStatuses={stageStatuses}
              activeStage={activeStage}
              handleBackFromStages={handleBackFromStages}
              trabajoStageProps={{
                showTrabajoVideo,
                messages,
                isLoading,
                audioCompleted,
                messagesEndRef,
                trabajoVideoSlides,
                handleOpenTrabajoVideo,
                handleCloseTrabajoVideo,
                handleSendMessage
              }}
              entrenamientoStageProps={{
                trainingProgress,
                exerciseComplete,
                startTrainingExercise
              }}
              setShowTest={setShowTest}
              setShowFeedback={setShowFeedback}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ModuloDetalle;
