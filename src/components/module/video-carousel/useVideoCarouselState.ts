
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
  // Establecemos explícitamente el índice inicial a 0
  const [currentVideoIndex, setCurrentVideoIndex] = React.useState<number>(0);
  const [isMuted, setIsMuted] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const [isLiked, setIsLiked] = React.useState(false);
  const [showControls, setShowControls] = React.useState(true);
  // Inicializa el array de referencias con el tamaño correcto
  const videoRefs = React.useRef<(HTMLVideoElement | null)[]>(Array(slides.length).fill(null));

  const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.target as HTMLVideoElement;
    if (video && !isNaN(video.duration)) {
      const percentage = (video.currentTime / video.duration) * 100;
      setProgress(percentage);
    }
  };

  const handleVideoEnded = () => {
    if (currentVideoIndex === slides.length - 1) {
      // La lógica para mostrar el modal se ha movido al componente contenedor
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

  // Efecto para manejar la reproducción de videos al cambiar el índice actual
  React.useEffect(() => {
    console.log("Índice de video actual:", currentVideoIndex);
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentVideoIndex) {
          console.log(`Reproduciendo video ${index}:`, slides[index].src);
          video.play().catch((err) => {
            console.log("Video autoplay prevented", err);
          });
        } else {
          video.pause();
          // No reiniciamos a 0 para mantener el progreso por si el usuario vuelve
          // video.currentTime = 0;
        }
      }
    });
  }, [currentVideoIndex, slides]);

  // Este efecto se ejecuta solo una vez al montar el componente
  React.useEffect(() => {
    console.log("Inicializando carrusel de videos con índice 0");
    // No es necesario hacer nada más aquí, ya que el estado inicial ya es 0
  }, []);

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
