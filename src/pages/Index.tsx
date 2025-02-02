import { useState } from "react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import { useEffect, useRef } from "react";
import { Bot, Search, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { es } from 'date-fns/locale';

const Index = () => {
  const [messages, setMessages] = useState<Array<{text: string; isBot: boolean; date: Date}>>([
    {
      text: "¡Hola Diego! En que te puedo ayudar hoy?",
      isBot: true,
      date: new Date()
    },
    {
      text: "Me siento estresado, que me recomiendas?",
      isBot: false,
      date: new Date()
    },
    {
      text: "Sal a caminar.",
      isBot: true,
      date: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { text, isBot: false, date: new Date() }]);
    setIsLoading(true);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "Gracias por tu mensaje. Por ahora soy un bot simple, ¡pero pronto seré más inteligente!",
        isBot: true,
        date: new Date()
      }]);
      setIsLoading(false);
    }, 1000);
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = selectedDate 
      ? message.date.toDateString() === selectedDate.toDateString()
      : true;
    return matchesSearch && matchesDate;
  });

  return (
    <div className="flex flex-col h-screen bg-transparent pb-16">
      {/* Chat header */}
      <div className="bg-secondary/50 backdrop-blur-sm border-b border-secondary/20 p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-2 rounded-full shadow-lg">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">PIIA</h1>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Buscar en conversaciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-secondary/30 border-secondary/20 text-white placeholder:text-gray-400"
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="bg-secondary/30 border-secondary/20 text-white hover:text-white hover:bg-secondary/50"
              >
                <Calendar className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-secondary/95 border-secondary/20">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                locale={es}
                className="rounded-md border-0"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredMessages.map((message, index) => (
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