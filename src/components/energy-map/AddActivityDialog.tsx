
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EnergyRatingSelector } from "./EnergyRatingSelector";
import { EnergyActivity } from "@/types/energyMap";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";

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
  const [hours, setHours] = useState<string[]>([]);
  const [minutes, setMinutes] = useState<string[]>([]);

  useEffect(() => {
    // Generate hours (00-23)
    const hoursArray = Array.from({ length: 24 }, (_, i) => 
      i.toString().padStart(2, '0')
    );
    setHours(hoursArray);

    // Generate minutes (00-55, step of 5)
    const minutesArray = Array.from({ length: 12 }, (_, i) => 
      (i * 5).toString().padStart(2, '0')
    );
    setMinutes(minutesArray);
  }, []);

  const handleTimeChange = (type: 'start' | 'end', timeType: 'hour' | 'minute', value: string) => {
    const currentTime = type === 'start' ? newActivity.startTime : newActivity.endTime;
    const [currentHour, currentMinute] = currentTime?.split(':') || ['00', '00'];
    
    const newTime = timeType === 'hour' 
      ? `${value}:${currentMinute}`
      : `${currentHour}:${value}`;

    onActivityChange({
      ...newActivity,
      [type === 'start' ? 'startTime' : 'endTime']: newTime
    });
  };

  const TimeSelector = ({ type, value }: { type: 'start' | 'end', value: string }) => {
    const [hour, minute] = value?.split(':') || ['00', '00'];

    return (
      <div className="flex gap-2">
        <div className="space-y-2 flex-1">
          <label className="text-sm text-gray-400">Hora</label>
          <Select 
            value={hour} 
            onValueChange={(value) => handleTimeChange(type, 'hour', value)}
          >
            <SelectTrigger className="bg-black/40">
              <SelectValue placeholder="Hora" />
            </SelectTrigger>
            <SelectContent className="max-h-[200px]">
              {hours.map((h) => (
                <SelectItem key={h} value={h}>
                  {h}:00
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 flex-1">
          <label className="text-sm text-gray-400">Minutos</label>
          <Select 
            value={minute} 
            onValueChange={(value) => handleTimeChange(type, 'minute', value)}
          >
            <SelectTrigger className="bg-black/40">
              <SelectValue placeholder="Min" />
            </SelectTrigger>
            <SelectContent>
              {minutes.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva Actividad</DialogTitle>
          <DialogDescription>
            Registra una nueva actividad y califica su impacto en tu energía
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">
                Hora de inicio
              </label>
              <TimeSelector 
                type="start" 
                value={newActivity.startTime || '00:00'} 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">
                Hora de fin
              </label>
              <TimeSelector 
                type="end" 
                value={newActivity.endTime || '00:00'} 
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
