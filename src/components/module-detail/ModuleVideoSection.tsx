
import { ModuleHeader } from "@/components/module/ModuleHeader";
import { ModuleVideoPreview } from "@/components/module/ModuleVideoPreview";
import { ModuleVideoCarousel } from "@/components/module/ModuleVideoCarousel";
import { useNavigate } from "react-router-dom";

interface ModuleVideoSectionProps {
  id: string | undefined;
  showFullScreenVideo: boolean;
  videoSlides: Array<{
    src: string;
    thumbnail: string;
    title: string;
    likes: number;
  }>;
  handleOpenFullScreenVideo: () => void;
  handleCloseFullScreenVideo: () => void;
}

export const ModuleVideoSection = ({
  id,
  showFullScreenVideo,
  videoSlides,
  handleOpenFullScreenVideo,
  handleCloseFullScreenVideo
}: ModuleVideoSectionProps) => {
  const navigate = useNavigate();
  
  return (
    <>
      <ModuleHeader 
        onBack={() => navigate(`/programa/${id}`)}
        videoSlides={videoSlides}
      />
      
      {!showFullScreenVideo && (
        <ModuleVideoPreview 
          videoSlides={videoSlides} 
          onPlayClick={handleOpenFullScreenVideo}
        />
      )}
      
      {showFullScreenVideo && (
        <div className="fixed inset-0 z-50 bg-black">
          <div className="h-full w-full flex items-center justify-center">
            <div className="relative w-full max-w-md h-full">
              <ModuleVideoCarousel 
                slides={videoSlides} 
                onClose={handleCloseFullScreenVideo}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
