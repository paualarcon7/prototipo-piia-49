
import { ReactNode } from "react";

export interface Stage {
  title: string;
  icon: ReactNode;
  description: string;
  steps: string[];
}

export interface Option {
  value: string;
  label: string;
  color: string;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
  isTextInput?: boolean;
  isStarRating?: boolean;
}
