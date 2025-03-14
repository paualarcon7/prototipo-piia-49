
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Stage } from "@/types/module";

interface ModuleStageProps extends Stage {
  isActive: boolean;
  stageKey: string;
  status?: 'completed' | 'in-progress' | 'pending';
  children?: React.ReactNode;
  onSelect: () => void;
}

export const ModuleStage = ({ 
  title, 
  icon, 
  description, 
  steps, 
  isActive,
  stageKey,
  status = 'pending',
  children,
  onSelect
}: ModuleStageProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return "bg-green-500";
      case 'in-progress':
        return "bg-[#02b1bb]";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="ml-auto mr-4 bg-green-500/20 text-green-400 border border-green-500/30 font-lato">
            Completado
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge className="ml-auto mr-4 bg-[#02b1bb]/20 text-[#02b1bb] border border-[#02b1bb]/30 font-lato animate-pulse">
            En progreso
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Accordion 
      type="multiple" 
      defaultValue={isActive ? [stageKey] : []}
      className="w-full"
    >
      <AccordionItem value={stageKey} className="border-none mb-6 overflow-hidden">
        <AccordionTrigger 
          className={`p-6 rounded-xl transition-all duration-300 ${
            isActive 
              ? "bg-[#1A1F2C] shadow-lg shadow-[#02b1bb]/10 border border-[#02b1bb]/30" 
              : "bg-[#1A1F2C]/80 border border-gray-700/50 hover:border-gray-700 hover:bg-[#1A1F2C]"
          } flex items-start group`}
          onClick={onSelect}
        >
          <div className="flex flex-1 items-center">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 flex items-center justify-center bg-[#252A3C] rounded-lg 
                            group-hover:bg-[#2D3344] transition-colors duration-300">
                <div className={`text-[#02b1bb] ${isActive ? 'scale-110' : ''} transition-transform duration-300`}>
                  {icon}
                </div>
                <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getStatusColor()} ${status === 'in-progress' ? 'animate-pulse' : ''}`} />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-left font-oswald tracking-wide">{title}</h3>
                <p className="text-sm text-gray-400 text-left font-lato">{description}</p>
              </div>
            </div>
            {getStatusBadge()}
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-4 px-4 animate-accordion-down">
          <div className="space-y-6 bg-[#1A1F2C]/60 rounded-xl p-6 shadow-inner border border-gray-800/50 transition-all duration-300 animate-fade-in">
            <div>
              <p className="text-sm text-gray-300 font-lato leading-relaxed">
                {steps.join('. ')}
              </p>
            </div>
            {children && (
              <div className="mt-8 pt-6 border-t border-gray-800/50">
                {children}
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
