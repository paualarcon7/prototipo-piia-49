
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { BookText, Smile, Upload, Camera, FolderPlus } from "lucide-react";

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
      <DialogContent className="w-[85vw] max-w-[280px] p-0 mx-auto sm:w-[90vw] sm:max-w-sm bg-[#1A1F2C]">
        <div className="flex flex-col divide-y divide-white/10">
          <Button
            variant="ghost"
            className="flex items-center gap-4 h-auto py-4 px-6 rounded-none hover:bg-white/5 text-white"
            onClick={() => onSelectOption("entry")}
          >
            <Upload className="w-5 h-5 shrink-0 text-gray-300" />
            <span className="text-base font-normal">Subir archivo</span>
          </Button>

          <Button
            variant="ghost"
            className="flex items-center gap-4 h-auto py-4 px-6 rounded-none hover:bg-white/5 text-white"
            onClick={() => onSelectOption("entry")}
          >
            <Camera className="w-5 h-5 shrink-0 text-gray-300" />
            <span className="text-base font-normal">Tomar una foto</span>
          </Button>

          <Button
            variant="ghost"
            className="flex items-center gap-4 h-auto py-4 px-6 rounded-none hover:bg-white/5 text-white"
            onClick={() => onSelectOption("entry")}
          >
            <BookText className="w-5 h-5 shrink-0 text-gray-300" />
            <span className="text-base font-normal">Nueva entrada</span>
          </Button>

          <Button
            variant="ghost"
            className="flex items-center gap-4 h-auto py-4 px-6 rounded-none hover:bg-white/5 text-white"
            onClick={() => onSelectOption("emotional")}
          >
            <Smile className="w-5 h-5 shrink-0 text-gray-300" />
            <span className="text-base font-normal">Estado emocional</span>
          </Button>

          <Button
            variant="ghost"
            className="flex items-center gap-4 h-auto py-4 px-6 rounded-none hover:bg-white/5 text-white"
            onClick={() => onSelectOption("entry")}
          >
            <FolderPlus className="w-5 h-5 shrink-0 text-gray-300" />
            <span className="text-base font-normal">Crear carpeta</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
