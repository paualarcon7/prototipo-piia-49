
import { Routine, WeekDay } from "@/types/rutina";

export function useRoutineBasicInfo(routine: Routine, setRoutine: React.Dispatch<React.SetStateAction<Routine>>) {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoutine(prev => ({
      ...prev,
      name: e.target.value
    }));
  };

  const handleDayToggle = (day: WeekDay) => {
    setRoutine(prev => ({
      ...prev,
      days: prev.days.includes(day) 
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  const handleStartTimeChange = (time: string) => {
    setRoutine(prev => ({
      ...prev,
      time: {
        ...prev.time,
        start: time
      }
    }));
  };

  const handleEndTimeChange = (time: string) => {
    setRoutine(prev => ({
      ...prev,
      time: {
        ...prev.time,
        end: time
      }
    }));
  };

  return {
    handleNameChange,
    handleDayToggle,
    handleStartTimeChange,
    handleEndTimeChange
  };
}
