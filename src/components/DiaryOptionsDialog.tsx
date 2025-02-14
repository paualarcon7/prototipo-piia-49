
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { BookText, Smile } from "lucide-react";

interface DiaryOptionsDialogProps {
  open: boolean;
  onClose: () => void;
  onSelectOption: (option: "entry" | "emotional") => void;
}

export const DiaryOptionsDialog = ({
  open,
  onClose,
  onSelectOption,
}: DiaryOptionsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] sm:max-w-sm mx-auto p-0 gap-0 bg-[#1A1F2C] border-[#1A1F2C]">
        <DialogTitle className="sr-only">Opciones de diario</DialogTitle>
        <div className="flex flex-col">
          <Button
            variant="ghost"
            className="flex items-center gap-3 h-auto px-6 py-8 rounded-none hover:bg-white/5 border-b border-white/10 text-white"
            onClick={() => onSelectOption("entry")}
          >
            <BookText className="w-6 h-6 shrink-0" />
            <div className="text-left">
              <div className="font-semibold text-lg">Nueva entrada</div>
              <div className="text-base text-gray-400">
                Registra tus pensamientos y experiencias
              </div>
            </div>
          </Button>

          <Button
            variant="ghost"
            className="flex items-center gap-3 h-auto px-6 py-8 rounded-none hover:bg-white/5 text-white"
            onClick={() => onSelectOption("emotional")}
          >
            <Smile className="w-6 h-6 shrink-0" />
            <div className="text-left">
              <div className="font-semibold text-lg">Estado emocional</div>
              <div className="text-base text-gray-400">
                Registra tu nivel de energía y satisfacción
              </div>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
