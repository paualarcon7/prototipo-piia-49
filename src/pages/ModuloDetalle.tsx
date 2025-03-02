
import { useParams, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import TestQuestion from "@/components/TestQuestion";
import { useToast } from "@/hooks/use-toast";
import { ModuleHeader } from "@/components/module/ModuleHeader";
import { WorkDayList } from "@/components/module/WorkDayList";
import { DayStages } from "@/components/module/DayStages";
import { stages } from "@/constants/moduleStages";
import { workDays } from "@/constants/workDays";
import { evaluationQuestions, feedbackQuestions } from "@/constants/moduleQuestions";
import { ModuleVideoPreview } from "@/components/module/ModuleVideoPreview";
import { ModuleVideoCarousel } from "@/components/module/ModuleVideoCarousel";
import { ClipboardList, Dumbbell, PenTool, MessageSquare, Play, Pause, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModuleStage } from "@/components/module/ModuleStage";

const ModuloDetalle = () => {
  const { id, moduleId } = useParams();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [showTest, setShowTest] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showFullScreenVideo, setShowFullScreenVideo] = useState(false);
  const { toast } = useToast();

  // Audio player state for trabajo section
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audioCompleted, setAudioCompleted] = useState(false);
  const progressInterval = useRef<number>();
  
  // Chat state for trabajo section
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Guided questions for trabajo section
  const guidedQuestions = [
    "¿Recuerdas algún momento en el que hayas perdido la noción del tiempo porque estabas sumergido en algo? ¿Cuéntanos cómo se sintió?",
    "¿Identificas que habilidades utilizaste durante ese momento?",
    "¿Qué te pareció la explicación del protocolo?"
  ];

  // Video slides con el mismo video repetido 3 veces (el tercer video)
  const demoVideo = "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4";
  const videoSlides = [
    {
      src: demoVideo,
      thumbnail: "/placeholder-thumbnail-3.jpg",
      title: "Demo Video 1",
      likes: 1800000,
    },
    {
      src: demoVideo,
      thumbnail: "/placeholder-thumbnail-3.jpg",
      title: "Demo Video 2",
      likes: 1900000,
    },
    {
      src: demoVideo,
      thumbnail: "/placeholder-thumbnail-3.jpg",
      title: "Demo Video 3",
      likes: 2000000,
    },
  ];

  const handleTestComplete = (results: Record<number, string>) => {
    console.log("Test results:", results);
    toast({
      title: "Evaluación completada",
      description: "Tus respuestas han sido guardadas exitosamente.",
    });
    setShowTest(false);
    // Mark evaluation as completed
    setStageStatus("evaluation", "completed");
  };

  const handleFeedbackComplete = (results: Record<number, string>) => {
    console.log("Feedback results:", results);
    toast({
      title: "Feedback enviado",
      description: "¡Gracias por compartir tu experiencia!",
    });
    setShowFeedback(false);
    // Mark feedback as completed
    setStageStatus("feedback", "completed");
  };

  // Stage status management
  const [stageStatuses, setStageStatuses] = useState({
    trabajo: "pending" as "completed" | "in-progress" | "pending",
    entrenamiento: "pending" as "completed" | "in-progress" | "pending",
    evaluation: "pending" as "completed" | "in-progress" | "pending",
    feedback: "pending" as "completed" | "in-progress" | "pending"
  });

  const setStageStatus = (stage: keyof typeof stageStatuses, status: "completed" | "in-progress" | "pending") => {
    setStageStatuses(prev => ({
      ...prev,
      [stage]: status
    }));
  };

  // Accordion handlers
  const handleStageChange = (value: string) => {
    setActiveStage(value);
    
    // Update status of selected stage to in-progress if not already completed
    if (value && stageStatuses[value as keyof typeof stageStatuses] === 'pending') {
      setStageStatus(value as keyof typeof stageStatuses, 'in-progress');
    }

    // Show tests for evaluation and feedback
    if (value === 'evaluation') {
      setShowTest(true);
    } else if (value === 'feedback') {
      setShowFeedback(true);
    } else {
      setShowTest(false);
      setShowFeedback(false);
    }
  };

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
    setActiveStage('trabajo'); // Default open the first accordion
    setStageStatus('trabajo', 'in-progress');
  };

  const handleBackFromStages = () => {
    setSelectedDay(null);
    setActiveStage(null);
    // Reset audio player and chat if needed
    resetAudioPlayer();
  };

  const handleOpenFullScreenVideo = () => {
    setShowFullScreenVideo(true);
  };

  const handleCloseFullScreenVideo = () => {
    setShowFullScreenVideo(false);
  };

  // Audio player functions for trabajo section
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
        // Start the guided questions when audio is completed
        if (currentQuestionIndex === -1) {
          setCurrentQuestionIndex(0);
          setMessages([{
            text: guidedQuestions[0],
            isBot: true
          }]);
        }
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

  const resetAudioPlayer = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    setIsPlaying(false);
    setProgress(0);
    setAudioCompleted(false);
    setMessages([]);
    setCurrentQuestionIndex(-1);
  };

  // Chat functions for trabajo section
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
        // Mark trabajo as completed when all questions are answered
        setStageStatus('trabajo', 'completed');
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
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Training section exercise state
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [exerciseComplete, setExerciseComplete] = useState(false);
  const trainingInterval = useRef<number>();

  const startTrainingExercise = () => {
    let progress = 0;
    setTrainingProgress(0);
    setExerciseComplete(false);
    
    trainingInterval.current = window.setInterval(() => {
      progress += 1;
      setTrainingProgress(progress);
      if (progress >= 100) {
        clearInterval(trainingInterval.current);
        setExerciseComplete(true);
        setStageStatus('entrenamiento', 'completed');
      }
    }, 300); // Faster for demo purposes
  };

  useEffect(() => {
    return () => {
      if (trainingInterval.current) {
        clearInterval(trainingInterval.current);
      }
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 pb-32">
      {showTest ? (
        <TestQuestion
          questions={evaluationQuestions}
          onComplete={handleTestComplete}
          onBack={() => {
            setShowTest(false);
            setActiveStage(null);
          }}
        />
      ) : showFeedback ? (
        <TestQuestion
          questions={feedbackQuestions}
          onComplete={handleFeedbackComplete}
          onBack={() => {
            setShowFeedback(false);
            setActiveStage(null);
          }}
        />
      ) : (
        <>
          {selectedDay === null && (
            <>
              <ModuleHeader 
                onBack={() => navigate(`/programa/${id}`)}
                videoSlides={videoSlides}
              />
              {!showFullScreenVideo && (
                <ModuleVideoPreview 
                  videoSlides={videoSlides} 
                  onPlayClick={handleOpenFullScreenVideo}
                />
              )}
              {showFullScreenVideo && (
                <div className="fixed inset-0 z-50 bg-black">
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="relative w-full max-w-md h-full">
                      <ModuleVideoCarousel 
                        slides={videoSlides} 
                        onClose={handleCloseFullScreenVideo}
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          
          {selectedDay === null ? (
            <WorkDayList 
              workDays={workDays} 
              onDaySelect={handleDaySelect} 
            />
          ) : (
            <div className="space-y-4 mb-24">
              <Button
                variant="ghost"
                className="mb-4"
                onClick={handleBackFromStages}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al módulo
              </Button>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  Día {selectedDay}: {workDays[selectedDay - 1].title}
                </h2>
                <p className="text-gray-400">
                  {workDays[selectedDay - 1].description}
                </p>
              </div>

              {/* Progress indicator */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Progreso de hoy</span>
                  <span className="text-sm font-medium">
                    {Object.values(stageStatuses).filter(s => s === 'completed').length}/4
                  </span>
                </div>
                <Progress 
                  value={Object.values(stageStatuses).filter(s => s === 'completed').length * 25} 
                  className="h-2 bg-gray-800"
                />
              </div>
              
              {/* Trabajo stage */}
              <ModuleStage
                title="Sesión de trabajo"
                icon={<ClipboardList className="w-6 h-6" />}
                description="Identifica y analiza tus momentos de máxima energía y flujo."
                steps={[
                  "Registro de actividades energizantes",
                  "Análisis de patrones de flujo",
                  "Sesión de Q&A sobre el tema"
                ]}
                isActive={activeStage === 'trabajo'}
                stageKey="trabajo"
                status={stageStatuses.trabajo}
              >
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
                    <div className="bg-secondary/70 p-6 rounded-lg">
                      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        Conversación con PIIA
                      </h2>
                      
                      <ScrollArea className="h-[300px] pr-4">
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
                  )}
                </div>
              </ModuleStage>

              {/* Entrenamiento stage */}
              <ModuleStage
                title="Entrenamiento"
                icon={<Dumbbell className="w-6 h-6" />}
                description="Practica técnicas para entrar en estado de flujo más frecuentemente."
                steps={[
                  "Ejercicios de entrada al estado de flujo",
                  "Registro de experiencias",
                  "Seguimiento de progreso"
                ]}
                isActive={activeStage === 'entrenamiento'}
                stageKey="entrenamiento"
                status={stageStatuses.entrenamiento}
              >
                <div className="space-y-6">
                  <div className="bg-secondary/70 p-6 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Ejercicio de flujo</h2>
                    
                    <div className="flex flex-col items-center">
                      <div className="relative w-48 h-48 flex items-center justify-center mb-4">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle
                            className="text-gray-700 stroke-current"
                            strokeWidth="4"
                            cx="50"
                            cy="50"
                            r="44"
                            fill="none"
                          ></circle>
                          <circle
                            className="text-purple-500 stroke-current"
                            strokeWidth="4"
                            strokeLinecap="round"
                            cx="50"
                            cy="50"
                            r="44"
                            fill="none"
                            strokeDasharray="276.5"
                            strokeDashoffset={276.5 - (trainingProgress / 100) * 276.5}
                            transform="rotate(-90 50 50)"
                          ></circle>
                        </svg>
                        <span className="absolute text-xl font-bold">
                          {exerciseComplete ? "¡Hecho!" : `${Math.floor(trainingProgress)}%`}
                        </span>
                      </div>
                      
                      {!exerciseComplete ? (
                        trainingProgress === 0 ? (
                          <Button onClick={startTrainingExercise}>
                            Iniciar ejercicio
                          </Button>
                        ) : (
                          <p className="text-center text-gray-300">
                            Mantén tu atención en la respiración...
                          </p>
                        )
                      ) : (
                        <div className="text-center space-y-4">
                          <p className="text-green-400">
                            ¡Ejercicio completado con éxito!
                          </p>
                          <Button variant="outline" onClick={startTrainingExercise}>
                            Repetir ejercicio
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ModuleStage>

              {/* Evaluation stage */}
              <ModuleStage
                title="Evaluación"
                icon={<PenTool className="w-6 h-6" />}
                description="Evalúa tu comprensión del estado de flujo y cómo se manifiesta en tu vida."
                steps={[
                  "Test de comprensión",
                  "Registro de actividades energizantes",
                  "Identificación de patrones de flujo"
                ]}
                isActive={activeStage === 'evaluation'}
                stageKey="evaluation"
                status={stageStatuses.evaluation}
              >
                <div className="p-2 text-center">
                  <p className="text-gray-400 mb-4">Completa el cuestionario para evaluar tu comprensión.</p>
                  <Button onClick={() => setShowTest(true)}>
                    Iniciar evaluación
                  </Button>
                </div>
              </ModuleStage>

              {/* Feedback stage */}
              <ModuleStage
                title="Feedback"
                icon={<MessageSquare className="w-6 h-6" />}
                description="Evalúa tu comprensión y experiencia con el estado de flujo."
                steps={[
                  "Test de comprensión",
                  "Registro de insights",
                  "Plan de acción futuro"
                ]}
                isActive={activeStage === 'feedback'}
                stageKey="feedback"
                status={stageStatuses.feedback}
              >
                <div className="p-2 text-center">
                  <p className="text-gray-400 mb-4">Comparte tu experiencia y aprendizajes sobre el estado de flujo.</p>
                  <Button onClick={() => setShowFeedback(true)}>
                    Dar feedback
                  </Button>
                </div>
              </ModuleStage>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ModuloDetalle;
