import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const FloatingCTA = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button 
        size="lg"
        className="rounded-full shadow-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
        onClick={() => navigate('/auth')}
      >
        Começar Agora
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};