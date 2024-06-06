import { useLocation } from 'react-router-dom';

import { Navigate, type Path } from '~/router';
import { useAuthStore } from '~/store/auth';

const PRIVATE: Path[] = ['/home', '/settings'];
const PUBLIC: Path[] = ['/login'];

export const Redirects = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const { isLoggedIn } = useAuthStore();

  const isPathIndex = pathname === '/';

  const authenticated =
    (isLoggedIn && PUBLIC.includes(pathname as Path)) || isPathIndex;
  const unauthenticated =
    (!isLoggedIn && PRIVATE.includes(pathname as Path)) || isPathIndex;

  if (authenticated) {
    return <Navigate to="/home" replace />;
  }
  if (unauthenticated) return <Navigate to="/login" replace />;

  return children;
};
