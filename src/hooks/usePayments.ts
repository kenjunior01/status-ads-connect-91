import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseKey } from '../lib/supabaseClient';

interface PaymentDetails {
  cardNumber?: string;
  cardName?: string;
  expiryDate?: string;
  cvv?: string;
  installments?: string;
  email?: string;
  bankAccount?: string;
  bankAgency?: string;
  bankName?: string;
}

interface PaymentData {
  amount: number;
  recipientId: string;
  campaignId?: string;
  paymentMethod: string;
  details: PaymentDetails;
}

interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

export const usePayments = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const supabase = createClient(supabaseUrl, supabaseKey);

  const processPayment = async (paymentData: PaymentData): Promise<PaymentResult> => {
    setIsProcessing(true);
    
    try {
      // Simulação de processamento de pagamento
      // Em um ambiente real, aqui seria integrado com um gateway de pagamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Registrar a transação no Supabase
      const { data, error } = await supabase
        .from('transactions')
        .insert([
          {
            amount: paymentData.amount,
            sender_id: (await supabase.auth.getUser()).data.user?.id,
            recipient_id: paymentData.recipientId,
            campaign_id: paymentData.campaignId,
            payment_method: paymentData.paymentMethod,
            status: 'completed',
            payment_details: paymentData.details
          }
        ])
        .select();

      if (error) {
        console.error('Error saving transaction:', error);
        return {
          success: false,
          error: 'Erro ao registrar transação.'
        };
      }

      return {
        success: true,
        transactionId: data[0].id
      };
    } catch (error) {
      console.error('Payment processing error:', error);
      return {
        success: false,
        error: 'Erro ao processar pagamento.'
      };
    } finally {
      setIsProcessing(false);
    }
  };

  const getTransactionHistory = async (userId: string) => {
    try {
      // Buscar transações onde o usuário é o remetente ou destinatário
      const { data, error } = await supabase
        .from('transactions')
        .select(`
          *,
          sender:sender_id(id, email, display_name),
          recipient:recipient_id(id, email, display_name),
          campaign:campaign_id(id, title)
        `)
        .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      return [];
    }
  };

  const getPaymentSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('payment_settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data || {};
    } catch (error) {
      console.error('Error fetching payment settings:', error);
      return {};
    }
  };

  const updatePaymentSettings = async (settings: any) => {
    try {
      const { data, error } = await supabase
        .from('payment_settings')
        .upsert(settings)
        .select();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error updating payment settings:', error);
      return { success: false, error };
    }
  };

  return {
    processPayment,
    getTransactionHistory,
    getPaymentSettings,
    updatePaymentSettings,
    isProcessing
  };
};
