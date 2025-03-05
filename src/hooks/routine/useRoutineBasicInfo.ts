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
    const [prevStartHours, prevStartMinutes] = routine.time.start.split(":").map(Number);
    const [prevEndHours, prevEndMinutes] = routine.time.end.split(":").map(Number);
    
    const prevStartTotalMinutes = prevStartHours * 60 + prevStartMinutes;
    const prevEndTotalMinutes = prevEndHours * 60 + prevEndMinutes;
    const duration = prevEndTotalMinutes - prevStartTotalMinutes;
    
    const [newStartHours, newStartMinutes] = time.split(":").map(Number);
    const newStartTotalMinutes = newStartHours * 60 + newStartMinutes;
    const newEndTotalMinutes = newStartTotalMinutes + duration;
    
    const newEndHours = Math.floor(newEndTotalMinutes / 60) % 24;
    const newEndMinutes = newEndTotalMinutes % 60;
    
    const formattedEndHours = newEndHours.toString().padStart(2, "0");
    const formattedEndMinutes = newEndMinutes.toString().padStart(2, "0");
    
    setRoutine(prev => ({
      ...prev,
      time: {
        start: time,
        end: `${formattedEndHours}:${formattedEndMinutes}`
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
