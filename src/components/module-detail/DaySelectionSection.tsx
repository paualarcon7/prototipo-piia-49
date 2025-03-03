
import { WorkDayList } from "@/components/module/WorkDayList";
import { WorkDay } from "@/types/module";
import { ModuleVideoSection } from "@/components/module-detail/ModuleVideoSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

// Helper function to convert title to URL friendly slug
const toSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

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
  const { programSlug, moduleSlug } = useParams();
  const navigate = useNavigate();
  
  // Use either the new or old parameter format
  const programId = programSlug || id;
  const moduleId = moduleSlug || "actual";
  
  // Assume module name from slug or use default
  const moduleName = moduleSlug 
    ? moduleSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : "Módulo Actual";
  
  // Assume program name from slug or use default  
  const programName = programSlug
    ? programSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : "Programa";

  // Modified handleDaySelect to use the improved URL structure
  const handleDaySelect = (day: number) => {
    const selectedWorkDay = workDays[day - 1];
    const dayTitleSlug = toSlug(selectedWorkDay.title);
    
    if (programSlug && moduleSlug) {
      // Use the new URL format
      navigate(`/programa/${programSlug}/modulo/${moduleSlug}/dia/${day}-${dayTitleSlug}`);
    } else {
      // Fallback to old format
      navigate(`/programa/${programId}/modulo/${moduleId}/dia/${day}-${dayTitleSlug}`);
    }
    
    onDaySelect(day);
  };
  
  return (
    <div className="space-y-10 animate-fade-in">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/home">
                <Home className="h-4 w-4 mr-1" />
                Inicio
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/programa/${programId}`}>{programName}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink className="text-muted-foreground cursor-default">
              {moduleName}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <ModuleVideoSection
        id={id}
        showFullScreenVideo={showFullScreenVideo}
        videoSlides={videoSlides}
        handleOpenFullScreenVideo={handleOpenFullScreenVideo}
        handleCloseFullScreenVideo={handleCloseFullScreenVideo}
      />
      
      <WorkDayList 
        workDays={workDays} 
        onDaySelect={handleDaySelect} 
      />
    </div>
  );
};
