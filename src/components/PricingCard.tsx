import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  popular?: boolean;
  buttonText?: string;
}

export const PricingCard = ({ 
  title, 
  description, 
  price, 
  features, 
  popular = false,
  buttonText = "Começar"
}: PricingCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className={`relative h-full ${popular ? 'border-primary shadow-lg' : ''}`}>
      {popular && (
        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
          Mais Popular
        </Badge>
      )}
      
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="pt-4">
          <span className="text-4xl font-bold">{price}</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          className="w-full mt-6" 
          variant={popular ? "default" : "outline"}
          onClick={() => navigate('/auth')}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};