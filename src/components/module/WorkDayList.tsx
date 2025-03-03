
import { WorkDay } from "@/types/module";
import { WorkDayCard } from "./WorkDayCard";
import { motion } from "framer-motion";

interface WorkDayListProps {
  workDays: WorkDay[];
  onDaySelect: (day: number) => void;
}

export const WorkDayList = ({ workDays, onDaySelect }: WorkDayListProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-oswald text-white mb-6 tracking-wide">Días de Trabajo</h2>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {workDays.map((workDay, index) => (
          <motion.div key={index} variants={item}>
            <WorkDayCard
              {...workDay}
              isActive={workDay.status === 'current'}
              onSelect={() => onDaySelect(workDay.day)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
