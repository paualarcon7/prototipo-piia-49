
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import TestQuestion from "@/components/TestQuestion";
import { useToast } from "@/hooks/use-toast";
import { ModuleHeader } from "@/components/module/ModuleHeader";
import { WorkDayList } from "@/components/module/WorkDayList";
import { DayStages } from "@/components/module/DayStages";
import { stages } from "@/constants/moduleStages";
import { workDays } from "@/constants/workDays";
import { evaluationQuestions, feedbackQuestions } from "@/constants/moduleQuestions";
import { ModuleVideoPreview } from "@/components/module/ModuleVideoPreview";
import { ModuleVideoCarousel } from "@/components/module/ModuleVideoCarousel";

const ModuloDetalle = () => {
  const { id, moduleId } = useParams();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [showTest, setShowTest] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showFullScreenVideo, setShowFullScreenVideo] = useState(false);
  const { toast } = useToast();

  // Video slides con el mismo video repetido 3 veces (el tercer video)
  const demoVideo = "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4";
  const videoSlides = [
    {
      src: demoVideo,
      thumbnail: "/placeholder-thumbnail-3.jpg",
      title: "Demo Video 1",
      likes: 1800000,
    },
    {
      src: demoVideo,
      thumbnail: "/placeholder-thumbnail-3.jpg",
      title: "Demo Video 2",
      likes: 1900000,
    },
    {
      src: demoVideo,
      thumbnail: "/placeholder-thumbnail-3.jpg",
      title: "Demo Video 3",
      likes: 2000000,
    },
  ];

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

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
  };

  const handleBackFromStages = () => {
    setSelectedDay(null);
    setActiveStage(0);
  };

  const handleOpenFullScreenVideo = () => {
    setShowFullScreenVideo(true);
  };

  const handleCloseFullScreenVideo = () => {
    setShowFullScreenVideo(false);
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
          {selectedDay === null && (
            <>
              <ModuleHeader 
                onBack={() => navigate(`/programa/${id}`)}
                videoSlides={videoSlides}
              />
              {!showFullScreenVideo && (
                <ModuleVideoPreview 
                  videoSlides={videoSlides} 
                  onPlayClick={handleOpenFullScreenVideo}
                />
              )}
              {showFullScreenVideo && (
                <div className="fixed inset-0 z-50 bg-black">
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="relative w-full max-w-md h-full">
                      <ModuleVideoCarousel 
                        slides={videoSlides} 
                        onClose={handleCloseFullScreenVideo}
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          
          {selectedDay === null ? (
            <WorkDayList 
              workDays={workDays} 
              onDaySelect={handleDaySelect} 
            />
          ) : (
            <DayStages
              selectedDay={selectedDay}
              workDay={workDays[selectedDay - 1]}
              stages={stages}
              activeStage={activeStage}
              onStageClick={handleStageClick}
              onBack={handleBackFromStages}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ModuloDetalle;
