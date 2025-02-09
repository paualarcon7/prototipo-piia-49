
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Play, 
  Pause,
  Flower2
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

const EntrenamientoStage = () => {
  const { id, moduleId } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const progressInterval = useRef<number>();

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

  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 pb-32">
      {showConfetti && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}

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
  );
};

export default EntrenamientoStage;
