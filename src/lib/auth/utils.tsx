import { getItem, removeItem, setItem } from '@/lib/storage';

const TOKEN = 'token';

export type TokenType = {
  access: string;
  refresh: string;
};

export type SignUpType = {
  name: string;
  email: string;
  password: string;
}

export const getToken = () => getItem<TokenType>(TOKEN);
export const removeToken = () => removeItem(TOKEN);
export const setToken = (value: TokenType) => setItem<TokenType>(TOKEN, value);
