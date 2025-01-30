import { Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  // This is mock data - you should replace it with real data from your backend
  const streak = {
    current: 5,
    best: 12
  };

  const activeProgram = {
    name: "Programa de Meditación",
    progress: 60
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 pb-20">
      <h1 className="text-2xl font-bold mb-6">Bienvenido de vuelta</h1>
      
      {/* Streak Card */}
      <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-purple-500" />
            Racha actual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-500">{streak.current}</p>
              <p className="text-sm text-gray-500">Días seguidos</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-500">{streak.best}</p>
              <p className="text-sm text-gray-500">Mejor racha</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Program Card */}
      <Card>
        <CardHeader>
          <CardTitle>Programa Activo</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="font-semibold mb-2">{activeProgram.name}</h3>
          <div className="w-full bg-secondary rounded-full h-2.5">
            <div 
              className="bg-purple-500 h-2.5 rounded-full" 
              style={{ width: `${activeProgram.progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">{activeProgram.progress}% completado</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;