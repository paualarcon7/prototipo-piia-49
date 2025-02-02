import { Card } from "./ui/card";

type Emotion = {
  id: number;
  name: string;
  color: string;
  icon: string;
};

interface EmotionSelectorProps {
  onSelect: (emotion: Emotion) => void;
  selectedEmotion: Emotion | null;
}

const emotions: Emotion[] = [
  { 
    id: 1, 
    name: "Muy mal", 
    color: "bg-gradient-to-br from-red-400 to-red-500", 
    icon: "😫" 
  },
  { 
    id: 2, 
    name: "Mal", 
    color: "bg-gradient-to-br from-orange-400 to-orange-500", 
    icon: "😕" 
  },
  { 
    id: 3, 
    name: "Normal", 
    color: "bg-gradient-to-br from-yellow-400 to-yellow-500", 
    icon: "😐" 
  },
  { 
    id: 4, 
    name: "Bien", 
    color: "bg-gradient-to-br from-green-400 to-green-500", 
    icon: "😊" 
  },
  { 
    id: 5, 
    name: "Muy bien", 
    color: "bg-gradient-to-br from-purple-400 to-purple-500", 
    icon: "😄" 
  },
];

const EmotionSelector = ({ onSelect, selectedEmotion }: EmotionSelectorProps) => {
  return (
    <Card className="p-6 bg-white/10 backdrop-blur-lg border-0 shadow-xl">
      <h3 className="text-xl font-semibold mb-6 text-white text-center">¿Cómo te sientes en este momento?</h3>
      <div className="flex justify-between items-center gap-2">
        {emotions.map((emotion) => (
          <button
            key={emotion.id}
            onClick={() => onSelect(emotion)}
            className={`${
              emotion.color
            } w-16 h-16 rounded-2xl flex items-center justify-center text-4xl transition-all duration-200 ${
              selectedEmotion?.id === emotion.id 
                ? "scale-110 ring-4 ring-white/30 shadow-lg" 
                : "hover:scale-105 shadow-md hover:shadow-lg"
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