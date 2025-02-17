import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, PlayCircle, ClipboardList, Dumbbell, MessageSquare, Lock } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
interface Module {
  title: string;
  description: string;
  completed: boolean;
  current?: boolean;
}
const ModuleStages = ({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [activeStage, setActiveStage] = useState(0);
  const stages = [{
    title: "Inicio",
    icon: <PlayCircle className="w-6 h-6" />,
    description: "Escucha el audio introductorio y registra tu reflexión mediante una nota de voz.",
    steps: ["Escuchar audio introductorio", "Opción de audio adicional para profundizar", "Grabar reflexión por voz"]
  }, {
    title: "Sesión de trabajo",
    icon: <ClipboardList className="w-6 h-6" />,
    description: "Aprende sobre el protocolo, realiza un test y participa en una sesión de Q&A.",
    steps: ["Audio explicativo del protocolo", "Test de 3 preguntas", "Sesión de Q&A (voz o texto)"]
  }, {
    title: "Entrenamiento",
    icon: <Dumbbell className="w-6 h-6" />,
    description: "Practica los ejercicios y regístralos en tu calendario.",
    steps: ["Acceso al protocolo de ejercicios", "Registro de ejercicios en el calendario", "Seguimiento periódico"]
  }, {
    title: "Feedback",
    icon: <MessageSquare className="w-6 h-6" />,
    description: "Evalúa tu progreso y comparte tu experiencia con el protocolo.",
    steps: ["Test de evaluación", "Registro de feedback", "Revisión de progreso"]
  }];
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Etapas del Módulo</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {stages.map((stage, index) => <div key={index} className={`p-4 rounded-lg cursor-pointer transition-all ${activeStage === index ? "bg-secondary" : "bg-secondary/50 hover:bg-secondary/70"}`} onClick={() => setActiveStage(index)}>
              <div className="flex items-center gap-3 mb-2">
                {stage.icon}
                <h3 className="text-lg font-semibold">{stage.title}</h3>
              </div>
              <p className="text-sm text-gray-400 mb-2">{stage.description}</p>
              {activeStage === index && <div className="mt-4 space-y-2">
                  {stage.steps.map((step, stepIndex) => <div key={stepIndex} className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-2 h-2 rounded-full bg-purple-500" />
                      {step}
                    </div>)}
                </div>}
            </div>)}
        </div>
      </DialogContent>
    </Dialog>;
};
const ProgramaDetalle = () => {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const [selectedModule, setSelectedModule] = useState<null | number>(null);

  // Mock data - esto debería venir de una API en una implementación real
  const programas = {
    "1": {
      id: 1,
      name: "Elementia",
      description: "Programa para que alcances tu máximo potencial a través de las metodologías del alto rendimiento",
      fullDescription: "Elementia es un programa integral diseñado para potenciar tu desarrollo personal y profesional. A través de técnicas probadas y metodologías de alto rendimiento, te ayudaremos a descubrir y maximizar tu potencial innato.",
      duration: "12 semanas",
      modules: [{
        title: "Módulo 1: Fundamentos",
        description: "Estableciendo las bases para el éxito",
        completed: true
      }, {
        title: "Módulo 2: Desarrollo Personal",
        description: "Descubriendo tu potencial interior",
        completed: true
      }, {
        title: "Módulo 3: Alto Rendimiento",
        description: "Implementando técnicas avanzadas",
        completed: true
      }],
      color: "from-[#4CAF50] to-[#2E7D32]"
    },
    "2": {
      id: 2,
      name: "Elementia 2",
      description: "Descubre tu poder interior y desarrolla habilidades extraordinarias para el éxito",
      fullDescription: "Elementia 2 es la evolución natural de nuestro programa insignia. En esta nueva etapa, profundizaremos en técnicas avanzadas de desarrollo personal y profesional, llevándote a nuevos niveles de excelencia.",
      duration: "24 semanas",
      modules: [{
        title: "Módulo 1: Consciencia Expandida",
        description: "Desarrolla una perspectiva más amplia de tu potencial",
        completed: true
      }, {
        title: "Módulo 2: Poder Interior",
        description: "Activa y desarrolla tu fuerza interior",
        completed: true
      }, {
        title: "Módulo 3: Maestría Mental",
        description: "Técnicas avanzadas de control mental",
        completed: true
      }, {
        title: "Módulo 4: Transformación Profunda",
        description: "Implementa cambios duraderos en tu vida",
        completed: false,
        current: true
      }, {
        title: "Módulo 5: Liderazgo Consciente",
        description: "Desarrolla habilidades de liderazgo auténtico",
        completed: false
      }, {
        title: "Módulo 6: Influencia Positiva",
        description: "Aprende a impactar positivamente en otros",
        completed: false
      }, {
        title: "Módulo 7: Abundancia y Prosperidad",
        description: "Cultiva una mentalidad de abundancia",
        completed: false
      }, {
        title: "Módulo 8: Relaciones Poderosas",
        description: "Construye conexiones significativas",
        completed: false
      }, {
        title: "Módulo 9: Comunicación Efectiva",
        description: "Mejora tus habilidades de comunicación",
        completed: false
      }, {
        title: "Módulo 10: Gestión Emocional",
        description: "Domina tus emociones y estados internos",
        completed: false
      }, {
        title: "Módulo 11: Propósito y Visión",
        description: "Alinea tu vida con tu propósito más alto",
        completed: false
      }, {
        title: "Módulo 12: Integración y Maestría",
        description: "Consolida tu transformación personal",
        completed: false
      }],
      color: "from-[#FF6B6B] to-[#C23A3A]"
    },
    "3": {
      id: 3,
      name: "Elementia 3",
      description: "Transforma tu mentalidad y alcanza nuevos niveles de excelencia personal",
      fullDescription: "Elementia 3 representa la cumbre de nuestra metodología. Este programa avanzado está diseñado para aquellos que buscan alcanzar la maestría en su desarrollo personal y profesional.",
      duration: "36 semanas",
      modules: [{
        title: "Módulo 1: Nivel Avanzado",
        description: "Preparación para la maestría personal",
        completed: false
      }, {
        title: "Módulo 2: Transformación Total",
        description: "Cambios profundos y duraderos",
        completed: false
      }, {
        title: "Módulo 3: Excelencia Suprema",
        description: "Alcanza tu máximo potencial",
        completed: false
      }],
      color: "from-[#8E9196] to-[#333333]"
    }
  };
  const programa = programas[id as keyof typeof programas];
  const handleModuleClick = (moduleIndex: number, module: Module) => {
    // Si el módulo está bloqueado (no completado y no es el actual), mostrar mensaje
    if (!module.completed && !module.current) {
      toast.error("Este módulo aún no está disponible");
      return;
    }

    // Si el módulo está disponible, navegar a la ruta del módulo
    navigate(`/programa/${id}/modulo/${moduleIndex + 1}`);
    setSelectedModule(moduleIndex);
  };
  return <div className="container mx-auto px-4 py-6 space-y-6 pb-20">
      <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver
      </Button>

      <div className={`bg-gradient-to-r ${programa.color} rounded-lg p-6 text-white`}>
        <h1 className="text-2xl font-bold mb-2">{programa.name}</h1>
        <p className="text-white/90">{programa.description}</p>
      </div>

      <div className="space-y-6">
        <div className="bg-secondary/50 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Acerca del Programa</h2>
          <p className="text-gray-300">{programa.fullDescription}</p>
          <div className="mt-4">
            <span className="text-sm bg-secondary/30 px-3 py-1 rounded-full">
              Duración: {programa.duration}
            </span>
          </div>
        </div>

        <div className="bg-secondary/50 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Módulos</h2>
          <div className="space-y-4">
            {programa.modules.map((module, index) => <div key={index} className={`border border-secondary/20 rounded-lg p-4 ${module.current ? 'bg-secondary/30' : ''} ${!module.completed && !module.current ? 'opacity-50' : 'cursor-pointer hover:bg-secondary/40'} transition-colors`} onClick={() => handleModuleClick(index, module)}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      {module.title}
                      {module.completed ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : !module.current && <Lock className="h-4 w-4 text-gray-400" />}
                    </h3>
                    <p className="text-gray-300 text-sm mt-1">{module.description}</p>
                  </div>
                  {module.current && <span className="text-xs bg-purple-500/20 px-2 py-1 rounded-full text-[#ff4081]">
                      En progreso
                    </span>}
                </div>
              </div>)}
          </div>
        </div>
      </div>

      <ModuleStages isOpen={selectedModule !== null} onClose={() => setSelectedModule(null)} />
    </div>;
};
export default ProgramaDetalle;