
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
      <DialogContent className="max-w-xs mx-auto">
        <div className="flex flex-col gap-4 py-4">
          <Button
            variant="outline"
            className="flex items-center gap-2 h-auto py-4"
            onClick={() => onSelectOption("entry")}
          >
            <BookText className="w-5 h-5" />
            <div className="text-left">
              <div className="font-semibold">Nueva entrada</div>
              <div className="text-sm text-muted-foreground">
                Registra tus pensamientos y experiencias
              </div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2 h-auto py-4"
            onClick={() => onSelectOption("emotional")}
          >
            <Smile className="w-5 h-5" />
            <div className="text-left">
              <div className="font-semibold">Estado emocional</div>
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
