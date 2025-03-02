
import { MessageSquare, Play } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import { ModuleVideoCarousel } from "@/components/module/ModuleVideoCarousel";

interface TrabajoStageContentProps {
  showTrabajoVideo: boolean;
  messages: Array<{ text: string; isBot: boolean }>;
  isLoading: boolean;
  audioCompleted: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  trabajoVideoSlides: Array<{
    src: string;
    thumbnail: string;
    title: string;
    likes: number;
  }>;
  handleOpenTrabajoVideo: () => void;
  handleCloseTrabajoVideo: () => void;
  handleSendMessage: (text: string) => Promise<void>;
}

export const TrabajoStageContent = ({
  showTrabajoVideo,
  messages,
  isLoading,
  audioCompleted,
  messagesEndRef,
  trabajoVideoSlides,
  handleOpenTrabajoVideo,
  handleCloseTrabajoVideo,
  handleSendMessage
}: TrabajoStageContentProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-secondary/70 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Videos sobre Estado de Flujo</h2>
        <div>
          <div 
            className="relative mx-auto aspect-[9/16] max-w-[160px] bg-black rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
            onClick={handleOpenTrabajoVideo}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="h-8 w-8 text-white opacity-80" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-xs text-white font-medium line-clamp-2">
                {trabajoVideoSlides[0].title}
              </p>
            </div>
          </div>
        </div>
      </div>

      {showTrabajoVideo && (
        <div className="fixed inset-0 z-50 bg-black">
          <div className="h-full w-full flex items-center justify-center">
            <div className="relative w-full max-w-md h-full">
              <ModuleVideoCarousel 
                slides={trabajoVideoSlides} 
                onClose={handleCloseTrabajoVideo}
              />
            </div>
          </div>
        </div>
      )}

      {messages.length > 0 && (
        <div className="bg-secondary/70 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Conversación con PIIA
          </h2>
          
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  text={message.text}
                  isBot={message.isBot}
                />
              ))}
              {isLoading && (
                <ChatMessage
                  text=""
                  isBot={true}
                  isLoading={true}
                />
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="mt-4">
            <ChatInput
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
};
