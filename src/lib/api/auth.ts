import ky from 'ky';

import type { LoginResponse } from '~/lib/types';
import { getToken } from '~/lib/utils';

const prefixUrl = 'https://dummyjson.com/auth';
const api = ky.create({
  prefixUrl,
  hooks: {
    beforeRequest: [
      request => {
        request.headers.set('Authorization', `Bearer ${getToken()}`);
      },
    ],
  },
});

export async function login({
  username,
  password,
}: { username: string; password: string }) {
  const json = await api
    .post('login', { json: { username, password } })
    .json<LoginResponse>();
  return json;
}

export async function getMe() {
  const json = await api.get('me').json();
  return json;
}
