
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Users, MessageSquare, DollarSign, Star, TrendingUp, Eye, Zap, Smartphone, WhatsappIcon } from "lucide-react";
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

  useEffect(() => {
    // Mock data for demonstration until database types are updated
    const mockProfiles: Profile[] = [
      {
        id: "1",
        name: "Ana Silva",
        niche: "Lifestyle",
        price_per_post: 25.00,
        status: "approved",
        highlight_expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        screenshots: [
          {
            id: "1",
            image_url: "/placeholder.svg",
            views_count: 850
          },
          {
            id: "2", 
            image_url: "/placeholder.svg",
            views_count: 920
          }
        ]
      },
      {
        id: "2",
        name: "Carlos Santos",
        niche: "Tecnologia",
        price_per_post: 45.00,
        status: "approved",
        highlight_expires_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        screenshots: [
          {
            id: "3",
            image_url: "/placeholder.svg",
            views_count: 1200
          },
          {
            id: "4",
            image_url: "/placeholder.svg", 
            views_count: 1150
          }
        ]
      },
      {
        id: "3",
        name: "Maria Oliveira",
        niche: "Culinária",
        price_per_post: 35.00,
        status: "approved",
        highlight_expires_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        screenshots: [
          {
            id: "5",
            image_url: "/placeholder.svg",
            views_count: 750
          }
        ]
      }
    ];

    // Simulate loading
    setTimeout(() => {
      setFeaturedProfiles(mockProfiles);
      setNewProfiles(mockProfiles.slice(0, 2));
      setDiscoverProfiles(mockProfiles);
      setLoading(false);
    }, 1000);
  }, []);

  const calculateAverageViews = (screenshots: any[]) => {
    if (!screenshots || screenshots.length === 0) return 0;
    const total = screenshots.reduce((sum, s) => sum + s.views_count, 0);
    return Math.round(total / screenshots.length);
  };

  const ProfileCard = ({ profile }: { profile: Profile }) => (
    <Card className="group hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 cursor-pointer transform hover:-translate-y-2 hover:scale-105 bg-gradient-to-br from-white to-green-50/30 border-2 border-transparent hover:border-green-200/50 backdrop-blur-sm">
      <CardHeader className="p-4">
        <div className="relative aspect-square bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 rounded-xl overflow-hidden mb-3 shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-blue-400/10"></div>
          {profile.screenshots && profile.screenshots.length > 0 ? (
            <img 
              src={profile.screenshots[0].image_url} 
              alt="Screenshot"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Eye className="h-12 w-12 text-green-400 group-hover:text-green-500 transition-colors" />
            </div>
          )}
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg">
            <Smartphone className="h-4 w-4 text-green-600" />
          </div>
        </div>
        <CardTitle className="text-sm font-bold truncate text-gray-800 group-hover:text-green-700 transition-colors">{profile.name}</CardTitle>
        <CardDescription className="text-xs">
          {profile.niche && <Badge variant="secondary" className="text-xs bg-gradient-to-r from-green-500 to-blue-500 text-white border-0 shadow-sm">{profile.niche}</Badge>}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex justify-between items-center text-sm">
          <span className="font-bold text-green-600 bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent text-lg">
            R$ {profile.price_per_post?.toFixed(2)}
          </span>
          <span className="text-gray-500 flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
            <Eye className="h-3 w-3" />
            {calculateAverageViews(profile.screenshots)}
          </span>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-32 w-32 border-4 border-green-200 border-t-green-600 mx-auto shadow-lg"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <MessageSquare className="h-8 w-8 text-green-600 animate-pulse" />
            </div>
          </div>
          <p className="mt-6 text-gray-700 font-medium">Carregando perfis incríveis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2325D366" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-green-100/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="relative bg-gradient-to-br from-green-500 to-green-600 text-white p-3 rounded-2xl shadow-xl hover:shadow-green-500/30 transition-all duration-300">
                <MessageSquare className="h-8 w-8" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 via-green-500 to-blue-600 bg-clip-text text-transparent">
                  StatusAds Pro
                </h1>
                <p className="text-sm text-gray-600 font-medium">Monetize seus Status</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => navigate('/auth')} className="border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 transition-all duration-300">
                Entrar
              </Button>
              <Button onClick={() => navigate('/auth')} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-105">
                Cadastrar Grátis
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-3xl mx-8"></div>
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-blue-100 rounded-full px-6 py-2 mb-8 shadow-lg">
            <Zap className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-green-700 font-semibold">Plataforma #1 do Brasil</span>
          </div>
          
          <h2 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Transforme seus 
            <span className="block bg-gradient-to-r from-green-500 via-green-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
              Status em Renda
            </span>
          </h2>
          
          <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            A primeira plataforma do Brasil que conecta você com empresas que querem anunciar nos seus status do WhatsApp. 
            <span className="font-semibold text-green-600">É simples, rápido e lucrativo!</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button size="lg" onClick={() => navigate('/auth')} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-lg px-8 py-4 shadow-xl hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-105">
              <Zap className="mr-2 h-5 w-5" />
              Começar a Ganhar Agora
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/search')} className="text-lg px-8 py-4 border-2 border-green-200 text-green-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 hover:border-green-300 transition-all duration-300">
              <Search className="mr-2 h-5 w-5" />
              Encontrar Influenciadores
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-green-100/50">
              <div className="bg-gradient-to-br from-green-400 to-green-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Upload Simples</h3>
              <p className="text-sm text-gray-600">Faça upload dos seus screenshots e comece a receber propostas</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-100/50">
              <div className="bg-gradient-to-br from-blue-400 to-blue-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Ganhe Dinheiro</h3>
              <p className="text-sm text-gray-600">Defina seu preço e receba pagamentos automaticamente</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-100/50">
              <div className="bg-gradient-to-br from-purple-400 to-purple-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Seja Descoberto</h3>
              <p className="text-sm text-gray-600">Apareça para milhares de empresas procurando por você</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="white" fill-opacity="0.1"%3E%3Cpath d="M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4">Números que Impressionam</h3>
            <p className="text-green-100 text-lg">Junte-se a milhares de pessoas que já estão lucrando</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group hover:transform hover:scale-110 transition-all duration-300">
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl mb-4 mx-auto w-20 h-20 flex items-center justify-center shadow-xl group-hover:shadow-2xl">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">5.2k+</h3>
              <p className="text-green-100 font-medium">Usuários Ativos</p>
            </div>
            <div className="text-center group hover:transform hover:scale-110 transition-all duration-300">
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl mb-4 mx-auto w-20 h-20 flex items-center justify-center shadow-xl group-hover:shadow-2xl">
                <DollarSign className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">R$ 250k+</h3>
              <p className="text-green-100 font-medium">Pagos aos Usuários</p>
            </div>
            <div className="text-center group hover:transform hover:scale-110 transition-all duration-300">
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl mb-4 mx-auto w-20 h-20 flex items-center justify-center shadow-xl group-hover:shadow-2xl">
                <Star className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">4.9★</h3>
              <p className="text-green-100 font-medium">Avaliação Média</p>
            </div>
            <div className="text-center group hover:transform hover:scale-110 transition-all duration-300">
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl mb-4 mx-auto w-20 h-20 flex items-center justify-center shadow-xl group-hover:shadow-2xl">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">15k+</h3>
              <p className="text-green-100 font-medium">Anúncios Realizados</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Profiles */}
      {featuredProfiles.length > 0 && (
        <section className="py-20 px-4 bg-gradient-to-br from-white to-green-50/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full px-4 py-2 mb-6">
                <Star className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="text-yellow-700 font-semibold">Perfis Premium</span>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-6">Criadores em Destaque</h3>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">Os melhores criadores de conteúdo estão aqui. Conecte-se com influenciadores de alta qualidade para seus anúncios.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {featuredProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New Profiles */}
      {newProfiles.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-4 py-2 mb-6">
                <Zap className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-blue-700 font-semibold">Novidades</span>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-6">Novos Talentos</h3>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">Descubra os mais novos criadores da nossa plataforma. Seja o primeiro a trabalhar com esses talentos emergentes.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {newProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Discover Section */}
      {discoverProfiles.length > 0 && (
        <section className="py-20 px-4 bg-gradient-to-br from-white to-blue-50/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-blue-100 rounded-full px-4 py-2 mb-6">
                <Search className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-green-700 font-semibold">Explore</span>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-6">Descubra Mais Criadores</h3>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">Explore diferentes nichos e encontre o criador perfeito para sua marca. Diversidade de conteúdo e audiências únicas.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {discoverProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="white" fill-opacity="0.05"%3E%3Ccircle cx="15" cy="15" r="1.5"/%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-2xl shadow-xl">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">StatusAds Pro</span>
                  <p className="text-gray-400 text-sm">Monetize seus Status</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                A plataforma líder no Brasil que conecta criadores de conteúdo com empresas para anúncios em status do WhatsApp. 
                Transforme suas visualizações em renda real.
              </p>
              <div className="flex space-x-4">
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl hover:bg-white/20 transition-all cursor-pointer">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl hover:bg-white/20 transition-all cursor-pointer">
                  <Star className="h-5 w-5" />
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Para Criadores</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="hover:text-green-400 transition-colors cursor-pointer">Como Começar</li>
                <li className="hover:text-green-400 transition-colors cursor-pointer">Definir Preços</li>
                <li className="hover:text-green-400 transition-colors cursor-pointer">Dicas de Sucesso</li>
                <li className="hover:text-green-400 transition-colors cursor-pointer">Central de Ajuda</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Para Empresas</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="hover:text-blue-400 transition-colors cursor-pointer">Encontrar Criadores</li>
                <li className="hover:text-blue-400 transition-colors cursor-pointer">Anúncios Premium</li>
                <li className="hover:text-blue-400 transition-colors cursor-pointer">Relatórios</li>
                <li className="hover:text-blue-400 transition-colors cursor-pointer">Suporte Empresarial</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 <span className="text-green-400 font-semibold">StatusAds Pro</span>. Todos os direitos reservados. 
              <span className="mx-2">•</span> 
              Transformando Status em Oportunidades.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
