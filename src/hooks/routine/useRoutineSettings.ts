
import { Routine } from "@/types/rutina";

export function useRoutineSettings(routine: Routine, setRoutine: React.Dispatch<React.SetStateAction<Routine>>) {
  const handleActiveToggle = () => {
    setRoutine(prev => ({
      ...prev,
      isActive: !prev.isActive
    }));
  };

  const handleNotificationToggle = () => {
    setRoutine(prev => ({
      ...prev,
      notification: {
        ...prev.notification,
        enabled: !prev.notification.enabled
      }
    }));
  };

  const handleMinutesBeforeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoutine(prev => ({
      ...prev,
      notification: {
        ...prev.notification,
        minutesBefore: Number(e.target.value)
      }
    }));
  };

  const handleColorChange = (color: string) => {
    console.log("handleColorChange called with color:", color);
    setRoutine(prev => {
      const updatedRoutine = {
        ...prev,
        color
      };
      console.log("Updated routine with new color:", updatedRoutine.color);
      return updatedRoutine;
    });
  };

  return {
    handleActiveToggle,
    handleNotificationToggle,
    handleMinutesBeforeChange,
    handleColorChange
  };
}
