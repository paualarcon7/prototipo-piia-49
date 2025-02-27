
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

  const handleError = () => {
    setVideoError(true);
    handleVideoError(index);
  };

  return (
    <div
      data-index={index}
      className={cn(
        "video-item absolute inset-0 transition-opacity duration-400",
        currentVideoIndex === index ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <video
        ref={(el) => (videoRefs.current[index] = el)}
        className="w-full h-full object-contain"
        playsInline
        muted={isMuted}
        controls={false}
        onTimeUpdate={handleVideoTimeUpdate}
        onEnded={handleVideoEnded}
        onError={handleError}
      >
        <source src={slide.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {videoError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/75 text-white text-center p-4">
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
