
import { Stage } from "@/types/module";
import { 
  Lightbulb,
  ClipboardList,
  Dumbbell,
  MessageSquare,
  PenTool,
} from "lucide-react";

export const stages: Stage[] = [
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
