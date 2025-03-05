
import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface RoutineTimeSelectorProps {
  startTime: string;
  endTime: string;
  onStartTimeChange: (time: string) => void;
  protocols?: { duration: string }[];
}

export const RoutineTimeSelector = ({
  startTime,
  endTime,
  onStartTimeChange,
  protocols = []
}: RoutineTimeSelectorProps) => {
  const [duration, setDuration] = useState(() => {
    // Calculate duration between start and end time
    if (!endTime) return 0;
    
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);
    
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    
    return endTotalMinutes - startTotalMinutes;
  });

  // Calculate total duration from protocols
  useEffect(() => {
    let totalMinutes = 0;
    
    protocols.forEach(protocol => {
      const durationMatch = protocol.duration?.match(/(\d+)/);
      if (durationMatch) {
        totalMinutes += parseInt(durationMatch[0], 10);
      }
    });
    
    if (totalMinutes > 0) {
      setDuration(totalMinutes);
    }
  }, [protocols]);

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartTime = e.target.value;
    onStartTimeChange(newStartTime);
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
        <div className="flex items-center">
          <div className="flex-1 space-y-1">
            <label className="text-xs text-gray-400">Hora de inicio</label>
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
