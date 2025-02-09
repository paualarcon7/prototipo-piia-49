
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Play, 
  Pause,
  Flower2,
  Calendar,
  Clock
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ReactConfetti from 'react-confetti';
import { addDays, format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const EntrenamientoStage = () => {
  const { id, moduleId } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedTime, setSelectedTime] = useState("08:00");
  const progressInterval = useRef<number>();

  const startDate = new Date();
  const endDate = addDays(startDate, 21);

  const simulateMeditation = () => {
    setIsPlaying(true);
    let currentProgress = 0;
    progressInterval.current = window.setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);
      if (currentProgress >= 20) {
        clearInterval(progressInterval.current);
        setIsPlaying(false);
        handleMeditationComplete();
      }
    }, 1000);
  };

  const handleMeditationComplete = () => {
    setShowModal(true);
    setTimeout(() => {
      setShowConfetti(true);
    }, 3000);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      clearInterval(progressInterval.current);
      setIsPlaying(false);
    } else {
      simulateMeditation();
    }
  };

  const handleAddToCalendar = () => {
    const title = `Meditación - Módulo ${moduleId}`;
    const description = `Protocolo de Meditación para el Manejo del Estrés - Duración: 21 días`;
    const [hours, minutes] = selectedTime.split(':');
    
    // Crear evento para Google Calendar
    const startDateTime = new Date();
    startDateTime.setHours(parseInt(hours), parseInt(minutes), 0);
    
    const endDateTime = new Date(startDateTime);
    endDateTime.setMinutes(endDateTime.getMinutes() + 20);

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(description)}&dates=${format(startDateTime, "yyyyMMdd'T'HHmmss'Z'").slice(0, -1)}/${format(endDateTime, "yyyyMMdd'T'HHmmss'Z'").slice(0, -1)}&recur=RRULE:FREQ=DAILY;COUNT=21`;
    
    window.open(googleCalendarUrl, '_blank');
    toast.success("¡Recordatorio creado exitosamente!");
  };

  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  const timeOptions = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 30) {
      const hour = i.toString().padStart(2, '0');
      const minute = j.toString().padStart(2, '0');
      timeOptions.push(`${hour}:${minute}`);
    }
  }

  return (
    <>
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[100]">
          <ReactConfetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
            onConfettiComplete={() => setShowConfetti(false)}
          />
        </div>
      )}
      
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
          <h1 className="text-2xl font-bold mb-4">Entrenamiento - Módulo {moduleId}</h1>
          
          <div className="space-y-6">
            <div className="bg-secondary/70 p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Flower2 className="h-5 w-5" />
                Protocolo de Meditación para el Manejo del Estrés
              </h2>

              <div className="bg-secondary/50 p-4 rounded-lg mb-6">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Duración del protocolo
                </h3>
                <p className="text-sm text-gray-300">
                  Este protocolo tiene una duración de 21 días, desde el {format(startDate, 'dd/MM/yyyy')} hasta el {format(endDate, 'dd/MM/yyyy')}.
                </p>
              </div>

              <div className="bg-secondary/50 p-4 rounded-lg mb-6">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Recordatorio diario
                </h3>
                <div className="flex items-center gap-4">
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Seleccionar hora" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Hora del recordatorio</SelectLabel>
                        {timeOptions.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" onClick={handleAddToCalendar}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Agendar en calendario
                  </Button>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Este protocolo está diseñado para ayudarte a desarrollar una práctica de meditación efectiva 
                que te permitirá manejar mejor el estrés en tu vida diaria. A través de esta práctica, 
                aprenderás a observar tus pensamientos sin juzgarlos y a mantener un estado de calma 
                y claridad mental.
              </p>
              
              <div className="space-y-4">
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Instrucciones:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Encuentra un lugar tranquilo y cómodo</li>
                    <li>Siéntate con la espalda recta pero relajada</li>
                    <li>Cierra suavemente los ojos</li>
                    <li>Respira profunda y naturalmente</li>
                    <li>Mantén tu atención en la respiración</li>
                  </ul>
                </div>

                <div className="mt-8">
                  <h3 className="font-medium mb-4">Meditación Guiada:</h3>
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
              </div>
            </div>
          </div>
        </div>

        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>¡Felicitaciones! 🎉</DialogTitle>
              <DialogDescription className="space-y-4">
                <p className="mt-4">
                  Has completado exitosamente tu sesión de meditación. 
                  ¿Cómo te sientes después de esta práctica?
                </p>
                <textarea 
                  className="w-full h-24 p-2 rounded-md border border-gray-300 bg-background"
                  placeholder="Comparte tu experiencia..."
                />
                <Button 
                  className="w-full"
                  onClick={() => setShowModal(false)}
                >
                  Enviar feedback
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default EntrenamientoStage;

