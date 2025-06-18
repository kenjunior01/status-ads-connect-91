
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Users, MessageSquare, DollarSign, Star, TrendingUp, Eye, Zap, Smartphone, Menu, X, Settings, BarChart3, PlusCircle, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: string;
  name: string;
  niche: string;
  price_per_post: number;
  status: string;
  highlight_expires_at: string;
  screenshots: Array<{
    id: string;
    image_url: string;
    views_count: number;
  }>;
}

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [featuredProfiles, setFeaturedProfiles] = useState<Profile[]>([]);
  const [newProfiles, setNewProfiles] = useState<Profile[]>([]);
  const [discoverProfiles, setDiscoverProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Mock data - creating enough profiles for 6x4 grid
    const mockProfiles: Profile[] = Array.from({ length: 24 }, (_, i) => ({
      id: `${i + 1}`,
      name: `Usuário ${i + 1}`,
      niche: ["Lifestyle", "Tecnologia", "Culinária", "Moda", "Fitness", "Viagem"][i % 6],
      price_per_post: Math.round((Math.random() * 50 + 15) * 100) / 100,
      status: "approved",
      highlight_expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      screenshots: [
        {
          id: `${i + 1}`,
          image_url: "/placeholder.svg",
          views_count: Math.floor(Math.random() * 1000 + 500)
        }
      ]
    }));

    setTimeout(() => {
      setFeaturedProfiles(mockProfiles);
      setNewProfiles(mockProfiles.slice(0, 12));
      setDiscoverProfiles(mockProfiles.slice(12, 24));
      setLoading(false);
    }, 1000);
  }, []);

  const calculateAverageViews = (screenshots: any[]) => {
    if (!screenshots || screenshots.length === 0) return 0;
    const total = screenshots.reduce((sum, s) => sum + s.views_count, 0);
    return Math.round(total / screenshots.length);
  };

  const ProfileCard = ({ profile }: { profile: Profile }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-white border border-gray-200 hover:border-gray-300">
      <CardHeader className="p-3">
        <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden mb-2">
          {profile.screenshots && profile.screenshots.length > 0 ? (
            <img 
              src={profile.screenshots[0].image_url} 
              alt="Screenshot"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Eye className="h-8 w-8 text-gray-400" />
            </div>
          )}
          <div className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm">
            <Smartphone className="h-3 w-3 text-gray-600" />
          </div>
        </div>
        <CardTitle className="text-sm font-semibold truncate text-gray-900">{profile.name}</CardTitle>
        <CardDescription className="text-xs">
          {profile.niche && <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700 border-0">{profile.niche}</Badge>}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="flex justify-between items-center text-sm">
          <span className="font-semibold text-gray-900">
            R$ {profile.price_per_post?.toFixed(2)}
          </span>
          <span className="text-gray-500 flex items-center gap-1 text-xs">
            <Eye className="h-3 w-3" />
            {calculateAverageViews(profile.screenshots)}
          </span>
        </div>
      </CardContent>
    </Card>
  );

  const ControlPanel = ({ userType }: { userType: 'creator' | 'advertiser' | 'admin' }) => {
    const panels = {
      creator: {
        title: "Painel do Criador",
        description: "Gerencie seu perfil e ganhos",
        actions: [
          { icon: PlusCircle, label: "Novo Post", color: "bg-blue-600" },
          { icon: BarChart3, label: "Estatísticas", color: "bg-green-600" },
          { icon: DollarSign, label: "Ganhos", color: "bg-purple-600" },
          { icon: Settings, label: "Configurações", color: "bg-gray-600" }
        ]
      },
      advertiser: {
        title: "Painel do Anunciante",
        description: "Encontre criadores e gerencie campanhas",
        actions: [
          { icon: Search, label: "Buscar Criadores", color: "bg-blue-600" },
          { icon: FileText, label: "Campanhas", color: "bg-green-600" },
          { icon: BarChart3, label: "Relatórios", color: "bg-purple-600" },
          { icon: Settings, label: "Configurações", color: "bg-gray-600" }
        ]
      },
      admin: {
        title: "Painel Admin",
        description: "Administre a plataforma",
        actions: [
          { icon: Users, label: "Usuários", color: "bg-blue-600" },
          { icon: BarChart3, label: "Analytics", color: "bg-green-600" },
          { icon: Star, label: "Moderação", color: "bg-purple-600" },
          { icon: Settings, label: "Sistema", color: "bg-gray-600" }
        ]
      }
    };

    const panel = panels[userType];

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{panel.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{panel.description}</p>
        <div className="grid grid-cols-2 gap-2">
          {panel.actions.map((action, index) => (
            <button
              key={index}
              className={`${action.color} text-white rounded-lg p-3 text-xs font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}
            >
              <action.icon className="h-4 w-4" />
              {action.label}
            </button>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-4 border-gray-200 border-t-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando perfis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">StatusAds Pro</h1>
                <p className="text-sm text-gray-600">Monetize seus Status</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#featured" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Destaques</a>
              <a href="#new" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Novos</a>
              <a href="#discover" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Descobrir</a>
              <a href="#stats" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Estatísticas</a>
              <a href="#controls" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Controles</a>
            </nav>

            <div className="flex items-center space-x-3">
              <div className="hidden md:flex space-x-3">
                <Button variant="outline" onClick={() => navigate('/auth')}>
                  Entrar
                </Button>
                <Button onClick={() => navigate('/auth')}>
                  Cadastrar
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-3">
                <a href="#featured" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Destaques</a>
                <a href="#new" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Novos</a>
                <a href="#discover" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Descobrir</a>
                <a href="#stats" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Estatísticas</a>
                <a href="#controls" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Controles</a>
                <div className="flex flex-col space-y-2 pt-3 border-t border-gray-200">
                  <Button variant="outline" onClick={() => navigate('/auth')}>Entrar</Button>
                  <Button onClick={() => navigate('/auth')}>Cadastrar</Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Featured Profiles */}
      {featuredProfiles.length > 0 && (
        <section id="featured" className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Criadores em Destaque</h3>
              <p className="text-gray-600">Os melhores criadores de conteúdo da plataforma</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {featuredProfiles.slice(0, 24).map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ad Section */}
      <section className="py-8 px-4 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Anuncie Aqui</h3>
            <p className="text-gray-600 mb-4">Alcance milhares de usuários e criadores</p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Saiba Mais
            </Button>
          </div>
        </div>
      </section>

      {/* New Profiles */}
      {newProfiles.length > 0 && (
        <section id="new" className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Novos Talentos</h3>
              <p className="text-gray-600">Descubra os mais novos criadores da plataforma</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {newProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Discover Section */}
      {discoverProfiles.length > 0 && (
        <section id="discover" className="py-12 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Descubra Mais Criadores</h3>
              <p className="text-gray-600">Explore diferentes nichos e encontre o criador perfeito</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {discoverProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Hero Section - Now moved below listings */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Transforme seus Status em Renda
          </h2>
          <p className="text-xl mb-8 opacity-90">
            A primeira plataforma do Brasil que conecta você com empresas que querem anunciar nos seus status do WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/auth')} className="bg-white text-blue-600 hover:bg-gray-100">
              Começar a Ganhar Agora
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/search')} className="border-white text-white hover:bg-white hover:text-blue-600">
              Encontrar Influenciadores
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Números da Plataforma</h3>
            <p className="text-gray-300">Resultados que comprovam nosso sucesso</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-gray-800 p-4 rounded-lg mb-2">
                <Users className="h-8 w-8 mx-auto text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold">5.2k+</h3>
              <p className="text-gray-300 text-sm">Usuários Ativos</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-800 p-4 rounded-lg mb-2">
                <DollarSign className="h-8 w-8 mx-auto text-green-400" />
              </div>
              <h3 className="text-2xl font-bold">R$ 250k+</h3>
              <p className="text-gray-300 text-sm">Pagos aos Usuários</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-800 p-4 rounded-lg mb-2">
                <Star className="h-8 w-8 mx-auto text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold">4.9★</h3>
              <p className="text-gray-300 text-sm">Avaliação Média</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-800 p-4 rounded-lg mb-2">
                <TrendingUp className="h-8 w-8 mx-auto text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold">15k+</h3>
              <p className="text-gray-300 text-sm">Anúncios Realizados</p>
            </div>
          </div>
        </div>
      </section>

      {/* Control Panels */}
      <section id="controls" className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Painéis de Controle</h3>
            <p className="text-gray-600">Ferramentas especializadas para cada tipo de usuário</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ControlPanel userType="creator" />
            <ControlPanel userType="advertiser" />
            <ControlPanel userType="admin" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <div className="bg-blue-600 p-2 rounded">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <span className="font-bold">StatusAds Pro</span>
              </div>
              <p className="text-gray-300 text-sm">
                A plataforma líder no Brasil para monetização de status do WhatsApp.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Para Criadores</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Como Começar</li>
                <li>Definir Preços</li>
                <li>Central de Ajuda</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Para Empresas</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Encontrar Criadores</li>
                <li>Anúncios Premium</li>
                <li>Suporte Empresarial</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm text-gray-300">
            &copy; 2024 StatusAds Pro. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
