-- Remove the overly permissive policy that allows everyone to view all profile data
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Create a new policy that only allows authenticated users to view full profiles
CREATE POLICY "Authenticated users can view profiles" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (true);

-- Create a public view that exposes only non-sensitive information for marketplace browsing
CREATE OR REPLACE VIEW public.creator_listings AS
SELECT 
  id,
  display_name,
  niche,
  rating,
  total_reviews,
  total_campaigns,
  is_verified,
  badge_level,
  created_at,
  -- Hide sensitive information like exact pricing, bio, avatar_url, user_id
  CASE 
    WHEN price_per_post IS NOT NULL THEN 
      CASE 
        WHEN price_per_post < 50 THEN 'Budget-friendly'
        WHEN price_per_post < 200 THEN 'Mid-range'
        ELSE 'Premium'
      END
    ELSE 'Contact for pricing'
  END as price_range
FROM public.profiles
WHERE display_name IS NOT NULL;

-- Enable RLS on the view (inherits from the base table)
-- Create a policy to allow public access to the creator listings view
CREATE POLICY "Public can view creator listings"
ON public.creator_listings
FOR SELECT
TO anon, authenticated
USING (true);

-- Grant access to the view for anonymous users
GRANT SELECT ON public.creator_listings TO anon;
GRANT SELECT ON public.creator_listings TO authenticated;