
import { Input } from "@/components/ui/input";
import { RoutineTimeSelector } from "@/components/routines/RoutineTimeSelector";
import { DaySelector } from "@/components/routines/DaySelector";
import { WeekDay, Routine } from "@/types/rutina";
import { ColorSelector } from "./ColorSelector";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

interface RoutineEditFormProps {
  routine: Routine;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
  onDayToggle: (day: WeekDay) => void;
  onActiveToggle: () => void;
  onNotificationToggle: () => void;
  onMinutesBeforeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onColorChange: (color: string) => void;
}

export const RoutineEditForm = ({
  routine,
  onNameChange,
  onStartTimeChange,
  onEndTimeChange,
  onDayToggle,
  onActiveToggle,
  onNotificationToggle,
  onMinutesBeforeChange,
  onColorChange
}: RoutineEditFormProps) => {
  return (
    <div className="space-y-6">
      {/* Basic Info Section */}
      <div className="space-y-2">
        <label className="text-sm text-[#C8C8C9]">Nombre de la rutina</label>
        <Input 
          value={routine.name}
          onChange={onNameChange}
          className="bg-[#1A1F2C]/50 border-[#1A1F2C]/30 text-white text-lg font-semibold"
        />
      </div>
      
      <div className="space-y-3">
        <h3 className="text-sm text-[#C8C8C9]">Horario</h3>
        <RoutineTimeSelector 
          startTime={routine.time.start}
          endTime={routine.time.end}
          onStartTimeChange={onStartTimeChange}
          onEndTimeChange={onEndTimeChange}
        />
      </div>
      
      <div className="space-y-3">
        <h3 className="text-sm text-[#C8C8C9]">Días de la semana</h3>
        <DaySelector 
          selectedDays={routine.days}
          onToggle={onDayToggle}
        />
      </div>

      <Separator className="my-4 bg-secondary/30" />

      {/* Settings Section */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-white">Ajustes</h2>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">Estado de la rutina</h3>
            <p className="text-xs text-[#C8C8C9] mt-1">
              Activa o desactiva temporalmente esta rutina
            </p>
          </div>
          <Switch
            checked={routine.isActive}
            onCheckedChange={onActiveToggle}
          />
        </div>
        
        <ColorSelector
          currentColor={routine.color}
          onColorChange={onColorChange}
          disabled={false}
        />
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">Notificaciones</h3>
            <p className="text-xs text-[#C8C8C9] mt-1">
              Recibe recordatorios antes de comenzar
            </p>
          </div>
          <Switch
            checked={routine.notification.enabled}
            onCheckedChange={onNotificationToggle}
          />
        </div>
        
        {routine.notification.enabled && (
          <div className="pl-6 mt-2">
            <label className="text-sm text-[#C8C8C9] block mb-2">
              Avisar antes
            </label>
            <select 
              value={routine.notification.minutesBefore}
              onChange={onMinutesBeforeChange}
              className="w-full bg-[#1A1F2C]/50 border border-[#1A1F2C]/30 rounded-md p-2 text-white"
            >
              <option value={5}>5 minutos</option>
              <option value={10}>10 minutos</option>
              <option value={15}>15 minutos</option>
              <option value={30}>30 minutos</option>
              <option value={60}>1 hora</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};
