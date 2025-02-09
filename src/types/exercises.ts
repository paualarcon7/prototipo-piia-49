
import { Flower2, Wind } from "lucide-react";

export interface Exercise {
  id: number;
  title: string;
  type: "meditation" | "breathing";
  tags: string[];
  duration: string;
  description?: string;
  icon: typeof Flower2 | typeof Wind;
  instructions?: string;
  videoUrl?: string;
}
