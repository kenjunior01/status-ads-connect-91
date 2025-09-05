-- Drop foreign key constraints temporarily for sample data
ALTER TABLE public.campaigns DROP CONSTRAINT IF EXISTS campaigns_advertiser_id_fkey;
ALTER TABLE public.reviews DROP CONSTRAINT IF EXISTS reviews_advertiser_id_fkey;
ALTER TABLE public.user_roles DROP CONSTRAINT IF EXISTS user_roles_user_id_fkey;

-- Insert sample profiles first (already done in previous migration)
-- Now insert campaigns
INSERT INTO public.campaigns (advertiser_id, creator_id, title, description, price, status) VALUES
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'Campanha de Verão - Roupas Femininas', 'Promoção de coleção verão com foco em público jovem feminino', 150, 'completed'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '22222222-2222-2222-2222-222222222222', 'Review Smartphone Galaxy S24', 'Review completo do novo smartphone com unboxing', 200, 'active'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', '33333333-3333-3333-3333-333333333333', 'Suplementos Fitness Pro', 'Campanha para linha de suplementos proteicos', 120, 'pending'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '66666666-6666-6666-6666-666666666666', 'Destino Bahia - Turismo', 'Promoção de pacotes turísticos para Salvador', 180, 'completed');

-- Insert reviews
INSERT INTO public.reviews (advertiser_id, creator_id, campaign_id, rating, comment) VALUES
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', (SELECT id FROM public.campaigns WHERE title = 'Campanha de Verão - Roupas Femininas'), 5, 'Excelente trabalho! Muito profissional e engajamento ótimo.'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '66666666-6666-6666-6666-666666666666', (SELECT id FROM public.campaigns WHERE title = 'Destino Bahia - Turismo'), 5, 'Conteúdo de alta qualidade, superou nossas expectativas!'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '22222222-2222-2222-2222-222222222222', (SELECT id FROM public.campaigns WHERE title = 'Review Smartphone Galaxy S24'), 4, 'Bom trabalho, mas poderia ter mais detalhes técnicos.'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', '33333333-3333-3333-3333-333333333333', (SELECT id FROM public.campaigns WHERE title = 'Suplementos Fitness Pro'), 5, 'Perfeito! Exatamente o que esperávamos.');

-- Insert user roles for sample data
INSERT INTO public.user_roles (user_id, role) VALUES
  ('11111111-1111-1111-1111-111111111111', 'creator'),
  ('22222222-2222-2222-2222-222222222222', 'creator'),
  ('33333333-3333-3333-3333-333333333333', 'creator'),
  ('44444444-4444-4444-4444-444444444444', 'creator'),
  ('55555555-5555-5555-5555-555555555555', 'creator'),
  ('66666666-6666-6666-6666-666666666666', 'creator'),
  ('77777777-7777-7777-7777-777777777777', 'creator'),
  ('88888888-8888-8888-8888-888888888888', 'creator'),
  ('99999999-9999-9999-9999-999999999999', 'creator'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'creator'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'advertiser'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'advertiser'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'advertiser'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'advertiser');