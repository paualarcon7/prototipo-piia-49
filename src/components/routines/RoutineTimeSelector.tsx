
import { Clock } from "lucide-react";
import { useProtocolDuration } from "@/hooks/routine/useProtocolDuration";

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
  const { formattedDuration } = useProtocolDuration(protocols);

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartTime = e.target.value;
    onStartTimeChange(newStartTime);
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
            Duración: {formattedDuration}
          </span>
        </div>
      </div>
    </div>
  );
};
