
import { Trash2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Routine } from "@/types/rutina";

interface SettingsTabProps {
  routine: Routine;
  isEditing: boolean;
  onActiveToggle: () => void;
  onNotificationToggle: () => void;
  onMinutesBeforeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onOpenDeleteDialog: () => void;
}

export const SettingsTab = ({
  routine,
  isEditing,
  onActiveToggle,
  onNotificationToggle,
  onMinutesBeforeChange,
  onOpenDeleteDialog
}: SettingsTabProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">Estado de la rutina</h3>
            <p className="text-xs text-[#C8C8C9] mt-1">
              Activa o desactiva temporalmente esta rutina
            </p>
          </div>
          <Switch
            checked={routine.isActive}
            onCheckedChange={onActiveToggle}
            disabled={!isEditing}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">Notificaciones</h3>
            <p className="text-xs text-[#C8C8C9] mt-1">
              Recibe recordatorios antes de comenzar
            </p>
          </div>
          <Switch
            checked={routine.notification.enabled}
            onCheckedChange={onNotificationToggle}
            disabled={!isEditing}
          />
        </div>
        
        {routine.notification.enabled && (
          <div className="pl-6 mt-2">
            <label className="text-sm text-[#C8C8C9] block mb-2">
              Avisar antes
            </label>
            <select 
              value={routine.notification.minutesBefore}
              onChange={onMinutesBeforeChange}
              className="w-full bg-[#1A1F2C]/50 border border-[#1A1F2C]/30 rounded-md p-2 text-white"
              disabled={!isEditing}
            >
              <option value={5}>5 minutos</option>
              <option value={10}>10 minutos</option>
              <option value={15}>15 minutos</option>
              <option value={30}>30 minutos</option>
              <option value={60}>1 hora</option>
            </select>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">Google Calendar</h3>
            <p className="text-xs text-[#C8C8C9] mt-1">
              {routine.syncStatus === "synced" 
                ? "Sincronizado con tu calendario" 
                : "Sincronizar con tu calendario"}
            </p>
          </div>
          <Button variant="outline" size="sm" className="text-xs">
            Configurar
          </Button>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-6 text-[#02b1bb] border-[#02b1bb]/20"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Compartir rutina
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full mt-2 text-[#D946EF] border-[#D946EF]/20"
          onClick={onOpenDeleteDialog}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Eliminar rutina
        </Button>
      </div>
    </div>
  );
};
