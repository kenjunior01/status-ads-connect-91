-- Fix the handle_new_user trigger to properly assign roles based on metadata
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Update the trigger function to use role from metadata or default to 'creator'
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_role app_role;
BEGIN
  -- Get role from user metadata, default to 'creator' if not specified
  user_role := COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'creator'::app_role);
  
  -- Insert user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, user_role);
  
  -- Create profile entry
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));
  
  RETURN NEW;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Fix existing user roles: update 'user' role to 'creator' as default
UPDATE public.user_roles 
SET role = 'creator'::app_role 
WHERE role = 'user'::app_role;