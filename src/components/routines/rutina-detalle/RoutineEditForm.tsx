
import { Input } from "@/components/ui/input";
import { RoutineTimeSelector } from "@/components/routines/RoutineTimeSelector";
import { DaySelector } from "@/components/routines/DaySelector";
import { WeekDay } from "@/types/rutina";

interface RoutineEditFormProps {
  routineName: string;
  startTime: string;
  endTime: string;
  selectedDays: WeekDay[];
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
  onDayToggle: (day: WeekDay) => void;
}

export const RoutineEditForm = ({
  routineName,
  startTime,
  endTime,
  selectedDays,
  onNameChange,
  onStartTimeChange,
  onEndTimeChange,
  onDayToggle
}: RoutineEditFormProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Nombre de la rutina</label>
        <Input 
          value={routineName}
          onChange={onNameChange}
          className="bg-secondary/50 border-secondary/30 text-white text-lg font-semibold"
        />
      </div>
      
      <div className="space-y-3">
        <h3 className="text-sm text-gray-400">Horario</h3>
        <RoutineTimeSelector 
          startTime={startTime}
          endTime={endTime}
          onStartTimeChange={onStartTimeChange}
          onEndTimeChange={onEndTimeChange}
        />
      </div>
      
      <div className="space-y-3">
        <h3 className="text-sm text-gray-400">Días de la semana</h3>
        <DaySelector 
          selectedDays={selectedDays}
          onToggle={onDayToggle}
        />
      </div>
    </div>
  );
};
