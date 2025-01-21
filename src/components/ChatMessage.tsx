import LoadingDots from "./LoadingDots";

interface ChatMessageProps {
  text: string;
  isBot: boolean;
  isLoading?: boolean;
}

const ChatMessage = ({ text, isBot, isLoading }: ChatMessageProps) => {
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} animate-fade-in`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm ${
          isBot
            ? "bg-white border border-[#E5DEFF]"
            : "bg-[#9b87f5] text-white"
        }`}
      >
        {isLoading ? <LoadingDots /> : text}
      </div>
    </div>
  );
};

export default ChatMessage;