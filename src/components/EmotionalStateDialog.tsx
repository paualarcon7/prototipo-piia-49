
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { Slider } from "./ui/slider";
import { Textarea } from "./ui/textarea";
import EmotionWords from "./EmotionWords";

interface EmotionalStateDialogProps {
  open: boolean;
  onClose: () => void;
}

const satisfactionEmojis = [
  { emoji: "😠", label: "Terriblemente Insatisfecho" },
  { emoji: "🙁", label: "Muy Insatisfecho" },
  { emoji: "😕", label: "Insatisfecho" },
  { emoji: "😞", label: "Ligeramente Insatisfecho" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "🙂", label: "Ligeramente Satisfecho" },
  { emoji: "😊", label: "Satisfecho" },
  { emoji: "😄", label: "Bastante Satisfecho" },
  { emoji: "😁", label: "Muy Satisfecho" },
  { emoji: "🥰", label: "Extremadamente Satisfecho" },
];

export const EmotionalStateDialog = ({ open, onClose }: EmotionalStateDialogProps) => {
  const [energyLevel, setEnergyLevel] = useState<number>(5);
  const [satisfaction, setSatisfaction] = useState<number>(5);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    // Aquí iría la lógica para guardar el estado emocional
    onClose();
    setEnergyLevel(5);
    setSatisfaction(5);
    setSelectedWords([]);
    setNotes("");
  };

  const handleClose = () => {
    onClose();
    setEnergyLevel(5);
    setSatisfaction(5);
    setSelectedWords([]);
    setNotes("");
  };

  const getEmotionName = (satisfaction: number) => {
    if (satisfaction <= 2) return "Muy mal";
    if (satisfaction <= 4) return "Mal";
    if (satisfaction === 5) return "Normal";
    if (satisfaction <= 7) return "Bien";
    return "Muy bien";
  };

  const handleWordSelect = (word: string) => {
    setSelectedWords(prev => 
      prev.includes(word) 
        ? prev.filter(w => w !== word)
        : [...prev, word]
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold mb-4">
            ¿Cómo te sientes?
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {/* Energy Level Section */}
          <div>
            <h3 className="font-medium mb-4">Nivel de energía</h3>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 flex items-center justify-center">
                <Zap 
                  className={`w-16 h-16 transition-colors ${
                    energyLevel > 7 ? "text-yellow-400" :
                    energyLevel > 5 ? "text-yellow-300" :
                    "text-gray-400"
                  }`}
                  fill={energyLevel > 5 ? "currentColor" : "none"}
                  strokeWidth={1}
                />
              </div>
              <div className="flex-1">
                <Slider
                  value={[energyLevel]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={([value]) => setEnergyLevel(value)}
                  className="mt-2"
                />
              </div>
            </div>
          </div>

          {/* Satisfaction Level Section */}
          <div>
            <h3 className="font-medium mb-4">Nivel de satisfacción</h3>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 flex items-center justify-center text-5xl">
                {satisfactionEmojis[satisfaction - 1].emoji}
              </div>
              <div className="flex-1">
                <Slider
                  value={[satisfaction]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={([value]) => setSatisfaction(value)}
                  className="mt-2"
                />
              </div>
            </div>
          </div>

          {/* Emotion Words */}
          <EmotionWords
            emotionName={getEmotionName(satisfaction)}
            selectedWords={selectedWords}
            onSelectWord={handleWordSelect}
          />

          {/* Notes Section */}
          <div>
            <Textarea
              placeholder="¿Quieres agregar alguna nota sobre cómo te sientes?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button 
              onClick={handleSave}
              className="px-6 bg-purple-500 hover:bg-purple-600"
            >
              Guardar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
