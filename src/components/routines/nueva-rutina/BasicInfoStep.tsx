
import { Input } from "@/components/ui/input";
import { RoutineTimeSelector } from "@/components/routines/RoutineTimeSelector";
import { DaySelector } from "@/components/routines/DaySelector";
import { WeekDay } from "@/types/rutina";

interface BasicInfoStepProps {
  routineName: string;
  startTime: string;
  endTime: string;
  selectedDays: WeekDay[];
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
  onDayToggle: (day: WeekDay) => void;
}

export const BasicInfoStep = ({
  routineName,
  startTime,
  endTime,
  selectedDays,
  onNameChange,
  onStartTimeChange,
  onEndTimeChange,
  onDayToggle
}: BasicInfoStepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-medium text-white">Nombre de la rutina</h2>
        <Input 
          value={routineName}
          onChange={onNameChange}
          placeholder="Mi rutina"
          className="bg-secondary/50 border-secondary/30 text-white"
        />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-lg font-medium text-white">Horario</h2>
        <RoutineTimeSelector 
          startTime={startTime}
          endTime={endTime}
          onStartTimeChange={onStartTimeChange}
          onEndTimeChange={onEndTimeChange}
        />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-lg font-medium text-white">Días de la semana</h2>
        <DaySelector 
          selectedDays={selectedDays}
          onToggle={onDayToggle}
        />
      </div>
    </div>
  );
};
