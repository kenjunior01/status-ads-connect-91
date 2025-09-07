import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, CreditCard, DollarSign, Users, TrendingUp, BarChart, LineChart, PieChart, TrendingDown } from "lucide-react";
import { EnhancedProfileCard } from "@/components/EnhancedProfileCard";
import { EnhancedCTA } from "@/components/EnhancedCTA";
import { TrustIndicators } from "@/components/TrustIndicators";
import { MetricsCard } from "@/components/MetricsCard";
import { CampaignCard } from "@/components/CampaignCard";
import { PaymentSettings } from "@/components/PaymentSettings";

export default function AdvertiserDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <EnhancedCTA />
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Receita Total
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$45.231,89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% em relação ao mês passado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Assinaturas</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% em relação ao mês passado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vendas</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                  +19% em relação ao mês passado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Campanhas Ativas
                </CardTitle>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  +201 desde a última hora
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Visão Geral</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <MetricsCard />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Métricas de Retenção</CardTitle>
                <CardDescription>
                  Dados de retenção dos últimos 30 dias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center mr-4">
                      <TrendingUp className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <p className="text-sm font-medium leading-none">
                        Taxa de Retenção
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Percentual de usuários que retornam
                      </p>
                    </div>
                    <div className="font-bold text-xl">78%</div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center justify-center mr-4">
                      <LineChart className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <p className="text-sm font-medium leading-none">
                        Tempo Médio de Sessão
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Duração média das sessões de usuário
                      </p>
                    </div>
                    <div className="font-bold text-xl">12m 34s</div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center justify-center mr-4">
                      <TrendingDown className="h-6 w-6 text-red-500" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <p className="text-sm font-medium leading-none">
                        Taxa de Abandono
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Usuários que não retornaram após 30 dias
                      </p>
                    </div>
                    <div className="font-bold text-xl">22%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Criadores Recomendados</CardTitle>
                <CardDescription>
                  Baseado no seu histórico de campanhas
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-8">
                <EnhancedProfileCard
                  name="Sophia Oliveira"
                  handle="@sophiaoliart"
                  followers="245K"
                  engagement="4.8%"
                  category="Arte & Design"
                  image="/placeholder.svg"
                  verified={true}
                />
                <EnhancedProfileCard
                  name="Lucas Mendes"
                  handle="@lucasfitness"
                  followers="189K"
                  engagement="5.2%"
                  category="Fitness & Saúde"
                  image="/placeholder.svg"
                  verified={true}
                />
                <EnhancedProfileCard
                  name="Amanda Costa"
                  handle="@amandacooks"
                  followers="327K"
                  engagement="6.1%"
                  category="Culinária"
                  image="/placeholder.svg"
                  verified={false}
                />
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Ver todos os criadores recomendados
                </Button>
              </CardFooter>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Sistema de Gamificação</CardTitle>
                <CardDescription>
                  Acompanhe seu progresso e desbloqueie recompensas
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
                        <Users className="h-4 w-4" />
                      </div>
                      <span className="font-medium">Nível de Anunciante</span>
                    </div>
                    <span className="font-bold text-lg">Prata</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>7,800 / 12,000 pontos para o próximo nível</span>
                    <span>65%</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="border rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">3</div>
                    <div className="text-xs text-gray-500">Conquistas</div>
                  </div>
                  <div className="border rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-xs text-gray-500">Campanhas</div>
                  </div>
                  <div className="border rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">5</div>
                    <div className="text-xs text-gray-500">Recompensas</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="bg-green-100 text-green-700 p-1 rounded-full">
                        <TrendingUp className="h-3 w-3" />
                      </div>
                      <span className="text-sm">Primeira campanha viral</span>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">
                      Concluído
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="bg-gray-100 text-gray-700 p-1 rounded-full">
                        <Users className="h-3 w-3" />
                      </div>
                      <span className="text-sm">Alcance 10.000 usuários</span>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
                      Em progresso
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="bg-gray-100 text-gray-700 p-1 rounded-full">
                        <CreditCard className="h-3 w-3" />
                      </div>
                      <span className="text-sm">Complete 20 campanhas</span>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-800 py-1 px-2 rounded-full">
                      12/20
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Ver todas as recompensas</Button>
              </CardFooter>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Processo de Onboarding</CardTitle>
                <CardDescription>
                  Complete estas etapas para maximizar seus resultados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="bg-green-100 text-green-700 p-2 rounded-full">
                        <Users className="h-4 w-4" />
                      </div>
                      <span className="font-medium">Progresso Geral</span>
                    </div>
                    <span className="font-bold">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-green-600 h-2.5 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <span className="text-green-800 font-medium">1</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium line-through text-gray-500">
                        Complete seu perfil de anunciante
                      </h4>
                      <p className="text-xs text-gray-500">Concluído</p>
                    </div>
                    <div className="ml-4">
                      <span className="bg-green-100 text-green-800 text-xs py-1 px-2 rounded-full">
                        ✓
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <span className="text-green-800 font-medium">2</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium line-through text-gray-500">
                        Configure métodos de pagamento
                      </h4>
                      <p className="text-xs text-gray-500">Concluído</p>
                    </div>
                    <div className="ml-4">
                      <span className="bg-green-100 text-green-800 text-xs py-1 px-2 rounded-full">
                        ✓
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <span className="text-green-800 font-medium">3</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium line-through text-gray-500">
                        Crie sua primeira campanha
                      </h4>
                      <p className="text-xs text-gray-500">Concluído</p>
                    </div>
                    <div className="ml-4">
                      <span className="bg-green-100 text-green-800 text-xs py-1 px-2 rounded-full">
                        ✓
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-800 font-medium">4</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Conecte-se com 5 criadores</h4>
                      <p className="text-xs text-gray-500">3 de 5 concluídos</p>
                    </div>
                    <div className="ml-4">
                      <Button size="sm" variant="outline">
                        Continuar
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                      <span className="text-gray-800 font-medium">5</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-700">
                        Complete o tutorial de análise de dados
                      </h4>
                      <p className="text-xs text-gray-500">Não iniciado</p>
                    </div>
                    <div className="ml-4">
                      <Button size="sm" variant="outline">
                        Iniciar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Ver todas as etapas
                </Button>
              </CardFooter>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Notificações Personalizadas</CardTitle>
                <CardDescription>
                  Atualizações importantes para você
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-blue-800">Oportunidade de Campanha</h4>
                      <span className="text-xs text-gray-500">Hoje</span>
                    </div>
                    <p className="text-sm mt-1">
                      Baseado no seu histórico, uma campanha de fitness teria 78% mais engajamento este mês.
                    </p>
                    <div className="mt-2">
                      <Button size="sm" variant="outline" className="text-xs h-7">
                        Explorar criadores
                      </Button>
                    </div>
                  </div>

                  <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-green-800">Meta Alcançada</h4>
                      <span className="text-xs text-gray-500">Ontem</span>
                    </div>
                    <p className="text-sm mt-1">
                      Sua campanha "Verão 2023" superou a meta de conversão em 23%. Parabéns!
                    </p>
                    <div className="mt-2">
                      <Button size="sm" variant="outline" className="text-xs h-7">
                        Ver relatório
                      </Button>
                    </div>
                  </div>

                  <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-amber-800">Lembrete</h4>
                      <span className="text-xs text-gray-500">2 dias atrás</span>
                    </div>
                    <p className="text-sm mt-1">
                      Sua campanha atual termina em 3 dias. Considere renovar para manter os resultados.
                    </p>
                    <div className="mt-2">
                      <Button size="sm" variant="outline" className="text-xs h-7">
                        Renovar agora
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Ver todas as notificações
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Sistema de Feedback</CardTitle>
                <CardDescription>
                  Avaliações e comentários dos usuários
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
                        <Users className="h-4 w-4" />
                      </div>
                      <span className="font-medium">Satisfação Geral</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex">
                        {[1, 2, 3, 4].map((star) => (
                          <svg
                            key={star}
                            className="w-4 h-4 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <svg
                          className="w-4 h-4 text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <span className="ml-2 text-sm font-medium">4.0/5</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="border rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-200 mr-2"></div>
                          <div>
                            <h5 className="font-medium text-sm">Carlos Silva</h5>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  className="w-3 h-3 text-yellow-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">2 dias atrás</span>
                      </div>
                      <p className="text-sm">
                        "A plataforma é muito intuitiva e os resultados das campanhas superaram minhas expectativas!"
                      </p>
                    </div>

                    <div className="border rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-200 mr-2"></div>
                          <div>
                            <h5 className="font-medium text-sm">Ana Ferreira</h5>
                            <div className="flex">
                              {[1, 2, 3].map((star) => (
                                <svg
                                  key={star}
                                  className="w-3 h-3 text-yellow-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              {[1, 2].map((star) => (
                                <svg
                                  key={star}
                                  className="w-3 h-3 text-gray-300"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">1 semana atrás</span>
                      </div>
                      <p className="text-sm">
                        "Bom serviço, mas poderia ter mais opções de relatórios personalizados."
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Ver todos os comentários
                </Button>
              </CardFooter>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Campanhas Recentes</CardTitle>
                <CardDescription>
                  Você tem 3 campanhas em andamento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <CampaignCard
                    title="Verão 2023"
                    description="Campanha para produtos de verão"
                    status="active"
                    progress={75}
                    budget="R$ 12.000"
                    spent="R$ 9.000"
                    startDate="01/06/2023"
                    endDate="31/08/2023"
                  />
                  <CampaignCard
                    title="Lançamento App"
                    description="Promoção do novo aplicativo"
                    status="active"
                    progress={45}
                    budget="R$ 20.000"
                    spent="R$ 9.000"
                    startDate="15/07/2023"
                    endDate="15/09/2023"
                  />
                  <CampaignCard
                    title="Black Friday"
                    description="Preparação para Black Friday"
                    status="draft"
                    progress={10}
                    budget="R$ 30.000"
                    spent="R$ 0"
                    startDate="01/10/2023"
                    endDate="30/11/2023"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Criar Nova Campanha</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Análise de Engajamento</CardTitle>
                <CardDescription>
                  Métricas de interação dos usuários
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Taxa de Cliques</span>
                    <span className="text-sm font-bold">4.2%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: "42%" }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Tempo na Página</span>
                    <span className="text-sm font-bold">2m 45s</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Taxa de Conversão</span>
                    <span className="text-sm font-bold">2.8%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: "28%" }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Estratégias de Retenção</CardTitle>
                <CardDescription>
                  Eficácia das táticas de retenção
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Gamificação</span>
                    <span className="text-sm font-bold">Alta</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Notificações</span>
                    <span className="text-sm font-bold">Média</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Recompensas</span>
                    <span className="text-sm font-bold">Média-Alta</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Métricas de Engajamento ao Longo do Tempo</CardTitle>
                <CardDescription>
                  Últimos 30 dias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-end space-x-2">
                  {Array.from({ length: 30 }).map((_, i) => {
                    const height = 30 + Math.random() * 70;
                    return (
                      <div 
                        key={i} 
                        className="bg-blue-600 rounded-t w-full" 
                        style={{ height: `${height}%` }}
                      ></div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>1 Set</span>
                  <span>15 Set</span>
                  <span>30 Set</span>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Visão Geral</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <MetricsCard />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Confiança</CardTitle>
              </CardHeader>
              <CardContent>
                <TrustIndicators />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Relatórios</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <MetricsCard />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Confiança</CardTitle>
              </CardHeader>
              <CardContent>
                <TrustIndicators />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Notificações</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <MetricsCard />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Confiança</CardTitle>
              </CardHeader>
              <CardContent>
                <TrustIndicators />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Configurações</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <PaymentSettings />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Confiança</CardTitle>
              </CardHeader>
              <CardContent>
                <TrustIndicators />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
