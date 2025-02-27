
import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useVideoCarousel } from "./VideoCarouselContext";

interface PurposeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
}

export function PurposeModal({ open, onOpenChange, onSubmit }: PurposeModalProps) {
  const [purpose, setPurpose] = React.useState("");

  const handleSubmit = () => {
    console.log("User purpose:", purpose);
    onSubmit();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">¿Cuál es tu propósito para este módulo?</DialogTitle>
          <DialogDescription>
            Piia, tu asistente personalizado, desea conocer tus objetivos para este módulo.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-start space-x-4 pt-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF4081] to-[#9C27B0] flex items-center justify-center">
            <span className="text-white font-bold">P</span>
          </div>
          <Textarea
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="Escribe tu propósito aquí..."
            className="flex-1 min-h-[100px]"
          />
        </div>
        <DialogFooter>
          <Button 
            type="submit" 
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-[#FF4081] to-[#9C27B0] hover:opacity-90"
          >
            Enviar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
