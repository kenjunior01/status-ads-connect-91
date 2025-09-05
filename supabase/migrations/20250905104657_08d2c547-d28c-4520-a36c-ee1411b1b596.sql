-- Create creator_listings table that useProfiles hook expects
CREATE TABLE public.creator_listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  niche TEXT,
  price_range TEXT DEFAULT 'Contact for pricing',
  rating NUMERIC DEFAULT 0.0,
  total_reviews INTEGER DEFAULT 0,
  total_campaigns INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  badge_level TEXT DEFAULT 'bronze',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(profile_id)
);

-- Enable Row Level Security
ALTER TABLE public.creator_listings ENABLE ROW LEVEL SECURITY;

-- Create policies for creator_listings
CREATE POLICY "Creator listings are viewable by everyone" 
ON public.creator_listings 
FOR SELECT 
USING (true);

CREATE POLICY "Users can insert their own creator listing" 
ON public.creator_listings 
FOR INSERT 
WITH CHECK (profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their own creator listing" 
ON public.creator_listings 
FOR UPDATE 
USING (profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

-- Fix search_path security warnings for existing functions
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE OR REPLACE FUNCTION public.update_profile_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles 
  SET 
    rating = (
      SELECT ROUND(AVG(rating)::numeric, 1) 
      FROM public.reviews 
      WHERE creator_id = NEW.creator_id
    ),
    total_reviews = (
      SELECT COUNT(*) 
      FROM public.reviews 
      WHERE creator_id = NEW.creator_id
    )
  WHERE user_id = NEW.creator_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates on creator_listings
CREATE TRIGGER update_creator_listings_updated_at
BEFORE UPDATE ON public.creator_listings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger to sync profiles to creator_listings
CREATE TRIGGER sync_profile_to_creator_listing
AFTER INSERT OR UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.sync_creator_listing();

-- Create trigger to update profile rating after reviews
CREATE TRIGGER update_profiles_rating
AFTER INSERT OR UPDATE OR DELETE ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_profile_rating();