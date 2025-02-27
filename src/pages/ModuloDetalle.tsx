
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

// Utility function to convert Google Drive links to direct download links
const getDirectGoogleDriveLink = (url: string): string => {
  const fileId = url.match(/[-\w]{25,}/);
  if (fileId) {
    return `https://drive.google.com/uc?export=view&id=${fileId[0]}`;
  }
  return url;
};

const ModuloDetalle = () => {
  const { id, moduleId } = useParams();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [showTest, setShowTest] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const { toast } = useToast();

  // Example video slides with Google Drive videos
  const videoSlides = [
    {
      src: getDirectGoogleDriveLink("https://drive.google.com/file/d/1M9xxsH3P672Ubf7mHx44_urx8_cBCZMO/view?usp=sharing"),
      thumbnail: "/placeholder-thumbnail-1.jpg",
      title: "Objetivos del Módulo",
      likes: 1500000,
    },
    {
      src: getDirectGoogleDriveLink("https://drive.google.com/file/d/1LRg4vkIuPJufjnNSJKtjjYTH6MK84dJK/view?usp=sharing"),
      thumbnail: "/placeholder-thumbnail-2.jpg",
      title: "Estructura del Módulo",
      likes: 2300000,
    },
    {
      src: getDirectGoogleDriveLink("https://drive.google.com/file/d/1M7zuDHXDW2XBIn2dSkUcx8wVtMPF3k-x/view?usp=sharing"),
      thumbnail: "/placeholder-thumbnail-3.jpg",
      title: "Conoce más",
      likes: 1800000,
    },
  ];

  console.log("Video URLs:", videoSlides.map(slide => slide.src));

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
          {selectedDay === null && (
            <ModuleHeader 
              onBack={() => navigate(`/programa/${id}`)}
              videoSlides={videoSlides}
            />
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
