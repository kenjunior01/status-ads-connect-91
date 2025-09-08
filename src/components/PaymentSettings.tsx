import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Wallet } from "lucide-react";

export const PaymentSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Configurações de Pagamento
        </CardTitle>
        <CardDescription>
          Configure suas preferências de pagamento e métodos de recebimento
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pix">Chave PIX</Label>
          <Input id="pix" placeholder="Insira sua chave PIX" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bank">Dados Bancários</Label>
          <Input id="bank" placeholder="Banco, agência e conta" />
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Método seguro</span>
          </div>
          <Button>Salvar</Button>
        </div>
      </CardContent>
    </Card>
  );
};