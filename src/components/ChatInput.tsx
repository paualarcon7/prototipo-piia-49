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
        className="flex-1 rounded-full border border-[#E5DEFF] px-4 py-2.5 focus:outline-none focus:border-[#9b87f5] focus:ring-1 focus:ring-[#9b87f5] transition-colors"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !message.trim()}
        className="rounded-full p-2.5 bg-[#9b87f5] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#7E69AB] transition-colors"
      >
        <Send size={20} />
      </button>
    </form>
  );
};

export default ChatInput;