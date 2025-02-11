
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  Plus,
  Battery,
  Star,
  BadgeAlert
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EnergyActivity, EnergyRating } from "@/types/energyMap";
import { cn } from "@/lib/utils";

const EntrenamientoStage = () => {
  const { id, moduleId } = useParams();
  const navigate = useNavigate();
  const [activities, setActivities] = useState<EnergyActivity[]>([]);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [newActivity, setNewActivity] = useState<Partial<EnergyActivity>>({
    startTime: "",
    endTime: "",
    description: "",
    energyRating: 3
  });

  const handleAddActivity = () => {
    if (!newActivity.startTime || !newActivity.endTime) {
      toast.error("Por favor, especifica las horas de inicio y fin.");
      return;
    }

    const activity: EnergyActivity = {
      id: crypto.randomUUID(),
      startTime: newActivity.startTime,
      endTime: newActivity.endTime,
      description: newActivity.description,
      energyRating: newActivity.energyRating as number
    };

    setActivities([...activities, activity]);
    setShowAddActivity(false);
    setNewActivity({
      startTime: "",
      endTime: "",
      description: "",
      energyRating: 3
    });
    toast.success("Actividad registrada exitosamente");
  };

  const EnergyRatingSelector = ({ value, onChange }: { value: number, onChange: (rating: number) => void }) => {
    return (
      <div className="flex items-center gap-2 justify-center my-4">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            onClick={() => onChange(rating)}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all",
              value === rating
                ? "bg-purple-500 text-white"
                : "bg-secondary hover:bg-secondary/80 text-gray-400"
            )}
          >
            {rating}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6 pb-32">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate(`/programa/${id}/modulo/${moduleId}`)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver al módulo
      </Button>

      <div className="bg-secondary/50 backdrop-blur-sm rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">Mapa de Energía</h1>
        <p className="text-gray-300 mb-6">
          Registra y califica tus actividades diarias para identificar patrones en tus niveles de energía.
          Esta información te ayudará a optimizar tu día y mejorar tu rendimiento.
        </p>

        <div className="space-y-6">
          <div className="bg-secondary/70 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Actividades Registradas</h2>
              <Button onClick={() => setShowAddActivity(true)}>
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
                        <span className="text-sm text-gray-400">
                          {format(new Date(`2024-01-01T${activity.startTime}`), 'HH:mm')} - 
                          {format(new Date(`2024-01-01T${activity.endTime}`), 'HH:mm')}
                        </span>
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

          <div className="bg-secondary/70 p-6 rounded-lg">
            <div className="flex items-start gap-4">
              <BadgeAlert className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium mb-2">Escala de Energía</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-300 flex items-center justify-center text-xs">1</span>
                    <span>Agotador - La actividad drena completamente tu energía</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-300 flex items-center justify-center text-xs">2</span>
                    <span>Cansador - Requiere esfuerzo significativo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-300 flex items-center justify-center text-xs">3</span>
                    <span>Neutral - No afecta significativamente tu energía</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-300 flex items-center justify-center text-xs">4</span>
                    <span>Estimulante - Te da un impulso de energía</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs">5</span>
                    <span>Energizante - Te llena de vitalidad y motivación</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showAddActivity} onOpenChange={setShowAddActivity}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nueva Actividad</DialogTitle>
            <DialogDescription>
              Registra una nueva actividad y califica su impacto en tu energía
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="startTime" className="text-sm text-gray-400">
                  Hora de inicio
                </label>
                <Input
                  id="startTime"
                  type="time"
                  value={newActivity.startTime}
                  onChange={(e) => setNewActivity({ ...newActivity, startTime: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="endTime" className="text-sm text-gray-400">
                  Hora de fin
                </label>
                <Input
                  id="endTime"
                  type="time"
                  value={newActivity.endTime}
                  onChange={(e) => setNewActivity({ ...newActivity, endTime: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm text-gray-400">
                Descripción (opcional)
              </label>
              <Textarea
                id="description"
                value={newActivity.description}
                onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                placeholder="Describe brevemente la actividad..."
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 block text-center mb-2">
                ¿Qué tan energizante fue esta actividad?
              </label>
              <EnergyRatingSelector
                value={newActivity.energyRating || 3}
                onChange={(rating) => setNewActivity({ ...newActivity, energyRating: rating })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddActivity(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddActivity}>
              Guardar Actividad
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EntrenamientoStage;
