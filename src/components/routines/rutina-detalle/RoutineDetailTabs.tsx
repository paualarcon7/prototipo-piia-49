
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Routine, RoutineProtocol } from "@/types/rutina";
import { Protocol } from "@/types/protocols";
import { ProtocolSelector } from "@/components/routines/ProtocolSelector";
import { ProtocolsList } from "@/components/routines/rutina-detalle/ProtocolsList";
import { SettingsTab } from "@/components/routines/rutina-detalle/SettingsTab";

interface RoutineDetailTabsProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  isEditing: boolean;
  routine: Routine;
  availableProtocols: Protocol[];
  onToggleEditMode: () => void;
  onAddProtocol: (protocol: Protocol) => void;
  onRemoveProtocol: (index: number) => void;
  onReorderProtocols: (protocols: RoutineProtocol[]) => void;
  onActiveToggle: () => void;
  onNotificationToggle: () => void;
  onMinutesBeforeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onColorChange: (color: string) => void;
  onOpenDeleteDialog: () => void;
}

export const RoutineDetailTabs = ({
  selectedTab,
  setSelectedTab,
  isEditing,
  routine,
  availableProtocols,
  onToggleEditMode,
  onAddProtocol,
  onRemoveProtocol,
  onReorderProtocols,
  onActiveToggle,
  onNotificationToggle,
  onMinutesBeforeChange,
  onColorChange,
  onOpenDeleteDialog
}: RoutineDetailTabsProps) => {
  return (
    <Tabs 
      defaultValue="protocolos" 
      className="mb-10"
      value={selectedTab}
      onValueChange={setSelectedTab}
    >
      <TabsList className="w-full bg-secondary/50">
        <TabsTrigger value="protocolos" className="flex-1">
          Protocolos
        </TabsTrigger>
        <TabsTrigger value="ajustes" className="flex-1">
          Ajustes
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="protocolos" className="mt-4 space-y-4">
        {isEditing ? (
          <ProtocolSelector
            availableProtocols={availableProtocols}
            selectedProtocols={routine.protocols}
            onAddProtocol={onAddProtocol}
            onRemoveProtocol={onRemoveProtocol}
            onReorderProtocols={onReorderProtocols}
          />
        ) : (
          <ProtocolsList 
            protocols={routine.protocols}
            routineColor={routine.color}
            onEditMode={onToggleEditMode}
          />
        )}
      </TabsContent>
      
      <TabsContent value="ajustes" className="mt-4 space-y-6">
        <SettingsTab
          routine={routine}
          isEditing={isEditing}
          onActiveToggle={onActiveToggle}
          onNotificationToggle={onNotificationToggle}
          onMinutesBeforeChange={onMinutesBeforeChange}
          onColorChange={onColorChange}
          onOpenDeleteDialog={onOpenDeleteDialog}
        />
      </TabsContent>
    </Tabs>
  );
};
