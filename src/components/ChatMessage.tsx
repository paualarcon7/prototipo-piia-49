import LoadingDots from "./LoadingDots";

interface ChatMessageProps {
  text: string;
  isBot: boolean;
  isLoading?: boolean;
}

const ChatMessage = ({ text, isBot, isLoading }: ChatMessageProps) => {
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
          isBot
            ? "bg-white border border-gray-200"
            : "bg-blue-500 text-white"
        }`}
      >
        {isLoading ? <LoadingDots /> : text}
      </div>
    </div>
  );
};

export default ChatMessage;