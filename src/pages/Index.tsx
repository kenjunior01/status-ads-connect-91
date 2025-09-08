import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SearchFilters } from "../components/SearchFilters";
import { EnhancedProfileCard } from "../components/EnhancedProfileCard";
import EnhancedCTA from "../components/EnhancedCTA";
import { FloatingCTA } from '../components/FloatingCTA';
import { TestimonialCard } from '../components/TestimonialCard';
import { PricingCard } from '../components/PricingCard';
import { FeatureCard } from '../components/FeatureCard';
import { StatCard } from '../components/StatCard';
import { useProfiles } from "../hooks/useProfiles";
import {
  Star,
  TrendingUp,
  Users,
  Search,
  Shield,
  CheckCircle,
  DollarSign,
  Target,
  BarChart3,
  CreditCard,
  Heart,
  ArrowRight,
} from "lucide-react";

const Index = () => {
  const { profiles, getFeaturedProfiles } = useProfiles();
  const featuredProfiles = getFeaturedProfiles();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="outline" className="mb-6 px-4 py-2">
            🚀 Conectando criadores e marcas
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            InfluencerHub
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            A plataforma líder que conecta criadores de conteúdo talentosos com marcas inovadoras para parcerias autênticas e resultados excepcionais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/auth">Começar Agora</Link>
            </Button>
            <Button variant="outline" size="lg">
              <Search className="mr-2 h-4 w-4" />
              Explorar Criadores
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 border-b">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard
              title="Criadores Ativos"
              value="10k+"
              subtitle="conectados"
            />
            <StatCard
              title="Campanhas Realizadas"
              value="25k+"
              subtitle="concluídas"
            />
            <StatCard
              title="Taxa de Sucesso"
              value="98%"
              subtitle="satisfação"
            />
            <StatCard
              title="Valor Médio"
              value="R$ 850"
              subtitle="por campanha"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Por que escolher nossa plataforma?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Oferecemos as ferramentas mais avançadas para conectar, gerenciar e otimizar suas parcerias.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Encontre o Criador Ideal"
              description="Conecte-se com milhares de criadores de conteúdo verificados e prontos para promover sua marca."
              icon={Users}
            />
            <FeatureCard
              title="Campanhas Personalizadas"
              description="Crie campanhas sob medida com ferramentas avançadas de segmentação e análise de resultados."
              icon={Target}
            />
            <FeatureCard
              title="Gestão Simplificada"
              description="Gerencie todos os seus projetos em uma única plataforma com relatórios detalhados e automação."
              icon={BarChart3}
            />
            <FeatureCard
              title="Pagamentos Seguros"
              description="Sistema de pagamentos integrado com garantia de entrega e proteção para ambas as partes."
              icon={CreditCard}
            />
            <FeatureCard
              title="Resultados Mensuráveis"
              description="Acompanhe métricas em tempo real e meça o ROI de cada campanha com precisão."
              icon={TrendingUp}
            />
            <FeatureCard
              title="Suporte Especializado"
              description="Conte com nossa equipe de especialistas para maximizar o sucesso das suas campanhas."
              icon={Heart}
            />
          </div>
        </div>
      </section>

      {/* Featured Creators */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Criadores em Destaque</h2>
              <p className="text-muted-foreground">Conheça alguns dos nossos criadores mais talentosos e bem avaliados.</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/auth">Ver Todos</Link>
            </Button>
          </div>
          
          <SearchFilters />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {featuredProfiles.slice(0, 6).map((profile) => (
              <EnhancedProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Como Funciona</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Um processo simples e eficiente para conectar criadores e marcas.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>1. Encontre</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Use nossos filtros avançados para encontrar criadores perfeitos para sua marca
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>2. Conecte</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Inicie conversas e negocie diretamente com os criadores através da nossa plataforma
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>3. Cresça</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Acompanhe o sucesso das suas campanhas com métricas detalhadas e insights valiosos
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">O Que Nossos Usuários Dizem</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Histórias de sucesso de criadores e anunciantes que utilizam nossa plataforma.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Marina Silva"
              role="CEO, TechStart"
              content="Resultado incrível! Nossa campanha alcançou 150% do ROI esperado. A plataforma é intuitiva e os criadores são profissionais excepcionais."
              rating={5}
            />
            <TestimonialCard
              name="Carlos Mendes"
              role="Marketing Manager, FashionBrand"
              content="Encontramos exatamente o que procurávamos. Os criadores entregaram conteúdo de alta qualidade e os resultados superaram nossas expectativas."
              rating={5}
            />
            <TestimonialCard
              name="Ana Costa"
              role="Diretora, BeautyLab"
              content="Plataforma revolucionária! Conseguimos conectar com influenciadores alinhados com nossa marca de forma rápida e eficiente."
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Planos e Preços</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano ideal para suas necessidades e comece a crescer hoje mesmo.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              title="Básico"
              price="Gratuito"
              description="Perfeito para começar"
              features={[
                "Até 5 campanhas ativas",
                "Matchmaking básico",
                "Analytics essenciais",
                "Suporte por email"
              ]}
              buttonText="Começar Grátis"
            />
            <PricingCard
              title="Profissional"
              price="R$ 99/mês"
              description="Para criadores e marcas em crescimento"
              features={[
                "Até 20 campanhas ativas",
                "Matchmaking avançado",
                "Analytics completos",
                "Contratos automatizados",
                "Suporte prioritário"
              ]}
              buttonText="Assinar Agora"
              popular
            />
            <PricingCard
              title="Empresarial"
              price="R$ 299/mês"
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
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <EnhancedCTA
              title="Para Criadores"
              description="Monetize seu conteúdo e construa parcerias duradouras com marcas que combinam com você."
              buttonText="Começar como Criador"
              icon={<Users className="h-5 w-5" />}
            />
            <EnhancedCTA
              title="Para Anunciantes"
              description="Encontre criadores autênticos e impulsione sua marca com campanhas de alto impacto."
              buttonText="Começar como Anunciante"
              icon={<Target className="h-5 w-5" />}
              variant="outline"
            />
          </div>
        </div>
      </section>

      <FloatingCTA />
    </div>
  );
};

export default Index;