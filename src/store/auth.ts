import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { login } from '~/lib/api/auth';
import { setToken } from '~/lib/utils';

type AuthStore = {
  isLoggedIn: boolean;
  isLoginLoading: boolean;
  loginError: string | null;
  login: ({
    username,
    password,
  }: { username: string; password: string }) => void;
  logout: () => void;
};

export const useAuthStore = create(
  persist<AuthStore>(
    set => ({
      isLoggedIn: false,
      isLoginLoading: false,
      loginError: null,
      login: async ({ username, password }) => {
        try {
          const { token } = await login({ username, password });
          if (token) {
            setToken(token);
            set({ isLoggedIn: true });
          }
        } catch (error) {
          if (error instanceof Error) set({ loginError: error.message });
        }
      },
      logout: () => {
        set({ isLoggedIn: false });
        localStorage.clear();
      },
    }),
    {
      name: 'userLoginStatus',
    },
  ),
);
