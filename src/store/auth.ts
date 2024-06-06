import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { getUser, login } from '~/lib/api/auth';
import { setToken, setUserData } from '~/lib/utils';
import { useLoginStore } from './login';

type AuthStore = {
  isLoggedIn: boolean;
  login: ({
    username,
    password,
  }: { username: string; password: string }) => void;
  logout: () => void;
  validateLogin: () => void;
};

export const useAuthStore = create(
  persist<AuthStore>(
    (set, get) => ({
      isLoggedIn: false,
      isLoginLoading: false,
      loginError: null,
      login: async ({ username, password }) => {
        const { setIsLoginLoading, setLoginError } = useLoginStore.getState();

        setIsLoginLoading(true);
        try {
          const { token, ...userData } = await login({ username, password });
          if (token) {
            setToken(token);
            setUserData(userData);
            setLoginError(null);
            set({
              isLoggedIn: true,
            });
          }
        } catch (error) {
          if (error instanceof Error) setLoginError(error.message);
        }
        setIsLoginLoading(false);
      },
      logout: () => {
        set({ isLoggedIn: false });
        localStorage.clear();
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
      },
      validateLogin: async () => {
        try {
          const user = await getUser();
          if (user) {
            set({
              isLoggedIn: true,
            });
          }
        } catch (error) {
          get().logout();
        }
      },
    }),
    {
      name: 'userLoginStatus',
    },
  ),
);
