
import { Question } from "@/types/module";

export const evaluationQuestions: Question[] = [
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

export const feedbackQuestions: Question[] = [
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
