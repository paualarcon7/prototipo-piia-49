
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
    <div className="my-4 md:my-6 relative">
      <h2 className="text-xl font-semibold mb-3 font-oswald">
        Contenido del Módulo
      </h2>
      
      <div 
        className="relative w-full max-w-[320px] mx-auto aspect-[9/16] bg-black rounded-xl overflow-hidden cursor-pointer"
        onClick={handlePreviewClick}
      >
        {/* Loading skeleton */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-900 animate-pulse flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
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
          loading="lazy"
        >
          <source src={firstSlide.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Video title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="font-oswald text-lg text-white drop-shadow-lg mb-1">
            {firstSlide.title}
          </h3>
          <p className="text-white/80 text-xs mb-4">
            Desliza para explorar más videos
          </p>
        </div>
        
        {/* Centered play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-16 w-16 rounded-full bg-white/30 backdrop-blur-[2px] hover:bg-white/50 transition-all duration-300 transform hover:scale-105"
          >
            <Play className="h-8 w-8 text-white fill-white" />
          </Button>
        </div>
        
        {/* Interactive badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-[#FF4081] to-[#9C27B0] text-white text-xs font-medium px-2 py-0.5 rounded-full animate-pulse">
          Interactivo
        </div>
      </div>
    </div>
  );
}
