
import { useState } from "react";
import { Clock } from "lucide-react";

interface RoutineTimeSelectorProps {
  startTime: string;
  endTime: string;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
}

export const RoutineTimeSelector = ({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange
}: RoutineTimeSelectorProps) => {
  const [duration, setDuration] = useState(() => {
    // Calculate duration between start and end time
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);
    
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    
    return endTotalMinutes - startTotalMinutes;
  });

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartTime = e.target.value;
    onStartTimeChange(newStartTime);
    
    // Update end time based on duration
    const [hours, minutes] = newStartTime.split(":").map(Number);
    const startTotalMinutes = hours * 60 + minutes;
    const endTotalMinutes = startTotalMinutes + duration;
    
    const endHours = Math.floor(endTotalMinutes / 60) % 24;
    const endMinutes = endTotalMinutes % 60;
    
    const formattedEndHours = endHours.toString().padStart(2, "0");
    const formattedEndMinutes = endMinutes.toString().padStart(2, "0");
    
    onEndTimeChange(`${formattedEndHours}:${formattedEndMinutes}`);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndTime = e.target.value;
    onEndTimeChange(newEndTime);
    
    // Update duration
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = newEndTime.split(":").map(Number);
    
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    
    setDuration(endTotalMinutes - startTotalMinutes);
  };

  // Format duration for display
  const formatDuration = (minutes: number) => {
    if (minutes < 0) return "Horario inválido";
    
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}m` : ""}`;
    }
    
    return `${mins}m`;
  };

  return (
    <div className="space-y-4">
      <div className="bg-secondary/50 border border-secondary/30 rounded-lg p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 space-y-1">
            <label className="text-xs text-gray-400">Hora inicio</label>
            <div className="relative">
              <input
                type="time"
                value={startTime}
                onChange={handleStartTimeChange}
                className="bg-secondary/70 text-white border-0 rounded-md p-2 pl-8 w-full focus:ring-1 focus:ring-[#FF4081] focus:outline-none"
              />
              <Clock className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <div className="flex-1 space-y-1">
            <label className="text-xs text-gray-400">Hora fin</label>
            <div className="relative">
              <input
                type="time"
                value={endTime}
                onChange={handleEndTimeChange}
                className="bg-secondary/70 text-white border-0 rounded-md p-2 pl-8 w-full focus:ring-1 focus:ring-[#FF4081] focus:outline-none"
              />
              <Clock className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-3">
          <span className="px-3 py-1 bg-secondary/70 rounded-full text-xs text-white">
            Duración: {formatDuration(duration)}
          </span>
        </div>
      </div>
    </div>
  );
};
