
import * as React from "react";
import { cn } from "@/lib/utils";
import { useVideoCarousel } from "./VideoCarouselContext";

interface VideoPlayerProps {
  index: number;
}

export function VideoPlayer({ index }: VideoPlayerProps) {
  const {
    slides,
    currentVideoIndex,
    isMuted,
    handleVideoTimeUpdate,
    handleVideoEnded,
    handleVideoError,
    videoRefs
  } = useVideoCarousel();
  const slide = slides[index];
  const [videoError, setVideoError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleError = () => {
    setVideoError(true);
    console.error(`Error loading video at index ${index}:`, slide.src);
    handleVideoError(index);
  };

  // Load and play the video when it becomes visible
  React.useEffect(() => {
    const videoElement = videoRefs.current[index];
    
    if (videoElement) {
      // Check if this is the current video and should be played
      if (index === currentVideoIndex) {
        console.log(`Playing video ${index}:`, slide.src);
        
        // Set video source if needed
        if (!videoElement.src) {
          videoElement.src = slide.src;
          videoElement.load();
        }
        
        // Play the video with error handling
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.error("Error playing video:", err);
            // Try playing again after a short delay
            setTimeout(() => {
              videoElement.play().catch(e => console.error("Second play attempt failed:", e));
            }, 300);
          });
        }
      } else {
        // Pause other videos to conserve resources
        videoElement.pause();
      }
    }
  }, [index, currentVideoIndex, videoRefs, slide.src]);

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  return (
    <div
      data-index={index}
      className={cn(
        "video-item absolute inset-0 transition-opacity duration-400",
        currentVideoIndex === index ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
      )}
    >
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
          <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-white animate-spin"></div>
        </div>
      )}
      
      <video
        ref={(el) => (videoRefs.current[index] = el)}
        className="w-full h-full object-contain"
        playsInline
        muted={isMuted}
        controls={false}
        onTimeUpdate={handleVideoTimeUpdate}
        onEnded={handleVideoEnded}
        onError={handleError}
        onLoadedData={handleLoadedData}
        preload="auto"
      />

      {videoError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/75 text-white text-center p-4 z-20">
          <div>
            <p className="mb-2">Error al cargar el video.</p>
            <p className="text-sm opacity-75">Intenta recargar la página o revisar tu conexión a internet.</p>
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-oswald text-xl text-white mb-4 line-clamp-2 drop-shadow-lg">
          {slide.title}
        </h3>
      </div>
    </div>
  );
}
