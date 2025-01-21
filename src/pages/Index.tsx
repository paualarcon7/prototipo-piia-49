import { useState } from "react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import { useEffect, useRef } from "react";
import { Bot } from "lucide-react";

const Index = () => {
  const [messages, setMessages] = useState<Array<{text: string; isBot: boolean}>>([
    {
      text: "¡Hola Diego! En que te puedo ayudar hoy?",
      isBot: true
    },
    {
      text: "Me siento estresado, que me recomiendas?",
      isBot: false
    },
    {
      text: "Sal a caminar.",
      isBot: true
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { text, isBot: false }]);
    setIsLoading(true);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "Gracias por tu mensaje. Por ahora soy un bot simple, ¡pero pronto seré más inteligente!",
        isBot: true
      }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-transparent">
      {/* Chat header */}
      <div className="bg-secondary/50 backdrop-blur-sm border-b border-secondary/20 p-4 flex items-center gap-3">
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-2 rounded-full shadow-lg">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-white">PIIA</h1>
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            text={message.text}
            isBot={message.isBot}
          />
        ))}
        {isLoading && <ChatMessage text="Escribiendo..." isBot={true} isLoading={true} />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-secondary/20 bg-secondary/50 backdrop-blur-sm p-4">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Index;