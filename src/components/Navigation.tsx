import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Home, BarChart2, Users, Settings, LogOut, MessageSquare } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface NavigationProps {
  userRole?: 'admin' | 'creator' | 'advertiser';
}

const Navigation: React.FC<NavigationProps> = ({ userRole = 'creator' }) => {
  const location = useLocation();
  const { signOut } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getNavItems = () => {
    switch (userRole) {
      case 'admin':
        return [
          { icon: Home, label: 'Dashboard', path: '/dashboard/admin' },
          { icon: Users, label: 'Usuários', path: '/dashboard/admin' },
          { icon: BarChart2, label: 'Campanhas', path: '/dashboard/admin' },
          { icon: MessageSquare, label: 'Mensagens', path: '/dashboard/admin' },
          { icon: Settings, label: 'Configurações', path: '/settings' },
        ];
      case 'creator':
        return [
          { icon: Home, label: 'Dashboard', path: '/dashboard/creator' },
          { icon: BarChart2, label: 'Campanhas', path: '/dashboard/creator' },
          { icon: MessageSquare, label: 'Mensagens', path: '/dashboard/creator' },
          { icon: Settings, label: 'Perfil', path: '/settings' },
        ];
      case 'advertiser':
        return [
          { icon: Home, label: 'Dashboard', path: '/dashboard/advertiser' },
          { icon: Users, label: 'Criadores', path: '/dashboard/advertiser' },
          { icon: BarChart2, label: 'Campanhas', path: '/dashboard/advertiser' },
          { icon: MessageSquare, label: 'Mensagens', path: '/dashboard/advertiser' },
          { icon: Settings, label: 'Configurações', path: '/settings' },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="h-screen w-64 bg-background border-r flex flex-col">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Status Ads</h2>
        <p className="text-muted-foreground text-sm">Conectando marcas e criadores</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {getNavItems().map((item, index) => (
            <li key={index}>
              <Link to={item.path}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    isActive(item.path) && "bg-muted"
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 mt-auto border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  );
};

export default Navigation;
