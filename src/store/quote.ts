import { create } from 'zustand';

import { getRandomQuote } from '~/lib/api/quote';

type QuoteStore = {
  author: string;
  quote: string;
  isLoading: boolean;
  randomizeQuote: () => void;
};

export const useQuoteStore = create<QuoteStore>(set => ({
  author: '',
  quote: '',
  isLoading: false,
  randomizeQuote: async () => {
    set({ isLoading: true });
    const { author, quote } = await getRandomQuote();
    set({ author, quote });
    set({ isLoading: false });
  },
}));
