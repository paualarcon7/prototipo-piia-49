import { Trophy, Flame, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Home = () => {
  // This is mock data - you should replace it with real data from your backend
  const streak = {
    current: 1,
    best: 1
  };

  const activePrograms = [
    {
      id: 1,
      name: "Elementia",
      description: "Programa para que alcances tu máximo potencial a través de las metodologías del alto rendimiento",
      progress: 60,
      color: "from-[#9b87f5] to-[#6E59A5]"
    }
  ];

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

      {/* Active Programs Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Programas Activos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activePrograms.map((program) => (
            <Card key={program.id} className="overflow-hidden border-none">
              <div className={`bg-gradient-to-r ${program.color} p-6 text-white`}>
                <CardTitle className="text-xl mb-2">{program.name}</CardTitle>
                <CardDescription className="text-white/90 text-sm">
                  {program.description}
                </CardDescription>
              </div>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progreso</span>
                    <span>{program.progress}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-[#9b87f5] h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${program.progress}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;