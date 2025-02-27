
import * as React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";

interface PurposeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
}

export function PurposeModal({ open, onOpenChange, onSubmit }: PurposeModalProps) {
  const [purpose, setPurpose] = React.useState("");

  const handleSubmit = () => {
    console.log("User purpose:", purpose);
    onSubmit();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#121212] border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">Reflexión final</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {/* PIIA Message */}
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-2xl px-4 py-2.5 bg-secondary/50 backdrop-blur-sm border border-secondary/20 text-white">
              <div className="flex items-start mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF4081] to-[#9C27B0] flex items-center justify-center mr-2">
                  <span className="text-white font-bold">P</span>
                </div>
                <span className="font-medium text-white">PIIA</span>
              </div>
              <p>¿Cuál es tu propósito para este módulo? Cuéntame en qué te gustaría enfocarte y qué esperas aprender.</p>
            </div>
          </div>
          
          {/* User response (shows when they've typed something) */}
          {purpose && (
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl px-4 py-2.5 bg-[#FF4081] text-white">
                {purpose}
              </div>
            </div>
          )}
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2">
            <Input
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Escribe tu propósito aquí..."
              className="flex-1 rounded-full bg-secondary/50 border border-secondary/20 backdrop-blur-sm px-4 py-2.5 text-white placeholder:text-gray-400"
            />
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={!purpose.trim()}
              className="rounded-full p-2.5 bg-[#FF4081] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all"
            >
              <Send size={20} />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
