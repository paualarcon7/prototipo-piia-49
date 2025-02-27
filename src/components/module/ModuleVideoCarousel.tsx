
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
    <VideoCarouselProvider slides={slides} onClose={onClose}>
      <VideoCarouselContainer />
    </VideoCarouselProvider>
  );
}
