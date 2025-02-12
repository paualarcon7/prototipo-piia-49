
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { EnergyRatingSelector } from "./EnergyRatingSelector";
import { EnergyActivity } from "@/types/energyMap";

interface AddActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newActivity: Partial<EnergyActivity>;
  onActivityChange: (activity: Partial<EnergyActivity>) => void;
  onSave: () => void;
}

export const AddActivityDialog = ({
  open,
  onOpenChange,
  newActivity,
  onActivityChange,
  onSave
}: AddActivityDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva Actividad</DialogTitle>
          <DialogDescription>
            Registra una nueva actividad y califica su impacto en tu energía
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="startTime" className="text-sm text-gray-400">
                Hora de inicio
              </label>
              <Input
                id="startTime"
                type="time"
                value={newActivity.startTime}
                onChange={(e) => onActivityChange({ ...newActivity, startTime: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="endTime" className="text-sm text-gray-400">
                Hora de fin
              </label>
              <Input
                id="endTime"
                type="time"
                value={newActivity.endTime}
                onChange={(e) => onActivityChange({ ...newActivity, endTime: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm text-gray-400">
              Descripción (opcional)
            </label>
            <Textarea
              id="description"
              value={newActivity.description}
              onChange={(e) => onActivityChange({ ...newActivity, description: e.target.value })}
              placeholder="Describe brevemente la actividad..."
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 block text-center mb-2">
              ¿Qué tan energizante fue esta actividad?
            </label>
            <EnergyRatingSelector
              value={newActivity.energyRating || 3}
              onChange={(rating) => onActivityChange({ ...newActivity, energyRating: rating })}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onSave}>
            Guardar Actividad
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
