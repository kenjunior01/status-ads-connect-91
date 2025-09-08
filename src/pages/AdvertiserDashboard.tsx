import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Users, TrendingUp, BarChart } from "lucide-react";
import { MetricsCard } from "@/components/MetricsCard";
import EnhancedCTA from "@/components/EnhancedCTA";

export default function AdvertiserDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Painel do Anunciante</h2>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricsCard
          title="Budget Total"
          value="R$ 15.750"
          icon={DollarSign}
          variant="success"
        />
        <MetricsCard
          title="Campanhas Ativas"
          value="8"
          icon={BarChart}
          variant="primary"
        />
        <MetricsCard
          title="Criadores Conectados"
          value="24"
          icon={Users}
          variant="default"
        />
        <MetricsCard
          title="ROI Médio"
          value="240%"
          icon={TrendingUp}
          variant="success"
        />
      </div>

      {/* Main Content */}
      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">Campanhas</TabsTrigger>
          <TabsTrigger value="creators">Criadores</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Suas Campanhas</CardTitle>
              <CardDescription>
                Gerencie todas as suas campanhas ativas e históricas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Suas campanhas serão exibidas aqui. Comece criando sua primeira campanha!
                </p>
                <Button className="mt-4">Nova Campanha</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="creators" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Descobrir Criadores</CardTitle>
              <CardDescription>
                Encontre criadores perfeitos para suas campanhas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Sistema de busca e filtros de criadores será implementado aqui.
                </p>
                <Button className="mt-4">Explorar Criadores</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics das Campanhas</CardTitle>
              <CardDescription>
                Acompanhe o desempenho de suas campanhas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Gráficos e métricas detalhadas serão exibidos aqui.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações da Conta</CardTitle>
              <CardDescription>
                Gerencie suas preferências e informações de pagamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <EnhancedCTA
                  title="Configurar Pagamentos"
                  description="Configure seus métodos de pagamento para campanhas"
                  buttonText="Configurar"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}