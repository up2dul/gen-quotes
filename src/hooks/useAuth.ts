import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import { getMe, login } from '~/lib/api/auth';
import { getToken } from '~/lib/utils';

export function useAuth() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    handleGetMe();
  }, []);

  const handleGetMe = async () => {
    try {
      if (getToken()) {
        await getMe();
        setIsAuthenticated(true);
      }
    } catch (error) {
      setIsAuthenticated(false);
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
      navigate({ to: '/' });
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
    isLoading,
    error,
  };
}
