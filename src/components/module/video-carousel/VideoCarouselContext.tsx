
import * as React from "react";
import { useVideoCarouselState, VideoCarouselState } from "./useVideoCarouselState";

interface VideoSlide {
  src: string;
  thumbnail: string;
  title: string;
  likes?: number;
}

export const VideoCarouselContext = React.createContext<VideoCarouselState | null>(null);

interface VideoCarouselProviderProps {
  children: React.ReactNode;
  slides: VideoSlide[];
  onClose: () => void;
}

export function VideoCarouselProvider({ children, slides, onClose }: VideoCarouselProviderProps) {
  const videoCarouselState = useVideoCarouselState(slides, onClose);

  return (
    <VideoCarouselContext.Provider value={videoCarouselState}>
      {children}
    </VideoCarouselContext.Provider>
  );
}

export const useVideoCarousel = () => {
  const context = React.useContext(VideoCarouselContext);
  if (!context) {
    throw new Error("useVideoCarousel must be used within a VideoCarouselProvider");
  }
  return context;
};
