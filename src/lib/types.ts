export type UserResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
};

export type LoginResponse = UserResponse & {
  token: string;
};

export type QuoteResponse = {
  id: number;
  quote: string;
  author: string;
};
