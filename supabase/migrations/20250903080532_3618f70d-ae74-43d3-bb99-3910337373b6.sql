-- Fix security issues by updating functions with proper search_path

-- Update existing functions to have proper search_path
CREATE OR REPLACE FUNCTION public.update_profile_rating()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Update sync_creator_listing function to have proper search_path
CREATE OR REPLACE FUNCTION public.sync_creator_listing()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  price_range_val text;
BEGIN
  -- Determine price range without exposing exact pricing
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
$$;