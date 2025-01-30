import ExerciseSection from "@/components/ExerciseSection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flower2, Wind } from "lucide-react";
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
        {/* Filters Section */}
        <div className="space-y-4 bg-secondary/30 backdrop-blur-sm rounded-lg p-4">
          {/* Exercise Type Filter */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white/90">Tipo de ejercicio</h3>
            <div className="flex gap-2 flex-wrap">
              <Button
                size="sm"
                variant={selectedType === "all" ? "secondary" : "outline"}
                onClick={() => setSelectedType("all")}
                className={`flex-1 min-w-[100px] ${
                  selectedType === "all" ? "bg-white/20" : "bg-white/5"
                }`}
              >
                Todos
              </Button>
              <Button
                size="sm"
                variant={selectedType === "meditation" ? "secondary" : "outline"}
                onClick={() => setSelectedType("meditation")}
                className={`flex-1 min-w-[100px] ${
                  selectedType === "meditation" ? "bg-white/20" : "bg-white/5"
                }`}
              >
                <Flower2 className="w-4 h-4 mr-2" />
                Meditación
              </Button>
              <Button
                size="sm"
                variant={selectedType === "breathing" ? "secondary" : "outline"}
                onClick={() => setSelectedType("breathing")}
                className={`flex-1 min-w-[100px] ${
                  selectedType === "breathing" ? "bg-white/20" : "bg-white/5"
                }`}
              >
                <Wind className="w-4 h-4 mr-2" />
                Respiración
              </Button>
            </div>
          </div>

          {/* Tags Filter */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white/90">Etiquetas</h3>
            <div className="flex flex-wrap gap-2">
              {["all", "estrés", "ansiedad", "relajación", "gratitud"].map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className={`cursor-pointer px-3 py-1 ${
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
              className="bg-secondary/50 backdrop-blur-sm border-secondary/20 p-4 space-y-4 hover:bg-secondary/60 transition-colors cursor-pointer"
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
            </Card>
          ))}
        </div>

        <ExerciseSection />
      </div>
    </div>
  );
};

export default Bienestar;