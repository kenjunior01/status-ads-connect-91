import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  display_name: string;
  bio: string;
  niche: string;
  price_per_post: number;
}

export default function ProfileSettings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile>({
    display_name: '',
    bio: '',
    niche: '',
    price_per_post: 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        if (data) {
          setProfile({
            display_name: data.display_name || '',
            bio: data.bio || '',
            niche: data.niche || '',
            price_per_post: data.price_per_post || 0
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }

    fetchProfile();
  }, [user]);

  const updateProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          ...profile,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated."
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="display_name">Display Name</Label>
            <Input
              id="display_name"
              value={profile.display_name}
              onChange={(e) => setProfile(prev => ({ ...prev, display_name: e.target.value }))}
            />
          </div>
          
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
              rows={4}
            />
          </div>
          
          <div>
            <Label htmlFor="niche">Niche</Label>
            <Input
              id="niche"
              value={profile.niche}
              onChange={(e) => setProfile(prev => ({ ...prev, niche: e.target.value }))}
            />
          </div>
          
          <div>
            <Label htmlFor="price_per_post">Price per Post (R$)</Label>
            <Input
              id="price_per_post"
              type="number"
              value={profile.price_per_post}
              onChange={(e) => setProfile(prev => ({ ...prev, price_per_post: Number(e.target.value) }))}
            />
          </div>
          
          <Button onClick={updateProfile} disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </Card>
    </div>
  );
}