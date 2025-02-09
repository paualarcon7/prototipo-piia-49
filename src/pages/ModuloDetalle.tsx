import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Lightbulb,
  ClipboardList,
  Dumbbell,
  MessageSquare,
  Mic,
  CheckCircle,
  Calendar,
} from "lucide-react";
import { useState } from "react";
import TestQuestion from "@/components/TestQuestion";

interface StageProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  steps: string[];
  isActive: boolean;
  onSelect: () => void;
}

const Stage = ({ title, icon, description, steps, isActive, onSelect }: StageProps) => (
  <div
    className={`p-4 rounded-lg cursor-pointer transition-all ${
      isActive ? "bg-secondary" : "bg-secondary/50 hover:bg-secondary/70"
    }`}
    onClick={onSelect}
  >
    <div className="flex items-center gap-3 mb-2">
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <p className="text-sm text-gray-400 mb-2">{description}</p>
    {isActive && (
      <div className="mt-4 space-y-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-sm text-gray-300"
          >
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            {step}
          </div>
        ))}
      </div>
    )}
  </div>
);

const ModuloDetalle = () => {
  const { id, moduleId } = useParams();
  const navigate = useNavigate();
  const [activeStage, setActiveStage] = useState(0);
  const [showTest, setShowTest] = useState(false);

  const stages = [
    {
      title: "Inicio",
      icon: <Lightbulb className="w-6 h-6" />,
      description: "Escucha el audio introductorio y registra tu reflexión mediante una nota de voz.",
      steps: [
        "Escuchar audio introductorio",
        "Opción de audio adicional para profundizar",
        "Grabar reflexión por voz"
      ]
    },
    {
      title: "Sesión de trabajo",
      icon: <ClipboardList className="w-6 h-6" />,
      description: "Aprende sobre el protocolo, realiza un test y participa en una sesión de Q&A.",
      steps: [
        "Audio explicativo del protocolo",
        "Test de 3 preguntas",
        "Sesión de Q&A (voz o texto)"
      ]
    },
    {
      title: "Entrenamiento",
      icon: <Dumbbell className="w-6 h-6" />,
      description: "Practica los ejercicios y regístralos en tu calendario.",
      steps: [
        "Acceso al protocolo de ejercicios",
        "Registro de ejercicios en el calendario",
        "Seguimiento periódico"
      ]
    },
    {
      title: "Feedback",
      icon: <MessageSquare className="w-6 h-6" />,
      description: "Evalúa tu progreso y comparte tu experiencia con el protocolo.",
      steps: [
        "Test de evaluación",
        "Registro de feedback",
        "Revisión de progreso"
      ]
    }
  ];

  const mockQuestions = [
    {
      id: 1,
      text: "¿Qué aspecto del protocolo te resultó más útil?",
      options: [
        { value: "a", label: "Los ejercicios prácticos", color: "green" },
        { value: "b", label: "Las explicaciones teóricas", color: "blue" },
        { value: "c", label: "Las sesiones de reflexión", color: "purple" }
      ]
    },
    {
      id: 2,
      text: "¿Con qué frecuencia practicaste los ejercicios?",
      options: [
        { value: "a", label: "Diariamente", color: "green" },
        { value: "b", label: "2-3 veces por semana", color: "blue" },
        { value: "c", label: "Una vez por semana", color: "purple" }
      ]
    },
    {
      id: 3,
      text: "¿Cómo calificarías tu progreso hasta ahora?",
      options: [
        { value: "a", label: "Excelente", color: "green" },
        { value: "b", label: "Bueno", color: "blue" },
        { value: "c", label: "Regular", color: "purple" }
      ]
    }
  ];

  const handleTestComplete = (results: Record<number, string>) => {
    console.log("Test results:", results);
    setShowTest(false);
  };

  const handleStageClick = (index: number) => {
    setActiveStage(index);
    if (index === 0) {
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
          questions={mockQuestions}
          onComplete={handleTestComplete}
          onBack={() => setShowTest(false)}
        />
      ) : (
        <>
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => navigate(`/programa/${id}`)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al programa
          </Button>

          <div className="bg-secondary/50 backdrop-blur-sm rounded-lg p-6 mb-6">
            <h1 className="text-2xl font-bold mb-4">Módulo {moduleId}</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm bg-purple-500/30 text-purple-300 px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                En progreso
              </span>
            </div>
          </div>

          <div className="space-y-4 mb-24">
            {stages.map((stage, index) => (
              <Stage
                key={index}
                {...stage}
                isActive={activeStage === index}
                onSelect={() => handleStageClick(index)}
              />
            ))}
          </div>
        </>
      )}

      <div className="fixed bottom-16 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t">
        <div className="container mx-auto flex justify-between items-center">
          {activeStage === 1 && (
            <Button
              variant="secondary"
              onClick={() => setShowTest(true)}
              className="w-full"
            >
              Realizar Test
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModuloDetalle;
