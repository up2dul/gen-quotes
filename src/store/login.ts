import { create } from 'zustand';

type LoginStore = {
  isLoginLoading: boolean;
  loginError: string | null;
  setIsLoginLoading: (newState: boolean) => void;
  setLoginError: (loginError: string | null) => void;
};

export const useLoginStore = create<LoginStore>(set => ({
  isLoginLoading: false,
  loginError: null,
  setIsLoginLoading: newState => set(() => ({ isLoginLoading: newState })),
  setLoginError: loginError => set(() => ({ loginError })),
}));
