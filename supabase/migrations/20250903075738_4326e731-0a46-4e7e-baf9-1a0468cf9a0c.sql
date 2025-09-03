-- Remove the overly permissive policy that allows everyone to view all profile data
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Create a new policy that only allows authenticated users to view full profiles
CREATE POLICY "Authenticated users can view profiles" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (true);

-- Create a separate public table for basic creator listings that only contains non-sensitive information
CREATE TABLE IF NOT EXISTS public.creator_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  display_name text NOT NULL,
  niche text,
  rating numeric DEFAULT 0.0,
  total_reviews integer DEFAULT 0,
  total_campaigns integer DEFAULT 0,
  is_verified boolean DEFAULT false,
  badge_level text DEFAULT 'bronze',
  price_range text, -- 'Budget-friendly', 'Mid-range', 'Premium', 'Contact for pricing'
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on creator_listings
ALTER TABLE public.creator_listings ENABLE ROW LEVEL SECURITY;

-- Allow public access to creator listings (safe data only)
CREATE POLICY "Public can view creator listings"
ON public.creator_listings
FOR SELECT
TO anon, authenticated
USING (true);

-- Create a function to sync profile data to creator_listings (excluding sensitive info)
CREATE OR REPLACE FUNCTION public.sync_creator_listing()
RETURNS TRIGGER AS $$
BEGIN
  -- Determine price range without exposing exact pricing
  DECLARE
    price_range_val text;
  BEGIN
    IF NEW.price_per_post IS NULL THEN
      price_range_val := 'Contact for pricing';
    ELSIF NEW.price_per_post < 50 THEN
      price_range_val := 'Budget-friendly';
    ELSIF NEW.price_per_post < 200 THEN
      price_range_val := 'Mid-range';
    ELSE
      price_range_val := 'Premium';
    END IF;

    -- Insert or update creator listing
    INSERT INTO public.creator_listings (
      profile_id,
      display_name,
      niche,
      rating,
      total_reviews,
      total_campaigns,
      is_verified,
      badge_level,
      price_range,
      updated_at
    ) VALUES (
      NEW.id,
      NEW.display_name,
      NEW.niche,
      NEW.rating,
      NEW.total_reviews,
      NEW.total_campaigns,
      NEW.is_verified,
      NEW.badge_level,
      price_range_val,
      now()
    )
    ON CONFLICT (profile_id) DO UPDATE SET
      display_name = EXCLUDED.display_name,
      niche = EXCLUDED.niche,
      rating = EXCLUDED.rating,
      total_reviews = EXCLUDED.total_reviews,
      total_campaigns = EXCLUDED.total_campaigns,
      is_verified = EXCLUDED.is_verified,
      badge_level = EXCLUDED.badge_level,
      price_range = EXCLUDED.price_range,
      updated_at = now();

    RETURN NEW;
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to sync data
CREATE TRIGGER sync_creator_listing_trigger
  AFTER INSERT OR UPDATE ON public.profiles
  FOR EACH ROW
  WHEN (NEW.display_name IS NOT NULL)
  EXECUTE FUNCTION public.sync_creator_listing();

-- Migrate existing data
INSERT INTO public.creator_listings (
  profile_id,
  display_name,
  niche,
  rating,
  total_reviews,
  total_campaigns,
  is_verified,
  badge_level,
  price_range
)
SELECT 
  id,
  display_name,
  niche,
  rating,
  total_reviews,
  total_campaigns,
  is_verified,
  badge_level,
  CASE 
    WHEN price_per_post IS NULL THEN 'Contact for pricing'
    WHEN price_per_post < 50 THEN 'Budget-friendly'
    WHEN price_per_post < 200 THEN 'Mid-range'
    ELSE 'Premium'
  END as price_range
FROM public.profiles
WHERE display_name IS NOT NULL
ON CONFLICT (profile_id) DO NOTHING;