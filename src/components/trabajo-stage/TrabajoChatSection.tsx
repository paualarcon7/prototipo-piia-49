
import { MessageSquare } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";

interface TrabajoChatSectionProps {
  messages: Array<{ text: string; isBot: boolean }>;
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  handleSendMessage: (text: string) => Promise<void>;
}

export const TrabajoChatSection = ({
  messages,
  isLoading,
  messagesEndRef,
  handleSendMessage
}: TrabajoChatSectionProps) => {
  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="bg-secondary/70 p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <MessageSquare className="h-5 w-5" />
        Conversación con PIIA
      </h2>
      
      <ScrollArea className="h-[400px] pr-4">
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
  );
};
