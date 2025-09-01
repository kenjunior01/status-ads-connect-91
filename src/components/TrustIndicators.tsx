import { Shield, Award, Users, CheckCircle, Clock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TrustIndicatorsProps {
  className?: string;
}

export const TrustIndicators = ({ className }: TrustIndicatorsProps) => {
  const indicators = [
    {
      icon: Shield,
      label: "Pagamentos Seguros",
      description: "100% protegido"
    },
    {
      icon: CheckCircle,
      label: "Perfis Verificados",
      description: "Todos validados"
    },
    {
      icon: Clock,
      label: "Suporte 24h",
      description: "Sempre disponível"
    },
    {
      icon: Award,
      label: "Qualidade Garantida",
      description: "Ou devolvemos seu dinheiro"
    }
  ];

  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4", className)}>
      {indicators.map((indicator, index) => {
        const Icon = indicator.icon;
        return (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors"
          >
            <div className="bg-primary/10 p-3 rounded-full mb-2">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <h4 className="font-medium text-sm text-foreground mb-1">
              {indicator.label}
            </h4>
            <p className="text-xs text-muted-foreground">
              {indicator.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

interface SocialProofProps {
  className?: string;
}

export const SocialProof = ({ className }: SocialProofProps) => {
  return (
    <div className={cn("text-center space-y-4", className)}>
      <div className="flex justify-center items-center gap-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">5.2k+</div>
          <div className="text-xs text-muted-foreground">Criadores Ativos</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success">R$ 2.5M+</div>
          <div className="text-xs text-muted-foreground">Pagos aos Usuários</div>
        </div>
        <div className="text-center">
          <div className="flex justify-center mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <div className="text-xs text-muted-foreground">4.9/5 - 2.1k avaliações</div>
        </div>
      </div>
      
      <div className="bg-muted/50 rounded-lg p-4">
        <p className="text-sm text-muted-foreground italic">
          "A StatusAds transformou meus stories em uma fonte de renda consistente. 
          Já ganhei mais de R$ 5.000 em 3 meses!"
        </p>
        <div className="mt-2 flex items-center justify-center gap-2">
          <img 
            src="/placeholder.svg" 
            alt="Usuário" 
            className="w-6 h-6 rounded-full"
          />
          <span className="text-xs text-muted-foreground">
            Maria S., Criadora de Conteúdo
          </span>
          <Badge variant="secondary" className="text-xs">Verificada</Badge>
        </div>
      </div>
    </div>
  );
};

interface UrgencyCounterProps {
  endTime: Date;
  className?: string;
}

export const UrgencyCounter = ({ endTime, className }: UrgencyCounterProps) => {
  return (
    <div className={cn("bg-warning/10 border border-warning/20 rounded-lg p-4", className)}>
      <div className="flex items-center gap-2 mb-2">
        <Clock className="h-4 w-4 text-warning" />
        <span className="text-sm font-medium text-warning">Oferta Por Tempo Limitado</span>
      </div>
      <p className="text-xs text-muted-foreground">
        Cadastre-se hoje e ganhe <strong>sem taxa de comissão</strong> no primeiro mês!
      </p>
      <div className="mt-2 text-xs text-warning font-medium">
        ⏰ Restam apenas 47 vagas disponíveis
      </div>
    </div>
  );
};