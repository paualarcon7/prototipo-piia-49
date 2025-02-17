
import { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe un mensaje..."
        className="flex-1 rounded-full bg-secondary/50 border border-secondary/20 backdrop-blur-sm px-4 py-2.5 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF4081] focus:border-transparent transition-all"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !message.trim()}
        className="rounded-full p-2.5 bg-[#FF4081] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all shadow-lg"
      >
        <Send size={20} />
      </button>
    </form>
  );
};

export default ChatInput;
