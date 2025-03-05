import { Routine, RoutineProtocol } from "@/types/rutina";
import { Protocol } from "@/types/protocols";
import { useRoutineState } from "./routine/useRoutineState";
import { useRoutineBasicInfo } from "./routine/useRoutineBasicInfo";
import { useRoutineSettings } from "./routine/useRoutineSettings";
import { useRoutineProtocols } from "./routine/useRoutineProtocols";
import { useRoutineActions } from "./routine/useRoutineActions";

export const useRoutineDetail = (initialRoutine: Routine) => {
  const {
    routine,
    setRoutine,
    isEditing,
    isDeleteDialogOpen,
    selectedTab,
    setSelectedTab,
    setIsDeleteDialogOpen,
    toggleEditMode: baseToggleEditMode,
    saveChanges: baseSaveChanges
  } = useRoutineState(initialRoutine);

  const {
    handleNameChange,
    handleDayToggle,
    handleStartTimeChange
  } = useRoutineBasicInfo(routine, setRoutine);

  const {
    handleActiveToggle,
    handleNotificationToggle,
    handleMinutesBeforeChange,
    handleColorChange: baseHandleColorChange
  } = useRoutineSettings(routine, setRoutine);

  const {
    handleAddProtocol: baseHandleAddProtocol,
    handleRemoveProtocol: baseHandleRemoveProtocol,
    handleReorderProtocols
  } = useRoutineProtocols(routine, setRoutine);

  const {
    handleDelete: baseHandleDelete,
    notifyChangesDiscarded,
    notifyChangesSaved,
    notifyColorUpdated,
    notifyProtocolAdded,
    notifyProtocolRemoved
  } = useRoutineActions();

  const toggleEditMode = () => {
    const result = baseToggleEditMode();
    if (result === false) {
      notifyChangesDiscarded();
    }
  };

  const saveChanges = () => {
    const savedRoutine = baseSaveChanges();
    notifyChangesSaved();
    console.log("Saving updated routine:", savedRoutine);
  };

  const handleDelete = () => {
    baseHandleDelete(routine.id);
    setIsDeleteDialogOpen(false);
  };

  const handleColorChange = (color: string) => {
    if (!isEditing) {
      console.log("Not in editing mode, ignoring color change");
      return;
    }
    
    baseHandleColorChange(color);
    
    if (isEditing) {
      notifyColorUpdated();
    }
  };

  const handleAddProtocol = (protocol: Protocol) => {
    const protocolTitle = baseHandleAddProtocol(protocol);
    notifyProtocolAdded(protocolTitle);
  };

  const handleRemoveProtocol = (index: number) => {
    baseHandleRemoveProtocol(index);
    notifyProtocolRemoved();
  };

  return {
    routine,
    isEditing,
    isDeleteDialogOpen,
    selectedTab,
    setSelectedTab,
    setIsDeleteDialogOpen,
    toggleEditMode,
    saveChanges,
    handleDelete,
    handleNameChange,
    handleDayToggle,
    handleStartTimeChange,
    handleAddProtocol,
    handleRemoveProtocol,
    handleReorderProtocols,
    handleActiveToggle,
    handleNotificationToggle,
    handleMinutesBeforeChange,
    handleColorChange
  };
};
