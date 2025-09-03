import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  profile_id: string;
  display_name: string;
  niche: string | null;
  price_range: string | null;
  rating: number;
  total_reviews: number;
  total_campaigns: number;
  is_verified: boolean;
  badge_level: string;
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
      // Using manual typing since creator_listings table is new
      const { data, error } = await supabase
        .from('creator_listings' as any)
        .select('*')
        .not('display_name', 'is', null)
        .order('rating', { ascending: false })
        .limit(50) as { data: any[] | null, error: any };

      if (error) throw error;

      // Return actual data without sample fallback
      setProfiles(data || []);
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