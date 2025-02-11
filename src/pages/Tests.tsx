import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Lock, AlertTriangle, PlayCircle } from "lucide-react";
import TestQuestion from "@/components/TestQuestion";
import { useToast } from "@/hooks/use-toast";

const mockQuestions = [
  {
    id: 1,
    text: "En mi opinión, soy buena en mi trabajo",
    options: [
      { value: "never", label: "Nunca", color: "red" },
      { value: "yearly", label: "Alguna vez al año o menos", color: "red" },
      { value: "monthly", label: "Alguna vez al mes", color: "orange" },
      { value: "weekly", label: "Una vez a la semana", color: "yellow" },
      { value: "several_weekly", label: "Varias veces a la semana", color: "green" },
      { value: "daily", label: "Diariamente", color: "green" },
    ],
  },
  // Add more questions as needed
];

const Tests = () => {
  const [activeTest, setActiveTest] = useState<string | null>(null);
  const { toast } = useToast();

  const handleTestComplete = (results: Record<number, string>) => {
    // Here you would normally calculate the test results
    console.log("Test results:", results);
    toast({
      title: "Test completado",
      description: "Tus resultados han sido guardados exitosamente.",
    });
    setActiveTest(null);
  };

  if (activeTest === "orlick") {
    return (
      <TestQuestion
        questions={mockQuestions}
        onComplete={handleTestComplete}
        onBack={() => setActiveTest(null)}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen pb-20 p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Tests Disponibles</h1>
      
      <Card 
        className="p-4 bg-secondary/50 backdrop-blur-sm border-secondary/20 cursor-pointer"
        onClick={() => setActiveTest("orlick")}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Test de Orlick</h2>
            <p className="text-sm text-gray-500">Evaluación de habilidades mentales</p>
          </div>
          <PlayCircle className="w-6 h-6 text-green-500 animate-bounce" />
        </div>
        <p className="text-sm mt-2 text-green-500">Abierto</p>
      </Card>

      <Card className="p-4 bg-secondary/50 backdrop-blur-sm border-secondary/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Test de Burnout</h2>
            <p className="text-sm text-gray-500">Evaluación de agotamiento</p>
          </div>
          <Lock className="w-6 h-6 text-gray-400" />
        </div>
        <p className="text-sm mt-2 text-muted-foreground">Bloqueado</p>
      </Card>

      <Card className="p-4 bg-secondary/50 backdrop-blur-sm border-secondary/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Test de Depresión</h2>
            <p className="text-sm text-gray-500">Evaluación del estado de ánimo</p>
          </div>
          <Lock className="w-6 h-6 text-gray-400" />
        </div>
        <p className="text-sm mt-2 text-muted-foreground">Bloqueado</p>
      </Card>
    </div>
  );
};

export default Tests;