import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  bio: string | null;
  niche: string | null;
  price_per_post: number | null;
  rating: number;
  total_reviews: number;
  total_campaigns: number;
  is_verified: boolean;
  badge_level: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export const useProfiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .not('display_name', 'is', null)
        .order('rating', { ascending: false })
        .limit(50);

      if (error) throw error;

      // If no real data, create some sample data
      if (!data || data.length === 0) {
        const sampleProfiles: Profile[] = Array.from({ length: 24 }, (_, i) => ({
          id: `sample-${i + 1}`,
          user_id: `user-${i + 1}`,
          display_name: `Creator ${i + 1}`,
          bio: `Criador de conteúdo especializado em ${['Lifestyle', 'Tech', 'Food', 'Fashion', 'Fitness', 'Travel'][i % 6]}`,
          niche: ['Lifestyle', 'Tecnologia', 'Culinária', 'Moda', 'Fitness', 'Viagem'][i % 6],
          price_per_post: Math.round((Math.random() * 50 + 15) * 100) / 100,
          rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10,
          total_reviews: Math.floor(Math.random() * 50) + 5,
          total_campaigns: Math.floor(Math.random() * 30) + 1,
          is_verified: Math.random() > 0.7,
          badge_level: ['bronze', 'silver', 'gold', 'platinum'][Math.floor(Math.random() * 4)],
          avatar_url: null,
          created_at: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date().toISOString()
        }));
        setProfiles(sampleProfiles);
      } else {
        setProfiles(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching profiles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const getFeaturedProfiles = () => {
    return profiles
      .filter(p => p.is_verified || p.rating >= 4.5)
      .slice(0, 24);
  };

  const getNewProfiles = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    return profiles
      .filter(p => new Date(p.created_at) > oneWeekAgo)
      .slice(0, 12);
  };

  const getDiscoverProfiles = () => {
    return profiles
      .filter(p => !getFeaturedProfiles().includes(p) && !getNewProfiles().includes(p))
      .slice(0, 12);
  };

  return {
    profiles,
    loading,
    error,
    refetch: fetchProfiles,
    getFeaturedProfiles,
    getNewProfiles,
    getDiscoverProfiles
  };
};