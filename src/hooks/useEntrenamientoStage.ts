
import { useState, useRef, useEffect } from "react";

export const useEntrenamientoStage = (setStageStatus: (stage: string, status: "completed" | "in-progress" | "pending") => void) => {
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
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (trainingInterval.current) {
        clearInterval(trainingInterval.current);
      }
    };
  }, []);

  return {
    trainingProgress,
    exerciseComplete,
    startTrainingExercise
  };
};
