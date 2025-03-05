
import { useState } from "react";
import { Routine } from "@/types/rutina";

export function useRoutineState(initialRoutine: Routine) {
  const [routine, setRoutine] = useState<Routine>(initialRoutine);
  const [originalRoutine, setOriginalRoutine] = useState<Routine>(initialRoutine);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("protocolos");

  const toggleEditMode = () => {
    if (isEditing) {
      // Cancel changes - restore original routine
      console.log("Canceling changes, restoring original color:", originalRoutine.color);
      setRoutine({...originalRoutine});
      setIsEditing(false);
      return false; // Indicates operation was a cancel
    } else {
      // Enter edit mode - store current routine as original
      console.log("Entering edit mode, storing original color:", routine.color);
      setOriginalRoutine({...routine});
      setIsEditing(true);
      return true; // Indicates operation was entering edit mode
    }
  };

  const saveChanges = () => {
    // Save changes - store current routine as original
    console.log("Saving changes, new color:", routine.color);
    setOriginalRoutine({...routine});
    setIsEditing(false);
    return routine; // Return the saved routine
  };

  return {
    routine,
    setRoutine,
    originalRoutine,
    isEditing,
    isDeleteDialogOpen,
    selectedTab,
    setSelectedTab,
    setIsDeleteDialogOpen,
    toggleEditMode,
    saveChanges
  };
}
