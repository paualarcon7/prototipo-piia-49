
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
 * Formats an array of day abbreviations into a readable string
 * For example: ["L", "M", "X"] => "Lunes, Martes, Miércoles"
 */
export const formatDayList = (days: string[]): string => {
  const dayNames: Record<string, string> = {
    'L': 'Lunes',
    'M': 'Martes',
    'X': 'Miércoles',
    'J': 'Jueves',
    'V': 'Viernes',
    'S': 'Sábado',
    'D': 'Domingo'
  };
  
  return days.map(day => dayNames[day] || day).join(', ');
};
