import { useState } from "react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import { useEffect, useRef } from "react";

const Index = () => {
  const [messages, setMessages] = useState<Array<{text: string; isBot: boolean}>>([
    {
      text: "¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?",
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
    
    // Add user message
    setMessages(prev => [...prev, { text, isBot: false }]);
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "Gracias por tu mensaje. Por ahora soy un bot simple, ¡pero pronto seré más inteligente!",
        isBot: true
      }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Chat header */}
      <div className="bg-white shadow-sm p-4 flex items-center">
        <h1 className="text-lg font-semibold text-gray-800">Chat Asistente</h1>
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
      <div className="border-t bg-white p-4">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Index;