import React from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

interface EnhancedCTAProps {
  title: string;
  description: string;
  buttonText: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  onClick?: () => void;
}

const EnhancedCTA: React.FC<EnhancedCTAProps> = ({
  title,
  description,
  buttonText,
  icon,
  variant = 'default',
  size = 'lg',
  className = '',
  onClick,
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default action if no onClick provided
      navigate('/auth');
    }
  };

  return (
    <div className={`bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-xl border border-border shadow-sm ${className}`}>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          {icon && <span className="text-primary">{icon}</span>}
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-muted-foreground">{description}</p>
        <Button 
          variant={variant} 
          size={size} 
          className="mt-2 w-full sm:w-auto" 
          onClick={handleClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default EnhancedCTA;
