
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Play,
  MessageSquare
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModuleVideoCarousel } from "@/components/module/ModuleVideoCarousel";

const TrabajoStage = () => {
  const { id, moduleId } = useParams();
  const navigate = useNavigate();
  const [audioCompleted, setAudioCompleted] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showTrabajoVideo, setShowTrabajoVideo] = useState(false);

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
    // Trigger PIIA's question modal when user exits video
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

    // Add delay to simulate processing
    setTimeout(() => {
      if (currentQuestionIndex < guidedQuestions.length - 1) {
        // If we're still in guided questions, show the next one
        setCurrentQuestionIndex(prev => prev + 1);
        setMessages(prev => [...prev, { 
          text: guidedQuestions[currentQuestionIndex + 1], 
          isBot: true 
        }]);
      } else if (currentQuestionIndex === guidedQuestions.length - 1) {
        // If we just finished the last guided question
        setCurrentQuestionIndex(prev => prev + 1);
        setMessages(prev => [...prev, { 
          text: "¡Gracias por compartir tus respuestas! Ahora, ¿tienes alguna duda o pregunta adicional sobre el estado de flujo? Estoy aquí para ayudarte.", 
          isBot: true 
        }]);
      } else {
        // For any subsequent questions
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

  return (
    <div className="container mx-auto px-4 py-6 pb-32">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate(`/programa/${id}/modulo/${moduleId}`)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver al módulo
      </Button>

      <div className="bg-secondary/50 backdrop-blur-sm rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">ALMA - PARTE 1: ACTIVA TU ENERGÍA Y DETECTA TU FLUJO</h1>
        <p className="text-gray-300 mb-6">
          Observa los videos sobre el estado de flujo y luego participa en la
          sesión de preguntas y respuestas para profundizar en tu comprensión.
        </p>

        <div className="space-y-6">
          <div className="bg-secondary/70 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Videos sobre Estado de Flujo</h2>
            <div>
              {/* Show just the first video thumbnail */}
              <div 
                className="relative mx-auto aspect-[9/16] max-w-[160px] bg-black rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                onClick={handleOpenTrabajoVideo}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="h-8 w-8 text-white opacity-80" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-xs text-white font-medium line-clamp-2">
                    {trabajoVideoSlides[0].title}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {showTrabajoVideo && (
            <div className="fixed inset-0 z-50 bg-black">
              <div className="h-full w-full flex items-center justify-center">
                <div className="relative w-full max-w-md h-full">
                  <ModuleVideoCarousel 
                    slides={trabajoVideoSlides} 
                    onClose={handleCloseTrabajoVideo}
                  />
                </div>
              </div>
            </div>
          )}

          {audioCompleted && (
            <div className="space-y-4">
              <div className="bg-secondary/70 p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Conversación con PIIA
                </h2>
                
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <ChatMessage
                        key={index}
                        text={message.text}
                        isBot={message.isBot}
                      />
                    ))}
                    {isLoading && (
                      <ChatMessage
                        text=""
                        isBot={true}
                        isLoading={true}
                      />
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <div className="mt-4">
                  <ChatInput
                    onSendMessage={handleSendMessage}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrabajoStage;
