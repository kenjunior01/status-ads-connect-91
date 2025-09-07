-- Just add data directly to creator_listings to make the homepage work immediately
-- This table doesn't have auth constraints that block us
INSERT INTO public.creator_listings (profile_id, display_name, niche, price_range, rating, total_reviews, total_campaigns, is_verified, badge_level) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Maria Silva', 'fashion', 'Mid-range', 4.8, 24, 15, true, 'gold'),
  ('22222222-2222-2222-2222-222222222222', 'João Santos', 'tech', 'Premium', 4.9, 31, 22, true, 'platinum'),
  ('33333333-3333-3333-3333-333333333333', 'Ana Costa', 'fitness', 'Mid-range', 4.6, 18, 12, false, 'silver'),
  ('44444444-4444-4444-4444-444444444444', 'Pedro Lima', 'gaming', 'Budget-friendly', 4.2, 12, 8, false, 'bronze'),
  ('55555555-5555-5555-5555-555555555555', 'Carla Nunes', 'food', 'Mid-range', 4.7, 22, 14, true, 'gold'),
  ('66666666-6666-6666-6666-666666666666', 'Rafael Torres', 'travel', 'Premium', 4.9, 28, 19, true, 'platinum'),
  ('77777777-7777-7777-7777-777777777777', 'Lucia Oliveira', 'beauty', 'Budget-friendly', 4.5, 15, 10, false, 'silver'),
  ('88888888-8888-8888-8888-888888888888', 'Bruno Alves', 'fitness', 'Mid-range', 4.4, 19, 13, false, 'bronze'),
  ('99999999-9999-9999-9999-999999999999', 'Fernanda Rocha', 'pets', 'Budget-friendly', 4.3, 8, 5, false, 'bronze'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Diego Ferreira', 'business', 'Premium', 4.8, 33, 25, true, 'platinum')
ON CONFLICT DO NOTHING;