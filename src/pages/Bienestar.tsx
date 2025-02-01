import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flower2, Wind } from "lucide-react";
import ExerciseFilters from "@/components/exercises/ExerciseFilters";
import ExerciseCard from "@/components/exercises/ExerciseCard";
import { Exercise, ExerciseType, Tag } from "@/types/exercises";

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
    icon: Flower2
  },
  {
    id: 4,
    title: "Respiración 4-7-8",
    type: "breathing",
    tags: ["ansiedad", "relajación"],
    duration: "03:45",
    icon: Wind
  },
  {
    id: 5,
    title: "Meditación del Amanecer",
    type: "meditation",
    tags: ["gratitud", "relajación"],
    duration: "08:00",
    icon: Flower2
  },
  {
    id: 6,
    title: "Respiración Cuadrada",
    type: "breathing",
    tags: ["estrés", "ansiedad"],
    duration: "04:20",
    icon: Wind
  },
  {
    id: 7,
    title: "Mindfulness Guiado",
    type: "meditation",
    tags: ["estrés", "relajación"],
    duration: "10:00",
    icon: Flower2
  },
  {
    id: 8,
    title: "Respiración Oceánica",
    type: "breathing",
    tags: ["relajación"],
    duration: "05:15",
    icon: Wind
  }
];

const Bienestar = () => {
  const [selectedType, setSelectedType] = useState<ExerciseType>("all");
  const [selectedTag, setSelectedTag] = useState<Tag>("all");
  const navigate = useNavigate();

  const filteredExercises = exercises.filter((exercise) => {
    const typeMatch = selectedType === "all" || exercise.type === selectedType;
    const tagMatch = selectedTag === "all" || exercise.tags.includes(selectedTag as Exclude<Tag, "all">);
    return typeMatch && tagMatch;
  });

  const handleExerciseClick = (exerciseId: number) => {
    navigate(`/ejercicio/${exerciseId}`);
  };

  return (
    <div className="flex flex-col h-screen bg-transparent">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <ExerciseFilters
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
        
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onClick={handleExerciseClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bienestar;
