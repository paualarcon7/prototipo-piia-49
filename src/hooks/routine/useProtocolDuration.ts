
import { useEffect, useState } from 'react';
import { Protocol } from "@/types/protocols";
import { RoutineProtocol } from "@/types/rutina";

export function useProtocolDuration(protocols: RoutineProtocol[] | { protocol: Protocol }[] | { duration: string }[]) {
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [formattedDuration, setFormattedDuration] = useState('');

  useEffect(() => {
    // Calculate total duration from protocols
    let minutes = 0;
    
    protocols.forEach(protocol => {
      let durationString = '';
      
      // Handle different protocol object shapes
      if ('protocol' in protocol && protocol.protocol) {
        durationString = protocol.protocol.duration;
      } else if ('duration' in protocol) {
        durationString = protocol.duration;
      }
      
      // Extract minutes from duration string (e.g., "30 min", "7 días")
      const durationMatch = durationString?.match(/(\d+)/);
      if (durationMatch) {
        minutes += parseInt(durationMatch[0], 10);
      }
    });
    
    setTotalMinutes(minutes);
    
    // Format duration for display
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      setFormattedDuration(`${hours}h ${remainingMinutes > 0 ? `${remainingMinutes}m` : ""}`);
    } else {
      setFormattedDuration(`${minutes}m`);
    }
  }, [protocols]);

  /**
   * Calculate new end time based on start time and total duration
   */
  const calculateEndTime = (startTime: string): string => {
    try {
      // Parse the current startTime
      const [hours, minutes] = startTime.split(':').map(Number);
      if (isNaN(hours) || isNaN(minutes)) throw new Error('Invalid start time');
      
      // Calculate new end time
      let totalMinutesEnd = hours * 60 + minutes + totalMinutes;
      const newHours = Math.floor(totalMinutesEnd / 60) % 24;
      const newMinutes = totalMinutesEnd % 60;
      
      // Format the new end time
      return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
    } catch (error) {
      console.error('Error calculating end time:', error);
      return startTime; // Return original time in case of error
    }
  };

  return {
    totalMinutes,
    formattedDuration,
    calculateEndTime
  };
}
