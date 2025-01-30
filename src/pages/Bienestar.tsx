import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flower2, Wind, Play } from "lucide-react";
import { useState } from "react";

type ExerciseType = "meditation" | "breathing" | "all";
type Tag = "estrés" | "ansiedad" | "relajación" | "gratitud" | "all";

interface Exercise {
  id: number;
  title: string;
  type: Exclude<ExerciseType, "all">;
  tags: Exclude<Tag, "all">[];
  duration: string;
  icon: typeof Flower2 | typeof Wind;
}

const exercises: Exercise[] = [
  {
    id: 1,
    title: "Armonía Interior",
    type: "meditation",
    tags: ["estrés", "ansiedad"],
    duration: "06:17",
    icon: Flower2
  },
  {
    id: 2,
    title: "Tummo",
    type: "breathing",
    tags: ["estrés", "relajación"],
    duration: "02:50",
    icon: Wind
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

  const filteredExercises = exercises.filter((exercise) => {
    const typeMatch = selectedType === "all" || exercise.type === selectedType;
    const tagMatch = selectedTag === "all" || exercise.tags.includes(selectedTag as Exclude<Tag, "all">);
    return typeMatch && tagMatch;
  });

  return (
    <div className="flex flex-col h-screen bg-transparent">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Filters Section - Now more compact */}
        <div className="bg-secondary/30 backdrop-blur-sm rounded-lg p-3">
          <div className="flex flex-col gap-3">
            {/* Exercise Type Filter - Horizontal layout */}
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={selectedType === "all" ? "secondary" : "outline"}
                onClick={() => setSelectedType("all")}
                className={`h-8 px-3 ${
                  selectedType === "all" ? "bg-white/20" : "bg-white/5"
                }`}
              >
                Todos
              </Button>
              <Button
                size="sm"
                variant={selectedType === "meditation" ? "secondary" : "outline"}
                onClick={() => setSelectedType("meditation")}
                className={`h-8 px-3 ${
                  selectedType === "meditation" ? "bg-white/20" : "bg-white/5"
                }`}
              >
                <Flower2 className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant={selectedType === "breathing" ? "secondary" : "outline"}
                onClick={() => setSelectedType("breathing")}
                className={`h-8 px-3 ${
                  selectedType === "breathing" ? "bg-white/20" : "bg-white/5"
                }`}
              >
                <Wind className="w-4 h-4" />
              </Button>
            </div>

            {/* Tags Filter - Horizontal scrollable */}
            <div className="overflow-x-auto flex gap-2 pb-1">
              {["all", "estrés", "ansiedad", "relajación", "gratitud"].map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className={`cursor-pointer whitespace-nowrap px-2 py-1 text-xs ${
                    selectedTag === tag 
                      ? "bg-white/30 hover:bg-white/40" 
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                  onClick={() => setSelectedTag(tag as Tag)}
                >
                  {tag === "all" ? "Todas" : tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Exercise Cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredExercises.map((exercise) => (
            <Card 
              key={exercise.id} 
              className="group bg-secondary/50 backdrop-blur-sm border-secondary/20 p-4 space-y-4 hover:bg-secondary/60 transition-colors cursor-pointer relative"
            >
              <div className="flex items-center gap-2">
                <exercise.icon className="w-6 h-6 text-white" />
                <h2 className="text-xl font-semibold text-white">{exercise.title}</h2>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {exercise.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-secondary/30">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <span className="text-sm text-gray-300">{exercise.duration} min</span>
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-8 h-8 text-white fill-white" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bienestar;