
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Stage } from "@/types/module";

interface ModuleStageProps extends Stage {
  isActive: boolean;
  stageKey: string;
  status?: 'completed' | 'in-progress' | 'pending';
  children?: React.ReactNode;
  onSelect?: () => void; // Added this prop to support the onSelect callback
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
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Accordion 
      type="single" 
      collapsible 
      value={isActive ? stageKey : ""}
      className="w-full"
    >
      <AccordionItem value={stageKey} className="border-none mb-4">
        <AccordionTrigger 
          className={`p-4 rounded-lg transition-all ${
            isActive ? "bg-secondary" : "bg-secondary/50 hover:bg-secondary/70"
          } flex items-start`}
          onClick={onSelect} // Use the onSelect prop here
        >
          <div className="flex flex-1 items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                {icon}
                <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${getStatusColor()} ${status === 'in-progress' ? 'animate-pulse' : ''}`} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-left">{title}</h3>
                <p className="text-sm text-gray-400 text-left">{description}</p>
              </div>
            </div>
            {status === 'completed' && (
              <Badge className="ml-auto mr-4 bg-green-500/20 text-green-400 border border-green-500/30">
                Completado
              </Badge>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-4 px-4">
          <div className="space-y-6">
            <div className="space-y-2">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <div className={`w-2 h-2 rounded-full ${
                    status === 'completed' ? "bg-green-500" : 
                    status === 'in-progress' && index === 0 ? "bg-purple-500" : 
                    "bg-gray-500"
                  }`} />
                  {step}
                </div>
              ))}
            </div>
            {children && (
              <div className="mt-6 pt-4 border-t border-gray-800">
                {children}
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
