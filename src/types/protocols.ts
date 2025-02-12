
import { Activity, Heart, Stethoscope } from "lucide-react";

export type ProtocolDimension = "rendimiento" | "bienestar" | "salud" | "all";
export type Tag = 
  | "estrés" 
  | "ansiedad" 
  | "meditación" 
  | "concentración" 
  | "productividad" 
  | "bienestar" 
  | "equilibrio" 
  | "energía"
  | "flujo"
  | "rendimiento"
  | "all";

export interface Protocol {
  id: number;
  title: string;
  dimension: Exclude<ProtocolDimension, "all">;
  tags: Exclude<Tag, "all">[];
  duration: string;
  description?: string;
  icon: typeof Activity | typeof Heart | typeof Stethoscope;
  instructions?: string;
}
