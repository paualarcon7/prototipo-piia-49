
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Lightbulb,
  ClipboardList,
  Dumbbell,
  MessageSquare,
  PenTool,
} from "lucide-react";
import { useState } from "react";
import TestQuestion from "@/components/TestQuestion";
import { useToast } from "@/hooks/use-toast";

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
  const [showFeedback, setShowFeedback] = useState(false);
  const { toast } = useToast();

  const stages = [
    {
      title: "Inicio",
      icon: <Lightbulb className="w-6 h-6" />,
      description: "Explora el concepto del estado de flujo y observa cómo se manifiesta en tu vida.",
      steps: [
        "Ver video introductorio sobre el estado de flujo",
        "Reflexionar sobre el concepto",
        "Grabar tu explicación personal del estado de flujo"
      ]
    },
    {
      title: "Sesión de trabajo",
      icon: <ClipboardList className="w-6 h-6" />,
      description: "Identifica y analiza tus momentos de máxima energía y flujo.",
      steps: [
        "Registro de actividades energizantes",
        "Análisis de patrones de flujo",
        "Sesión de Q&A sobre el tema"
      ]
    },
    {
      title: "Entrenamiento",
      icon: <Dumbbell className="w-6 h-6" />,
      description: "Practica técnicas para entrar en estado de flujo más frecuentemente.",
      steps: [
        "Ejercicios de entrada al estado de flujo",
        "Registro de experiencias",
        "Seguimiento de progreso"
      ]
    },
    {
      title: "Evaluación",
      icon: <PenTool className="w-6 h-6" />,
      description: "Evalúa tu comprensión del estado de flujo y cómo se manifiesta en tu vida.",
      steps: [
        "Test de comprensión",
        "Registro de actividades energizantes",
        "Identificación de patrones de flujo"
      ]
    },
    {
      title: "Feedback",
      icon: <MessageSquare className="w-6 h-6" />,
      description: "Evalúa tu comprensión y experiencia con el estado de flujo.",
      steps: [
        "Test de comprensión",
        "Registro de insights",
        "Plan de acción futuro"
      ]
    }
  ];

  const mockQuestions = [
    {
      id: 1,
      text: "¿Qué es el estado de flow?",
      options: [
        { 
          value: "a", 
          label: "Un estado de máxima concentración y disfrute donde el tiempo parece desaparecer", 
          color: "green" 
        },
        { 
          value: "b", 
          label: "Un estado de relajación profunda similar a la meditación", 
          color: "blue" 
        },
        { 
          value: "c", 
          label: "Un estado de alta productividad pero con mucho estrés", 
          color: "purple" 
        }
      ]
    },
    {
      id: 2,
      text: "¿Qué actividades diarias identificas donde tu energía se multiplica?",
      options: [
        { value: "text", label: "", color: "green" }
      ],
      isTextInput: true
    },
    {
      id: 3,
      text: "Menciona de 1 a 3 actividades que hoy identificas que te ayudan a conectar con tu estado de FLOW",
      options: [
        { value: "text", label: "", color: "green" }
      ],
      isTextInput: true
    }
  ];

  const feedbackQuestions = [
    {
      id: 1,
      text: "¿Qué actividades harías aunque no te pagaran?",
      options: [
        { value: "text", label: "", color: "green" }
      ],
      isTextInput: true
    },
    {
      id: 2,
      text: "¿Qué aprendiste de ti después de hacer esta actividad?",
      options: [
        { value: "text", label: "", color: "green" }
      ],
      isTextInput: true
    },
    {
      id: 3,
      text: "¿Te gustó la actividad?",
      options: [
        { value: "stars", label: "", color: "yellow" }
      ],
      isStarRating: true
    }
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

  return (
    <div className="container mx-auto px-4 py-6 pb-32">
      {showTest ? (
        <TestQuestion
          questions={mockQuestions}
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
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => navigate(`/programa/${id}`)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al programa
          </Button>

          <div className="bg-secondary/50 backdrop-blur-sm rounded-lg p-6 mb-6">
            <h1 className="text-2xl font-bold mb-4">ALMA - PARTE 1: ACTIVA TU ENERGÍA Y DETECTA TU FLUJO</h1>
            <p className="text-gray-300 mb-4">
              El modelo ALMA está diseñado para ayudarte a alinear tu energía, talento, impacto y sostenibilidad, 
              con el fin de encontrar un camino profesional y personal pleno y significativo. Cada paso te guiará 
              a través de reflexiones y ejercicios prácticos para conectar con tu esencia y construir una estrategia de acción.
            </p>
            <div className="bg-purple-500/20 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Objetivo del Módulo</h2>
              <p className="text-gray-300">
                Identificar las actividades y momentos en los que tu energía se expande y experimentas el estado de "flujo".
              </p>
            </div>
            <div className="flex items-center gap-2 mt-4">
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
    </div>
  );
};

export default ModuloDetalle;
