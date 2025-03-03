
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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

// Helper function to convert title to URL friendly slug
const toSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

const ModuloDetalle = () => {
  const { 
    id, 
    moduleId, 
    programSlug, 
    moduleSlug, 
    dayNumber, 
    dayTitle 
  } = useParams();
  
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Set selected day from URL params if available
  useEffect(() => {
    if (dayNumber) {
      const dayNum = parseInt(dayNumber, 10);
      if (!isNaN(dayNum) && dayNum > 0 && dayNum <= workDays.length) {
        setSelectedDay(dayNum);
      }
    }
  }, [dayNumber]);

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

  // Event handlers
  const handleDaySelect = (day: number) => {
    const selectedWorkDay = workDays[day - 1];
    const dayTitleSlug = toSlug(selectedWorkDay.title);
    
    // Use new URL format
    const programId = programSlug || id;
    const modId = moduleSlug || moduleId;
    
    // Navigate to the new URL format
    navigate(`/programa/${programId}/modulo/${modId}/dia/${day}-${dayTitleSlug}`);
    
    setSelectedDay(day);
    setActiveStage('trabajo');
    setStageStatus('trabajo', 'in-progress');
  };

  const handleBackFromStages = () => {
    // Navigate back to module page without day parameter
    const programId = programSlug || id;
    const modId = moduleSlug || moduleId;
    navigate(`/programa/${programId}/modulo/${modId}`);
    
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
            setActiveStage(null);
          }}
        />
      ) : showFeedback ? (
        <TestSection
          questions={feedbackQuestions}
          onComplete={handleFeedbackComplete}
          onBack={() => {
            setShowFeedback(false);
            setActiveStage(null);
          }}
        />
      ) : (
        <>
          {selectedDay === null ? (
            <DaySelectionSection
              id={id || programSlug}
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
              handleStageChange={handleStageChange}
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
