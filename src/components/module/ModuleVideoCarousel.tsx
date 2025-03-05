
import * as React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoCarouselProvider } from "./video-carousel/VideoCarouselContext";
import { VideoCarouselContainer } from "./video-carousel/VideoCarouselContainer";

interface VideoSlide {
  src: string;
  thumbnail: string;
  title: string;
  likes?: number;
}

interface ModuleVideoCarouselProps {
  slides: VideoSlide[];
  onClose: () => void;
}

export function ModuleVideoCarousel({ slides, onClose }: ModuleVideoCarouselProps) {
  // Prevent body scrolling when fullscreen video is active
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-black w-screen h-screen flex items-center justify-center">
      <Button 
        onClick={onClose}
        variant="ghost" 
        size="icon" 
        className="absolute top-4 right-4 z-[10000] text-white hover:bg-white/20 rounded-full"
      >
        <X className="h-6 w-6" />
      </Button>
      
      <VideoCarouselProvider slides={slides} onClose={onClose}>
        <VideoCarouselContainer />
      </VideoCarouselProvider>
    </div>
  );
}
