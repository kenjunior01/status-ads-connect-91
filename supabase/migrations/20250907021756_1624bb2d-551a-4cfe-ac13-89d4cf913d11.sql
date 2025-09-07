-- Fix the campaigns to reference existing profile user_ids
INSERT INTO public.campaigns (advertiser_id, creator_id, title, description, price, status) VALUES
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'Campanha de Verão - Roupas Femininas', 'Promoção de coleção verão com foco em público jovem feminino', 150, 'completed'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '22222222-2222-2222-2222-222222222222', 'Review Smartphone Galaxy S24', 'Review completo do novo smartphone com unboxing', 200, 'active'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', '33333333-3333-3333-3333-333333333333', 'Suplementos Fitness Pro', 'Campanha para linha de suplementos proteicos', 120, 'pending'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '66666666-6666-6666-6666-666666666666', 'Destino Bahia - Turismo', 'Promoção de pacotes turísticos para Salvador', 180, 'completed')
ON CONFLICT DO NOTHING;

-- Fix reviews to use correct campaign IDs and creator IDs 
INSERT INTO public.reviews (advertiser_id, creator_id, campaign_id, rating, comment) 
SELECT 
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  '11111111-1111-1111-1111-111111111111',
  c.id,
  5,
  'Excelente trabalho! Muito profissional e engajamento ótimo.'
FROM public.campaigns c 
WHERE c.title = 'Campanha de Verão - Roupas Femininas'
AND NOT EXISTS (SELECT 1 FROM public.reviews WHERE campaign_id = c.id)
LIMIT 1;

INSERT INTO public.reviews (advertiser_id, creator_id, campaign_id, rating, comment) 
SELECT 
  'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
  '66666666-6666-6666-6666-666666666666',
  c.id,
  5,
  'Conteúdo de alta qualidade, superou nossas expectativas!'
FROM public.campaigns c 
WHERE c.title = 'Destino Bahia - Turismo'
AND NOT EXISTS (SELECT 1 FROM public.reviews WHERE campaign_id = c.id)
LIMIT 1;

-- Add user roles for sample data
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
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'advertiser')
ON CONFLICT DO NOTHING;