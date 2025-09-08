import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/toaster';
import { Spinner } from './components/ui/spinner';
import { supabase } from '@/integrations/supabase/client';

// Pages
import Index from './pages/Index';
import Auth from './pages/Auth';
import CreatorDashboard from './pages/CreatorDashboard';
import AdvertiserDashboard from './pages/AdvertiserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CampaignDetails from './pages/CampaignDetails';
import ChatInterface from './pages/ChatInterface';
import ProfileSettings from './pages/ProfileSettings';
import NotFound from './pages/NotFound';
import Navigation from './components/Navigation';

function App() {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    async function getUserRole() {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .single();

          if (error) {
            console.error('Error fetching user role:', error);
            setUserRole('creator'); // Default fallback
          } else {
            setUserRole(data?.role || 'creator');
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
          setUserRole('creator'); // Default fallback
        } finally {
          setLoading(false);
        }
      } else {
        setUserRole(null);
        setLoading(false);
      }
    }

    getUserRole();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  // AppContent component to handle navigation and routes
  const AppContent = () => {
    // Auto-redirect logged in users to their dashboard if they're on the home page
    const shouldRedirectToDashboard = user && window.location.pathname === '/' && userRole;
    
    if (shouldRedirectToDashboard) {
      const dashboardPath = `/dashboard/${userRole}`;
      return <Navigate to={dashboardPath} replace />;
    }

    return (
      <div className="flex">
        {user && <Navigation userRole={userRole} />}
        <div className={`flex-1 ${user ? 'ml-64' : ''}`}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={!user ? <Auth /> : <Navigate to={`/dashboard/${userRole || 'creator'}`} />} />
            
            {/* Protected routes */}
            <Route 
              path="/dashboard/creator" 
              element={
                user && userRole === 'creator' ? 
                <CreatorDashboard /> : 
                <Navigate to={user ? "/" : "/auth"} />
              } 
            />
            <Route 
              path="/dashboard/advertiser" 
              element={
                user && userRole === 'advertiser' ? 
                <AdvertiserDashboard /> : 
                <Navigate to={user ? "/" : "/auth"} />
              } 
            />
            <Route 
              path="/dashboard/admin" 
              element={
                user && userRole === 'admin' ? 
                <AdminDashboard /> : 
                <Navigate to={user ? "/" : "/auth"} />
              } 
            />
            <Route 
              path="/campaign/:id" 
              element={
                user ? <CampaignDetails /> : <Navigate to="/auth" />
              } 
            />
            <Route 
              path="/chat/:id" 
              element={
                user ? <ChatInterface /> : <Navigate to="/auth" />
              } 
            />
            <Route 
              path="/settings" 
              element={
                user ? <ProfileSettings /> : <Navigate to="/auth" />
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    );
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <AppContent />
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
