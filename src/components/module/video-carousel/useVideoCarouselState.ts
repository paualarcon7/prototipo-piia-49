import * as React from "react";

interface VideoSlide {
  src: string;
  thumbnail: string;
  title: string;
  likes?: number;
}

export interface VideoCarouselState {
  slides: VideoSlide[];
  currentVideoIndex: number;
  setCurrentVideoIndex: React.Dispatch<React.SetStateAction<number>>;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  isLiked: boolean;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
  showControls: boolean;
  setShowControls: React.Dispatch<React.SetStateAction<boolean>>;
  videoRefs: React.MutableRefObject<(HTMLVideoElement | null)[]>;
  handleMuteToggle: () => void;
  handleLikeToggle: () => void;
  handleVideoTimeUpdate: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
  handleVideoEnded: () => void;
  handleVideoError: (index: number) => void;
  onClose: () => void;
}

export function useVideoCarouselState(slides: VideoSlide[], onClose: () => void): VideoCarouselState {
  const [currentVideoIndex, setCurrentVideoIndex] = React.useState(0);
  const [isMuted, setIsMuted] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const [isLiked, setIsLiked] = React.useState(false);
  const [showControls, setShowControls] = React.useState(true);
  const videoRefs = React.useRef<(HTMLVideoElement | null)[]>([]);

  const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.target as HTMLVideoElement;
    const percentage = (video.currentTime / video.duration) * 100;
    setProgress(percentage);
  };

  const handleVideoEnded = () => {
    if (currentVideoIndex === slides.length - 1) {
      onClose();
    } else {
      setCurrentVideoIndex(prev => prev + 1);
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = !isMuted;
      }
    });
  };

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  const handleVideoError = (index: number) => {
    console.error(`Error loading video at index ${index}, URL: ${slides[index].src}`);
  };

  React.useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentVideoIndex) {
          video.play().catch((err) => {
            console.log("Video autoplay prevented", err);
          });
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentVideoIndex]);

  return {
    slides,
    currentVideoIndex,
    setCurrentVideoIndex,
    isMuted,
    setIsMuted,
    progress,
    setProgress,
    isLiked,
    setIsLiked,
    showControls,
    setShowControls,
    videoRefs,
    handleMuteToggle,
    handleLikeToggle,
    handleVideoTimeUpdate,
    handleVideoEnded,
    handleVideoError,
    onClose,
  };
}
