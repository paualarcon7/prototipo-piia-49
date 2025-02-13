
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import TestQuestion from "@/components/TestQuestion";
import { useToast } from "@/hooks/use-toast";
import { ModuleStage } from "@/components/module/ModuleStage";
import { ModuleHeader } from "@/components/module/ModuleHeader";
import { WorkDayCard } from "@/components/module/WorkDayCard";
import { stages } from "@/constants/moduleStages";
import { evaluationQuestions, feedbackQuestions } from "@/constants/moduleQuestions";
import { WorkDay } from "@/types/module";

const workDays: WorkDay[] = [
  {
    day: 1,
    title: "Introducción al Estado de Flow",
    description: "Descubre qué es el estado de flow y cómo identificarlo en tu vida diaria.",
    color: "purple"
  },
  {
    day: 2,
    title: "Identificación de Patrones",
    description: "Aprende a reconocer tus momentos de máxima energía y concentración.",
    color: "blue"
  },
  {
    day: 3,
    title: "Prácticas de Flow",
    description: "Realiza ejercicios prácticos para entrar en estado de flow más frecuentemente.",
    color: "green"
  },
  {
    day: 4,
    title: "Integración",
    description: "Conecta tus experiencias de flow con tus objetivos personales y profesionales.",
    color: "orange"
  },
  {
    day: 5,
    title: "Reflexión y Cierre",
    description: "Evalúa tu progreso y establece un plan para mantener el estado de flow.",
    color: "pink"
  }
];

const ModuloDetalle = () => {
  const { id, moduleId } = useParams();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
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
            <div className="space-y-4 mb-24">
              <div className="bg-secondary/50 backdrop-blur-sm rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Plan de Trabajo</h2>
                <p className="text-gray-400 mb-6">
                  Tu viaje está estructurado en 5 días de trabajo. Cada día está diseñado 
                  para ayudarte a profundizar en diferentes aspectos del estado de flow.
                </p>
              </div>
              
              {workDays.map((day) => (
                <WorkDayCard
                  key={day.day}
                  {...day}
                  isActive={false}
                  onSelect={() => handleDaySelect(day.day)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4 mb-24">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  Día {selectedDay}: {workDays[selectedDay - 1].title}
                </h2>
                <p className="text-gray-400">
                  {workDays[selectedDay - 1].description}
                </p>
              </div>
              
              {stages.map((stage, index) => (
                <ModuleStage
                  key={index}
                  {...stage}
                  isActive={activeStage === index}
                  onSelect={() => handleStageClick(index)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ModuloDetalle;
