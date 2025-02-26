
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import TestQuestion from "@/components/TestQuestion";
import { useToast } from "@/hooks/use-toast";
import { ModuleHeader } from "@/components/module/ModuleHeader";
import { WorkDayList } from "@/components/module/WorkDayList";
import { DayStages } from "@/components/module/DayStages";
import { ModuleVideoCarousel } from "@/components/module/ModuleVideoCarousel";
import { stages } from "@/constants/moduleStages";
import { workDays } from "@/constants/workDays";
import { evaluationQuestions, feedbackQuestions } from "@/constants/moduleQuestions";

const ModuloDetalle = () => {
  const { id, moduleId } = useParams();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [showTest, setShowTest] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const { toast } = useToast();

  // Example video slides - replace with actual video content
  const videoSlides = [
    {
      src: "/placeholder-video-1.mp4",
      thumbnail: "/placeholder-thumbnail-1.jpg",
      title: "Objetivos del Módulo",
    },
    {
      src: "/placeholder-video-2.mp4",
      thumbnail: "/placeholder-thumbnail-2.jpg",
      title: "Estructura del Módulo",
    },
    {
      src: "/placeholder-video-3.mp4",
      thumbnail: "/placeholder-thumbnail-3.jpg",
      title: "Resultados Esperados",
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
            onBack={() => {
              if (selectedDay !== null) {
                handleBackFromStages();
              } else {
                navigate(`/programa/${id}`);
              }
            }} 
          />
          
          {selectedDay === null ? (
            <div className="h-[calc(100vh-8rem)]">
              <ModuleVideoCarousel slides={videoSlides} />
            </div>
          ) : (
            <DayStages
              selectedDay={selectedDay}
              workDay={workDays[selectedDay - 1]}
              stages={stages}
              activeStage={activeStage}
              onStageClick={handleStageClick}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ModuloDetalle;
