
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Protocol } from "@/types/protocols";
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
  handleToggleProtocol
}: ProtocolCategoriesProps) => {
  if (Object.keys(groupedProtocols).length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-400 text-sm">
          No hay protocolos disponibles
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 pr-3" style={{ maxHeight: '60vh' }}>
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
            className="border-secondary/20 bg-secondary/30 rounded-md overflow-hidden"
          >
            <AccordionTrigger className="px-3 py-2 text-white hover:bg-secondary/50 hover:no-underline">
              <div className="flex items-center">
                <span className="capitalize">{dimension}</span>
                <Badge className="ml-2 bg-secondary/70 text-white">
                  {protocols.length}
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-1">
              <div className="space-y-2 px-1">
                {protocols.map(protocol => (
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
    </ScrollArea>
  );
};
