import { useLocation } from 'react-router-dom';

import { useAuth } from '~/hooks/useAuth';
import { Navigate, type Path } from '~/router';

const PRIVATE: Path[] = ['/home', '/settings'];
const PUBLIC: Path[] = ['/login'];

export const Redirects = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const { isAuthenticated, isAuthLoading } = useAuth();

  const isPathIndex = pathname === '/';

  const authenticated =
    (isAuthenticated && PUBLIC.includes(pathname as Path)) || isPathIndex;
  const unauthenticated =
    (!isAuthenticated && PRIVATE.includes(pathname as Path)) || isPathIndex;

  if (isAuthLoading) return null;
  if (authenticated) {
    return <Navigate to="/home" replace />;
  }
  if (unauthenticated) return <Navigate to="/login" replace />;

  return children;
};
