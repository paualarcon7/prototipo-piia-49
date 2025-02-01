import { Flower2, Wind } from "lucide-react";

export type ExerciseType = "meditation" | "breathing" | "all";
export type Tag = "estrés" | "ansiedad" | "relajación" | "gratitud" | "all";

export interface Exercise {
  id: number;
  title: string;
  type: Exclude<ExerciseType, "all">;
  tags: Exclude<Tag, "all">[];
  duration: string;
  description?: string;
  icon: typeof Flower2 | typeof Wind;
  instructions?: string;
  videoUrl?: string;
}