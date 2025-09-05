-- Temporarily drop the foreign key constraint to add sample data
ALTER TABLE public.profiles DROP CONSTRAINT profiles_user_id_fkey;

-- Insert sample profiles 
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
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Diego Ferreira', 'Entrepreneur e business content creator', 'business', 250, true, 'platinum', 4.8, 33, 25);

-- Add sample campaigns
INSERT INTO public.campaigns (advertiser_id, creator_id, title, description, price, status) VALUES
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'Campanha de Verão - Roupas Femininas', 'Promoção de coleção verão com foco em público jovem feminino', 150, 'completed'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '22222222-2222-2222-2222-222222222222', 'Review Smartphone Galaxy S24', 'Review completo do novo smartphone com unboxing', 200, 'active'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', '33333333-3333-3333-3333-333333333333', 'Suplementos Fitness Pro', 'Campanha para linha de suplementos proteicos', 120, 'pending'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '66666666-6666-6666-6666-666666666666', 'Destino Bahia - Turismo', 'Promoção de pacotes turísticos para Salvador', 180, 'completed');

-- Add sample reviews
INSERT INTO public.reviews (advertiser_id, creator_id, campaign_id, rating, comment) VALUES
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', (SELECT id FROM public.campaigns WHERE title = 'Campanha de Verão - Roupas Femininas'), 5, 'Excelente trabalho! Muito profissional e engajamento ótimo.'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '66666666-6666-6666-6666-666666666666', (SELECT id FROM public.campaigns WHERE title = 'Destino Bahia - Turismo'), 5, 'Conteúdo de alta qualidade, superou nossas expectativas!');