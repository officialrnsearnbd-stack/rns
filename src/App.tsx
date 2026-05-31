import { useRoutes, useLocation } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import { routes } from './routes';
import { UserLayout } from '@/components/layouts/UserLayout';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { useEffect } from 'react';

function AppContent() {
  const element = useRoutes(routes);
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const isAuthPath = location.pathname === '/login' || location.pathname === '/register';
  const isLandingPath = location.pathname === '/';
  const isOnboardingPath = location.pathname === '/onboarding';
  const isPublicPath = location.pathname === '/privacy' || location.pathname === '/terms' || location.pathname === '/about';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (isAuthPath || isLandingPath || isOnboardingPath || isPublicPath) {
    return <>{element}</>;
  }

  if (isAdminPath) {
    return <AdminLayout>{element}</AdminLayout>;
  }

  return <UserLayout>{element}</UserLayout>;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster position="top-center" />
    </AuthProvider>
  );
}

export default App;
