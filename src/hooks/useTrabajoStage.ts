
import { useState, useRef, useEffect } from "react";

export const useTrabajoStage = (setStageStatus: (stage: string, status: "completed" | "in-progress" | "pending") => void) => {
  const [showTrabajoVideo, setShowTrabajoVideo] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [audioCompleted, setAudioCompleted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const guidedQuestions = [
    "¿Recuerdas algún momento en el que hayas perdido la noción del tiempo porque estabas sumergido en algo? ¿Cuéntanos cómo se sintió?",
    "¿Identificas que habilidades utilizaste durante ese momento?",
    "¿Qué te pareció la explicación del protocolo?"
  ];

  const demoVideo = "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4";
  
  const trabajoVideoSlides = [
    {
      src: demoVideo,
      thumbnail: "/placeholder-thumbnail-3.jpg",
      title: "Identificando el Estado de Flujo",
      likes: 1500000,
    },
    {
      src: demoVideo,
      thumbnail: "/placeholder-thumbnail-3.jpg",
      title: "Actividades de Alta Energía",
      likes: 1600000,
    },
    {
      src: demoVideo,
      thumbnail: "/placeholder-thumbnail-3.jpg",
      title: "Patrones de Flujo Personales",
      likes: 1700000,
    },
    {
      src: demoVideo,
      thumbnail: "/placeholder-thumbnail-3.jpg",
      title: "Aplicando el Estado de Flujo",
      likes: 1800000,
    },
  ];

  const handleOpenTrabajoVideo = () => {
    setShowTrabajoVideo(true);
  };

  const handleCloseTrabajoVideo = () => {
    setShowTrabajoVideo(false);
    if (currentQuestionIndex === -1) {
      setCurrentQuestionIndex(0);
      setMessages([{
        text: guidedQuestions[0],
        isBot: true
      }]);
      setAudioCompleted(true);
    }
  };

  const handleSendMessage = async (text: string) => {
    setMessages(prev => [...prev, { text, isBot: false }]);
    setIsLoading(true);

    setTimeout(() => {
      if (currentQuestionIndex < guidedQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setMessages(prev => [...prev, { 
          text: guidedQuestions[currentQuestionIndex + 1], 
          isBot: true 
        }]);
      } else if (currentQuestionIndex === guidedQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setMessages(prev => [...prev, { 
          text: "¡Gracias por compartir tus respuestas! Ahora, ¿tienes alguna duda o pregunta adicional sobre el estado de flujo? Estoy aquí para ayudarte.", 
          isBot: true 
        }]);
        setStageStatus('trabajo', 'completed');
      } else {
        setMessages(prev => [...prev, { 
          text: "Gracias por tu pregunta. Permíteme ayudarte a profundizar en tu comprensión del estado de flujo. ¿Hay algo más que te gustaría explorar?", 
          isBot: true 
        }]);
      }
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return {
    showTrabajoVideo,
    messages,
    isLoading,
    audioCompleted,
    messagesEndRef,
    trabajoVideoSlides,
    handleOpenTrabajoVideo,
    handleCloseTrabajoVideo,
    handleSendMessage
  };
};
