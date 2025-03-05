
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

export function ModuleVideoPreview({
  videoSlides,
  onPlayClick
}: ModuleVideoPreviewProps) {
  const [previewVideo, setPreviewVideo] = React.useState<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const isMobile = useIsMobile();

  // Using the first video for the preview
  const firstSlide = videoSlides[0];

  // Reference for the video element
  const videoRef = React.useRef<HTMLVideoElement>(null);
  
  React.useEffect(() => {
    if (videoRef.current) {
      setPreviewVideo(videoRef.current);
      
      // Ensure the video source is loaded properly
      const videoElement = videoRef.current;
      const sourceElement = videoElement.querySelector('source');
      if (sourceElement && sourceElement.src !== firstSlide.src) {
        sourceElement.src = firstSlide.src;
        videoElement.load();
      }
    }
  }, [firstSlide.src]);

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
    <div className="my-2 relative">
      <h2 className="text-base font-semibold mb-1 font-oswald">Introducción del Módulo</h2>
      
      <div className="relative w-full max-w-[120px] mx-auto aspect-[9/16] bg-black rounded-md overflow-hidden cursor-pointer" onClick={handlePreviewClick}>
        {/* Loading skeleton */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-900 animate-pulse flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
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
          preload="metadata"
        >
          <source src={firstSlide.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Video title overlay - simplified for small size */}
        <div className="absolute bottom-0 left-0 right-0 p-1">
          <h3 className="font-oswald text-[10px] text-white drop-shadow-lg">
            {firstSlide.title}
          </h3>
        </div>
        
        {/* Centered play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full bg-white/30 backdrop-blur-[2px] hover:bg-white/50">
            <Play className="h-3 w-3 text-white fill-white" />
          </Button>
        </div>
        
        {/* Interactive badge - extremely small version */}
        <div className="absolute top-1 right-1 bg-gradient-to-r from-[#FF4081] to-[#9C27B0] text-white text-[6px] font-medium px-1 py-0.5 rounded-full">
          ✦
        </div>
      </div>
    </div>
  );
}
