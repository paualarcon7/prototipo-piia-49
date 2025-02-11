
import { Battery, Star } from "lucide-react";
import { format } from "date-fns";
import { EnergyActivity } from "@/types/energyMap";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ActivityListProps {
  activities: EnergyActivity[];
  onAddActivity: () => void;
}

export const ActivityList = ({ activities, onAddActivity }: ActivityListProps) => {
  return (
    <div className="bg-secondary/70 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Actividades Registradas</h2>
        <Button onClick={onAddActivity}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Actividad
        </Button>
      </div>

      {activities.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <Battery className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No hay actividades registradas aún.</p>
          <p className="text-sm">Comienza agregando tu primera actividad.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="bg-secondary/50 p-4 rounded-lg flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="space-y-1">
                    <span className="text-sm text-gray-400">
                      {format(activity.date, 'dd/MM/yyyy')}
                    </span>
                    <span className="text-sm text-gray-400 block">
                      {format(new Date(`2024-01-01T${activity.startTime}`), 'HH:mm')} - 
                      {format(new Date(`2024-01-01T${activity.endTime}`), 'HH:mm')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-purple-500" fill="currentColor" />
                    <span className="text-purple-300">{activity.energyRating}</span>
                  </div>
                </div>
                {activity.description && (
                  <p className="text-gray-300">{activity.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
