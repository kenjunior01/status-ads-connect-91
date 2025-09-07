-- First, let me add some profiles to make the creator_listings work
INSERT INTO public.profiles (user_id, display_name, bio, niche, price_per_post, is_verified, badge_level, rating, total_reviews, total_campaigns) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Maria Silva', 'Influencer de lifestyle e moda com 50k seguidores no Instagram', 'fashion', 150, true, 'gold', 4.8, 24, 15),
  ('22222222-2222-2222-2222-222222222222', 'João Santos', 'Creator de tecnologia e reviews de produtos', 'tech', 200, true, 'platinum', 4.9, 31, 22),
  ('33333333-3333-3333-3333-333333333333', 'Ana Costa', 'Especialista em fitness e alimentação saudável', 'fitness', 120, false, 'silver', 4.6, 18, 12),
  ('44444444-4444-4444-4444-444444444444', 'Pedro Lima', 'Gaming content creator e streamer', 'gaming', 80, false, 'bronze', 4.2, 12, 8),
  ('55555555-5555-5555-5555-555555555555', 'Carla Nunes', 'Food blogger e chef especializada em culinária brasileira', 'food', 100, true, 'gold', 4.7, 22, 14),
  ('66666666-6666-6666-6666-666666666666', 'Rafael Torres', 'Travel blogger com foco em destinos nacionais', 'travel', 180, true, 'platinum', 4.9, 28, 19),
  ('77777777-7777-7777-7777-777777777777', 'Lucia Oliveira', 'Beauty guru e maquiadora profissional', 'beauty', 90, false, 'silver', 4.5, 15, 10),
  ('88888888-8888-8888-8888-888888888888', 'Bruno Alves', 'Personal trainer e wellness coach', 'fitness', 130, false, 'bronze', 4.4, 19, 13),
  ('99999999-9999-9999-9999-999999999999', 'Fernanda Rocha', 'Micro-influencer de pets e animais', 'pets', 60, false, 'bronze', 4.3, 8, 5),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Diego Ferreira', 'Entrepreneur e business content creator', 'business', 250, true, 'platinum', 4.8, 33, 25)
ON CONFLICT DO NOTHING;