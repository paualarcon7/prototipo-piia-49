
import { Protocol } from "@/types/protocols";

/**
 * Groups protocols by their dimension
 */
export const groupByDimension = (protocols: Protocol[]) => {
  const groups: Record<string, Protocol[]> = {};
  
  protocols.forEach(protocol => {
    if (!groups[protocol.dimension]) {
      groups[protocol.dimension] = [];
    }
    groups[protocol.dimension].push(protocol);
  });
  
  return groups;
};

/**
 * Calculates total duration in minutes from protocol duration strings
 */
export const calculateTotalDuration = (protocols: { protocol: Protocol }[]) => {
  let totalMinutes = 0;
  
  protocols.forEach(({ protocol }) => {
    const durationMatch = protocol.duration.match(/(\d+)/);
    if (durationMatch) {
      totalMinutes += parseInt(durationMatch[0], 10);
    }
  });
  
  if (totalMinutes >= 60) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes > 0 ? `${minutes}m` : ""}`;
  }
  
  return `${totalMinutes}m`;
};
