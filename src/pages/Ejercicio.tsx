import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Flower2, Wind, Play, Pause, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";
import { Exercise } from "@/types/exercises";

const exercises: Exercise[] = [
  {
    id: 1,
    title: "Armonía Interior",
    type: "meditation",
    tags: ["estrés", "ansiedad"],
    duration: "06:17",
    description: "Serenidad, enfoque y poder personal",
    icon: Flower2,
    instructions: "Encuentra un lugar tranquilo y cómodo. Siéntate con la espalda recta y los hombros relajados. Cierra los ojos suavemente y comienza a respirar de manera natural."
  },
  {
    id: 2,
    title: "Tummo",
    type: "breathing",
    tags: ["estrés", "relajación"],
    duration: "02:50",
    description: "Reconecta con la fuente de poder dentro de ti",
    icon: Wind,
    instructions: "Inhala profundamente por la nariz, expandiendo el abdomen. Mantén la respiración por 4 segundos. Exhala lentamente por la boca, contrayendo el abdomen.",
    videoUrl: "https://www.youtube.com/watch?v=0BNejY1e9ik"
  },
  {
    id: 3,
    title: "Agradecimiento profundo",
    type: "meditation",
    tags: ["gratitud"],
    duration: "05:30",
    icon: Flower2,
    instructions: "Encuentra un lugar tranquilo y reflexiona sobre las cosas por las que estás agradecido."
  },
  {
    id: 4,
    title: "Respiración 4-7-8",
    type: "breathing",
    tags: ["ansiedad", "relajación"],
    duration: "03:45",
    icon: Wind,
    instructions: "Inhala por la nariz durante 4 segundos, mantén la respiración durante 7 segundos y exhala por la boca durante 8 segundos.",
    videoUrl: "https://www.youtube.com/watch?v=0BNejY1e9ik"
  },
  {
    id: 5,
    title: "Meditación del Amanecer",
    type: "meditation",
    tags: ["gratitud", "relajación"],
    duration: "08:00",
    icon: Flower2,
    instructions: "Siéntate en un lugar cómodo y visualiza el amanecer mientras respiras profundamente."
  },
  {
    id: 6,
    title: "Respiración Cuadrada",
    type: "breathing",
    tags: ["estrés", "ansiedad"],
    duration: "04:20",
    icon: Wind,
    instructions: "Inhala durante 4 segundos, mantén la respiración durante 4 segundos, exhala durante 4 segundos y mantén la respiración durante 4 segundos.",
    videoUrl: "https://www.youtube.com/watch?v=0BNejY1e9ik"
  },
  {
    id: 7,
    title: "Mindfulness Guiado",
    type: "meditation",
    tags: ["estrés", "relajación"],
    duration: "10:00",
    icon: Flower2,
    instructions: "Escucha una grabación de meditación guiada y sigue las instrucciones."
  },
  {
    id: 8,
    title: "Respiración Oceánica",
    type: "breathing",
    tags: ["relajación"],
    duration: "05:15",
    icon: Wind,
    instructions: "Imagina que estás en la playa y sincroniza tu respiración con las olas del mar.",
    videoUrl: "https://www.youtube.com/watch?v=0BNejY1e9ik"
  }
];

const Ejercicio = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  
  const exercise = exercises.find(ex => ex.id === Number(id));
  
  useEffect(() => {
    if (!exercise) {
      navigate('/bienestar');
      return;
    }
    
    const [minutes, seconds] = exercise.duration.split(':').map(Number);
    setTimeRemaining(minutes * 60 + seconds);
  }, [exercise, navigate]);
  
  useEffect(() => {
    let interval: number | undefined;
    
    if (isPlaying && timeRemaining > 0) {
      interval = window.setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, timeRemaining]);
  
  if (!exercise) return null;
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleReset = () => {
    const [minutes, seconds] = exercise.duration.split(':').map(Number);
    setTimeRemaining(minutes * 60 + seconds);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4">
      <Button 
        variant="ghost" 
        className="mb-6"
        onClick={() => navigate('/bienestar')}
      >
        ← Volver
      </Button>
      
      <Card className="max-w-2xl mx-auto bg-secondary/50 backdrop-blur-sm border-secondary/20">
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <exercise.icon className="w-8 h-8 text-white" />
            <div>
              <h1 className="text-2xl font-bold text-white">{exercise.title}</h1>
              <p className="text-gray-300">{exercise.description}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {exercise.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 rounded-full bg-secondary/30 text-sm text-white">
                  {tag}
                </span>
              ))}
            </div>
            
            {exercise.instructions && (
              <p className="text-gray-200 leading-relaxed">
                {exercise.instructions}
              </p>
            )}

            {exercise.type === "breathing" && exercise.videoUrl && (
              <div className="aspect-video w-full rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={exercise.videoUrl.replace('watch?v=', 'embed/')}
                  title={exercise.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
          
          {exercise.type === "meditation" && (
            <div className="flex flex-col items-center gap-4 pt-4">
              <div className="text-4xl font-mono text-white">
                {formatTime(timeRemaining)}
              </div>
              
              <div className="flex gap-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-16 h-16 rounded-full"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8" />
                  )}
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="w-16 h-16 rounded-full"
                  onClick={handleReset}
                >
                  <RotateCcw className="w-8 h-8" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Ejercicio;
