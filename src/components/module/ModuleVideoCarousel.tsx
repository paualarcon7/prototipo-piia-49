
import * as React from "react";
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
  return (
    <div className="fixed inset-0 z-50 bg-black w-screen h-screen flex items-center justify-center">
      <VideoCarouselProvider slides={slides} onClose={onClose}>
        <VideoCarouselContainer />
      </VideoCarouselProvider>
    </div>
  );
}
