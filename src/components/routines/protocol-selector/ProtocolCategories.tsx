
import { useState } from "react";
import { Protocol } from "@/types/protocols";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProtocolItem } from "./ProtocolItem";

interface ProtocolCategoriesProps {
  groupedProtocols: Record<string, Protocol[]>;
  openCategories: string[];
  setOpenCategories: React.Dispatch<React.SetStateAction<string[]>>;
  isSelected: (protocol: Protocol) => boolean;
  handleToggleProtocol: (protocol: Protocol) => void;
}

export const ProtocolCategories = ({
  groupedProtocols,
  openCategories,
  setOpenCategories,
  isSelected,
  handleToggleProtocol,
}: ProtocolCategoriesProps) => {
  
  const handleToggleCategory = (value: string) => {
    setOpenCategories(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  return (
    <Accordion 
      type="multiple" 
      value={openCategories}
      onValueChange={setOpenCategories}
      className="space-y-2"
    >
      {Object.entries(groupedProtocols).map(([dimension, protocols]) => (
        <AccordionItem 
          key={dimension} 
          value={dimension}
          className="border border-gray-700/50 rounded-lg overflow-hidden bg-secondary/30"
        >
          <AccordionTrigger className="px-4 py-3 font-medium tracking-wide capitalize hover:bg-secondary/50">
            {dimension} 
            <span className="text-xs text-gray-400 ml-2">({protocols.length})</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-1 p-2">
              {protocols.map((protocol) => (
                <ProtocolItem
                  key={protocol.id}
                  protocol={protocol}
                  isSelected={isSelected(protocol)}
                  onToggle={() => handleToggleProtocol(protocol)}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
