
import { Play } from "lucide-react";
import { ModuleVideoCarousel } from "@/components/module/ModuleVideoCarousel";

interface TrabajoVideoSectionProps {
  showTrabajoVideo: boolean;
  trabajoVideoSlides: Array<{
    src: string;
    thumbnail: string;
    title: string;
    likes: number;
  }>;
  handleOpenTrabajoVideo: () => void;
  handleCloseTrabajoVideo: () => void;
}

export const TrabajoVideoSection = ({
  showTrabajoVideo,
  trabajoVideoSlides,
  handleOpenTrabajoVideo,
  handleCloseTrabajoVideo
}: TrabajoVideoSectionProps) => {
  return (
    <div className="bg-secondary/70 p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Videos sobre Estado de Flujo</h2>
      <div>
        <div 
          className="relative mx-auto aspect-[9/16] max-w-[160px] bg-black rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
          onClick={handleOpenTrabajoVideo}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Play className="h-8 w-8 text-white opacity-80" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-2 left-2 right-2">
            <p className="text-xs text-white font-medium line-clamp-2">
              {trabajoVideoSlides[0].title}
            </p>
          </div>
        </div>
      </div>

      {showTrabajoVideo && (
        <div className="fixed inset-0 z-50 bg-black">
          <div className="h-full w-full flex items-center justify-center">
            <div className="relative w-full max-w-md h-full">
              <ModuleVideoCarousel 
                slides={trabajoVideoSlides} 
                onClose={handleCloseTrabajoVideo}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
