
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

  // Count total protocols and selected protocols per category
  const getCategoryCounts = (dimension: string, protocols: Protocol[]) => {
    const selectedCount = protocols.filter(p => isSelected(p)).length;
    return { total: protocols.length, selected: selectedCount };
  };

  return (
    <Accordion 
      type="multiple" 
      value={openCategories}
      onValueChange={setOpenCategories}
      className="space-y-3"
    >
      {Object.entries(groupedProtocols).map(([dimension, protocols]) => {
        const { total, selected } = getCategoryCounts(dimension, protocols);
        return (
          <AccordionItem 
            key={dimension} 
            value={dimension}
            className="border border-gray-700/50 rounded-lg overflow-hidden bg-secondary/30"
          >
            <AccordionTrigger className="px-4 py-3 font-medium tracking-wide capitalize hover:bg-secondary/50">
              <div className="flex justify-between items-center w-full pr-2">
                <span>{dimension}</span>
                <div className="flex items-center space-x-2">
                  {selected > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-[#02b1bb]/20 text-[#02b1bb] text-xs">
                      {selected} seleccionados
                    </span>
                  )}
                  <span className="text-xs text-gray-400">({total})</span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 p-3">
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
        );
      })}
    </Accordion>
  );
};
