-- Insert sample profiles and creator listings
INSERT INTO public.profiles (user_id, display_name, bio, niche, price_per_post, is_verified, badge_level) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Maria Silva', 'Influencer de lifestyle e moda com 50k seguidores no Instagram', 'fashion', 150, true, 'gold'),
  ('22222222-2222-2222-2222-222222222222', 'João Santos', 'Creator de tecnologia e reviews de produtos', 'tech', 200, true, 'platinum'),
  ('33333333-3333-3333-3333-333333333333', 'Ana Costa', 'Especialista em fitness e alimentação saudável', 'fitness', 120, false, 'silver'),
  ('44444444-4444-4444-4444-444444444444', 'Pedro Lima', 'Gaming content creator e streamer', 'gaming', 80, false, 'bronze'),
  ('55555555-5555-5555-5555-555555555555', 'Carla Nunes', 'Food blogger e chef especializada em culinária brasileira', 'food', 100, true, 'gold'),
  ('66666666-6666-6666-6666-666666666666', 'Rafael Torres', 'Travel blogger com foco em destinos nacionais', 'travel', 180, true, 'platinum'),
  ('77777777-7777-7777-7777-777777777777', 'Lucia Oliveira', 'Beauty guru e maquiadora profissional', 'beauty', 90, false, 'silver'),
  ('88888888-8888-8888-8888-888888888888', 'Bruno Alves', 'Personal trainer e wellness coach', 'fitness', 130, false, 'bronze'),
  ('99999999-9999-9999-9999-999999999999', 'Fernanda Rocha', 'Micro-influencer de pets e animais', 'pets', 60, false, 'bronze'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Diego Ferreira', 'Entrepreneur e business content creator', 'business', 250, true, 'platinum');

-- Update profiles with ratings and campaign stats
UPDATE public.profiles SET 
  rating = CASE 
    WHEN display_name = 'Maria Silva' THEN 4.8
    WHEN display_name = 'João Santos' THEN 4.9
    WHEN display_name = 'Ana Costa' THEN 4.6
    WHEN display_name = 'Pedro Lima' THEN 4.2
    WHEN display_name = 'Carla Nunes' THEN 4.7
    WHEN display_name = 'Rafael Torres' THEN 4.9
    WHEN display_name = 'Lucia Oliveira' THEN 4.5
    WHEN display_name = 'Bruno Alves' THEN 4.4
    WHEN display_name = 'Fernanda Rocha' THEN 4.3
    WHEN display_name = 'Diego Ferreira' THEN 4.8
  END,
  total_reviews = CASE 
    WHEN display_name = 'Maria Silva' THEN 24
    WHEN display_name = 'João Santos' THEN 31
    WHEN display_name = 'Ana Costa' THEN 18
    WHEN display_name = 'Pedro Lima' THEN 12
    WHEN display_name = 'Carla Nunes' THEN 22
    WHEN display_name = 'Rafael Torres' THEN 28
    WHEN display_name = 'Lucia Oliveira' THEN 15
    WHEN display_name = 'Bruno Alves' THEN 19
    WHEN display_name = 'Fernanda Rocha' THEN 8
    WHEN display_name = 'Diego Ferreira' THEN 33
  END,
  total_campaigns = CASE 
    WHEN display_name = 'Maria Silva' THEN 15
    WHEN display_name = 'João Santos' THEN 22
    WHEN display_name = 'Ana Costa' THEN 12
    WHEN display_name = 'Pedro Lima' THEN 8
    WHEN display_name = 'Carla Nunes' THEN 14
    WHEN display_name = 'Rafael Torres' THEN 19
    WHEN display_name = 'Lucia Oliveira' THEN 10
    WHEN display_name = 'Bruno Alves' THEN 13
    WHEN display_name = 'Fernanda Rocha' THEN 5
    WHEN display_name = 'Diego Ferreira' THEN 25
  END;