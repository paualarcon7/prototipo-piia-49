import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { useState } from "react";

const prompts = {
  "Reflexión General": [
    "¿Cómo me siento hoy y por qué?",
    "¿Qué ha sido lo más significativo que me ha pasado hoy?",
    "¿Qué he aprendido hoy?",
  ],
  "Gratitud": [
    "¿Por qué cosas estoy agradecido/a hoy?",
    "¿Qué personas me han ayudado hoy?",
    "¿Qué momento del día me hizo sonreír?",
  ],
  "Crecimiento Personal": [
    "¿Qué desafíos he enfrentado hoy?",
    "¿Cómo he manejado mis emociones hoy?",
    "¿Qué podría hacer diferente mañana?",
  ],
};

interface DiaryPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const DiaryPrompts = ({ onSelectPrompt }: DiaryPromptsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="bg-secondary/50 backdrop-blur-sm border-secondary/20 p-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-purple-500" />
            <span className="text-white font-medium">¿No sabes qué escribir?</span>
          </div>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-4">
          {Object.entries(prompts).map(([category, categoryPrompts]) => (
            <div key={category} className="space-y-2">
              <h3 className="text-sm font-medium text-gray-300">{category}</h3>
              <div className="space-y-2">
                {categoryPrompts.map((prompt) => (
                  <Button
                    key={prompt}
                    variant="ghost"
                    className="w-full justify-start text-left text-gray-200 hover:text-white hover:bg-secondary/70"
                    onClick={() => onSelectPrompt(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default DiaryPrompts;