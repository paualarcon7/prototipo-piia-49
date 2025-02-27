
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Routine, WeekDay } from "@/types/rutina";

const DAYS: WeekDay[] = ["L", "M", "X", "J", "V", "S", "D"];
const DAY_LABELS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

interface WeekViewProps {
  routines: Routine[];
}

export const WeekView = ({ routines }: WeekViewProps) => {
  const [currentWeek, setCurrentWeek] = useState(0);
  
  const handlePrevWeek = () => setCurrentWeek(prev => prev - 1);
  const handleNextWeek = () => setCurrentWeek(prev => prev + 1);

  // Get current date and calculate week start/end
  const today = new Date();
  const currentDay = today.getDay() || 7; // Convert Sunday (0) to 7
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - currentDay + 1 + (currentWeek * 7));
  
  // Format date for display
  const formatWeekRange = () => {
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    const startMonth = startOfWeek.toLocaleString('es', { month: 'short' });
    const endMonth = endOfWeek.toLocaleString('es', { month: 'short' });
    
    const startDay = startOfWeek.getDate();
    const endDay = endOfWeek.getDate();
    
    if (startMonth === endMonth) {
      return `${startDay} - ${endDay} ${startMonth}`;
    }
    
    return `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
  };

  // Get dates for the week
  const weekDates = [...Array(7)].map((_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  // Check if a routine is scheduled for a specific date
  const getRoutinesForDate = (date: Date) => {
    const dayIndex = date.getDay(); // 0 (Sunday) to 6 (Saturday)
    const weekDay: WeekDay = DAYS[dayIndex === 0 ? 6 : dayIndex - 1]; // Adjust for our day array
    
    return routines.filter(routine => routine.days.includes(weekDay));
  };

  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };

  return (
    <div className="px-4">
      {/* Week navigation */}
      <div className="flex justify-between items-center mb-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handlePrevWeek}
          className="text-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <span className="text-sm font-medium text-white capitalize">
          {currentWeek === 0 ? "Esta semana" : formatWeekRange()}
        </span>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleNextWeek}
          className="text-white"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Days grid */}
      <div className="grid grid-cols-7 gap-2">
        {weekDates.map((date, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="text-xs text-gray-400 mb-1">{DAY_LABELS[i]}</span>
            <div 
              className={`
                w-9 h-9 rounded-full flex items-center justify-center mb-1
                ${isToday(date) ? 'bg-[#FF4081] text-white' : 'text-white'}
              `}
            >
              {date.getDate()}
            </div>
            
            {/* Routine indicators */}
            <div className="flex flex-col items-center">
              {getRoutinesForDate(date).slice(0, 2).map((routine, idx) => (
                <div
                  key={idx}
                  className="w-2 h-2 rounded-full mb-1"
                  style={{ backgroundColor: routine.color }}
                />
              ))}
              
              {getRoutinesForDate(date).length > 2 && (
                <span className="text-xs text-gray-400">+{getRoutinesForDate(date).length - 2}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
