import { Trophy, Flame, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  // This is mock data - you should replace it with real data from your backend
  const streak = {
    current: 1,
    best: 1
  };

  const activeProgram = {
    name: "Programa de Meditación",
    progress: 60
  };

  const days = [
    { name: "Vie", completed: false },
    { name: "Sáb", completed: false },
    { name: "Dom", completed: false },
    { name: "Lun", completed: true },
    { name: "Mar", completed: false },
    { name: "Ayer", completed: false },
    { name: "Hoy", completed: false }
  ];

  return (
    <div className="container mx-auto px-4 py-4 space-y-4 pb-20">
      <h1 className="text-xl font-bold mb-4">Bienvenido de vuelta</h1>
      
      {/* Streak Card */}
      <Card className="bg-[#221F26] border-none text-white">
        <CardContent className="pt-4">
          {/* Days of the week */}
          <div className="flex justify-between items-center mb-6 px-2">
            {days.map((day, index) => (
              <div key={index} className="flex flex-col items-center gap-1.5">
                <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 ${
                  day.completed 
                    ? 'bg-[#0EA5E9] border-[#0EA5E9]' 
                    : 'border-gray-600 border-dashed'
                } flex items-center justify-center`}>
                  {day.completed && <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-white" />}
                </div>
                <span className="text-xs md:text-sm">{day.name}</span>
              </div>
            ))}
          </div>

          {/* Streak Stats */}
          <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center border-t border-gray-700 pt-4 space-y-2 md:space-y-0">
            <div className="flex items-center gap-2">
              <span className="text-sm md:text-xl">Mi racha actual</span>
              <Flame className="h-5 w-5 md:h-6 md:w-6 text-orange-500" />
              <span className="text-sm md:text-xl">x{streak.current}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm md:text-xl">Mi mejor racha</span>
              <Flame className="h-5 w-5 md:h-6 md:w-6 text-yellow-500" />
              <span className="text-sm md:text-xl">x{streak.best}</span>
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
              className="bg-[#0EA5E9] h-2.5 rounded-full" 
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