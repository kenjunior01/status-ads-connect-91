import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { ArrowRight, CheckCircle, Star, TrendingUp, Users } from 'lucide-react';
import EnhancedCTA from '../components/EnhancedCTA';
import FloatingCTA from '../components/FloatingCTA';
import TestimonialCard from '../components/TestimonialCard';
import PricingCard from '../components/PricingCard';
import FeatureCard from '../components/FeatureCard';
import StatCard from '../components/StatCard';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background pt-20 pb-32">
        <div className="container px-4 mx-auto text-center">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-sm bg-background/80 backdrop-blur-sm">
            Plataforma Lançada 🚀
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Conectando Criadores e Anunciantes
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Uma plataforma inovadora que conecta criadores de conteúdo com anunciantes para parcerias lucrativas e autênticas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="gap-2">
                Comece Agora <ArrowRight size={16} />
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline">
                Saiba Mais
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Criadores" 
            value="10,000+" 
            description="criadores ativos" 
            icon={<Users className="h-5 w-5 text-primary" />} 
          />
          <StatCard 
            title="Campanhas" 
            value="25,000+" 
            description="campanhas realizadas" 
            icon={<TrendingUp className="h-5 w-5 text-primary" />} 
          />
          <StatCard 
            title="Satisfação" 
            value="98%" 
            description="taxa de satisfação" 
            icon={<CheckCircle className="h-5 w-5 text-primary" />} 
          />
          <StatCard 
            title="Avaliação" 
            value="4.9/5" 
            description="avaliação média" 
            icon={<Star className="h-5 w-5 text-primary" />} 
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recursos Poderosos</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nossa plataforma oferece ferramentas avançadas para maximizar o sucesso de criadores e anunciantes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              title="Matchmaking Inteligente" 
              description="Algoritmo avançado que conecta criadores e anunciantes com base em interesses e público-alvo." 
              icon={<Users className="h-10 w-10" />} 
            />
            <FeatureCard 
              title="Analytics Detalhados" 
              description="Métricas completas para acompanhar o desempenho de campanhas e engajamento." 
              icon={<TrendingUp className="h-10 w-10" />} 
            />
            <FeatureCard 
              title="Pagamentos Seguros" 
              description="Sistema de pagamento integrado com proteção para todas as partes envolvidas." 
              icon={<CheckCircle className="h-10 w-10" />} 
            />
            <FeatureCard 
              title="Chat Integrado" 
              description="Comunicação direta entre criadores e anunciantes para alinhar expectativas." 
              icon={<Star className="h-10 w-10" />} 
            />
            <FeatureCard 
              title="Contratos Automatizados" 
              description="Geração de contratos personalizados para cada parceria estabelecida." 
              icon={<CheckCircle className="h-10 w-10" />} 
            />
            <FeatureCard 
              title="Suporte Dedicado" 
              description="Equipe de suporte disponível para ajudar em todas as etapas do processo." 
              icon={<Users className="h-10 w-10" />} 
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Como Funciona</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Um processo simples e eficiente para conectar criadores e anunciantes.
          </p>
        </div>
        <Tabs defaultValue="creators" className="max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="creators">Para Criadores</TabsTrigger>
            <TabsTrigger value="advertisers">Para Anunciantes</TabsTrigger>
          </TabsList>
          <TabsContent value="creators" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="bg-primary/10 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      <span className="font-semibold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Crie seu perfil</h3>
                      <p className="text-muted-foreground">Cadastre-se e crie um perfil detalhado destacando seu nicho, métricas e trabalhos anteriores.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-primary/10 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      <span className="font-semibold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Receba propostas</h3>
                      <p className="text-muted-foreground">Anunciantes interessados em seu perfil enviarão propostas de campanhas alinhadas com seu conteúdo.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-primary/10 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      <span className="font-semibold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Negocie e execute</h3>
                      <p className="text-muted-foreground">Discuta os detalhes, aceite propostas e execute as campanhas recebendo pagamentos pela plataforma.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="advertisers" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="bg-primary/10 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      <span className="font-semibold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Defina sua campanha</h3>
                      <p className="text-muted-foreground">Crie sua conta e defina os objetivos, público-alvo e orçamento da sua campanha.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-primary/10 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      <span className="font-semibold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Encontre criadores</h3>
                      <p className="text-muted-foreground">Use nosso sistema de matchmaking para encontrar os criadores ideais para sua marca.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-primary/10 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      <span className="font-semibold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Gerencie campanhas</h3>
                      <p className="text-muted-foreground">Envie propostas, negocie termos e acompanhe o desempenho das campanhas em tempo real.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">O Que Nossos Usuários Dizem</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Histórias de sucesso de criadores e anunciantes que utilizam nossa plataforma.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="A plataforma revolucionou minha carreira como criador. Consegui parcerias que nunca imaginei ser possível." 
              author="Carlos Silva" 
              role="Criador de Conteúdo" 
              avatarUrl="https://i.pravatar.cc/150?img=1" 
              rating={5} 
            />
            <TestimonialCard 
              quote="Como anunciante, encontrar criadores alinhados com nossa marca nunca foi tão fácil e eficiente." 
              author="Ana Oliveira" 
              role="Gerente de Marketing" 
              avatarUrl="https://i.pravatar.cc/150?img=5" 
              rating={5} 
            />
            <TestimonialCard 
              quote="O sistema de matchmaking é impressionante. Todas as parcerias que fiz foram extremamente bem-sucedidas." 
              author="Pedro Santos" 
              role="Influenciador Digital" 
              avatarUrl="https://i.pravatar.cc/150?img=3" 
              rating={4} 
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Planos Simples e Transparentes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal para suas necessidades sem custos ocultos.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingCard 
            title="Básico" 
            price="Grátis" 
            description="Perfeito para começar" 
            features={[
              "Até 5 campanhas ativas",
              "Matchmaking básico",
              "Analytics essenciais",
              "Suporte por email"
            ]} 
            buttonText="Começar Grátis" 
            buttonVariant="outline" 
          />
          <PricingCard 
            title="Profissional" 
            price="R$99/mês" 
            description="Para criadores e marcas em crescimento" 
            features={[
              "Até 20 campanhas ativas",
              "Matchmaking avançado",
              "Analytics completos",
              "Contratos automatizados",
              "Suporte prioritário"
            ]} 
            buttonText="Assinar Agora" 
            buttonVariant="default" 
            popular 
          />
          <PricingCard 
            title="Empresarial" 
            price="R$299/mês" 
            description="Para operações em larga escala" 
            features={[
              "Campanhas ilimitadas",
              "Matchmaking premium",
              "Analytics avançados",
              "API dedicada",
              "Gerente de conta",
              "Suporte 24/7"
            ]} 
            buttonText="Contato Comercial" 
            buttonVariant="outline" 
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <EnhancedCTA 
              title="Para Criadores" 
              description="Amplie seu alcance e monetize seu conteúdo com parcerias autênticas e lucrativas." 
              buttonText="Cadastre-se como Criador" 
              icon={<Star className="h-6 w-6" />} 
            />
            <EnhancedCTA 
              title="Para Anunciantes" 
              description="Encontre os criadores perfeitos para sua marca e maximize o ROI das suas campanhas." 
              buttonText="Cadastre-se como Anunciante" 
              icon={<TrendingUp className="h-6 w-6" />} 
              variant="secondary" 
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Status Ads Connect</h3>
              <p className="text-muted-foreground">Conectando criadores e anunciantes para parcerias autênticas e lucrativas.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Plataforma</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-muted-foreground hover:text-foreground">Início</Link></li>
                <li><Link to="/auth" className="text-muted-foreground hover:text-foreground">Entrar</Link></li>
                <li><Link to="/auth" className="text-muted-foreground hover:text-foreground">Cadastrar</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
                <li><Link to="/" className="text-muted-foreground hover:text-foreground">Guias</Link></li>
                <li><Link to="/" className="text-muted-foreground hover:text-foreground">Suporte</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-muted-foreground hover:text-foreground">Termos</Link></li>
                <li><Link to="/" className="text-muted-foreground hover:text-foreground">Privacidade</Link></li>
                <li><Link to="/" className="text-muted-foreground hover:text-foreground">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Status Ads Connect. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <FloatingCTA />
    </div>
  );
};

export default Index;
