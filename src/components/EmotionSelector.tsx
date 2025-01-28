import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

type Emotion = {
  id: number;
  name: string;
  color: string;
  icon: string;
};

const emotions: Emotion[] = [
  { id: 1, name: "Muy mal", color: "bg-purple-300", icon: ">_<" },
  { id: 2, name: "Mal", color: "bg-blue-300", icon: ":-(" },
  { id: 3, name: "Normal", color: "bg-neutral-300", icon: ":-|" },
  { id: 4, name: "Bien", color: "bg-green-300", icon: ":-)" },
  { id: 5, name: "Muy bien", color: "bg-yellow-300", icon: "^_^" },
];

interface EmotionSelectorProps {
  onSelect: (emotion: Emotion) => void;
  selectedEmotion: Emotion | null;
}

const EmotionSelector = ({ onSelect, selectedEmotion }: EmotionSelectorProps) => {
  return (
    <Card className="p-4 bg-secondary/50 backdrop-blur-sm border-secondary/20">
      <h3 className="text-lg font-semibold mb-4 text-white">¿Cómo te sientes en este momento?</h3>
      <div className="flex justify-between items-center gap-2">
        {emotions.map((emotion) => (
          <button
            key={emotion.id}
            onClick={() => onSelect(emotion)}
            className={`${
              emotion.color
            } w-12 h-12 rounded-full flex items-center justify-center text-lg transition-transform ${
              selectedEmotion?.id === emotion.id ? "scale-110 ring-2 ring-purple-500" : ""
            }`}
          >
            {emotion.icon}
          </button>
        ))}
      </div>
    </Card>
  );
};

export default EmotionSelector;