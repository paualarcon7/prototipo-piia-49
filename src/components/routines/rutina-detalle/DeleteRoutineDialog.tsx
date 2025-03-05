
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteRoutineDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onDelete: () => void;
}

export const DeleteRoutineDialog = ({
  isOpen,
  setIsOpen,
  onDelete
}: DeleteRoutineDialogProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="bg-secondary border-secondary/20">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">¿Eliminar rutina?</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            Esta acción no se puede deshacer. La rutina será eliminada permanentemente y se quitará de tu Google Calendar si está sincronizada.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-transparent border-secondary/20 text-white">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction 
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={onDelete}
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
