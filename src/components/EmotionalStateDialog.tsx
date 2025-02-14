
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";

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
  const [step, setStep] = useState<1 | 2>(1);
  const [energyLevel, setEnergyLevel] = useState<number | null>(null);
  const [satisfaction, setSatisfaction] = useState<number | null>(null);

  const handleSave = () => {
    // Aquí iría la lógica para guardar el estado emocional
    onClose();
    setStep(1);
    setEnergyLevel(null);
    setSatisfaction(null);
  };

  const handleClose = () => {
    onClose();
    setStep(1);
    setEnergyLevel(null);
    setSatisfaction(null);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold mb-4">
            {step === 1
              ? "En este momento, ¿cómo describirías tu nivel de energía?"
              : "En este momento ¿qué tan satisfecho estás?"}
          </DialogTitle>
        </DialogHeader>

        {step === 1 ? (
          <div className="flex overflow-x-auto gap-2 py-4 px-2 min-w-0">
            {[...Array(10)].map((_, i) => (
              <Button
                key={i}
                variant="outline"
                className={`flex-shrink-0 aspect-square p-0 w-12 h-12 transition-all hover:scale-110 ${
                  energyLevel === i + 1 
                    ? "ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20" 
                    : ""
                }`}
                onClick={() => {
                  setEnergyLevel(i + 1);
                  setStep(2);
                }}
              >
                <Zap
                  className={`w-7 h-7 transition-colors ${
                    i < 5 ? "text-gray-400" : "text-yellow-400"
                  }`}
                  fill={i < 5 ? "none" : "currentColor"}
                />
              </Button>
            ))}
          </div>
        ) : (
          <div className="flex overflow-x-auto gap-2 py-4 px-2 min-w-0">
            {satisfactionEmojis.map((emoji, i) => (
              <Button
                key={i}
                variant="outline"
                className={`flex-shrink-0 aspect-square p-0 w-12 h-12 text-2xl transition-all hover:scale-110 ${
                  satisfaction === i + 1 
                    ? "ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20" 
                    : ""
                }`}
                onClick={() => setSatisfaction(i + 1)}
                title={emoji.label}
              >
                {emoji.emoji}
              </Button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="flex justify-end gap-2 mt-4">
            <Button 
              variant="outline" 
              onClick={() => setStep(1)}
              className="px-6"
            >
              Anterior
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={!satisfaction}
              className="px-6 bg-purple-500 hover:bg-purple-600"
            >
              Guardar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
