import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

interface Campaign {
  id: string;
  title: string;
  description: string;
  price: number;
  status: string;
  created_at: string;
}

export default function CampaignDetails() {
  const { id } = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCampaign() {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('campaigns')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setCampaign(data);
      } catch (error) {
        console.error('Error fetching campaign:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCampaign();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!campaign) {
    return <div className="text-center">Campaign not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold">{campaign.title}</h1>
            <Badge variant="secondary">{campaign.status}</Badge>
          </div>
          <p className="text-muted-foreground">{campaign.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">R$ {campaign.price}</span>
            <Button>Apply to Campaign</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}