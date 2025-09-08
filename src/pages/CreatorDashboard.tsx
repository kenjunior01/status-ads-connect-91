import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EnhancedCTA from "@/components/EnhancedCTA";
import { TrustIndicators } from "@/components/TrustIndicators";
import { MetricsCard } from "@/components/MetricsCard";
import { CampaignCard } from "@/components/CampaignCard";
import { 
  DollarSign, 
  TrendingUp, 
  Star, 
  Calendar,
  Eye,
  MessageSquare,
  Settings,
  Bell,
  Award,
  Target,
  Users,
  Clock
} from "lucide-react";

export const CreatorDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - replace with real data from Supabase
  const stats = {
    totalEarnings: 2847.50,
    monthlyEarnings: 642.30,
    activeCampaigns: 3,
    completedCampaigns: 18,
    avgRating: 4.8,
    totalReviews: 24,
    responseRate: 96,
    profileViews: 1247
  };

  const campaigns = [
    {
      id: 1,
      title: "Produto de Beleza Natural",
      advertiser: "BeautyBrand",
      price: 150,
      status: "active" as const,
      deadline: "2025-01-15",
      progress: 60
    },
    {
      id: 2,
      title: "App de Fitness",
      advertiser: "FitApp",
      price: 200,
      status: "pending" as const,
      deadline: "2025-01-20", 
      progress: 0
    },
    {
      id: 3,
      title: "Curso Online",
      advertiser: "EduTech",
      price: 120,
      status: "completed" as const,
      deadline: "2024-12-30",
      progress: 100
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success';
      case 'pending': return 'bg-warning';
      case 'completed': return 'bg-primary';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Painel do Criador
            </h1>
            <p className="text-muted-foreground mt-1">
              Gerencie suas campanhas e monitore seus ganhos
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notificações
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricsCard
            title="Total Ganho"
            value={`R$ ${stats.totalEarnings.toFixed(2)}`}
            icon={DollarSign}
            variant="success"
            trend={{ value: 12.5, isPositive: true }}
          />
          
          <MetricsCard
            title="Este Mês"
            value={`R$ ${stats.monthlyEarnings.toFixed(2)}`}
            icon={TrendingUp}
            variant="primary"
            trend={{ value: 8.3, isPositive: true }}
          />
          
          <MetricsCard
            title="Campanhas Ativas"
            value={stats.activeCampaigns}
            icon={Target}
            variant="warning"
            subtitle="Em andamento"
          />
          
          <MetricsCard
            title="Avaliação Média"
            value={stats.avgRating}
            icon={Star}
            variant="default"
            subtitle={`${stats.totalReviews} avaliações`}
          />
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="campaigns">Campanhas</TabsTrigger>
            <TabsTrigger value="earnings">Ganhos</TabsTrigger>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Performance Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Taxa de Resposta</span>
                    <span className="font-semibold text-success">{stats.responseRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Campanhas Concluídas</span>
                    <span className="font-semibold">{stats.completedCampaigns}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Visualizações do Perfil</span>
                    <span className="font-semibold">{stats.profileViews}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total de Avaliações</span>
                    <span className="font-semibold">{stats.totalReviews}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card>
                <CardHeader>
                  <CardTitle>Próximos Passos</CardTitle>
                </CardHeader>
                <CardContent>
                  <EnhancedCTA
                    title="Próximos Passos"
                    description={`Passo ${2} de ${5} concluído`}
                    buttonText="Completar Perfil"
                    onClick={() => setActiveTab("profile")}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Trust Indicators */}
            <TrustIndicators />
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Suas Campanhas</h2>
              <Button>
                <Eye className="h-4 w-4 mr-2" />
                Ver Disponíveis
              </Button>
            </div>

            <div className="grid gap-4">
              {campaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={{
                    ...campaign,
                    advertiser: campaign.advertiser,
                    id: campaign.id.toString()
                  }}
                  viewType="creator"
                  onViewDetails={(camp) => console.log('View details:', camp)}
                  onOpenChat={(camp) => console.log('Open chat:', camp)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Ganhos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Gráfico de ganhos será implementado aqui
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Perfil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Formulário de edição do perfil será implementado aqui
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreatorDashboard;