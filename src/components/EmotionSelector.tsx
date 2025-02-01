import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Angry, Frown, Meh, Smile, SmilePlus } from "lucide-react";

type Emotion = {
  id: number;
  name: string;
  color: string;
  icon: React.ReactNode;
};

const emotions: Emotion[] = [
  { 
    id: 1, 
    name: "Muy mal", 
    color: "bg-red-400/90 hover:bg-red-400", 
    icon: <Angry className="w-6 h-6 text-red-950" /> 
  },
  { 
    id: 2, 
    name: "Mal", 
    color: "bg-blue-400/90 hover:bg-blue-400", 
    icon: <Frown className="w-6 h-6 text-blue-950" /> 
  },
  { 
    id: 3, 
    name: "Normal", 
    color: "bg-purple-400/90 hover:bg-purple-400", 
    icon: <Meh className="w-6 h-6 text-purple-950" /> 
  },
  { 
    id: 4, 
    name: "Bien", 
    color: "bg-green-400/90 hover:bg-green-400", 
    icon: <Smile className="w-6 h-6 text-green-950" /> 
  },
  { 
    id: 5, 
    name: "Muy bien", 
    color: "bg-yellow-400/90 hover:bg-yellow-400", 
    icon: <SmilePlus className="w-6 h-6 text-yellow-950" /> 
  },
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
            } w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
              selectedEmotion?.id === emotion.id 
                ? "scale-110 ring-2 ring-purple-500 shadow-lg" 
                : "hover:scale-105 shadow-md"
            }`}
          >
            {emotion.icon}
          </button>
        ))}
      </div>
      <div className="flex justify-between items-center mt-2 px-1">
        {emotions.map((emotion) => (
          <span key={emotion.id} className="text-sm text-gray-300 w-12 text-center">
            {emotion.name}
          </span>
        ))}
      </div>
    </Card>
  );
};

export default EmotionSelector;