
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CalendarPreview } from "@/components/routines/CalendarPreview";
import { WeekDay, ROUTINE_COLORS } from "@/types/rutina";
import { ColorSelector } from "@/components/routines/rutina-detalle/ColorSelector";

interface SyncStepProps {
  routineName: string;
  startTime: string;
  endTime: string;
  days: WeekDay[];
  selectedColor: string;
  isGoogleCalendarEnabled: boolean;
  notificationsEnabled: boolean;
  minutesBefore: number;
  onGoogleCalendarToggle: (checked: boolean) => void;
  onNotificationsToggle: (checked: boolean) => void;
  onMinutesBeforeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onColorChange: (color: string) => void;
}

export const SyncStep = ({
  routineName,
  startTime,
  endTime,
  days,
  selectedColor,
  isGoogleCalendarEnabled,
  notificationsEnabled,
  minutesBefore,
  onGoogleCalendarToggle,
  onNotificationsToggle,
  onMinutesBeforeChange,
  onColorChange
}: SyncStepProps) => {
  return (
    <div className="space-y-6">
      {/* Color Selector */}
      <div className="p-4 bg-secondary/20 rounded-lg border border-secondary/30 mb-4">
        <ColorSelector
          currentColor={selectedColor}
          onColorChange={onColorChange}
        />
      </div>

      <h2 className="text-lg font-medium text-white">Google Calendar</h2>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="gcal-toggle" className="text-white">
          Sincronizar con Google Calendar
        </Label>
        <Switch
          id="gcal-toggle"
          checked={isGoogleCalendarEnabled}
          onCheckedChange={onGoogleCalendarToggle}
        />
      </div>
      
      {isGoogleCalendarEnabled && (
        <CalendarPreview 
          routineName={routineName}
          startTime={startTime}
          endTime={endTime}
          days={days}
        />
      )}
      
      <h2 className="text-lg font-medium text-white mt-4">Notificaciones</h2>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="notif-toggle" className="text-white">
          Recibir notificaciones
        </Label>
        <Switch
          id="notif-toggle"
          checked={notificationsEnabled}
          onCheckedChange={onNotificationsToggle}
        />
      </div>
      
      {notificationsEnabled && (
        <div className="w-full space-y-2">
          <Label className="text-[#C8C8C9] text-sm">Minutos antes</Label>
          <select 
            value={minutesBefore}
            onChange={onMinutesBeforeChange}
            className="w-full bg-[#1A1F2C]/50 border border-[#1A1F2C]/30 rounded-md p-2 text-white"
          >
            <option value={5}>5 minutos</option>
            <option value={10}>10 minutos</option>
            <option value={15}>15 minutos</option>
            <option value={30}>30 minutos</option>
            <option value={60}>1 hora</option>
          </select>
        </div>
      )}
    </div>
  );
};
