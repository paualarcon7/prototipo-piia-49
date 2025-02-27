
import * as React from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
  };

  return (
    <div className="my-8 relative">
      <h2 className="text-xl font-semibold mb-4 font-oswald">
        Contenido del Módulo
      </h2>
      
      <div 
        className="relative w-full max-w-md mx-auto aspect-[9/16] bg-black rounded-2xl overflow-hidden cursor-pointer"
        onClick={handlePreviewClick}
      >
        {/* Preview video */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover pointer-events-none"
          muted
          loop
          playsInline
          onError={handleVideoError}
        >
          <source src={firstSlide.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Video title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-oswald text-xl text-white drop-shadow-lg mb-2">
            {firstSlide.title}
          </h3>
          <p className="text-white/80 text-sm mb-8">
            Desliza para explorar más videos
          </p>
        </div>
        
        {/* Centered play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-20 w-20 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-all duration-300 transform hover:scale-110"
          >
            <Play className="h-12 w-12 text-white fill-white" />
          </Button>
        </div>
        
        {/* Interactive badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-[#FF4081] to-[#9C27B0] text-white text-xs font-medium px-2.5 py-1 rounded-full animate-pulse">
          Interactivo
        </div>
      </div>
    </div>
  );
}
