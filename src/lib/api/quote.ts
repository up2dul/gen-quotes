import ky from 'ky';

import type { QuoteResponse } from '~/lib/types';

const prefixUrl = 'https://dummyjson.com/quotes';
const api = ky.create({
  prefixUrl,
});

export async function getRandomQuote() {
  const json = await api.get('random').json<QuoteResponse>();
  return json;
}
