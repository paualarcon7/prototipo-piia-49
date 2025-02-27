
import * as React from "react";
import { Volume2, VolumeX, Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useVideoCarousel } from "./VideoCarouselContext";

export function VideoControls() {
  const {
    slides,
    currentVideoIndex,
    showControls,
    isMuted,
    isLiked,
    handleMuteToggle,
    handleLikeToggle,
    onClose
  } = useVideoCarousel();

  const currentSlide = slides[currentVideoIndex];

  const handleCloseClick = () => {
    onClose();
  };

  return (
    <>
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute top-4 left-4 z-50 h-10 w-10 rounded-full bg-black/50 hover:bg-black/70 transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0"
        )}
        onClick={handleCloseClick}
      >
        <X className="h-6 w-6 text-white" />
      </Button>

      {/* Side controls */}
      <div 
        className={cn(
          "absolute right-6 bottom-20 flex flex-col items-center gap-6 transition-opacity duration-300 bg-black/15 rounded-full py-4 px-2",
          showControls ? "opacity-100" : "opacity-0"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
          onClick={handleMuteToggle}
        >
          {isMuted ? (
            <VolumeX className="h-6 w-6 text-white" />
          ) : (
            <Volume2 className="h-6 w-6 text-white" />
          )}
        </Button>
        <div className="flex flex-col items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-12 w-12 rounded-full transition-all duration-300 hover:scale-110",
              isLiked ? "text-[#FF4081]" : "text-white hover:text-[#FF4081]"
            )}
            onClick={handleLikeToggle}
          >
            <Heart className={cn("h-8 w-8", isLiked && "fill-current")} />
          </Button>
          <span className="text-white text-sm font-medium">
            {currentSlide.likes ? `${(currentSlide.likes / 1000000).toFixed(1)}M` : '0'}
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <p className="text-white text-sm mb-2 opacity-70">Desliza para más videos</p>
        <svg className="w-6 h-6 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </>
  );
}
