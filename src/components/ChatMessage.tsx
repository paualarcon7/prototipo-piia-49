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
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
          isBot
            ? "bg-secondary/50 backdrop-blur-sm border border-secondary/20 text-white"
            : "bg-gradient-to-r from-purple-600 to-purple-800 text-white"
        } shadow-lg`}
      >
        {isLoading ? <LoadingDots /> : text}
      </div>
    </div>
  );
};

export default ChatMessage;