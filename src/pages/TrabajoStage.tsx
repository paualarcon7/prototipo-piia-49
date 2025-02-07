
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Play, 
  Pause,
  MessageSquare
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";

const TrabajoStage = () => {
  const { id, moduleId } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audioCompleted, setAudioCompleted] = useState(false);
  const progressInterval = useRef<number>();
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const simulateAudioProgress = () => {
    setIsPlaying(true);
    let currentProgress = 0;
    progressInterval.current = window.setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);
      if (currentProgress >= 20) {
        clearInterval(progressInterval.current);
        setIsPlaying(false);
        setAudioCompleted(true);
      }
    }, 1000);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      clearInterval(progressInterval.current);
      setIsPlaying(false);
    } else {
      simulateAudioProgress();
    }
  };

  const handleSendMessage = async (text: string) => {
    setMessages(prev => [...prev, { text, isBot: false }]);
    setIsLoading(true);

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Esta es una respuesta simulada del asistente. En una implementación real, aquí se conectaría con un backend para procesar las preguntas y generar respuestas apropiadas.", 
        isBot: true 
      }]);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

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
        <h1 className="text-2xl font-bold mb-4">Sesión de Trabajo - Módulo {moduleId}</h1>
        <p className="text-gray-300 mb-6">
          Escucha atentamente la explicación del protocolo y luego participa en la
          sesión de preguntas y respuestas para aclarar cualquier duda.
        </p>

        <div className="space-y-6">
          <div className="bg-secondary/70 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Explicación del Protocolo</h2>
            <div className="flex flex-col items-center gap-4">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full transition-all"
                  style={{ width: `${(progress / 20) * 100}%` }}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                <span className="text-sm text-gray-400">
                  {progress}s / 20s
                </span>
              </div>
            </div>
          </div>

          {audioCompleted && (
            <div className="space-y-4">
              <div className="bg-secondary/70 p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Preguntas y Respuestas
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
