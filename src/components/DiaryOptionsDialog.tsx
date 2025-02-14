
import { Dialog, DialogContent } from "./ui/dialog";
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
      <DialogContent className="w-[85vw] max-w-[280px] p-3 mx-auto sm:w-[90vw] sm:max-w-sm sm:p-6">
        <div className="flex flex-col gap-3">
          <Button
            variant="outline"
            className="flex items-start gap-3 h-auto p-3 sm:p-4 hover:bg-purple-500/10"
            onClick={() => onSelectOption("entry")}
          >
            <BookText className="w-5 h-5 mt-0.5 shrink-0" />
            <div className="text-left">
              <div className="font-semibold mb-0.5">Nueva entrada</div>
              <div className="text-sm text-muted-foreground">
                Registra tus pensamientos y experiencias
              </div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="flex items-start gap-3 h-auto p-3 sm:p-4 hover:bg-purple-500/10"
            onClick={() => onSelectOption("emotional")}
          >
            <Smile className="w-5 h-5 mt-0.5 shrink-0" />
            <div className="text-left">
              <div className="font-semibold mb-0.5">Estado emocional</div>
              <div className="text-sm text-muted-foreground">
                Registra tu nivel de energía y satisfacción
              </div>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
