import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayCircle } from "lucide-react";
import { Exercise } from "@/types/exercises";

interface ExerciseCardProps {
  exercise: Exercise;
  onClick: (id: number) => void;
}

const ExerciseCard = ({ exercise, onClick }: ExerciseCardProps) => {
  return (
    <Card 
      key={exercise.id} 
      className="card-gradient p-4 space-y-2 cursor-pointer relative overflow-hidden border-none shadow-lg"
      onClick={() => onClick(exercise.id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <exercise.icon className="w-6 h-6 text-white" />
          <div>
            <h2 className="text-lg font-semibold text-white">{exercise.title}</h2>
            {exercise.description && (
              <p className="text-sm text-gray-200">{exercise.description}</p>
            )}
          </div>
        </div>
        <PlayCircle className="w-10 h-10 text-white fill-white/10" />
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="flex flex-wrap gap-2">
          {exercise.tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="bg-white/20 hover:bg-white/30 text-white border-none"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <span className="text-sm text-gray-200">{exercise.duration} min</span>
      </div>
    </Card>
  );
};

export default ExerciseCard;