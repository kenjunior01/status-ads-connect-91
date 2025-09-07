import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from './ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent } from './ui/card';
import { usePayments } from '../hooks/usePayments';
import { Spinner } from './ui/spinner';
import { CreditCard, Landmark, QrCode } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  recipientId: string;
  campaignId?: string;
  onSuccess?: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  recipientId,
  campaignId,
  onSuccess
}) => {
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [installments, setInstallments] = useState('1');
  const [pixEmail, setPixEmail] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [bankAgency, setBankAgency] = useState('');
  const [bankName, setBankName] = useState('');
  
  const { toast } = useToast();
  const { processPayment, isProcessing } = usePayments();

  const handleSubmit = async () => {
    try {
      // Validate form based on payment method
      if (paymentMethod === 'credit_card') {
        if (!cardNumber || !cardName || !expiryDate || !cvv) {
          toast({
            title: 'Campos obrigatórios',
            description: 'Por favor, preencha todos os campos do cartão.',
            variant: 'destructive',
          });
          return;
        }
      } else if (paymentMethod === 'pix') {
        if (!pixEmail) {
          toast({
            title: 'Email obrigatório',
            description: 'Por favor, informe seu email para o PIX.',
            variant: 'destructive',
          });
          return;
        }
      } else if (paymentMethod === 'bank_transfer') {
        if (!bankAccount || !bankAgency || !bankName) {
          toast({
            title: 'Dados bancários obrigatórios',
            description: 'Por favor, preencha todos os dados bancários.',
            variant: 'destructive',
          });
          return;
        }
      }

      // Process payment
      const paymentData = {
        amount,
        recipientId,
        campaignId,
        paymentMethod,
        details: paymentMethod === 'credit_card' 
          ? { cardNumber, cardName, expiryDate, cvv, installments }
          : paymentMethod === 'pix'
          ? { email: pixEmail }
          : { bankAccount, bankAgency, bankName }
      };

      const result = await processPayment(paymentData);
      
      if (result.success) {
        toast({
          title: 'Pagamento realizado',
          description: 'Seu pagamento foi processado com sucesso!',
        });
        if (onSuccess) onSuccess();
        onClose();
      } else {
        toast({
          title: 'Erro no pagamento',
          description: result.error || 'Ocorreu um erro ao processar o pagamento.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Erro no pagamento',
        description: 'Ocorreu um erro ao processar o pagamento.',
        variant: 'destructive',
      });
    }
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Realizar Pagamento</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Valor a pagar:</span>
                  <span className="text-lg font-bold">{formatCurrency(amount)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="credit_card" onValueChange={setPaymentMethod}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="credit_card" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span>Cartão</span>
              </TabsTrigger>
              <TabsTrigger value="pix" className="flex items-center gap-2">
                <QrCode className="h-4 w-4" />
                <span>PIX</span>
              </TabsTrigger>
              <TabsTrigger value="bank_transfer" className="flex items-center gap-2">
                <Landmark className="h-4 w-4" />
                <span>Transferência</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="credit_card" className="space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Número do Cartão</Label>
                    <Input
                      id="cardNumber"
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Nome no Cartão</Label>
                    <Input
                      id="cardName"
                      placeholder="Nome como está no cartão"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Data de Validade</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/AA"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="installments">Parcelas</Label>
                    <Select value={installments} onValueChange={setInstallments}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione as parcelas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1x de {formatCurrency(amount)}</SelectItem>
                        <SelectItem value="2">2x de {formatCurrency(amount / 2)}</SelectItem>
                        <SelectItem value="3">3x de {formatCurrency(amount / 3)}</SelectItem>
                        <SelectItem value="6">6x de {formatCurrency(amount / 6)}</SelectItem>
                        <SelectItem value="12">12x de {formatCurrency(amount / 12)}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pix" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pixEmail">Email para PIX</Label>
                  <Input
                    id="pixEmail"
                    type="email"
                    placeholder="seu@email.com"
                    value={pixEmail}
                    onChange={(e) => setPixEmail(e.target.value)}
                  />
                </div>
                <div className="bg-muted p-4 rounded-md">
                  <p className="text-sm text-center">Após confirmar, você receberá um QR Code para pagamento via PIX.</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bank_transfer" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Banco</Label>
                  <Select value={bankName} onValueChange={setBankName}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione seu banco" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="itau">Itaú</SelectItem>
                      <SelectItem value="bradesco">Bradesco</SelectItem>
                      <SelectItem value="santander">Santander</SelectItem>
                      <SelectItem value="bb">Banco do Brasil</SelectItem>
                      <SelectItem value="caixa">Caixa Econômica</SelectItem>
                      <SelectItem value="nubank">Nubank</SelectItem>
                      <SelectItem value="inter">Banco Inter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bankAgency">Agência</Label>
                  <Input
                    id="bankAgency"
                    placeholder="0000"
                    value={bankAgency}
                    onChange={(e) => setBankAgency(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bankAccount">Conta</Label>
                  <Input
                    id="bankAccount"
                    placeholder="00000-0"
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit} disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Spinner className="mr-2" />
                Processando...
              </>
            ) : (
              'Confirmar Pagamento'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
