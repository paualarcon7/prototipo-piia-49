
import { WorkDayList } from "@/components/module/WorkDayList";
import { WorkDay } from "@/types/module";
import { ModuleVideoSection } from "@/components/module-detail/ModuleVideoSection";

interface DaySelectionSectionProps {
  id: string | undefined;
  workDays: WorkDay[];
  showFullScreenVideo: boolean;
  videoSlides: Array<{
    src: string;
    thumbnail: string;
    title: string;
    likes: number;
  }>;
  handleOpenFullScreenVideo: () => void;
  handleCloseFullScreenVideo: () => void;
  onDaySelect: (day: number) => void;
}

export const DaySelectionSection = ({
  id,
  workDays,
  showFullScreenVideo,
  videoSlides,
  handleOpenFullScreenVideo,
  handleCloseFullScreenVideo,
  onDaySelect
}: DaySelectionSectionProps) => {
  // If fullscreen video is shown, don't render the regular content
  if (showFullScreenVideo) {
    return null;
  }
  
  return (
    <div className="space-y-10 animate-fade-in">
      <div className="bg-[#1A1F2C]/70 backdrop-blur-sm rounded-xl p-6 border border-gray-800/30 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 font-oswald tracking-wide text-white">Introducción al Módulo</h2>
        <ModuleVideoSection
          id={id}
          showFullScreenVideo={showFullScreenVideo}
          videoSlides={videoSlides}
          handleOpenFullScreenVideo={handleOpenFullScreenVideo}
          handleCloseFullScreenVideo={handleCloseFullScreenVideo}
        />
      </div>
      
      <div className="bg-[#1A1F2C]/70 backdrop-blur-sm rounded-xl p-6 border border-gray-800/30 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 font-oswald tracking-wide text-white">Plan de Trabajo Diario</h2>
        <p className="text-gray-300 mb-6 font-lato">
          Selecciona un día de trabajo para comenzar tu plan de actividades personalizado.
        </p>
        <WorkDayList 
          workDays={workDays} 
          onDaySelect={onDaySelect} 
        />
      </div>
    </div>
  );
};
