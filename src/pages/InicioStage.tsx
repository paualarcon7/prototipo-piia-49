
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Mic,
  Forward,
  CheckCircle
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const InicioStage = () => {
  const { id, moduleId } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audioCompleted, setAudioCompleted] = useState(false);
  const progressInterval = useRef<number>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleFinishRecording = () => {
    setIsDialogOpen(false);
    navigate(`/programa/${id}/modulo/${moduleId}`);
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
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate(`/programa/${id}/modulo/${moduleId}`)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver al módulo
      </Button>

      <div className="bg-secondary/50 backdrop-blur-sm rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">Inicio del Módulo {moduleId}</h1>
        <p className="text-gray-300 mb-6">
          En esta etapa inicial, comenzaremos explorando los conceptos fundamentales
          a través de un audio guiado. Escucha atentamente y prepárate para
          reflexionar sobre lo aprendido.
        </p>

        <div className="space-y-6">
          <div className="bg-secondary/70 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Audio Introductorio</h2>
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
            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={simulateAudioProgress}
              >
                <Forward className="mr-2 h-4 w-4" />
                Profundizar con audio adicional
              </Button>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <Mic className="mr-2 h-4 w-4" />
                    Grabar mi reflexión
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Grabar Reflexión</DialogTitle>
                    <DialogDescription>
                      Comparte tu reflexión sobre lo que has aprendido en este módulo.
                      Presiona el botón para comenzar a grabar.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col items-center gap-6 p-6">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full w-16 h-16"
                    >
                      <Mic className="h-8 w-8" />
                    </Button>
                    <Button 
                      className="w-full" 
                      onClick={handleFinishRecording}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Finalizar
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InicioStage;
