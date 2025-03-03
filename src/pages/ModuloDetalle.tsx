import { useParams } from "react-router-dom";
import { useState } from "react";
import { evaluationQuestions, feedbackQuestions } from "@/constants/moduleQuestions";
import { workDays } from "@/constants/workDays";
import { useModuleStages } from "@/hooks/useModuleStages";
import { useTrabajoStage } from "@/hooks/useTrabajoStage";
import { useEntrenamientoStage } from "@/hooks/useEntrenamientoStage";
import { useModuleVideo } from "@/hooks/useModuleVideo";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { ModuleStagesContent } from "@/components/module-detail/ModuleStagesContent";
import { TestSection } from "@/components/module-detail/TestSection";
import { DaySelectionSection } from "@/components/module-detail/DaySelectionSection";

const ModuloDetalle = () => {
  const { id, moduleId } = useParams();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Custom hooks
  const { 
    stageStatuses, 
    showTest, 
    showFeedback, 
    activeStage,
    setActiveStage,
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
    startTrainingExercise,
    goToEnergyMapProtocol
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

  // Modify the handleStageChange function in the useModuleStages hook to prevent automatic test/feedback
  const handleStageSelection = (value: string) => {
    setActiveStage(value);
    
    if (value && stageStatuses[value as keyof typeof stageStatuses] === 'pending') {
      setStageStatus(value as keyof typeof stageStatuses, 'in-progress');
    }
    
    // Remove automatic test/feedback triggering
    // The buttons inside each section will be responsible for opening the forms
  };

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
        <TestSection
          questions={evaluationQuestions}
          onComplete={handleTestComplete}
          onBack={() => {
            setShowTest(false);
          }}
        />
      ) : showFeedback ? (
        <TestSection
          questions={feedbackQuestions}
          onComplete={handleFeedbackComplete}
          onBack={() => {
            setShowFeedback(false);
          }}
        />
      ) : (
        <>
          {selectedDay === null ? (
            <DaySelectionSection
              id={id}
              workDays={workDays}
              showFullScreenVideo={showFullScreenVideo}
              videoSlides={videoSlides}
              handleOpenFullScreenVideo={handleOpenFullScreenVideo}
              handleCloseFullScreenVideo={handleCloseFullScreenVideo}
              onDaySelect={handleDaySelect}
            />
          ) : currentWorkDay && (
            <ModuleStagesContent
              selectedDay={selectedDay}
              workDay={currentWorkDay}
              stageStatuses={stageStatuses}
              activeStage={activeStage}
              handleBackFromStages={handleBackFromStages}
              handleStageChange={handleStageSelection}
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
                startTrainingExercise,
                goToEnergyMapProtocol
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
