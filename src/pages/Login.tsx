
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, Chrome } from "lucide-react";

const Login = () => {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Por ahora cualquier input correcto con código 123456 permitirá el acceso
    if (code === "123456") {
      toast({
        title: "Acceso correcto",
        description: "Bienvenido al sistema",
      });
      navigate("/home");
    } else {
      toast({
        title: "Código incorrecto",
        description: "Por favor intenta nuevamente",
        variant: "destructive",
      });
    }
  };

  const handleGoogleLogin = () => {
    // Por ahora solo mostramos un mensaje de que el código debe ser 123456
    toast({
      title: "Inicio de sesión con Google",
      description: "Por favor usa el código 123456",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Bienvenido</h2>
          <p className="text-muted-foreground mt-2">Elige cómo quieres iniciar sesión</p>
        </div>

        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Celular
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="email">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Ingresa tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Ingresa el código"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Ingresar con Email
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    O continúa con
                  </span>
                </div>
              </div>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={handleGoogleLogin}
              >
                <Chrome className="mr-2 h-4 w-4" />
                Continuar con Google
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="phone">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="tel"
                  placeholder="Ingresa tu número de celular"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Ingresa el código"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Ingresar con Celular
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
