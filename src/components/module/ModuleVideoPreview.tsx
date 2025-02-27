
import * as React from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface VideoSlide {
  src: string;
  thumbnail: string;
  title: string;
  likes?: number;
}

interface ModuleVideoPreviewProps {
  videoSlides: VideoSlide[];
  onPlayClick: () => void;
}

export function ModuleVideoPreview({ videoSlides, onPlayClick }: ModuleVideoPreviewProps) {
  const [previewVideo, setPreviewVideo] = React.useState<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const isMobile = useIsMobile();
  
  // Using the first video for the preview
  const firstSlide = videoSlides[0];

  // Reference for the video element
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    setPreviewVideo(videoRef.current);
  }, []);

  const handlePreviewClick = () => {
    onPlayClick();
  };

  // Handle video loading errors
  const handleVideoError = () => {
    console.error("Error loading preview video");
    setIsLoading(false);
  };
  
  // Handle video loaded
  const handleVideoLoaded = () => {
    setIsLoading(false);
  };

  return (
    <div className="my-3 relative">
      <h2 className="text-lg font-semibold mb-2 font-oswald">
        Contenido del Módulo
      </h2>
      
      <div 
        className="relative w-full max-w-[240px] mx-auto aspect-[9/16] bg-black rounded-lg overflow-hidden cursor-pointer"
        onClick={handlePreviewClick}
      >
        {/* Loading skeleton */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-900 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}
      
        {/* Preview video */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover pointer-events-none"
          muted
          loop
          playsInline
          onError={handleVideoError}
          onLoadedData={handleVideoLoaded}
        >
          <source src={firstSlide.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Video title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-2">
          <h3 className="font-oswald text-sm text-white drop-shadow-lg mb-0.5">
            {firstSlide.title}
          </h3>
          <p className="text-white/80 text-xs mb-2">
            Desliza para explorar más
          </p>
        </div>
        
        {/* Centered play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full bg-white/30 backdrop-blur-[2px] hover:bg-white/50 transition-all duration-300 transform hover:scale-105"
          >
            <Play className="h-6 w-6 text-white fill-white" />
          </Button>
        </div>
        
        {/* Interactive badge */}
        <div className="absolute top-2 right-2 bg-gradient-to-r from-[#FF4081] to-[#9C27B0] text-white text-[10px] font-medium px-1.5 py-0.5 rounded-full animate-pulse">
          Interactivo
        </div>
      </div>
    </div>
  );
}
