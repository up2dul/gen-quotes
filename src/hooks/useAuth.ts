import { useEffect, useState } from 'react';

import { getMe, login } from '~/lib/api/auth';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      await handleGetMe();
    })();
  }, []);

  const handleGetMe = async () => {
    try {
      await getMe();
      setIsAuthenticated(true);
      setIsAuthLoading(false);
    } catch (error) {
      setIsAuthenticated(false);
      setIsAuthLoading(false);
    }
  };

  const handleLogin = async ({
    username,
    password,
  }: { username: string; password: string }) => {
    setIsLoading(true);
    setError('');

    try {
      await login({ username, password });
      setIsAuthenticated(true);
      setIsLoading(false);
      window.location.reload();
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) {
        if (error.name === 'HTTPError') {
          setError('Invalid username or password');
          console.error(error);
        }
      }
    }
  };

  return {
    login: handleLogin,
    isAuthenticated,
    isAuthLoading,
    isLoading,
    error,
  };
}
