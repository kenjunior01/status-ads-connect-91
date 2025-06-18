
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Users, MessageSquare, DollarSign, Star, TrendingUp, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
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
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      // Fetch featured profiles (highlighted)
      const { data: featured } = await supabase
        .from('profiles')
        .select(`
          *,
          screenshots (*)
        `)
        .eq('status', 'approved')
        .not('highlight_expires_at', 'is', null)
        .gte('highlight_expires_at', new Date().toISOString())
        .limit(12);

      // Fetch new profiles
      const { data: newOnes } = await supabase
        .from('profiles')
        .select(`
          *,
          screenshots (*)
        `)
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(8);

      // Fetch random profiles for discover
      const { data: discover } = await supabase
        .from('profiles')
        .select(`
          *,
          screenshots (*)
        `)
        .eq('status', 'approved')
        .limit(12);

      setFeaturedProfiles(featured || []);
      setNewProfiles(newOnes || []);
      setDiscoverProfiles(discover || []);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar perfis",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateAverageViews = (screenshots: any[]) => {
    if (!screenshots || screenshots.length === 0) return 0;
    const total = screenshots.reduce((sum, s) => sum + s.views_count, 0);
    return Math.round(total / screenshots.length);
  };

  const ProfileCard = ({ profile }: { profile: Profile }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
      <CardHeader className="p-4">
        <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg overflow-hidden mb-3">
          {profile.screenshots && profile.screenshots.length > 0 ? (
            <img 
              src={profile.screenshots[0].image_url} 
              alt="Screenshot"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Eye className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </div>
        <CardTitle className="text-sm font-semibold truncate">{profile.name}</CardTitle>
        <CardDescription className="text-xs">
          {profile.niche && <Badge variant="secondary" className="text-xs">{profile.niche}</Badge>}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex justify-between items-center text-sm">
          <span className="font-semibold text-green-600">
            R$ {profile.price_per_post?.toFixed(2)}
          </span>
          <span className="text-gray-500 flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {calculateAverageViews(profile.screenshots)}
          </span>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando perfis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                StatusAds Connect
              </h1>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => navigate('/auth')}>
                Entrar
              </Button>
              <Button onClick={() => navigate('/auth')} className="bg-gradient-to-r from-blue-600 to-purple-600">
                Cadastrar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Monetize seus <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Status do WhatsApp</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Conecte-se com empresas que querem anunciar nos seus status e transforme suas visualizações em renda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/auth')} className="bg-gradient-to-r from-blue-600 to-purple-600">
              Começar a Ganhar
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/search')}>
              <Search className="mr-2 h-4 w-4" />
              Encontrar Influenciadores
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">1,000+</h3>
              <p className="text-gray-600">Usuários Ativos</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">R$ 50k+</h3>
              <p className="text-gray-600">Pagos aos Usuários</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">4.9</h3>
              <p className="text-gray-600">Avaliação</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">5,000+</h3>
              <p className="text-gray-600">Anúncios Realizados</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Profiles */}
      {featuredProfiles.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Perfis em Destaque</h3>
              <p className="text-gray-600">Os melhores criadores de conteúdo para seus anúncios</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New Profiles */}
      {newProfiles.length > 0 && (
        <section className="py-16 bg-gray-50 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Novos Perfis</h3>
              <p className="text-gray-600">Conheça os mais novos criadores da plataforma</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {newProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Discover Section */}
      {discoverProfiles.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Descubra Mais</h3>
              <p className="text-gray-600">Explore diferentes nichos e oportunidades</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {discoverProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <MessageSquare className="h-6 w-6" />
                <span className="text-xl font-bold">StatusAds Connect</span>
              </div>
              <p className="text-gray-400">
                A plataforma que conecta criadores de conteúdo com empresas para anúncios em status do WhatsApp.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Para Usuários</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Como funciona</li>
                <li>Preços</li>
                <li>Suporte</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Para Empresas</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Encontrar Criadores</li>
                <li>Anúncios em Banner</li>
                <li>API</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Central de Ajuda</li>
                <li>Contato</li>
                <li>Termos de Uso</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 StatusAds Connect. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
