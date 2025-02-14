
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
          <DialogTitle>
            {step === 1
              ? "En este momento, ¿cómo describirías tu nivel de energía?"
              : "En este momento ¿qué tan satisfecho estás?"}
          </DialogTitle>
        </DialogHeader>

        {step === 1 ? (
          <div className="grid grid-cols-5 gap-4 py-4">
            {[...Array(10)].map((_, i) => (
              <Button
                key={i}
                variant="outline"
                className={`aspect-square p-0 ${
                  energyLevel === i + 1 ? "ring-2 ring-purple-500" : ""
                }`}
                onClick={() => {
                  setEnergyLevel(i + 1);
                  setStep(2);
                }}
              >
                <Zap
                  className={`w-6 h-6 ${
                    i < 5 ? "text-gray-400" : "text-yellow-400"
                  }`}
                  fill={i < 5 ? "none" : "currentColor"}
                />
              </Button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-4 py-4">
            {satisfactionEmojis.map((emoji, i) => (
              <Button
                key={i}
                variant="outline"
                className={`aspect-square p-0 text-2xl ${
                  satisfaction === i + 1 ? "ring-2 ring-purple-500" : ""
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
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setStep(1)}>
              Anterior
            </Button>
            <Button onClick={handleSave} disabled={!satisfaction}>
              Guardar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
