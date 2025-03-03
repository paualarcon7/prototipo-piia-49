
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
  return (
    <div className="space-y-10 animate-fade-in">
      <ModuleVideoSection
        id={id}
        showFullScreenVideo={showFullScreenVideo}
        videoSlides={videoSlides}
        handleOpenFullScreenVideo={handleOpenFullScreenVideo}
        handleCloseFullScreenVideo={handleCloseFullScreenVideo}
      />
      
      <WorkDayList 
        workDays={workDays} 
        onDaySelect={onDaySelect} 
      />
    </div>
  );
};
